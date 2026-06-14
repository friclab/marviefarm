# MIGRATION_NOTES — CakePHP 1.3 → NestJS + Prisma

## Decisioni di progetto

| # | Voce | Decisione |
|---|---|---|
| 1 | Immagini articoli | BLOB mantenuto nel DB (`articles.image`); endpoint dedicato `GET /articles/:id/image` |
| 2 | Password | Re-hash bcrypt al primo login con successo via SHA1 legacy; nessun reset forzato |
| 3 | PDF export | Puppeteer (headless Chrome); mantiene fedeltà agli HTML layout originali |
| 4 | Campo `qta` | Rinominato `quantity` nel codice TS; `@map("qta")` in Prisma mantiene compatibilità col DB |
| 5 | Architettura | REST API pura (JSON); nessun SSR, nessun template engine |
| 6 | CountdownController | Non portato (business logic dipendente da quantità iniziali hardcoded) |

---

## Differenze di comportamento intenzionali

### Auth: sessioni → JWT stateless
**PHP**: `AuthComponent` + sessioni PHP server-side. Logout invalida la sessione.
**NestJS**: JWT Bearer token (8h default). `POST /auth/logout` risponde 200 ma il token rimane tecnicamente valido fino a scadenza — è responsabilità del client scartarlo.
**Implicazione**: se serve invalidazione server-side, aggiungere una blacklist Redis.

### Password hashing: SHA1 → bcrypt
**PHP (CakePHP 1.3 default)**: `sha1(Security.salt + password)` senza salt per-utente.
**NestJS**: bcrypt con cost 12 e salt casuale per-utente.
**Migrazione automatica**: al login, se bcrypt fallisce, si tenta `sha1(CAKEPHP_SECURITY_SALT + password)`. In caso di successo, il hash viene sostituito silenziosamente con bcrypt. Richiede la variabile d'ambiente `CAKEPHP_SECURITY_SALT` (valore in `app/config/core.php`).

### Paginazione
**PHP**: `$this->paginate()` con default 20 record, nessun metadata nella risposta (solo array di record).
**NestJS**: risposta strutturata `{ data, total, page, limit }`. La shape è diversa — il client deve essere aggiornato.

### `!$id` → `ParseIntPipe`
**PHP**: `if (!$id)` cattura `null`, `0`, `''`, `false` (loose comparison).
**NestJS**: `@Param('id', ParseIntPipe)` restituisce 400 se l'ID non è un intero valido; 404 se il record non esiste. Il caso `id=0` restituisce 400 (pipe) invece di redirect come in CakePHP.

### AJAX partials → endpoint JSON
**PHP**: azioni come `getFabricOptions()`, `getModeltypessexessizeOptions()`, `getArticleInfo()` restituivano HTML parziale con `layout = 'ajax'`.
**NestJS**: restituiscono JSON standard. Il frontend deve essere adattato.

| Endpoint PHP | Endpoint NestJS |
|---|---|
| `getFabricOptions()` | `GET /order-details/fabric-options?articleId=X` |
| `getModeltypessexessizeOptions()` | `GET /order-details/size-options?articleId=X` |
| `getArticleInfo()` | `GET /order-details/article-info?articleId=X` |

### `find('list')` → risposta completa con `displayName`
**PHP**: `$model->find('list')` restituiva `{ id: displayValue }` (mappa piatta).
**NestJS**: tutti gli endpoint restituiscono l'oggetto completo con campo `displayName` calcolato. Per dropdown, il frontend usa `{ id, displayName }`.

### Ordine totali: calcolati nel service, non nella view
**PHP**: i totali (`partialTotal`, `discountAmount`, `subtotal`, `vat`, `grandTotal`) erano calcolati nel template `.ctp`.
**NestJS**: calcolati in `OrderHeadersService.toDetailResponse()`. Formula identica all'originale:
```
partialTotal = SUM(fabric.price * orderDetail.quantity)
discountAmount = partialTotal * discount / 100
subtotal = partialTotal - discountAmount
vat = customer.vatApplied * subtotal / 100
grandTotal = subtotal + vat
```

### Eliminazione a cascata degli order details
**PHP**: DELETE manuale degli `orderdetails` prima dell'`orderheader` (query diretta).
**NestJS**: `prisma.$transaction([deleteMany(orderDetails), delete(orderHeader)])`.

### `mysql_query('SHOW TABLE STATUS')` → stima nextId
**PHP**: `mysql_query('SHOW TABLE STATUS LIKE "orderheaders"')` per leggere `Auto_increment`.
**NestJS**: `findFirst({ orderBy: { id: 'desc' } })` → `nextId = (lastId ?? 0) + 1`. Nota: può divergere dal reale auto-increment del DB se ci sono stati gap (record eliminati). Endpoint: `GET /order-headers/next-number`.

### Immagini articolo: BLOB caricato in route separata
**PHP**: file upload tramite form nella stessa action `edit()`.
**NestJS**: upload separato via `POST /articles/:id/image` (multipart/form-data, campo `image`). Solo JPEG accettato (verifica magic bytes `FF D8 FF`). Accesso pubblico (senza JWT): `GET /articles/:id/image`.

### PDF generazione: Puppeteer invece di PHP render
**PHP**: template `.ctp` + generazione PDF lato server con libreria PHP.
**NestJS**: HTML template TypeScript → Puppeteer (Chrome headless) → PDF buffer.
**Nota produzione**: Puppeteer scarica Chrome (~300MB) a `npm install`. Per Docker: usare `--no-sandbox --disable-dev-shm-usage`. Per ambienti con Chrome pre-installato: impostare `CHROMIUM_PATH=<path>` per bypassare il download.

### CSV cost calculation
**PHP**: `FabricsController::calculateCost()` con query UNION diretta e output tabellare (TSV). Due parametri dal form: `multiply` (moltiplicatore) e `show_details` (checkbox). Con `show_details` attivo produce il report **dettagliato** (distinta materiali per articolo/variante + riga di riepilogo per variante); disattivo produce il report **sintetico** (solo le righe di riepilogo per variante). Il moltiplicatore è applicato al **subtotale di variante**. Numeri formattati all'italiana (`number_format(x, 3, ',', '.')`). File `costX{n}.csv`, `text/plain`.
**NestJS**: `GET /reports/cost-calculation?multiplier=N&detailed=true|false` (default `N=1`, `detailed=false`). Replica fedele: stessa query UNION via `prisma.$queryRaw`, stessa struttura gerarchica articolo→variante→materiali, stesso formato TSV, separatori `XXXXXXXXX`, helper `itNum()` per il formato numerico italiano, stesso nome file e content-type.
**Differenza schema**: la composizione fissa è stata spostata da `fabrics` ad `articles` — il branch `F` ora fa join su `art.fixedcomposition_id` (l'originale usava `f.fixedcomposition_id`).

---

## Bug corretti nel porting

### SQL Injection critica — `OrderdetailsController::getArticleInfo()`
```php
// ORIGINALE — VULNERABILE:
$info = $this->Orderdetail->query("...AND a.id=" . $article_id);
```
Lo stesso pattern è presente in `chooseQuantity()`, `chooseQuantityWS()`, `getOrderDetails()`, `getOrderHeader()` in `OrderheadersController`. L'`$article_id` e `$id` provengono direttamente dall'input utente (named params o POST).
**Fix NestJS**: `prisma.$queryRaw` con tagged template literal (parametrizzazione automatica). Per la query UNION del cost calculation, nessun input utente è interpolato nell'SQL; il `multiplier` viene applicato in TypeScript.

### `mysql_query()` diretto — `OrderheadersController::add()`
```php
$query = mysql_query('SELECT MAX(id) as max_id FROM orderheaders');
```
Funzione rimossa in PHP 7+. Usata per ottenere il prossimo auto-increment da mostrare nel form.
**Fix NestJS**: `prisma.orderHeader.findFirst({ orderBy: { id: 'desc' }, select: { id: true } })` → `nextId = (lastId ?? 0) + 1`.

### `htmlvardump()` — funzione di debug in produzione
```php
function htmlvardump(){ ob_start(); ... echo htmentities(ob_get_clean()); }
// (typo: htmentities invece di htmlentities)
```
Funzione di debug residua mai rimossa. Non portata.

---

## Magia CakePHP → esplicito NestJS

| CakePHP | NestJS |
|---|---|
| `MultipleDisplayFieldsBehavior` (afterFind) | Campo `displayName` calcolato in ogni `toResponse()` |
| `$model->recursive = N` | `include: { relation: { include: ... } }` in Prisma |
| `Auth->allow('action')` | `@Public()` decorator sul metodo |
| `$this->paginate()` | `prisma.findMany({ skip, take })` + `prisma.count()` in `$transaction` |
| `begin()/commit()/rollback()` | `prisma.$transaction(async (tx) => { ... })` |
| `$model->query(rawSql)` (phantom models) | `prisma.$queryRaw\`...\`` con parametrizzazione |
| `Session->setFlash()` | Messaggi d'errore nel body JSON (4xx/5xx) |
| `$order = "code"` sul model | `orderBy: { code: 'asc' }` in ogni query |
| `$hasMany = ['Foo' => ['dependent' => true]]` | `deleteMany` nel `$transaction` prima di `delete` |
| `$hasAndBelongsToMany` (HABTM) | Full-replace: `deleteMany: {} + create: [...]` in update |
| `$model->find('list')` | Array completo con `displayName`; client usa `{ id, displayName }` |

---

## Tabelle `articles_fabrics` — non portata
La HABTM `Article ↔ Fabric` è commentata nel codice PHP originale:
```php
/* var $hasAndBelongsToMany = array('Fabric' => ...) */
```
Sostituita da `hasMany Fabric` (FK `article_id` su `fabrics`). La tabella `articles_fabrics` potrebbe esistere nel DB ma non è usata. Non inclusa nel Prisma schema.

---

## Phantom models — non portati come entità
`Orderhead`, `Orderrow`, `Xcost`, `Xorderhead`, `Xorderrow`, `Xquery` sono modelli CakePHP con `useTable = false`, usati solo come veicolo per `->query(rawSql)`. In NestJS vengono usate direttamente le query Prisma nei service pertinenti.

---

## Gestione "stagione corrente" (Collection = Season)

Concettualmente `Collection` **è** la stagione (la tabella resta `collections`, nessun rename: churn DB inutile). Arricchita in modo additivo con `type` (`SS`/`FW`, nullable) e `year` (nullable) — servono solo per ordinare ed auto-selezionare la stagione più recente; nessun vincolo `unique` (i dati legacy potrebbero non rispettarlo). `displayName` = `"SS 2027 — <name>"` quando etichettata, altrimenti il solo nome.

### (a) Collasso M:N → 1:N (giustificato dai dati)
Le pivot `collections_projects` e `articles_projects` non sono **mai** state usate come vere M:N: sul DB live erano 1 collection / 1 project / 25 articoli, **1** riga in `collections_projects`, **25** in `articles_projects`, **zero** multi-membership e zero orfani. Convertirle in FK dirette è una semplificazione a costo dati nullo, non churn rischioso, e impone i requisiti a livello di schema:
- `projects.collection_id` (FK 1:N, nullable) sostituisce `collections_projects`.
- `articles.project_id` (FK 1:N, nullable) sostituisce `articles_projects`.

Catena risultante: **Article → Project → Collection**. La stagione di un articolo è univoca e derivabile (`article.project.collection`); un articolo non può appartenere a due stagioni (garantito dallo schema). Scartata l'alternativa di tenere le M:N + un `collection_id` denormalizzato su `Article` (doppia fonte di verità → drift garantito).

Migrazione in due tempi (tutto reversibile fino all'ultima fase):
1. `20260614145336_add_season_columns` — additiva: aggiunge le colonne nullable + `materialtypes.seasonal` + `collections.type/year`, poi **backfill** dai pivot (verificato lossless), marca `TXT` come seasonal, lega i tessuti all'unica collection, etichetta la collection esistente `SS 2027`. Le FK sono aggiunte nelle migration per-entità (`*_fk`) quando viene introdotta la relazione Prisma (evita falsi drift su FK non gestite dallo schema).
2. `20260614210000_drop_membership_pivots` — **distruttiva**, confinata alla fase finale: `DROP TABLE articles_projects, collections_projects`. Gating: eseguita solo dopo aver verificato `COUNT(*) WHERE project_id IS NULL = 0` e `WHERE collection_id IS NULL = 0`.

### (b) Stagionalità materiali
Pilotata da `Materialtype.seasonal` (flag editabile da UI; di default solo `TXT` = tessuti). I materiali stagionali portano `materials.collection_id` (nullable); `MERC` e `LAV` restano perenni (`collection_id` null). Il filtro di lettura è `WHERE collectionId IS NULL OR collectionId = ?` così i perenni/legacy restano sempre visibili. Scartate: flag per-Material (duplica l'info del type → drift) e join M:N Material↔Collection (astrazione prematura).

### (c) Meccanismo "stagione corrente" — client-side, non server
Lo stato della stagione selezionata vive nel **frontend** (`localStorage` chiave `mf_collection`) e viaggia come **query param `collectionId`** (DTO condiviso `ScopedPaginationDto`). Scartati: claim JWT (richiederebbe riemissione token, accoppia auth a una preferenza di UI) e sessione server (contraddice il design stateless, sync multi-device non richiesta).

**Nota di sicurezza:** il filtro `collectionId` è **scoping di vista, non autorizzazione**. Su un dato mono-tenant l'auth (JWT guard globale) già protegge l'accesso; un client che omette `collectionId` vede tutto — comportamento legacy accettabile e voluto (default = nessun filtro).

Endpoint stagione-scoped (filtro applicato solo se `collectionId` presente; `where` e `count` coincidono): `order-headers` (`{ collectionId }`), `articles` (`{ project: { collectionId } }`), `fabrics` (`{ article: { project: { collectionId } } }`), `projects` (`{ collectionId }`), `materials` (`OR null/current`), `reports` cost-calc/cost-preview/consumption (subquery SQL condizionale, query identica all'attuale quando assente). NON scoped (globali): `collections` (è la sorgente del selettore), `customers`, `sizing`, `suppliers`, `unit-measurements`, `material-types`, `compositions`.

### (d) Validazione cross-season delle righe ordine (req. 2, soft)
In `order-details` create/batch: se l'ordine **e** l'articolo hanno entrambi una collection valorizzata e diversa → `BadRequestException`. Soft sui legacy: se uno dei due è null nessun blocco.

---

## Variabili d'ambiente richieste

| Variabile | Descrizione |
|---|---|
| `DATABASE_URL` | Connection string MySQL (`mysql://user:pass@host:port/db`) |
| `JWT_SECRET` | Segreto per firmare i JWT (min 32 char in produzione) |
| `JWT_EXPIRES_IN` | Durata token (default `8h`) |
| `CAKEPHP_SECURITY_SALT` | Salt di CakePHP 1.3 per verifica password legacy. Trovarlo in `app/config/core.php` alla riga `Configure::write('Security.salt', ...)`. Può essere rimosso quando tutti gli utenti hanno fatto almeno un login. |
| `CHROMIUM_PATH` | (Opzionale) Path a Chrome/Chromium pre-installato. Se non impostato, Puppeteer usa il Chrome scaricato a `npm install`. |

---

## Endpoint REST completi

| Modulo | Prefisso | Endpoint |
|---|---|---|
| Auth | `/auth` | `POST /login`, `POST /logout` |
| Sizing | `/sexes`, `/modeltypes`, `/modeltypes-sexes`, `/sizes`, `/modeltypes-sex-sizes` | CRUD standard |
| Materials | `/suppliers`, `/unit-measurements`, `/material-types`, `/materials` | CRUD standard |
| Compositions | `/fixed-compositions`, `/fixed-composition-materials`, `/dynamic-compositions`, `/dynamic-composition-materials` | CRUD standard; composition-materials gestiscono il BOM (bill of materials) con campo `quantity` |
| Catalog | `/projects`, `/collections`, `/articles`, `/fabrics` | CRUD + `GET /articles/:id/image` (public) + `POST /articles/:id/image` |
| Customers | `/customers` | CRUD standard |
| Orders | `/order-headers`, `/order-details` | CRUD + `GET /order-headers/next-number` + `POST /order-details/batch` + `GET /order-details/fabric-options`, `size-options`, `article-info` |
| Reports | `/reports` | `GET /reports/cost-calculation` (CSV) + PDF endpoints |

---

## Note sulle immagini articolo (BLOB in DB)
Le query `findAll` e `findOne` su `/articles` caricano il BLOB da DB ma non lo serializzano nella risposta JSON (il campo `image` è escluso da `toResponse()`). Per DB con immagini di grandi dimensioni, ottimizzare usando `select` Prisma per escludere `image` dalle query di lista (il BLOB non viene caricato). L'immagine è accessibile solo via `GET /articles/:id/image`.

---

## Moduli portati / da portare

- [x] Infrastruttura (Prisma, Auth con re-hash, JWT guard globale)
- [x] **Sizing** (Sex, Modeltype, ModeltypeSex, Size, ModeltypeSexSize)
- [x] **Materials** (Supplier, UnitMeasurement, MaterialType, Material + HABTM materialtypes)
- [x] **Compositions** (FixedComposition + BOM, DynamicComposition + BOM)
- [x] **Catalog** (Project, Collection, Article con image endpoint, Fabric)
- [x] **Customers**
- [x] **Orders** (OrderHeader con totali calcolati, OrderDetail con batch insert + AJAX endpoints)
- [x] **Reports** (CSV cost calculation, PDF via Puppeteer: articles-list, order-export, choose-quantity, order-form)

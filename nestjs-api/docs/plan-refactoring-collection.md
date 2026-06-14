  Piano: gestione "stagione corrente" in MarvieFarm
  
  Fatti dal DB live (verificati ora, guidano le decisioni)

  ┌──────────────────────┬──────────────────────────────────────────────────┬────────────────────────────────────────────────────────────┐
  │       Tabella        │                    Conteggio                     │                            Nota                            │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ collections          │ 1                                                │ l'unico container stagione esistente                       │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ projects             │ 1                                                │ un solo progetto                                           │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ articles             │ 25                                               │ tutti nell'unico progetto                                  │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ collections_projects │ 1 riga                                           │ M:N di fatto 1:1                                           │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ articles_projects    │ 25 righe                                         │ M:N di fatto 1:N                                           │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ orderheaders         │ 0                                                │ nessun ordine → migrazione ordini banale                   │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ multi-membership     │ 0                                                │ nessun project in 2 collection, nessun article in 2        │
  │                      │                                                  │ project, zero orfani                                       │
  ├──────────────────────┼──────────────────────────────────────────────────┼────────────────────────────────────────────────────────────┤
  │ materialtypes        │ TXT tessuto (8 mat.), MERC merceria (5), LAV     │ ogni material ha esattamente 1 type                        │
  │                      │ lavorazioni (2)                                  │                                                            │
  └──────────────────────┴──────────────────────────────────────────────────┴────────────────────────────────────────────────────────────┘

  Conseguenza chiave: le due M:N non sono mai state usate come M:N. Convertirle in 1:N non è churn rischioso, è una semplificazione a costo 
  dati nullo (nessun caso da risolvere). Questo sblocca la soluzione più semplice che soddisfa anche i requisiti 2 e 5 a livello di schema.

  ---
  Domande aperte (con default proposto = il più semplice; procedo con questi)
  
  1. Arricchire Collection con type (SS/FW) + year? → Default: sì, ma nullable e additivo. Servono solo per ordinare/etichettare e per
  auto-selezionare la stagione più recente. Nessun vincolo unique (i dati legacy potrebbero non rispettarlo). Alternativa scartata: solo name
  (rende l'auto-default "ultima stagione" non deterministico).
  2. Quali materialtype sono stagionali? → Default: solo TXT (tessuti). MERC e LAV perenni. È un flag editabile, quindi correggibile da UI
  senza migrazione.
  3. "Articolo non valido nelle stagioni successive": blocco hard o soft? → Default: soft. Il picker delle righe ordine è filtrato alla
  stagione dell'ordine; validazione hard solo quando entrambe le collection sono valorizzate. Non rompe i dati legacy.
  4. Nessuna stagione selezionata → cosa mostro? → Default: nessun filtro (mostra tutto = comportamento legacy). Il frontend però
  auto-seleziona l'ultima collection, quindi l'utente raramente vede questo stato.
  5. Tessuto stagionale: stessa riga riusata ogni stagione o riga distinta per stagione? → Default: riga distinta (singola FK collection_id 
  nullable). Una M:N material↔collection è astrazione prematura; si rivaluta se servisse il riuso.

  ---
  1. Modello dati target (diff su schema attuale)

  Mantengo tutti i nomi tabella legacy (@map), aggiungo solo colonne @map snake_case e rimuovo le due pivot (in fase finale).

  model Collection {
    id        Int           @id @default(autoincrement())
    name      String
    type      String?                                  // NEW  "SS" | "FW", nullable
    year      Int?                                     // NEW  nullable
    orders    OrderHeader[]
    projects  Project[]                                // CHG  era CollectionProject[]
    materials Material[]                               // NEW  materiali stagionali
    @@map("collections")
  }

  model Project {
    id           Int         @id @default(autoincrement())
    name         String
    collectionId Int?        @map("collection_id")     // NEW  FK 1:N (nullable)
    collection   Collection? @relation(fields: [collectionId], references: [id])
    articles     Article[]                             // CHG  era ArticleProject[]
    @@map("projects")
  }

  model Article {
    // ...invariato...
    projectId Int?     @map("project_id")              // NEW  FK 1:N (nullable)
    project   Project? @relation(fields: [projectId], references: [id])
    // RIMOSSO: projects ArticleProject[]
    @@map("articles")
  }

  model Materialtype {
    // ...invariato...
    seasonal Boolean @default(false)                   // NEW  pilota la stagionalità
    @@map("materialtypes")
  }

  model Material {
    // ...invariato...
    collectionId Int?        @map("collection_id")     // NEW  nullable; valorizzato solo per tipi stagionali
    collection   Collection? @relation(fields: [collectionId], references: [id])
    @@map("materials")
  }

  // RIMOSSI in fase finale: model CollectionProject, model ArticleProject
  //                         (tabelle collections_projects, articles_projects)

  Catena risultante: Article → Project → Collection = la stagione dell'articolo è univoca e derivabile (article.project.collection), e un
  articolo non può appartenere a due stagioni (req. 2 garantito dallo schema). N progetti per collection supportati (req. 5).

  Decisione A motivata:
  - Collection resta collections (no rename tabella): rinominare sarebbe churn DB inutile e romperebbe la compat legacy. Concettualmente
  Collection è la Season; lo documento. Arricchimento solo additivo.
  - M:N → 1:N: scelto perché (a) i dati sono già 1:N, (b) impone i requisiti 2 e 5 a livello di schema (unica fonte di verità), (c) riduce il
  numero di tabelle. Alternativa scartata: tenere le M:N e aggiungere un collection_id denormalizzato su Article → doppia fonte di verità
  (collection via project vs diretta), drift garantito.
  
  Decisione C motivata (materiali): flag seasonal su Materialtype + collection_id nullable su Material. Scartate: flag per-Material (duplica
  l'info del type, drift); rendere tutti i materiali stagionali (viola req. 4: le lavorazioni devono restare perenni); join M:N
  Material↔Collection (prematuro). Il filtro di lettura resta banale (vedi §3); il flag governa il lato scrittura (prefill/validazione).

  Decisione B motivata (meccanismo stagione corrente): (a) stato client + query param.
  - (b) claim JWT: cambiare stagione richiederebbe riemissione token, accoppia auth a una preferenza di UI, token cached/difficile da mutare.
  Scartato.
  - (c) sessione server: contraddice il design stateless, aggiunge infra, sync multi-device non richiesta. Scartato.
  - Nota di sicurezza da documentare: il filtro stagione è scoping di vista, non autorizzazione (dato mono-tenant, l'auth già protegge
  l'accesso). Un client che omette collectionId vede tutto: accettabile e voluto.

  ---
  2. Strategia di migrazione dati (passo-passo)

  Tutto reversibile fino all'ultima fase. Diviso in due migration Prisma:

  Migration 1 — additiva + backfill (non distruttiva, Fase 1):
  1. Aggiungi colonne nullable / con default: projects.collection_id, articles.project_id, materials.collection_id, materialtypes.seasonal 
  DEFAULT 0, collections.type, collections.year.
  2. Backfill (eseguiti nella migration, dati già verificati senza conflitti):
  UPDATE projects p JOIN collections_projects cp ON cp.project_id = p.id
    SET p.collection_id = cp.collection_id;                 -- 1 riga
  UPDATE articles a JOIN articles_projects ap ON ap.article_id = a.id
    SET a.project_id = ap.project_id;                       -- 25 righe (nessun multi-membership)
  UPDATE materialtypes SET seasonal = 1 WHERE code = 'TXT'; -- tessuti stagionali
  UPDATE materials m
    JOIN materials_materialtypes mm ON mm.material_id = m.id
    JOIN materialtypes mt ON mt.id = mm.materialtype_id
    SET m.collection_id = (SELECT id FROM collections LIMIT 1)
    WHERE mt.seasonal = 1;                                  -- 8 tessuti → unica collection
  -- (opzionale) UPDATE collections SET type='...', year=... WHERE id=...;
  3. Aggiungi i FK constraint sulle nuove colonne.
  4. Le pivot restano in piedi: l'app continua a leggerle finché non passa alle nuove colonne.

  Migration 2 — distruttiva (Fase 8, solo dopo che l'app non legge più le pivot):
  DROP TABLE articles_projects;
  DROP TABLE collections_projects;
  Gating: eseguire solo dopo verifica SELECT COUNT(*) che ogni article ha project_id e ogni project ha collection_id.

  ---
  3. Modifiche API
  
  Nuovo DTO condiviso common/scoped-pagination.dto.ts:
  export class ScopedPaginationDto extends PaginationDto {
    @IsOptional() @Type(() => Number) @IsInt() collectionId?: number;
  } 
  I controller delle entità stagionali lo usano al posto di PaginationDto e passano collectionId al service.

  Dove si applica il filtro (where + count devono coincidere):

  ┌────────────────────────────────────────────────────────────────┬─────────────────────────────────────────────────────────────────────┐
  │                            Service                             │             findAll filtro quando collectionId presente             │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ orders/order-headers                                           │ where: { collectionId } (FK diretta, già esiste)                    │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ catalog/articles                                               │ where: { project: { collectionId } }                                │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ catalog/fabrics                                                │ where: { article: { project: { collectionId } } }                   │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ catalog/projects                                               │ where: { collectionId }                                             │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ materials/materials                                            │ where: { OR: [{ collectionId: null }, { collectionId }] }           │
  │                                                                │ (perenni+legacy sempre visibili)                                    │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ collections                                                    │ NON filtrato (è la sorgente del selettore)                          │
  ├────────────────────────────────────────────────────────────────┼─────────────────────────────────────────────────────────────────────┤
  │ customers · sizing · suppliers · unit-measurements ·           │ NON filtrati (globali)                                              │
  │ material-types · compositions                                  │                                                                     │
  └────────────────────────────────────────────────────────────────┴─────────────────────────────────────────────────────────────────────┘

  Quando collectionId è assente → nessun filtro (default §D = mostra tutto).

  Modifiche per service:
  - articles.service.ts: includeRelations → project: { include: { collection: true } } al posto di projects. toResponse espone
  project/collection invece di projects[] (⚠ cambia ArticleResponse → coordinare col frontend nella stessa fase). DTO create/update:
  projectId singolo al posto di projectIds[]. findAll(page, limit, collectionId?).
  - collections.service.ts: relation projects (1:N) invece di CollectionProject; toResponse aggiunge type/year e un displayName tipo "FW 2026
  — <name>". Niente endpoint "set current season" (lo stato è client-side → API più semplice).
  - materials.service.ts: filtro OR null/current; findAll(...collectionId?). Il prefill su create è client-side; il service accetta
  collectionId nel DTO.
  - material-types.service.ts: esporre/accettare seasonal in response e DTO.
  - order-details (validazione req. 2): in create riga, se orderHeader.collectionId e article.project.collectionId sono entrambi valorizzati
  e diversi → BadRequestException. Soft sui legacy (uno dei due null → nessun blocco).
  - reports.service.ts (cost-calc): aggiungere collectionId? opzionale a getCostPreview, generateCostCsv, getMaterialConsumption. Nelle UNION
  raw, scope opzionale:
    - costi: JOIN projects pr ON pr.id = art.project_id + ${collectionId ? Prisma.sql\AND pr.collection_id = ${collectionId}` :
  Prisma.empty}(stesso pattern diorderFilter` già presente).
    - consumi: filtrare su od ... JOIN orderheaders oh ON oh.id = od.orderheader_id WHERE oh.collection_id = ? (gli ordini sono già
  season-bound). Default senza scope = comportamento attuale invariato.
  
  Nessun nuovo endpoint oltre a GET /collections (già esistente) usato come sorgente del selettore. Niente "set stagione corrente" lato
  server.

  ---
  4. Modifiche frontend

  - Stato stagione corrente: nuovo src/lib/collection.tsx (specchio di auth.tsx): CollectionProvider + useCollection(), persistito in
  localStorage chiave mf_collection. Al mount, se non impostato, GET /collections e auto-seleziona la più recente (year desc, id desc).
  - Selettore UI: <Select> in Sidebar.tsx (o in cima a Layout.tsx) legato al context. Al cambio: aggiorna context +
  queryClient.invalidateQueries() (le query hanno già extraParams nella queryKey → refetch automatico).
  - CrudPage riceve il filtro: nessuna modifica al componente. Le pagine stagionali passano extraParams={{ collectionId }} da
  useCollection(). Per non ripetere, hook useSeasonScopedParams() che restituisce { collectionId } (o {} se nessuna). Opt-in solo su:
  Articoli, Ordini, Materiali, Progetti. Customers/Sizing/ecc. invariati.
  - Form (prefill stagione corrente, §D): ordine → collectionId precompilato; articolo → select progetto filtrato alla collection corrente,
  projectId singolo; materiale di tipo stagionale → collection_id precompilato.
  - Picker righe ordine (OrderDetailPage.tsx, già in lavorazione nel working tree): filtrare gli articoli selezionabili alla collection
  dell'ordine.
  - types/api.ts: aggiornare Article (project/collection invece di projects[]), Collection (type/year), Material (collectionId), Materialtype
  (seasonal).

  ---
  5. Piano a fasi (ognuna rilasciabile e testabile)

  ┌────────────────────────┬──────────────────────────────────────────┬─────────────────────────────────────────────────────────────────┐
  │          Fase          │                Contenuto                 │                          File toccati                           │
  ├────────────────────────┼──────────────────────────────────────────┼─────────────────────────────────────────────────────────────────┤
  │ 0 Discovery              │ Cardinalità dati (fatta), scelta          │ MIGRATION_NOTES.md                                            │
  │                          │ type/year dell'unica collection           │                                                               │
  ├──────────────────────────┼───────────────────────────────────────────┼───────────────────────────────────────────────────────────────┤
  │ 1 Schema additivo +      │ Migration 1, schema nuove colonne, pivot  │ prisma/schema.prisma, nuova migration, MIGRATION_NOTES.md     │
  │ backfill (invisibile)    │ ancora lette                              │                                                               │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ 2 API filtro Ordini + │ ScopedPaginationDto, filtro collectionId su ordini, │ common/scoped-pagination.dto.ts (new),                 │
  │  Collection           │  type/year in collections                           │ orders/order-headers/*, catalog/collections/*          │
  │ arricchita            │                                                     │                                                        │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ 3 Infra stagione      │ Provider, selettore Sidebar, Ordini filtrati        │ src/lib/collection.tsx (new), App.tsx/main.tsx,        │
  │ corrente (frontend)   │                                                     │ Sidebar.tsx, Layout.tsx, pages/orders/*, types/api.ts  │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ 4 Articoli 1:N        │ service include/toResponse/DTO →                    │ catalog/articles/*, catalog/fabrics/*,                 │
  │                       │ project/collection, filtro, form+tipi               │ pages/catalog/ArticlesPage.tsx, types/api.ts           │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │                       │ project.collectionId in service/DTO/form, pagina    │ catalog/projects/*,                                    │
  │ 5 Progetti 1:N        │ scoping                                             │ catalog/collections/collections.service.ts,            │
  │                       │                                                     │ pages/catalog/ProjectsPage.tsx                         │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ 6 Materiali           │ seasonal su materialtype, collection_id su          │ materials/materials/*, materials/material-types/*,     │
  │ stagionali            │ material, filtro OR, prefill                        │ pages/materials/*, types/api.ts                        │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │ 7 Report/cost-calc    │ collectionId? su preview/CSV/consumi + join raw     │ reports/reports.service.ts,                            │
  │ scoping               │ SQL; UI report passa la collection                  │ reports/reports.controller.ts, pages/reports/*         │
  ├───────────────────────┼─────────────────────────────────────────────────────┼────────────────────────────────────────────────────────┤
  │                       │ Migration 2 (drop pivot), rimozione modelli         │ prisma/schema.prisma, nuova migration,                 │
  │ 8 Cleanup distruttivo │ CollectionProject/ArticleProject e codice morto,    │ orders/order-details/*                                 │
  │                       │ validazione cross-season righe ordine               │                                                        │
  └───────────────────────┴─────────────────────────────────────────────────────┴────────────────────────────────────────────────────────┘

  Ordine scelto perché: Ordini per primi (hanno già collection_id, rischio minimo), drop distruttivo per ultimo (rollback facile fino a Fase
  7). Ogni fase ha e2e dedicati (esiste già test/orders.e2e-spec.ts, da estendere con fixture stagione).

  ---
  6. Rischi, casi limite, impatti su report/PDF
  
  - Breaking di ArticleResponse (projects[] → project/collection): rompe types/api.ts e il picker in OrderDetailPage.tsx. Mitigazione: Fase 4
  modifica back+front insieme.
  - Drop pivot irreversibile: isolato in Fase 8, gated da verifica backfill.
  - Cost-calc raw SQL: aggiungere JOIN projects esclude gli articoli con project_id NULL quando si filtra per stagione. Garantire che senza
  collectionId la query resti identica all'attuale (default = nessuno scope). Dopo backfill non ci sono articoli orfani.
  - PDF/report: i report oggi aggregano tutto. Con le stagioni l'utente si aspetta lo scope alla stagione corrente → passare collectionId
  dalla UI report; mantenere "tutte le stagioni" come opzione (param assente).
  - Filtro materiali OR-null: un tessuto stagionale lasciato con collection_id NULL comparirebbe in ogni stagione. Mitigato da backfill +
  prefill in create; eventuale validazione "tipo stagionale ⇒ collection obbligatoria" in fase successiva.
  - Auto-default stagione: serve ordinamento deterministico (year desc, id desc); se year NULL su tutte, fallback a id desc.
  - Sicurezza: collectionId client-side non è un confine di autorizzazione — documentare.
  - @map/Decimal: nuove colonne usano @map snake_case; nessun impatto sui pattern Number()/displayName esistenti.

  ---
  7. Aggiornamenti MEMORY.md / MIGRATION_NOTES.md
  
  MEMORY (project-architecture.md + sezione Domain Model in MEMORY.md): il "Domain Model" attuale in memoria (Season type SS/FW unique,
  Piece, OrderItem…) non corrisponde allo schema reale (Collection/Article/Fabric/OrderHeader). Da correggere registrando: Collection =
  stagione (name + type/year nullable), 1:N Project, 1:N Article; Material.collectionId + Materialtype.seasonal; stagione corrente =
  client-side localStorage mf_collection + query param collectionId; filtro = scoping di vista, non auth.

  MIGRATION_NOTES.md: documentare (a) collasso M:N→1:N con la giustificazione dati (1/1/25, zero multi-membership), (b) stagionalità pilotata
  da Materialtype.seasonal (solo TXT), (c) scelta client-side vs claim JWT vs sessione, (d) il drop distruttivo delle pivot confinato alla
  fase finale.

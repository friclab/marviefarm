export interface ArticleEntry {
  name: string;
  description: string | null;
  fabrics: Array<{
    code: string;
    description: string | null;
    price: number | null;
  }>;
}

export interface ProjectGroup {
  projectName: string;
  articles: ArticleEntry[];
}

export interface ArticlesListData {
  generatedAt: string;
  projects: ProjectGroup[];
  unassigned: ArticleEntry[];
}

function escHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderArticleTable(articles: ArticleEntry[]): string {
  return articles
    .map(
      art => `
      <div class="article">
        <div class="art-name">${escHtml(art.name)}${art.description ? ' — <span class="art-desc">' + escHtml(art.description) + '</span>' : ''}</div>
        ${
          art.fabrics.length > 0
            ? `<table class="fabrics">
            <tr><th>Codice</th><th>Descrizione</th><th>Prezzo</th></tr>
            ${art.fabrics
              .map(
                f =>
                  `<tr>
                <td>${escHtml(f.code)}</td>
                <td>${f.description ? escHtml(f.description) : '—'}</td>
                <td class="num">${f.price !== null ? '€ ' + f.price.toFixed(2) : '—'}</td>
              </tr>`,
              )
              .join('')}
          </table>`
            : '<p class="no-fabrics">Nessuna variante</p>'
        }
      </div>`,
    )
    .join('');
}

export function renderArticlesList(data: ArticlesListData): string {
  const projectSections = data.projects
    .map(
      pg => `
      <section>
        <h2 class="project">${escHtml(pg.projectName)}</h2>
        ${renderArticleTable(pg.articles)}
      </section>`,
    )
    .join('');

  const unassignedSection =
    data.unassigned.length > 0
      ? `<section>
        <h2 class="project">Senza progetto</h2>
        ${renderArticleTable(data.unassigned)}
      </section>`
      : '';

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<style>
  body { font-family: Arial, sans-serif; font-size: 11px; margin: 20px; }
  h1 { font-size: 18px; border-bottom: 2px solid #333; padding-bottom: 6px; }
  h2.project { font-size: 14px; background: #eee; padding: 4px 8px; margin: 16px 0 8px; border-left: 4px solid #333; }
  .article { margin-bottom: 12px; padding-left: 8px; }
  .art-name { font-weight: bold; margin-bottom: 4px; }
  .art-desc { font-weight: normal; color: #555; }
  table.fabrics { width: 100%; border-collapse: collapse; margin-left: 8px; }
  table.fabrics th { background: #666; color: #fff; padding: 3px 6px; text-align: left; font-size: 10px; }
  table.fabrics td { padding: 2px 6px; border-bottom: 1px solid #ddd; font-size: 10px; }
  .num { text-align: right; }
  .no-fabrics { color: #999; font-style: italic; margin: 0 0 4px 8px; }
  .generated { color: #999; font-size: 9px; margin-top: 20px; }
</style>
</head>
<body>
<h1>Lista Articoli</h1>
${projectSections}
${unassignedSection}
<p class="generated">Generato il ${escHtml(data.generatedAt)}</p>
</body>
</html>`;
}

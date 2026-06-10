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
export declare function renderArticlesList(data: ArticlesListData): string;

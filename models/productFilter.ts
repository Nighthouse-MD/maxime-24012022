export interface ProductFilter {
    searchWord: string;
    showActiveOnly: boolean;
    page: number;
    reloadAll: boolean;
}

export const getInitialFilter = (): ProductFilter => {
    return {
        searchWord: '',
        showActiveOnly: true,
        page: 1,
        reloadAll: false
    };
}
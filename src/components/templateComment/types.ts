export interface vocabularySecondParams {
    level?: number
    typeId?: number
    partOfSpeech?: number
}

export interface vocabularyPagination extends vocabularySecondParams {
    page: number
    pageSize: number
    key?: string
}
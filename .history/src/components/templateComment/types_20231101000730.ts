export interface vocabularySecondParams {
    level?: number
    typeId?: number
    partOfSpeech?: number
}

export interface pagination extends vocabularySecondParams {
    page: number
    pageSize: number
    key?: string
}
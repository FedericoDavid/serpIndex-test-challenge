interface Result {
    serb: string,
    indexedOn: string,
    checkedOn: string
}

export interface Entries {
    createdOn: string,
    title: string,
    language: string,
    url: string,
    results: Array<Result>,
    validUntil: string,
    indexedCount: number,
    indexedValidCount: number,
    indexedTotal: number,
    latestIndexedOn: string
}

export interface Index {
    id: string,
    title: string,
    category: string,
    domain: string,
    createdOn: string,
    validUntil?: string,
    entries: Array<Entries>,
}

export interface PostIndex {
    category: string,
    url: string,
    validUntil?: string,
}
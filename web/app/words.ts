export interface WordGroup {
    color: string;
    words: string[];
}
export interface GroupedWords {
    wordGroups: WordGroup[];
}

export interface Word {
    word: string;
    color: string;
}
export interface WordGroup {
    color: string;
    words: string[];
    disabled: boolean;
}
export interface GroupedWords {
    wordGroups: WordGroup[];
    synonyms: string[][];
}

export interface Word {
    word: string;
    color: string;
}
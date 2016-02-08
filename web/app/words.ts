export interface WordGroup {
    color: string;
    words: string[];
    disabled: boolean;
}
export interface GroupedWords {
    wordGroups: WordGroup[];
}

export interface Word {
    word: string;
    color: string;
}
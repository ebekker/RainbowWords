import {Injectable} from 'angular2/core';
import {WordGroup,GroupedWords} from './words';
import {MOCK_WORDS} from './mock-words'

var DEFAULT_WORDS = "https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/f364d986cd64532a7763f26f68f869ebb2490090/ces-mccullough.words.json"

@Injectable()
export class WordsService {
    getWordGroups() {
        return Promise.resolve(MOCK_WORDS);
    }
}

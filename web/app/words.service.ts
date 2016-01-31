import {Injectable}             from 'angular2/core';
import {Http}                   from 'angular2/http';
import {WordGroup,GroupedWords} from './words';
import {MOCK_WORDS}             from './mock-words'
import {Observable}             from 'rxjs/Observable';

// Add all operators to Observable
import 'rxjs/Rx';

var DEFAULT_WORDS_SOURCE =
      //"https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/f364d986cd64532a7763f26f68f869ebb2490090/ces-mccullough.words.json";
      //"https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/14d11dbb64e421a10a29a7822a21d39127973431/ces-mccullough.words.json";
        "https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/f36122cc58fd0e9f9fd65a2403b193ec94a47161/ces-mccullough.words.json";

@Injectable()
export class WordsService {

    constructor(private _http: Http) {}

    getWordGroups() {
        return this._http.get(DEFAULT_WORDS_SOURCE)
                .map(resp => <GroupedWords> resp.json())
                .catch(this.logAndThrow);
    }
    
    getMockWordGroups() {
        return Promise.resolve(MOCK_WORDS);
    }
    
    logAndThrow(err: Error) {
        console.error(err);
        return Observable.throw(err);
    }
}

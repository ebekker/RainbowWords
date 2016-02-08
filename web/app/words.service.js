System.register(['angular2/core', 'angular2/http', './mock-words', 'rxjs/Observable', 'rxjs/Rx'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, core_2, http_1, mock_words_1, Observable_1;
    var DEFAULT_WORDS_SOURCE, WordsService, ActiveWordGroupPipe;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (mock_words_1_1) {
                mock_words_1 = mock_words_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {}],
        execute: function() {
            DEFAULT_WORDS_SOURCE = 
            //"https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/f364d986cd64532a7763f26f68f869ebb2490090/ces-mccullough.words.json";
            //"https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/14d11dbb64e421a10a29a7822a21d39127973431/ces-mccullough.words.json";
            //"https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/f36122cc58fd0e9f9fd65a2403b193ec94a47161/ces-mccullough.words.json";
            "https://snipt.net/raw/e47b8c934cad4ad18b091347eb3e6737/";
            WordsService = (function () {
                function WordsService(_http) {
                    this._http = _http;
                }
                WordsService.prototype.getWordGroups = function () {
                    return this._http.get(DEFAULT_WORDS_SOURCE)
                        .map(function (resp) { return resp.json(); })
                        .catch(this.logAndThrow);
                };
                WordsService.prototype.getMockWordGroups = function () {
                    return Promise.resolve(mock_words_1.MOCK_WORDS);
                };
                WordsService.prototype.logAndThrow = function (err) {
                    console.error(err);
                    return Observable_1.Observable.throw(err);
                };
                WordsService = __decorate([
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], WordsService);
                return WordsService;
            })();
            exports_1("WordsService", WordsService);
            ActiveWordGroupPipe = (function () {
                function ActiveWordGroupPipe() {
                }
                ActiveWordGroupPipe.prototype.transform = function (items, args) {
                    return items.filter(function (wg) { return !wg.disabled; });
                };
                ActiveWordGroupPipe = __decorate([
                    core_1.Pipe({
                        name: "activeWordGroup"
                    }),
                    core_2.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], ActiveWordGroupPipe);
                return ActiveWordGroupPipe;
            })();
            exports_1("ActiveWordGroupPipe", ActiveWordGroupPipe);
        }
    }
});
//# sourceMappingURL=words.service.js.map
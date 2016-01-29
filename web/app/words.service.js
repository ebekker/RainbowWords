System.register(['angular2/core', './mock-words'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, mock_words_1;
    var DEFAULT_WORDS, WordsService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (mock_words_1_1) {
                mock_words_1 = mock_words_1_1;
            }],
        execute: function() {
            DEFAULT_WORDS = "https://gist.githubusercontent.com/ebekker/e1fc9b6c928bfdc548ac/raw/f364d986cd64532a7763f26f68f869ebb2490090/ces-mccullough.words.json";
            WordsService = (function () {
                function WordsService() {
                }
                WordsService.prototype.getWordGroups = function () {
                    return Promise.resolve(mock_words_1.MOCK_WORDS);
                };
                WordsService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], WordsService);
                return WordsService;
            })();
            exports_1("WordsService", WordsService);
        }
    }
});
//# sourceMappingURL=words.service.js.map
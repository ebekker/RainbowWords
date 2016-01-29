System.register(['angular2/core', './words.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, words_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (words_service_1_1) {
                words_service_1 = words_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_wordsService) {
                    this._wordsService = _wordsService;
                    this.title = 'Abby\'s';
                    this.wordIndex = -1;
                    this.hasPrev = false;
                    this.hasNext = false;
                    this.optionRandomize = false;
                    this.optionHideColor = false;
                    this.optionRepeat = false;
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.loadWords();
                };
                AppComponent.prototype.loadWords = function () {
                    var _this = this;
                    this._wordsService.getWordGroups().then(function (_) {
                        _this.wordGroups = _;
                        _this.convertWordGroups(_this.wordGroups);
                        _this.wordIndex = 0;
                        _this.refreshState();
                    });
                };
                AppComponent.prototype.convertWordGroups = function (groupedWords) {
                    var _this = this;
                    this.words = [];
                    groupedWords.wordGroups.forEach(function (_) { return _.words.forEach(function (_2) { return _this.words = _this.words.concat({
                        word: _2,
                        color: _.color
                    }); }); });
                };
                AppComponent.prototype.refreshState = function () {
                    this.hasPrev = this.words
                        && this.wordIndex > 0;
                    this.hasNext = this.words
                        && this.wordIndex < (this.words.length - 1);
                    this.currentWord = this.words[this.wordIndex].word;
                    this.currentColor = this.words[this.wordIndex].color;
                };
                AppComponent.prototype.onPrev = function () {
                    if (this.hasPrev) {
                        --this.wordIndex;
                        this.refreshState();
                    }
                };
                AppComponent.prototype.onNext = function () {
                    if (this.hasNext) {
                        ++this.wordIndex;
                        this.refreshState();
                    }
                };
                AppComponent.prototype.onHear = function () {
                    // var msg = new SpeechSynthesisUtterance(this.currentWord);
                    // window.speechSynthesis.speak(msg);
                    var msg = new SpeechSynthesisUtterance();
                    var voices = window.speechSynthesis.getVoices();
                    msg.voice = voices[2]; //voices[10]; // Note: some voices don't support altering params
                    msg.voiceURI = 'native';
                    msg.volume = 1; // 0 to 1
                    msg.rate = 0.5; // 0.1 to 10
                    msg.pitch = 1; //0 to 2
                    msg.text = this.currentWord;
                    msg.lang = 'en-US';
                    // msg.onend = function(e) {
                    // console.log('Finished in ' + event.elapsedTime + ' seconds.');
                    // };
                    speechSynthesis.speak(msg);
                };
                AppComponent.prototype.onTalk = function () {
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        //directives: [HeroDetailComponent],
                        providers: [words_service_1.WordsService],
                    }), 
                    __metadata('design:paramtypes', [words_service_1.WordsService])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
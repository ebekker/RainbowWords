System.register(['angular2/core', 'angular2/http', './words.service'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, words_service_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
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
                    // This doesn't seem to work, unless we *also* call it
                    // down below on first access of the Web Speech API
                    // TODO:  find out why this isn't working!!!
                    this.initHear();
                };
                AppComponent.prototype.loadWords = function () {
                    // When getWordGroups returned a promise
                    //this._wordsService.getWordGroups().then(_ => {
                    //    this.wordGroups = _;
                    //    this.convertWordGroups(this.wordGroups);
                    //    this.wordIndex = 0;
                    //    this.refreshState();
                    //});
                    var _this = this;
                    // Now getWordGroups returns an Observable
                    this._wordsService.getWordGroups().subscribe(function (words) { return _this.loadGroupedWords(words); }, function (error) { return alert('Server error: ' + error); });
                };
                AppComponent.prototype.loadGroupedWords = function (gw) {
                    this.wordGroups = gw;
                    this.convertWordGroups(this.wordGroups);
                    this.wordIndex = 0;
                    this.refreshState();
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
                AppComponent.prototype.initHear = function () {
                    this.voices = window.speechSynthesis.getVoices();
                    this.speech = new SpeechSynthesisUtterance();
                    // Assign a US English, or at least English voice
                    this.speech.voice = this.voices.find(function (v) { return v.lang === 'en-US'; });
                    if (!this.speech.voice)
                        this.speech.voice = this.voices.find(function (v) { return v.lang.startsWith('en'); });
                    this.speech.volume = 1; // 0 to 1
                    this.speech.rate = 0.5; // 0.1 to 10
                    this.speech.pitch = 1; //0 to 2
                    this.speech.lang = 'en-US';
                };
                AppComponent.prototype.onHear = function () {
                    // var msg = new SpeechSynthesisUtterance(this.currentWord);
                    // window.speechSynthesis.speak(msg);
                    //
                    //var msg = new SpeechSynthesisUtterance();
                    //msg.voice = this.voices[2]; //voices[10]; // Note: some voices don't support altering params
                    //msg.voiceURI = 'native';
                    //msg.volume = 1; // 0 to 1
                    //msg.rate = 0.5; // 0.1 to 10
                    //msg.pitch = 1; //0 to 2
                    //msg.text = this.currentWord;
                    //msg.lang = 'en-US';
                    //
                    // msg.onend = function(e) {
                    // console.log('Finished in ' + event.elapsedTime + ' seconds.');
                    // };
                    //speechSynthesis.speak(msg);
                    this.speak(this.currentWord);
                };
                AppComponent.prototype.onTalk = function () {
                };
                AppComponent.prototype.speak = function (text) {
                    // This is weird, to make this thing work right
                    // we have to initialize on *every* call
                    // TODO: find out why!!!
                    this.initHear();
                    this.speech.text = text;
                    window.speechSynthesis.speak(this.speech);
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app',
                        templateUrl: 'app/app.component.html',
                        styleUrls: ['app/app.component.css'],
                        //directives: [HeroDetailComponent],
                        providers: [
                            http_1.HTTP_PROVIDERS,
                            words_service_1.WordsService
                        ],
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
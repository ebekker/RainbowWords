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
    var core_1, core_2, core_3, core_4, http_1, words_service_1, words_service_2;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
                core_2 = core_1_1;
                core_3 = core_1_1;
                core_4 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (words_service_1_1) {
                words_service_1 = words_service_1_1;
                words_service_2 = words_service_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_wordsService, _cdRef) {
                    this._wordsService = _wordsService;
                    this._cdRef = _cdRef;
                    this.title = 'Abby\'s';
                    this.wordIndex = -1;
                    this.hasPrev = false;
                    this.hasNext = false;
                    this.showGoodJob = false;
                    this.showSorryWrong = false;
                    this.showSorryError = false;
                    this.optionRandomize = false;
                    this.optionHideColor = false;
                    this.optionRepeat = false;
                    this.isTalking = false;
                    this.speechRecogStarted = new core_2.EventEmitter();
                    this.speechRecogEnded = new core_2.EventEmitter();
                    this._talkStart = new Audio('aud/siri2.mp3');
                    this._talkStop = new Audio('aud/siri3.mp3');
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.loadWords();
                    // This doesn't seem to work, unless we *also* call it
                    // down below on first access of the Web Speech API
                    // TODO:  find out why this isn't working!!!
                    this.initHear();
                    this.initTalk();
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
                    if (this.optionRandomize) {
                        for (var i = 0; i < this.words.length; ++i) {
                            var rnd = Math.random();
                            var swp = Math.floor(rnd * this.words.length);
                            var tmp = this.words[i];
                            this.words[i] = this.words[swp];
                            this.words[swp] = tmp;
                        }
                    }
                    this.wordIndex = 0;
                    this.refreshState();
                };
                AppComponent.prototype.reloadGroupedWords = function (random) {
                    this.optionRandomize = random;
                    this.loadGroupedWords(this.wordGroups);
                };
                AppComponent.prototype.convertWordGroups = function (groupedWords) {
                    var _this = this;
                    this.words = [];
                    groupedWords.wordGroups.forEach(function (_) {
                        if (!_.disabled) {
                            _.words.forEach(function (_2) { return _this.words = _this.words.concat({
                                word: _2,
                                color: _.color
                            }); });
                        }
                    });
                };
                AppComponent.prototype.refreshState = function () {
                    this.showGoodJob = false;
                    this.showSorryWrong = false;
                    this.showSorryError = false;
                    this.hasPrev = this.words
                        && this.wordIndex > 0;
                    this.hasNext = this.words
                        && this.wordIndex < (this.words.length - 1);
                    this.currentWord = this.words[this.wordIndex].word;
                    if (this.optionHideColor) {
                        this.currentColor = "";
                    }
                    else {
                        this.currentColor = this.words[this.wordIndex].color;
                    }
                };
                AppComponent.prototype.onColorClick = function (wgIndex) {
                    // Cycle through all of our word/color pairs and find the first
                    // one that has the same color as the indicated wordGroup color
                    for (var i = 0; i < this.words.length; ++i) {
                        if (this.words[i].color == this.wordGroups.wordGroups[wgIndex].color) {
                            this.wordIndex = i;
                            this.refreshState();
                            break;
                        }
                    }
                };
                AppComponent.prototype.onFirst = function () {
                    if (this.hasPrev) {
                        this.wordIndex = 0;
                        this.refreshState();
                    }
                };
                AppComponent.prototype.onLast = function () {
                    if (this.hasNext) {
                        this.wordIndex = this.words.length - 1;
                        this.refreshState();
                    }
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
                AppComponent.prototype.onPrevColor = function () {
                    if (this.hasPrev) {
                        var thisColor = this.currentColor;
                        while (this.wordIndex > 0 && thisColor == this.words[this.wordIndex].color) {
                            --this.wordIndex;
                        }
                        this.refreshState();
                    }
                };
                AppComponent.prototype.onNextColor = function () {
                    if (this.hasNext) {
                        var thisColor = this.currentColor;
                        var maxIndex = this.words.length - 1;
                        while (this.wordIndex < maxIndex && thisColor == this.words[this.wordIndex].color) {
                            ++this.wordIndex;
                        }
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
                AppComponent.prototype.initTalk = function () {
                    // From:
                    //    https://developers.google.com/web/updates/2013/01/Voice-Driven-Web-Apps-Introduction-to-the-Web-Speech-API
                    this.recog = new webkitSpeechRecognition();
                    this.recog.continuous = false;
                    this.recog.interimResults = false; // Set to true to get "early results" that may later change
                    this.recog.lang = "en-US";
                    this.recog.onstart = this.onSpeechRecogStart.bind(this);
                    this.recog.onresult = this.onSpeechRecogResult.bind(this);
                    this.recog.onerror = this.onSpeechRecogError.bind(this);
                    this.recog.onend = this.onSpeechRecogEnd.bind(this);
                };
                AppComponent.prototype.onSpeechRecogStart = function () {
                    console.info("This = " + this);
                    this.showGoodJob = false;
                    this.showSorryWrong = false;
                    this.showSorryError = false;
                    this.isTalking = true;
                    this.recognizedWord = "";
                    console.info("Speech Recog - starting...");
                    this._talkStart.play();
                    this.speechRecogStarted.next(null);
                };
                AppComponent.prototype.onSpeechRecogResult = function (event) {
                    for (var i = event.resultIndex; i < event.results.length; ++i) {
                        if (event.results[i].isFinal) {
                            this.recognizedWord = event.results[i][0].transcript;
                        }
                    }
                    console.info("Speech Recog - got word(s):  " + this.recognizedWord);
                };
                AppComponent.prototype.onSpeechRecogError = function (event) {
                    this.showSorryError = true;
                    console.error("Speech Recog - got error!:  " + event);
                };
                AppComponent.prototype.onSpeechRecogEnd = function () {
                    this.isTalking = false;
                    console.info("Speech Recog - got final word(s):  " + this.recognizedWord);
                    this._talkStop.play();
                    if (!this.showSorryError) {
                        if (this.recognizedWord == this.currentWord) {
                            this.showGoodJob = true;
                        }
                        else {
                            this.showSorryWrong = true;
                        }
                    }
                    this.speechRecogEnded.next(null);
                    this._cdRef.detectChanges();
                };
                AppComponent.prototype.speak = function (text) {
                    // This is weird, to make this thing work right
                    // we have to initialize on *every* call
                    // TODO: find out why!!!
                    this.initHear();
                    this.speech.text = text;
                    window.speechSynthesis.speak(this.speech);
                };
                AppComponent.prototype.onHearClick = function () {
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
                AppComponent.prototype.onTalkClick = function () {
                    if (this.isTalking) {
                        this.recog.stop();
                    }
                    else {
                        this.recog.start();
                    }
                };
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "showGoodJob", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "showSorryWrong", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', Object)
                ], AppComponent.prototype, "showSorryError", void 0);
                __decorate([
                    core_3.Input(), 
                    __metadata('design:type', String)
                ], AppComponent.prototype, "recognizedWord", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], AppComponent.prototype, "speechRecogStarted", void 0);
                __decorate([
                    core_2.Output(), 
                    __metadata('design:type', core_2.EventEmitter)
                ], AppComponent.prototype, "speechRecogEnded", void 0);
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
                        events: ['speechRecogStarted', 'speechRecogEnded'],
                        pipes: [words_service_2.ActiveWordGroupPipe]
                    }), 
                    __metadata('design:paramtypes', [words_service_1.WordsService, core_4.ChangeDetectorRef])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map
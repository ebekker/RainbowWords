import {Component}                   from 'angular2/core';
import {OnInit}                      from 'angular2/core';
import {HTTP_PROVIDERS}              from 'angular2/http';
import {GroupedWords,WordGroup,Word} from './words';
import {WordsService}                from './words.service';
import {ActiveWordGroupPipe}         from './words.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    //directives: [HeroDetailComponent],
    providers: [
        HTTP_PROVIDERS,
        WordsService
    ],
    pipes: [ActiveWordGroupPipe]
})
export class AppComponent implements OnInit {
    public title = 'Abby\'s';
    public wordGroups: GroupedWords;
    public words: Word[];
    public wordIndex = -1;
    public currentWord: string;
    public currentColor: string;
    public hasPrev = false;
    public hasNext = false;
    
    public optionRandomize = false;
    public optionHideColor = false;
    public optionRepeat = false;
    
    public voices: SpeechSynthesisVoice[];
    public speech: SpeechSynthesisUtterance;
    
    constructor(private _wordsService: WordsService) { }
    
    ngOnInit() {
        this.loadWords();
        
        // This doesn't seem to work, unless we *also* call it
        // down below on first access of the Web Speech API
        // TODO:  find out why this isn't working!!!
        this.initHear();
    }
    
    loadWords() {
        // When getWordGroups returned a promise
        //this._wordsService.getWordGroups().then(_ => {
        //    this.wordGroups = _;
        //    this.convertWordGroups(this.wordGroups);
        //    this.wordIndex = 0;
        //    this.refreshState();
        //});
        
        // Now getWordGroups returns an Observable
        this._wordsService.getWordGroups().subscribe(
            words => this.loadGroupedWords(words),
            error => alert('Server error: ' + error)
        );
    }
    
    loadGroupedWords(gw: GroupedWords) {
        this.wordGroups = gw;
        this.convertWordGroups(this.wordGroups);
        if (this.optionRandomize) {
            for (var i = 0; i < this.words.length; ++i) {
                var rnd = Math.random();
                var swp = Math.floor(rnd * this.words.length)
                var tmp = this.words[i];
                this.words[i] = this.words[swp];
                this.words[swp] = tmp;
            }
        }
        this.wordIndex = 0;
        this.refreshState();
    }
    
    reloadGroupedWords(random: boolean) {
        this.optionRandomize = random;
        this.loadGroupedWords(this.wordGroups);
    }
    
    convertWordGroups(groupedWords: GroupedWords) {
        this.words = [];
        groupedWords.wordGroups.forEach(
            _ => {
                if (!_.disabled) {
                    _.words.forEach(
                        _2 => this.words = this.words.concat({
                            word: _2,
                            color: _.color
                        })
                    )
                }
            }
        );
    }
    
    refreshState() {
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
    }
    
    onColorClick(wgIndex:number) {
        // Cycle through all of our word/color pairs and find the first
        // one that has the same color as the indicated wordGroup color
        for (var i = 0; i < this.words.length; ++i) {
            if (this.words[i].color == this.wordGroups.wordGroups[wgIndex].color) {
                this.wordIndex = i;
                this.refreshState();
                break;
            }
        }
    }
    
    onFirst() {
        if (this.hasPrev) {
            this.wordIndex = 0;
            this.refreshState();
        }
    }
    
    onLast() {
        if (this.hasNext) {
            this.wordIndex = this.words.length - 1;
            this.refreshState();
        }
    }
    
    onPrev() {
        if (this.hasPrev) {
            --this.wordIndex;
            this.refreshState();
        }
    }
    
    onNext() {
        if (this.hasNext) {
            ++this.wordIndex;
            this.refreshState();
        }
    }

    onPrevColor() {
        if (this.hasPrev) {
            var thisColor = this.currentColor;
            while (this.wordIndex > 0 && thisColor == this.words[this.wordIndex].color) {
                --this.wordIndex;
            }
            this.refreshState();
        }
    }

    onNextColor() {
        if (this.hasNext) {
            var thisColor = this.currentColor;
            var maxIndex = this.words.length - 1;
            while (this.wordIndex < maxIndex && thisColor == this.words[this.wordIndex].color) {
                ++this.wordIndex;
            }
            this.refreshState();
        }
    }

    initHear() {
        this.voices = window.speechSynthesis.getVoices();
        this.speech = new SpeechSynthesisUtterance();

        // Assign a US English, or at least English voice
        this.speech.voice = this.voices.find(function (v:any) : boolean { return v.lang === 'en-US' });
        if (!this.speech.voice)
            this.speech.voice = this.voices.find(function (v:any) : boolean { return v.lang.startsWith('en') });

        this.speech.volume = 1; // 0 to 1
        this.speech.rate = 0.5; // 0.1 to 10
        this.speech.pitch = 1; //0 to 2
        this.speech.lang = 'en-US';
    }
    
    onHear() {
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
    }
    
    onTalk() {
        
    }
    
    speak(text: string) {

        // This is weird, to make this thing work right
        // we have to initialize on *every* call
        // TODO: find out why!!!
        this.initHear();

        this.speech.text = text;
        window.speechSynthesis.speak(this.speech);
    }
}

import {Component}                   from 'angular2/core';
import {OnInit}                      from 'angular2/core';
import {HTTP_PROVIDERS}              from 'angular2/http';
import {GroupedWords,WordGroup,Word} from './words';
import {WordsService}                from './words.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    //directives: [HeroDetailComponent],
    providers: [
        HTTP_PROVIDERS,
        WordsService
    ],
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
        this.wordIndex = 0;
        this.refreshState();
    }
    
    convertWordGroups(groupedWords: GroupedWords) {
        this.words = [];
        groupedWords.wordGroups.forEach(
            _ => _.words.forEach(
                _2 => this.words = this.words.concat({
                    word: _2,
                    color: _.color
                })
            )
        );
    }
    
    refreshState() {
        this.hasPrev = this.words
                && this.wordIndex > 0; 
        this.hasNext = this.words
                && this.wordIndex < (this.words.length - 1);
        this.currentWord = this.words[this.wordIndex].word;
        this.currentColor = this.words[this.wordIndex].color;
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

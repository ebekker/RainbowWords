import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {GroupedWords,WordGroup,Word} from './words';
import {WordsService} from './words.service';

@Component({
    selector: 'my-app',
    templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
    //directives: [HeroDetailComponent],
    providers: [WordsService],
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
    
    constructor(private _wordsService: WordsService) { }
    
    ngOnInit() {
        this.loadWords();
    }
    
    loadWords() {
        this._wordsService.getWordGroups().then(_ => {
            this.wordGroups = _;
            this.convertWordGroups(this.wordGroups);
            this.wordIndex = 0;
            this.refreshState();
        });
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
    
    onHear() {
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
    }
    
    onTalk() {
        
    }
}

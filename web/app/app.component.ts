import {Component} from 'angular2/core';
import {OnInit} from 'angular2/core';
import {GroupedWords,WordGroup,Word} from './words';
import {WordsService} from './words.service';

@Component({
    selector: 'my-app',
    template: `
        <h1>{{title}}</h1>
        <ul>
            <li>Randomize</li>
            <li>Hide Color</li>
            <li>Repeat</li>
        </ul>
        
        <ul>
            <li>{{hasPrev}}</li>
            <li>{{hasNext}}</li>
            <li>{{words}}</li>
        </ul>
        
        <ul>
            <li class="currentWord">Word = {{currentWord}}</li>
            <li class="prev" *ngIf="hasPrev" (click)="onPrev()">Prev</li>
            <li class="next" *ngIf="hasNext" (click)="onNext()">Next</li>
        </ul>
        `,
    styles: [`
        .selected {
            background-color:  #CFD8DC !important;
            color: white;
        }
        .heroes {
            margin: 0 0 2em 0;
            list-style-type: none;
            padding: 0;
            width: 10em;
        }
        .heroes li {
            cursor: pointer;
            position: relative;
            left: 0;
            background-color: #EEE;
            margin: .5em;
            padding: .3em 0em;
            height: 1.6em;
            border-radius: 4px;
        }
        .heroes li.selected:hover {
            color: white;
        }
        .heroes li:hover {
            color: #607D8B;
            background-color: #EEE;
            left: .1em;
        }
        .heroes .text {
            position: relative;
            top: -3px;
        }
        .heroes .badge {
            display: inline-block;
            font-size: small;
            color: white;
            padding: 0.8em 0.7em 0em 0.7em;
            background-color: #607D8B;
            line-height: 1em;
            position: relative;
            left: -1px;
            top: -4px;
            height: 1.8em;
            margin-right: .8em;
            border-radius: 4px 0px 0px 4px;
        }
    `],
    //directives: [HeroDetailComponent],
    providers: [WordsService],
})
export class AppComponent implements OnInit {
    public title = 'Abby\'s Rainbow Words';
    public wordGroups: GroupedWords;
    public words: Word[];
    public wordIndex = -1;
    public currentWord: string;
    public hasPrev = false;
    public hasNext = false;
    
    constructor(private _wordsService: WordsService) { }
    
    ngOnInit() {
        this.loadWords();
    }
    
    loadWords() {
        this._wordsService.getWordGroups().then(_ => {
            this.wordGroups = _;
            this.convertWordGroups(this.wordGroups);
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
}

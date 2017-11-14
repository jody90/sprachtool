import { Subscription } from 'rxjs/Rx';
import { TranslateLanguageService } from './../../services/translate-language.service';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';

@Component({
    selector: 'app-languages',
    templateUrl: './languages.component.html',
    styleUrls: ['./languages.component.scss']
})
export class LanguagesComponent implements OnInit, OnDestroy {

    constructor(private translateLanguageService: TranslateLanguageService) { }

    languages: string [];

    @ViewChild("lang") lang: ElementRef;

    allLanguagesSubscription: Subscription;

    ngOnInit() {

        this.allLanguagesSubscription = this.translateLanguageService.allLanguagesEmitter.subscribe(
            data => {
                this.languages = data;
            },
            error => console.log(error)
        )

        this.translateLanguageService.getAllLanguages();
    }

    addLanguage(language: string) {
        this.lang.nativeElement.value = "";
        this.translateLanguageService.addLanguage(language);
    }

    deleteLanguage(language: string) {
        this.translateLanguageService.deleteLanguage(language);
    }

    ngOnDestroy() {
        this.allLanguagesSubscription.unsubscribe();
    }

}

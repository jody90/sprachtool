import { Translation } from './../key/translation.model';
import { HttpService } from './http.service';
import { EventEmitter, Injectable } from '@angular/core';
import { KeyModel } from './../key/key.model';

@Injectable()
export class TranslateLanguageService {

    constructor(private httpService: HttpService) {}

    allLanguagesEmitter = new EventEmitter(); 

    // TODO Cache in local Storage for a defined time
    getAllLanguages() {
        this.httpService.getData("/v1/languages").subscribe(
            data => {
                this.allLanguagesEmitter.emit(data);
            },
            error => console.log(error)
        ) 
    }

    // TODO Clear Cache
    addLanguage(lang: string) {
        this.httpService.postData("/v1/language/" + lang, {language: lang}).subscribe(
            data => {
                this.getAllLanguages();
            },
            error => console.log(error)
        ) 
    }
    
    // TODO Clear Cache
    deleteLanguage(lang: string) {
        this.httpService.deleteData("/v1/language/" + lang).subscribe(
            data => {
                // this.allLanguagesEmitter.emit(data);
            },
            error => console.log(error)
        ) 
    }

    getLanguagesForKey(key: KeyModel, languages: string[]): string [] {

        var languagesCopy = languages.slice(0);

        for (let i = 0; i < key.translations.length; i++) {
            let index: number = languagesCopy.indexOf(key.translations[i].language);
            if (index != -1) {
                languagesCopy.splice(index, 1);
            } 
        }

        return languagesCopy;
    }

}
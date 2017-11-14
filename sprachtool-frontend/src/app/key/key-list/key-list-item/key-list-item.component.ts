import { KeyModel } from './../../key.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { Translation } from './../../translation.model'

@Component({
    selector: 'app-key-list-item',
    templateUrl: './key-list-item.component.html',
    styleUrls: ['./key-list-item.component.scss']
})
export class KeyListItemComponent implements OnInit {

    @Input() key: KeyModel;

    constructor() { }

    ngOnInit() {
    }

    needTranslationUpdate(translations: Translation []) {
        
        var tempLanguages = {}
        for (let i in translations) {
            tempLanguages[translations[i].language] = translations[i].modifiedAt;
        }

        if (tempLanguages["de"] !== undefined) {
            for (let lang in tempLanguages) {
                if (tempLanguages["de"] > tempLanguages[lang]) {
                    return true
                }
            }
        }

        return false;
    }
}

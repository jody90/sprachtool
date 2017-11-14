import { NgxPaginationModule } from 'ngx-pagination';
import { EnvironmentsPipe } from './environments.pipe';
import { HttpService } from './services/http.service';
import { HttpModule } from '@angular/http';
import { KeyEditGuard } from './key/key-edit.guard';
import { KeyDeleteGuard } from './key/key-delete.guard';
import { KeyFilterPipe } from './key-filter.pipe';
import { routing } from './app.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateLanguageService } from './services/translate-language.service';
import { KeyService } from './key/key.service';
import { LogSerivce } from './services/log.serivce';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { KeyComponent } from './key/key.component';
import { KeyListComponent } from './key/key-list/key-list.component';
import { KeyListItemComponent } from './key/key-list/key-list-item/key-list-item.component';
import { KeyEditComponent } from './key/key-edit/key-edit.component';
import { VersionsComponent } from './versions/versions.component';
import { KeyDeleteComponent } from './key/key-delete.component';
import { VersionService } from './versions/version.service';
import { VersionNewComponent } from './versions/version-new/version-new.component';
import { LanguageSelectComponent } from './versions/language-select/language-select.component';
import { DateFormatComponent } from './versions/date-format.component';
import { AdminComponent } from './admin/admin.component';
import { LanguagesComponent } from './admin/languages/languages.component';
import { VersionCompareComponent } from './versions/version-compare/version-compare.component';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        KeyListComponent,
        KeyListItemComponent,
        KeyEditComponent,
        KeyComponent,
        VersionsComponent,
        KeyDeleteComponent,
        KeyFilterPipe,
        VersionNewComponent,
        LanguageSelectComponent,
        DateFormatComponent,
        EnvironmentsPipe,
        AdminComponent,
        LanguagesComponent,
        VersionCompareComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        HttpModule,
        NgxPaginationModule
        // ReactiveFormsModule
    ],
    providers: [
        LogSerivce,
        KeyService,
        TranslateLanguageService,
        KeyDeleteGuard,
        KeyEditGuard,
        HttpService,
        VersionService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }

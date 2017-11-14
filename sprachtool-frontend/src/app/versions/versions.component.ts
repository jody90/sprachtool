import { Subscription } from 'rxjs/Rx';
import { VersionModel } from './version.model';
import { VersionService } from './version.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-versions',
    templateUrl: './versions.component.html',
    styleUrls: ['./versions.component.scss']
})
export class VersionsComponent implements OnInit, OnDestroy {

    constructor(private versionService: VersionService) { }

    allVersionsSubscription: Subscription;
    versions: VersionModel[];
    p: number = 1;

    ngOnInit() {
        
        this.allVersionsSubscription = this.versionService.allVersionsEmitter.subscribe(
            data => {
                this.versions = data;
                // console.log(data)
            },
            error => console.log(error)
        )

        this.versionService.getAllVersions();
    }

    publishVersion(versionId: string, target: string, language: string) {
        this.versionService.publishVersion(versionId, target, language);
        // console.log(target);
        // console.log(language);
    }

    ngOnDestroy() {
        this.allVersionsSubscription.unsubscribe();
    }

}

import { VersionModel } from '../version.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-version-compare',
    templateUrl: './version-compare.component.html',
    styleUrls: ['./version-compare.component.scss']
})
export class VersionCompareComponent implements OnInit {

    constructor() { }

    @Input() versions: VersionModel[];
    @Input() ownVersion: VersionModel;

    ngOnInit() {
        // console.log("Versions: ", this.versions);
    }

    compareVersions(currentVersion, compareToVersion) {
        console.log("currentVersion: ", currentVersion);
        console.log("compareToVersion: ", compareToVersion);
    }

}

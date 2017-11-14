import { HttpService } from '../services/http.service';
import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class VersionService {
    constructor(private httpService: HttpService) {}

    allVersionsEmitter = new EventEmitter();

    getAllVersions = function() {
        this.httpService.getData("/v1/versions").subscribe(
            data => {
                this.allVersionsEmitter.emit(data);
            },
            error => console.log(error)
        )
    }

    newVersion = function(data) {
        this.httpService.postData("/v1/version", data).subscribe(
            data => {
                this.getAllVersions();
            },
            error => console.log(error)
        )
    }

    publishVersion = function(versionId: string, destination: string, language: string) {
        
        let data = {
            versionId: versionId,
            destination: destination,
            language: language
        };

        this.httpService.postData("/v1/version/publish/", data).subscribe(
            data => {
                this.getAllVersions();
            },
            error => console.log(error)
        )
    }
}
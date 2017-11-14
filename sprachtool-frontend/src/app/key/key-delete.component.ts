import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { KeyService } from './key.service';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-key-delete',
    template: '<h1>Delete</h1>'
})
export class KeyDeleteComponent implements OnInit, OnDestroy {

    constructor(private keyService: KeyService, private activatedRoute: ActivatedRoute, private router: Router) { }

    subscription: Subscription;
    keyId: string;

    ngOnInit() {

        this.subscription = this.activatedRoute.params.subscribe(
            params => {
                this.keyId = params["id"];
            }
        );

        this.keyService.deleteKey(this.keyId);
        this.router.navigate(['translations']);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

}

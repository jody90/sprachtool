import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-date-format',
    template: `
    <p>
      {{date}}
    </p>
  `,
    styles: []
})
export class DateFormatComponent implements OnInit {

    constructor() { }

    @Input() timestamp: number;
    date: string;

    ngOnInit() {
        this.date = new Date(this.timestamp).toLocaleDateString() + " " + new Date(this.timestamp).toLocaleTimeString();
    }

}

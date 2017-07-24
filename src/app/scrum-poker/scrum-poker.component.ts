import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-scrum-poker',
    templateUrl: './scrum-poker.component.html'
})

export class ScrumPokerComponent implements OnDestroy, OnInit {
    constructor() {}

    public ngOnInit(): void {
        console.log('scrum init');
    }

    public ngOnDestroy(): void {
        console.log('scrum destroy');
    }
}

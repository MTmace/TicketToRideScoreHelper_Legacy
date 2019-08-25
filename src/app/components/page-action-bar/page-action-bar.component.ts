import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
    selector: "mt-page-action-bar",
    moduleId: module.id,
    templateUrl: "./page-action-bar.component.html",
    styleUrls: ["./page-action-bar.component.css"]
})

export class PageActionBarComponent implements OnInit {
    @Input() title: string = 'Ticket to Ride Scorekeeper';
    @Input() buttonText: string = 'Continue';
    @Input() route: string = '';
    @Input() isEnabled = true;

    @Output() onTapEmitter = new EventEmitter();
    
    constructor() {
    }

    ngOnInit(): void {

    }

    onTap() {
        this.onTapEmitter.emit();
    }
}
import { Component, Input, Output, EventEmitter, OnInit } from "@angular/core";
import * as application from "tns-core-modules/application";

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
    @Output() onNavTapEmitter = new EventEmitter();
    
    isNavVisible = false;
    isItemVisible = false;

    constructor() {
    }

    ngOnInit(): void {
        if (application.ios) {
            this.isNavVisible = false;
            this.isItemVisible = true;
        } else if (application.android) {
            this.isNavVisible = true;
            this.isItemVisible = false;
        }
    }

    onTap() {
        this.onTapEmitter.emit();
    }

    onNavTap() {
        this.onNavTapEmitter.emit();
    }

}
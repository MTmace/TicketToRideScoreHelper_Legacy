import { Component, ViewChild, OnInit, AfterViewInit, ChangeDetectorRef } from "@angular/core";
import { RadSideDrawerComponent } from "nativescript-ui-sidedrawer/angular";
import { RadSideDrawer } from 'nativescript-ui-sidedrawer';
import * as application from "tns-core-modules/application";

@Component({
    moduleId: module.id,
    selector: "mt-test",
    templateUrl: 'test.page.html',
    styleUrls: ['test.page.css']
})

export class TestPage implements AfterViewInit, OnInit {

    isDrawerOpen = false;
    isNavVisible = false;
    isItemVisible = false;

    constructor(private _changeDetectionRef: ChangeDetectorRef) {
    }

    @ViewChild(RadSideDrawerComponent, { static: false }) public drawerComponent: RadSideDrawerComponent;
    private drawer: RadSideDrawer;

    ngAfterViewInit() {
        this.drawer = this.drawerComponent.sideDrawer;
        this._changeDetectionRef.detectChanges();
    }

    ngOnInit() {
        if (application.ios) {
            this.isNavVisible = false;
            this.isItemVisible = true;
        } else if (application.android) {
            this.isNavVisible = true;
            this.isItemVisible = false;
        }
    }

    public toggleDrawer() {
        this.isDrawerOpen ? this.drawer.closeDrawer() : this.drawer.showDrawer();
        this.isDrawerOpen = !this.isDrawerOpen;
    }

    public closeDrawer() {
        this.drawer.closeDrawer();
        this.isDrawerOpen = false;
    }
}
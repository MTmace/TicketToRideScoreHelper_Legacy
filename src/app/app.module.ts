import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BonusPointsPage } from "./pages/bonus-points/bonus-points.page";
import { ScoringRoutesPage } from "./pages/scoring-routes/scoring-routes.page";
import { SelectPlayersPage } from "./pages/select-players/select-players.page";
import { InputBonusPointsComponent } from "./components/input-bonus/input-bonus-points.component";

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports if you need to use the HttpClient wrapper
// import { NativeScriptHttpClientModule } from "nativescript-angular/http-client";

@NgModule({
    bootstrap: [
        AppComponent
    ],
    imports: [
        NativeScriptModule,
        AppRoutingModule,
        ReactiveFormsModule
    ],
    declarations: [
        AppComponent,
// PAGE
        BonusPointsPage,
        ScoringRoutesPage,
        SelectPlayersPage,

// COMPONENTS
        InputBonusPointsComponent
    ],
    providers: [],
    schemas: [
        NO_ERRORS_SCHEMA
    ]
})
/*
Pass your application module to the bootstrapModule function located in main.ts to start your app
*/
export class AppModule { }

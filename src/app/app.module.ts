// nativescript
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

// angular
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";

// libs

// app
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { OutcomePage } from "./pages/outcome/outcome.page";
import { ScoringRoutesPage } from "./pages/scoring-routes/scoring-routes.page";
import { ScoringBonusPointsPage } from "./pages/scoring-bonus-points/scoring-bonus-points.page";
import { SelectPlayersPage } from "./pages/select-players/select-players.page";
import { InputBonusPointsComponent } from "./components/input-bonus/input-bonus-points.component";
import { PageActionBarComponent } from "./components/page-action-bar/page-action-bar.component";

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
        OutcomePage,
        ScoringBonusPointsPage,
        ScoringRoutesPage,
        SelectPlayersPage,

// COMPONENTS
        InputBonusPointsComponent,
        PageActionBarComponent
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

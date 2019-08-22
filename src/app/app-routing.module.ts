import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { BonusPointsComponent } from "./bonus-points/bonus-points.component";
import { ScoringRoutesComponent } from "./scoring-routes/scoring-routes.component";
import { SelectPlayersComponent } from "./select-players/select-players.component";

const routes: Routes = [
    { path: "", redirectTo: "/select-players", pathMatch: "full" },
    { path: "bonus-points", component: BonusPointsComponent },
    { path: "scoring-routes", component: ScoringRoutesComponent },
    { path: "select-players", component: SelectPlayersComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

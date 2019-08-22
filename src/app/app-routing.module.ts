import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { BonusPointsPage } from "./pages/bonus-points/bonus-points.page";
import { ScoringRoutesPage } from "./pages/scoring-routes/scoring-routes.page";
import { SelectPlayersPage } from "./pages/select-players/select-players.page";

const routes: Routes = [
    { path: "", redirectTo: "/select-players", pathMatch: "full" },
    { path: "bonus-points", component: BonusPointsPage },
    { path: "scoring-routes", component: ScoringRoutesPage },
    { path: "select-players", component: SelectPlayersPage }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

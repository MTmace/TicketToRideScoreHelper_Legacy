import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";

import { SelectPlayersComponent } from "./select-players/select-players.component";
import { ScoringRoutesComponent } from "./scoring-routes/scoring-routes.component";

const routes: Routes = [
    { path: "", redirectTo: "/select-players", pathMatch: "full" },
    { path: "select-players", component: SelectPlayersComponent },
    { path: "scoring-routes", component: ScoringRoutesComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./auth/login/login.component";
import {NotfoundComponent} from "./shared/notfound/notfound.component";

const routes: Routes = [
  {path: "login", component: LoginComponent},
  {path: "employee", loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule)},
  {path: "", redirectTo: "login", pathMatch: "full"},
  {path: "**", component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

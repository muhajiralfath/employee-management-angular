import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {ListComponent} from "./list/list.component";
import {FormComponent} from "./form/form.component";
import {DetailComponent} from "./detail/detail.component";

const routes: Routes = [
  {
    path: "", component: HomeComponent, children: [
      {path: "list", component: ListComponent},
      {path: "add-form", component: FormComponent},
      {path: "detail", component: DetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  constructor(private _dialog: MatDialog) {
  }

  openEditForm(): void{
    this._dialog.open(EditComponent)
  }
}

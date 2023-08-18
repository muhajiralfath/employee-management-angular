import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  displayedColumns: string[] = [
    'id',
    'username',
    'firstName',
    'lastName',
    'email',
    'birthDate',
    'basicSalary',
    'status',
    'group',
    'description',
    'action'
  ];

  dataSource!: MatTableDataSource<any>

  constructor(private _dialog: MatDialog) {
  }

  openEditForm(): void{
    this._dialog.open(EditComponent)
  }
}

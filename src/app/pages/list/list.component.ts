import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {EditComponent} from "../edit/edit.component";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {EmployeeService} from "../../service/employee.service";
import {CoreService} from "../../core/core.service";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{

  displayedColumns: string[] = [
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

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort



  constructor(
    private dialog: MatDialog,
    private empService: EmployeeService,
    private coreService: CoreService
  ) {
  }

  ngOnInit():void {
    this.getAllEmployee()
  }

  openEditForm(data: any) {
    const dialogRef = this.dialog.open(EditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllEmployee();
        }
      },
    });
  }

  getAllEmployee():void {
    this.empService.getEmployeeList().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res)
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
      },
      error: console.log
    })
  }

  applyFilter(event : Event): void  {
    const filterValue : string = (event.target as HTMLInputElement).value
    this.dataSource.filter = filterValue.trim().toLowerCase()
    if (this.dataSource.paginator){
      this.dataSource.paginator.firstPage()
    }
  }

  deleteEmployee(id: number): void  {
    this.empService.deleteEmployee(id).subscribe({
      next: (res) => {
        this.coreService.openSnackBar("Success Delete Employee", "Done")
        this.getAllEmployee()
      },
      error: console.log
    })
  }

}

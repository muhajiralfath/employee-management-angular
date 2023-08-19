import {Component} from '@angular/core';
import {EmployeeService} from "../../service/employee.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
    employee = {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      basicSalary: "",
      status: "",
      group: "",
      description: "",
      id: ""
    }

    ngOnInit():void {
      // this.getById()
      this.getEmployee()
    }


    constructor(private service: EmployeeService, private route: ActivatedRoute) {
    }


    // getById(id: number): void{
    //   this.service.getEmpById(id).subscribe({
    //     next: (val: any): void => {
    //       console.log(val)
    //       // this.emp.id = val.id
    //       // this.emp.username = val.username
    //       this.employee = val
    //       console.log(this.employee)
    //
    //   },
    //     error: console.log
    //   })
    //   console.log(this.employee)
    // }

    getEmployee():void {
      this.route.params.subscribe((params) => {
        if (params['id']){
          this.service.getEmpById(params['id']).subscribe(res => {
            this.employee = res
          })
        } else {
          console.log("Data Not Found")
        }
      })
    }
}

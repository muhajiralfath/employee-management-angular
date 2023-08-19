import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {EmployeeService} from "../../service/employee.service";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  // groups: string[] = ["IT", "HRD", "Management", "Operator", "Manager", "BOD", "Comisioner", "Admin", "CS", "Secretary"]
  myControl = new FormControl('');
  options: string[] = ["IT", "HRD", "Management", "Operator", "Manager", "BOD", "Comisioner", "Admin", "CS", "Secretary"];
  filteredOptions: Observable<string[]> | undefined;
  status: string[] = ["Male", "Female"]
  empForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private empService: EmployeeService,
              private coreService: CoreService) {
    this.empForm = this.formBuilder.group({
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      birthDate: "",
      basicSalary: "",
      status: "",
      group: "",
      description: ""
    })
  }



  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFormSubmit(): void  {
    this.empService.addEmployee(this.empForm.value).subscribe({
      next: (val: any): void => {
        this.coreService.openSnackBar("Employee added successfully")
      },
      error: (err: any): void => {
        console.log(err)
      }
    })
  }

}

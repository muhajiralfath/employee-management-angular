import {Component, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {EmployeeService} from "../../service/employee.service";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ["IT", "HRD", "Management", "Operator", "Manager", "BOD", "Comisioner", "Admin", "CS", "Secretary"];
  filteredOptions: Observable<string[]> | undefined;
  status: string[] = ["Single", "Married"]
  empForm: FormGroup

  constructor(private formBuilder: FormBuilder,
              private empService: EmployeeService,
              private coreService: CoreService) {
    this.empForm = this.formBuilder.group({
      username: ["", Validators.required],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.pattern(/^.+@.+\..+$/)],
      birthDate: ["",this.birthDateValidator()],
      basicSalary: ['', [Validators.required, Validators.pattern(/^\d+(\.\d{1,2})?$/)]],
      status: ["", Validators.required],
      group: ["", Validators.required],
      description: ["", Validators.required]
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

  onFormSubmit(): void {
    console.log(this.empForm.value)
    if (this.empForm.valid) {
      this.empService.addEmployee(this.empForm.value).subscribe({
        next: (val: any): void => {
          this.coreService.openSnackBar("Employee added successfully")
        },
        error: (err: any): void => {
          console.log(err)
        }
      })
    } else {
      console.log()
      this.coreService.openSnackBar("Please Input Valid Data")
    }
  }

  birthDateValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const selectedDate = new Date(control.value);
      const currentDate = new Date();

      if (selectedDate > currentDate) {
        return {futureDate: true};
      }
      return null;
    }
  }


}

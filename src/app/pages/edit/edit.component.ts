import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";
import {EmployeeService} from "../../service/employee.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoreService} from "../../core/core.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent {
  myControl = new FormControl('');
  options: string[] = ["IT", "HRD", "Management", "Operator", "Manager", "BOD", "Comisioner", "Admin", "CS", "Secretary"];
  filteredOptions: Observable<string[]> | undefined;
  status: string[] = ["Single", "Married"]
  empForm: FormGroup
  constructor(
    private formBuilder: FormBuilder,
    private empService: EmployeeService,
    private dialogRef: MatDialogRef<EditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private coreService: CoreService
  ) {
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
    this.empForm.patchValue(this.data)
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  onFormSubmit() {
    console.log(this.empForm.value)
    if (this.empForm.valid) {
      if (this.data) {
        this.empService
          .updateEmployee(this.data.id, this.empForm.value)
          .subscribe({
            next: (val: any) => {
              this.coreService.openSnackBar('Employee detail updated!');
              this.dialogRef.close(true);
            },
            error: (err: any) => {
              console.error(err);
            },
          });
      } else {
        this.coreService.openSnackBar("Please Input Valid Data")
      }
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

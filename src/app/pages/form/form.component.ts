import { Component } from '@angular/core';
import {FormControl} from "@angular/forms";
import {map, Observable, startWith} from "rxjs";

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
  gender: string[] = ["Male", "Female"]

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

}

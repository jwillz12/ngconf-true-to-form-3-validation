import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { map, startWith } from 'rxjs';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //Default stronly types, adding ": FormGroup" next to form will make it an any
  public form = this._fb.group({
    //first item of array is value, second sync validator, third async validators
    //Just pass an array for validators everytime for simplicity
    firstName: ['', [Validators.required], []],
    lastName: ['', [Validators.required, this.validLastName]],
    email: ['', [Validators.required, Validators.email]],
    //subscribe: true,
  });

  get firstNameErrors() {
    return (
      this.form.controls.firstName.touched, this.form.controls.firstName.errors
    );
  }

  validLastName(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return { validLastName: true };
    }

    return control.value == 'Johnson' ? null : { validLastName: true };
  }

  //give validator error
  //public firstNameErrors = this.form.get('firstName').errors;

  public formUpdate$ = this.form.valueChanges.pipe(
    startWith(this.form.value), // this allows it to immediatly have a value if needed
    map((formValues) => {
      return {
        ...formValues,
        valid: this.form.valid,
      };
    })
  );

  constructor(private _fb: FormBuilder) {}

  ngOnInit() {
    console.log(this.form.value);
    //this.form.get('firstName').markAsTouched;
  }

  submit() {
    if (this.form.valid) {
      console.log('saved');
    }
  }
}

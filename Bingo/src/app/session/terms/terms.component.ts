import { Component, OnInit, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, NgForm } from '@angular/forms';

@Component({
  selector: 'b-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TermsComponent),
      multi: true
    }
  ]
})
export class TermsComponent implements ControlValueAccessor {

  constructor() { }
  public onChange: any = () => {};
  public onTouch: any = () => {};
  private _value = [];
  set value(val) {
    if(Array.isArray(val)) {
      this._value = val;
      this.onChange(val);
      this.onTouch(val);
    } 
  }
  get value() {
    return this._value;
  }
  ngOnInit(): void {
  }
  submitTerm(form: NgForm) {
    if(form.valid) {
      this.value = [...this.value , form.value.term];
    }
  }

  //#region ngModel
    public writeValue(value: any) {
      this.value = value;
    }
    public registerOnChange(fn: any) {
      this.onChange = fn;
    }
    public registerOnTouched(fn: any) {
      this.onTouch = fn;
    }
  //#endregion ngModel
}

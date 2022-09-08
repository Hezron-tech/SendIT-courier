import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  // @Input() ctrl:FormControl;
  // @Output() 

  // private ERROR_MESSAGES ={
  //   required: () => 'This field is required ',
  //   minLenght:(par) => `Min ${par.requiredLength} chars is required`
  // }

  constructor() { }

  ngOnInit(): void {
  }

  // showErrors(): boolean{
  //   return this.ctrl && this.ctrl.errors && this.ctrl.touched;
  // }

  // listOfErrors():string[]{
  //   return Object.keys(this.ctrl.errors).map(
  //     (key)=> this.ERROR_MESSAGES[key](this.ctrl.getError(key))
  //   );
  // }

}

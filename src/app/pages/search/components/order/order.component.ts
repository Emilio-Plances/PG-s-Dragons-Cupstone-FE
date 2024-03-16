import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent {
  @Output() orderNameDescEvent=new EventEmitter<boolean>()
  @Output() orderNameAscEvent=new EventEmitter<boolean>()

  boolNameDesc:boolean=true
  boolNameAsc:boolean=false

  orderNameDesc(){
    this.boolNameDesc=!this.boolNameDesc;
    this.boolNameAsc=!this.boolNameAsc;
    if(!this.boolNameDesc) return;
    this.orderNameDescEvent.emit(this.boolNameDesc);
  }
  orderNameAsc(){
    this.boolNameDesc=!this.boolNameDesc;
    this.boolNameAsc=!this.boolNameAsc;
    if(!this.boolNameAsc) return;
    this.orderNameAscEvent.emit(this.boolNameAsc);
  }
}

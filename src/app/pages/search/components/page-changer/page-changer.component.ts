import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-changer',
  templateUrl: './page-changer.component.html',
  styleUrl: './page-changer.component.scss'
})
export class PageChangerComponent {
  @Input() currentPage!:number;
  @Input() maxPages!:number;
  @Output() changePage:EventEmitter<number>=new EventEmitter<number>();

  previous(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.emitPageChange();
    }
  }
  next(): void {
    this.currentPage++;
    this.emitPageChange();
  }

  emitPageChange(): void {
    this.changePage.emit(this.currentPage);
  }
}

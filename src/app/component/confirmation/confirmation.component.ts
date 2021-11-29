import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  providers: [DatePipe]
})
export class ConfirmationComponent implements OnInit {

  // Print confirmation button
  printPage() {
    window.print();
  }

  // Date Placed
  today: number = Date.now();


  constructor() { }

  ngOnInit(): void {
  }

}

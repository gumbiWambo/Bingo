import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'b-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }
  isOpen: boolean = false;
  ngOnInit(): void {
  }
  public toggleOpen() {
    this.isOpen = !this.isOpen;
  }

}

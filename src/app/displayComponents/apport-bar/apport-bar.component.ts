import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-apport-bar',
  templateUrl: './apport-bar.component.html',
  styleUrls: ['./apport-bar.component.scss']
})
export class ApportBarComponent implements OnInit {
  @Input() percentage: number = 0;
  placement: number =0;

  constructor() { }

  ngOnInit(): void {
    if (this.percentage >=100){this.placement =100;}
    else{this.placement = this.percentage}
  }

}

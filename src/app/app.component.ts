import { Component, OnInit } from '@angular/core';
import { Chart} from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  xValues:any = ["Italy", "France", "Spain", "USA", "Argentina"];
  yValues:any = [55, 49, 44, 24, 15];
  barColors:any = ["red", "green","blue","orange","brown"];
  options: any = {
    legend: {display: false},
    title: {
      display: true,
      text: "World Wine Production 2018"
    }
  }
  constructor() {}

  ngOnInit(): void {
   let a:any = new Chart("myChart", {
      type: "bar",
      data: {
        labels: this.xValues,
        datasets: [{
          backgroundColor: this.barColors,
          data: this.yValues
        }]
      },
      ...this.options
    });
  }

}

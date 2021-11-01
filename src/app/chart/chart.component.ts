import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ChartType} from "chart.js";
import {Color} from "ng2-charts";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {

  @Input() inputLabels: string[] = [];
  @Input() inputData: any[] = [];
  @Input() sensorName: string | undefined = '';

  public chartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public chartLabels = this.inputLabels;
  public chartType: ChartType = "line";
  public chartLegend = true;
  public chartData = [
    {data: this.inputData, label: this.sensorName}
  ];
  public chartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }];

  constructor() {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.chartData = [
      {data: this.inputData, label: this.sensorName}
    ];
    this.chartLabels = this.inputLabels;
  }
}

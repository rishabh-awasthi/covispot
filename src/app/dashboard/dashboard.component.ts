import { Component, Inject, NgZone, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
// @ts-ignore
import * as am4core from '@amcharts/amcharts4/core';
// @ts-ignore
import * as am4charts from '@amcharts/amcharts4/charts';
// @ts-ignore
import * as am4plugins from "@amcharts/amcharts4/plugins/sunburst"; 
import { ApiService } from '../api.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent  {

  private chart: am4charts.XYChart;
 
  list : any[];
  query="India,Nepal,Bangladesh,Pakistan,Bhutan,Sri Lanka,Maldives";
  singleRecord:boolean;
  constructor(@Inject(PLATFORM_ID) private platformId:any, private zone: NgZone,private apiService: ApiService) {
    this.list = 
    [
      {name :'Bangladesh',checked : false},
      {name :'Bhutan',checked : false},
      {name :'India',checked : false},
       {name :'Maldives',checked : false},  
       {name :'Nepal',checked : false},
       {name :'Pakistan',checked : false},
      {name :'Sri Lanka',checked : false}
    ]
  }

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  ngAfterViewInit() {
 // this.loadData();  
  }

  ngOnDestroy() {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
  loadData(){
// Chart code goes in here
this.browserOnly(() => {
  // Create the chart
  let chart = am4core.create("chartdiv", am4plugins.Sunburst);
let data:any = [];     
this.apiService.getData(this.query).subscribe((res)=>{
  console.log(res);
  let dt:any = {};
  console.log(this.singleRecord);
if(this.singleRecord){
  dt = {
    name: res.country,
    children: [
      { name: "cases", value: res.cases },
      { name: "recovered", value: res.recovered },
      { name: "death", value: res.death },
      { name: "active", value: res.active }
    ]
    }
    data.push(dt);
}else{
res.forEach(element => {
dt = {
name: element.country,
children: [
  { name: "cases", value: element.cases },
  { name: "recovered", value: element.recovered },
  { name: "death", value: element.death },
  { name: "active", value: element.active }
]
}
data.push(dt);
});}

setTimeout(()=>{
chart.data =data;
// Define data fields
chart.dataFields.value = "value";
chart.dataFields.name = "name";
chart.dataFields.children = "children";

},500);
}); 
});

  }
  shareCheckedList(items:any[]){
    console.log(items);
this.query = items.join(',');
if(items.length==1){
  this.singleRecord = true;
}else {
  this.singleRecord = false;
}
if(this.query.length>3){
this.loadData();
  }}
  shareIndividualCheckedList(item:{}){
    console.log(item);
    this.query = "";
  }

}
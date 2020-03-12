import { Component, OnInit ,ChangeDetectionStrategy} from '@angular/core';
import { CalendarModule } from "ion2-calendar";
import { CalendarModal, CalendarModalOptions, DayConfig, CalendarResult } from "ion2-calendar";
import { ModalController } from '@ionic/angular';
import {CalendarController} from "ion2-calendar";
import {
  CalendarComponentOptions
} from 'ion2-calendar';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {ChangeDetectorRef} from '@angular/core';
import { map, filter, catchError, mergeMap } from 'rxjs/operators';

/*
export interface data {
 id: string;
  date: number;
  status:string;
  studentid:string;
  
};*/

@Component({
  selector: 'app-cal',
  templateUrl: './cal.page.html',
  styleUrls: ['./cal.page.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class CalPage implements OnInit {

  data:any;
 //_daysConfig: DayConfig[] = [];
 date: string[] = []; //['2018-01-01', '2018-01-02', '2018-01-05'];

 daysConfig: any[] = [];
 date_absent: string[] = [];
 date_present: string[] = [];

 options: CalendarComponentOptions = {
  from: new Date(),
  pickMode: 'multi',

  daysConfig: this.daysConfig,

 };



 constructor(private http: HttpClient,public modalCtrl: ModalController, public calendarcontroller: CalendarController, private cd: ChangeDetectorRef) {
  
  
  let dateObj = new Date();
  let monthobj = dateObj.getUTCMonth(); //months from 1-12

  let yearobj = dateObj.getUTCFullYear();
  console.log(monthobj + "........date..........." + yearobj);

 
}

 onChange($event) {
  console.log($event)
 }
 ngOnInit() {
/**Pass from current month onwards...*/
  let dateObj = new Date();
  let monthobj = dateObj.getUTCMonth(); //months from 1-12

  let yearobj = dateObj.getUTCFullYear();
 
  this.printsundaymonday(monthobj, yearobj);
  
  console.log(+(monthobj +1) + "........date..........." + yearobj);
  this.displayAbsentandPresent(monthobj+1 ,yearobj);


 }
 postData:any=[];

 private sat: any[] = [];
 private sun: any[] = [];
 displayAbsentandPresent(month,year) {
console.log(month+ "=================" +year);
  this.postData={
    "year" :year+"",
    "month":month+"",
    "studentid":3+""
    };
    console.log(this.postData);
  
       var options = { headers: new HttpHeaders({ 'Content-Type': 'text/plain' }) };
      
  this.http.post("http://localhost/android/getattendance.php", JSON.stringify(this.postData),options)
 
     
       .subscribe( (data) => { 
         console.log("Getting Post value;Checking inside post .."+JSON.stringify(data));
         this.setUsersArray(data); 
        }
         );


 
  this.cd.markForCheck();


            

 }


 /**Function to print sunday and monday...*/
 printsundaymonday(month, year) {

  this.sun.length = 0;
  this.sat.length = 0;
  

  let getTot = this.daysInMonth(month, year);
 // console.log("Total month" + getTot);
  for (var i = 1; i <= 31; i++) {
   let newDate = new Date(year, month, i);
  // console.log(this.formatDate(newDate));
   if (newDate.getDay() == 0) {
    this.sun.push(this.formatDate(newDate));
   }
   if (newDate.getDay() == 6) {
    this.sat.push(this.formatDate(newDate));
   }

  }
 // console.log(this.sat);
 // console.log(this.sun);
  this.sun.forEach(element => {
   var data1= {
    date: new Date(element),
    //can give custom data
    marked: true, //can give custom data
    cssClass: 'my-cal' //can give custom data
   }
   this.options.daysConfig.push(data1);
    
  this.cd.markForCheck();
  })

  var data1 = {
   date: new Date(this.sat[1]), //can give custom data
   marked: true, //can give custom data
   cssClass: 'my-cal' //can give custom data
  }
  this.options.daysConfig.push(data1)

  this.cd.markForCheck();

 }
 daysInMonth(month, year) {
  return new Date(year, month, 0).getDate();
 }
 /**Function to format date to dd-yy-mm format*/
 formatDate(date) {
  var d = new Date(date),
   month = '' + (d.getMonth() + 1),
   day = '' + d.getDate(),
   year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
 }
 newmonth: string;
 newyear: string;
 monthChanger(event) {

  //console.log('monthChanged.............' + JSON.stringify(event));
  //console.log('monthChanged.............' + event["newMonth"]["months"]);
  //console.log('Year Changed' + event["newMonth"]["year"]);
  this.newmonth = event["newMonth"]["months"];
  this.newyear = event["newMonth"]["years"];
  this.printsundaymonday(+this.newmonth , this.newyear);
  this.displayAbsentandPresent(+this.newmonth,+this.newyear);
 }


            setUsersArray(data:any){
              this.date_absent.length=0;
              this.date_present.length=0;
              console.log("Inside setUsersArray"+JSON.stringify(data));
              for(let item of data){
                //console.log(item);
                if(item.status==='present') {
                  
                  var data1 = {

                    date: item.date, //can give custom data
                    marked: true,
                    //subTitle: "A",can give custom data
                    cssClass: 'dotpresent' //can give custom data
                   }
                 console.log("Dot Values.... "+JSON.stringify(data1));
                   this.options.daysConfig.push(data1);

                   this.cd.markForCheck();
                  }



                
                if(item.status==='absent') {
                  var data1 = {
                    date: item.date, //can give custom data
                    marked: true,
                    //subTitle: "A",can give custom data
                    cssClass: 'dotabsent' //can give custom data
                   }
                   //console.log("data 1 is ................."+data1);
                   this.options.daysConfig.push(data1);
                   this.cd.markForCheck();
                  }
                }       
              }
            
            
            
            }

 

            
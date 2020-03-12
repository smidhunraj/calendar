import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from "ion2-calendar";
import { IonicModule } from '@ionic/angular';

import { CalPageRoutingModule } from './cal-routing.module';

import { CalPage } from './cal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalPageRoutingModule,
    CalendarModule
  ],
  declarations: [CalPage]
})
export class CalPageModule {}

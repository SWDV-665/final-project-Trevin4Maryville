import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfoPage } from './Info.page';

import { InfoPageRoutingModule } from './Info-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    InfoPageRoutingModule
  ],
  declarations: [InfoPage]
})
export class InfoPageModule {}

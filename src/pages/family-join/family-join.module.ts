import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilyJoinPage } from './family-join';

@NgModule({
  declarations: [
    FamilyJoinPage,
  ],
  imports: [
    IonicPageModule.forChild(FamilyJoinPage),
  ],
})
export class FamilyJoinPageModule {}

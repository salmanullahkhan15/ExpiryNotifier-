import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FamilyInvitePage } from './family-invite';
import { NgxQRCodeModule } from 'ngx-qrcode2';

@NgModule({
  declarations: [
    FamilyInvitePage,
  ],
  imports: [
    IonicPageModule.forChild(FamilyInvitePage),
    NgxQRCodeModule,
  ],
})
export class FamilyInvitePageModule {}

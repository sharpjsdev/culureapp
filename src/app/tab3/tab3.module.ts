import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { Tab3Page } from './tab3.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx'; 
import {File} from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { Tab3PageRoutingModule } from './tab3-routing.module'
import { TagInputModule } from 'ngx-chips';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
	ReactiveFormsModule,
	TagInputModule, 
    ExploreContainerComponentModule,
    RouterModule.forChild([{ path: '', component: Tab3Page }]),
    Tab3PageRoutingModule,
  ],
  providers: [
  File,Camera,Crop ],
  
  declarations: [Tab3Page]
})
export class Tab3PageModule {}

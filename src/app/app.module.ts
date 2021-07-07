import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NgxIonicImageViewerModule } from 'ngx-ionic-image-viewer';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';
import { File } from '@ionic-native/file/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { AppState } from './app.global';
import { SharedModule } from './shared.module';
import { BarRatingModule } from "ngx-bar-rating"; 
import { StreamingMedia } from '@ionic-native/streaming-media/ngx';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // this is needed!
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
  
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,NgxIonicImageViewerModule,BarRatingModule,TagInputModule, 
       BrowserAnimationsModule,
       FormsModule,
       ReactiveFormsModule,QuillModule.forRoot(),IonicModule.forRoot(), AppRoutingModule,
    IonicStorageModule.forRoot(),
    HttpClientModule,SharedModule],
  providers: [
    StatusBar,
    SplashScreen,
	StreamingMedia,
	File,
	Camera,
	AppState,
	Crop,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ], 
  bootstrap: [AppComponent]
})
export class AppModule {}

import { Component, OnInit, AfterViewChecked , ViewChild, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';


@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {


   constructor(
    private http: HttpClient,
    private router: Router,
    private fetch: FetchService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
	private alertController:AlertController,
	private loadingCtrl: LoadingController,
	private toastCtrl: ToastController,
	private changeRef: ChangeDetectorRef
  ) { }

 public user: any = this.auth.getUser();
 
  

  ionViewWillEnter() {

      this.router.navigate(['/members/tab6']);
    
	}
 ngOnInit() {

  console.log('enter2');
  }
  



}


import { Component, ViewChild ,  OnInit, HostListener } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { resolve } from 'url';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';


declare var $: any;
@Component({
  selector: 'app-savedpost',
  templateUrl: './savedpost.page.html',
  styleUrls: ['./savedpost.page.scss'],
})
export class SavedpostPage implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private fetch: FetchService,
    private alertCtrl: AlertController,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
	private storage: Storage,
	public actionSheetController: ActionSheetController
  ) {
  }

  public user: any = this.auth.getUser();
  public imageUrl = environment.site_url + 'posts/';
  public model: any = {};
  public media: any = [];
  public images: any = [];
  public vedios: any = [];
  
   @ViewChild('slides', { static: true }) slider: IonSlides;
   segment = 0;
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  ngOnInit() {
  console.log(this.user);
               let check=localStorage.getItem('is_loggin'); 
			 if(check!='true'){
     this.router.navigate(['/']);
    } else {
      this.fetch.toggleLoader(0);
      const data = {
        user_id: this.user.user_id
      };
      this.fetch.get_saved_post(data).subscribe((res) => {
        if (res.data.length === 0 || res.status === 'success') {
          const posts = res.data;
          for (const post of posts) {
            this.media.push(post);
            if (post.post_type === '1') {
              this.images.push(post);
            } else {
              this.vedios.push(post);
            }
          }
          this.fetch.toggleLoader(1);
		  console.log(this.media);
		  console.log(this.images);
		  console.log(this.vedios);
        } else {
          $.alert('No Saved Post found');
        }
      });
    }
  }

  change_class($event: any) {
    // tslint:disable-next-line: space-before-function-paren
    $('.tabs li').on('click', function () {
      $(this).addClass('current').siblings().removeClass('current');
      const id = $(this).attr('data-tab');
      $('.tabs_li').removeClass('current');
      $('#' + id).addClass('current');
    });
  }
currentIndex: any = -1;
showFlag: any = false;

showLightbox(index) {
  this.currentIndex = index;
  this.showFlag = true;
}
closeEventHandler() {
  this.showFlag = false;
  this.currentIndex = -1;
}

}

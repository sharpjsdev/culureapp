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
  selector: 'app-my-story',
  templateUrl: './my-story.page.html',
  styleUrls: ['./my-story.page.scss'],
})
export class MyStoryPage implements OnInit {

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
  public stories = [];
  public storyUrl = environment.site_url + 'stories/';
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
 
      const data = {
        user_id: this.user.user_id
      };
      this.fetch.get_my_stories({ user_id: this.user.user_id }).subscribe((res) => {
         this.stories = res.data.stories;
        for (const t of this.stories) {
          const imageExt = ['gif', 'jpg', 'jpeg', 'png'];
          const videoExt = ['mp4', 'avi', '3gp', 'mov', 'mpeg'];
          const name = t.story.split('.');
          const ext = name[1].toLowerCase();
          const url = this.storyUrl + t.story;

          if (imageExt.includes(ext) === true) {
            t.type = 'image';
            t.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            t.imageurl = url;
            this.images.push(t);
          } else if (videoExt.includes(ext) === true) {
            t.type = 'video';
            t.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
            this.vedios.push(t);
          }
          this.media.push(t);
        }
		
       // this.change_class();
        //this.fetch.toggleLoader(1); 
      });
    }
  }




}

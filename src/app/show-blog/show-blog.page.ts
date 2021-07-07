import { Component, ViewChild ,  OnInit, HostListener } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController,ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { resolve } from 'url';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Storage } from '@ionic/storage';
import { ActionSheetController } from '@ionic/angular';

declare var $: any;

@Component({
  selector: 'app-show-blog',
  templateUrl: './show-blog.page.html',
  styleUrls: ['./show-blog.page.scss'],
})
export class ShowBlogPage implements OnInit {

	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private auth: AuthService,
		private datePipe: DatePipe,
		private sanitizer: DomSanitizer,
		private storage: Storage,
		private route: ActivatedRoute,
		public actionSheetController: ActionSheetController
	) {

	}
	
    test: string;
	public user = this.auth.getUser();
	public currentBlog = JSON.parse(localStorage.getItem('currentBlog'));
	public imageUrl = environment.site_url + 'images/';
	public blogUrl = environment.site_url + 'blog-images/';

	public safeSrc: SafeResourceUrl;
	public defaultImage = 'assets/images/loader.gif';
	public image = 'assets/images/1.jpg';
	public noimage = 'noimage.jpg';





	ngOnInit() {
		}
	ionViewWillEnter() {

console.log(this.currentBlog);
	}

	show_profile_2(post: any) {
		if (post.user_id == this.user.user_id) {
			this.router.navigate(['/members/tab6']);
		} else {
			this.router.navigate(['show-profile/' + post.user_id]);
		}

	}
	showProfile(id: any) {
		this.router.navigate(['/show-profile/' + id]);
	}

}


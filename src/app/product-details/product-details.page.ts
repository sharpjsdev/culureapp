import { Component, OnInit, AfterViewChecked , ViewChild, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { NavparamService } from '../services/navparam.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertController,LoadingController,ToastController,ModalController } from '@ionic/angular';
import { ViewerModalComponent } from 'ngx-ionic-image-viewer';
import { IonSlides } from '@ionic/angular';
import { IonContent } from '@ionic/angular';
import * as $ from 'jquery';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {


	
   constructor(
    private http: HttpClient,
    private router: Router,
    private fetch: FetchService,
    private authService: AuthService,
    private navparamService: NavparamService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
	private alertCtrl:AlertController,
	private toastCtrl:ToastController,
	private loadingCtrl:LoadingController,
	public modalController: ModalController
  ) { }

  public user = this.authService.getUser();
  public safe_video_1: SafeResourceUrl;
  public safe_yt_video: any;
  public setting: any;
  public purity: any;
  public product:any;
  public merchant: any = {};
  public category: any = {};
  public chats: any = {};
  public chat_id: any;
  public model: any = {};
  public qty=1;
  public price=0;

 
  public avg: any;
  public ratings: any;
  public shopImage: any;
  public vcardImage: any;
  public selectedfile: any;
  public counter = 0;
  public showeditfrm = 0;

  public addsetting = 0;
  public editsetting = 0;
  public rating = 0;
  
	public imageUrl = environment.site_url + 'images/';
	public postUrl = environment.site_url + 'posts/';
	public productUrl = environment.site_url + 'products/';
	public storyUrl = environment.site_url + 'stories/';
	public defaultImage = environment.site_url + 'images/noimage.jpg';
 
	
   @ViewChild('slides', { static: true }) slider: IonSlides;
   	@ViewChild(IonContent, { static: false }) content: IonContent;
   segment = 0;
   slideOpts = {
		initialSlide: 0,
		speed: 400
	};
	
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  } 
   ionViewWillEnter() {
this.product=JSON.parse(localStorage.getItem('currentProduct'));
		//  console.log(this.product.profile_pic);
	 this.price=this.product.total;
   const pid = this.route.snapshot.params.data; 
   
  this.getRating();
     // this.getProduct(pid);
	  this.content.scrollToTop(1500);
  
    }
 ngOnInit() {
	 this.product=JSON.parse(localStorage.getItem('currentProduct'));
	 this.price=this.product.total;
	 this.getRating();
  }
  
  backtohome() {
    this.router.navigate(['members/tab1/']);
  }
  
  getRating() {
    const start = {
      product_id: this.product.id,
      user_id: this.user.user_id
    };
    this.fetch.getRating(start).subscribe(res => {
      this.ratings=res.rating;
      this.rating=res.rating.rating;
	  this.avg=res.avg;
      this.product.averageRating= this.avg;


    });
	
  }
	show_profile_2(post: any) {
		if (post.user_id == this.user.user_id) {
			this.router.navigate(['/members/tab6']);
		} else {
			this.router.navigate(['show-profile/' + post.user_id]);
		}

	}
	
	
	
    async addReview(rating) {
    const loading = await this.loadingCtrl.create({ message: 'Saving...' });
    await loading.present();
	  const fd = new FormData();
      fd.append('user_id', this.user.user_id);
      fd.append('product_id', this.product.id);
      fd.append('rating', rating);


    this.fetch.addRating(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        
		 }else{
		 
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
		  this.getRating();
		 }
      },
      // If there is an error
      async (data) => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }

    addQty(){

		this.qty=this.qty+ +1;
		
		this.price=this.qty*this.product.total;
		

		}

    removeQty(){
		if(this.qty>1){
			this.qty=this.qty-1;
			this.price=this.qty*this.product.total;
		}
		}
		
    async addCartItem(product,qty) {
    const loading = await this.loadingCtrl.create({ message: 'Saving...' });
    await loading.present();
	  const fd = new FormData();
      fd.append('user_id', this.user.user_id);
      fd.append('product_id', product.id);
      fd.append('merchant_id', product.user_id);
      fd.append('qty', qty);

    this.fetch.addCartItem(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        
		 }else{
		 
		  const toast = await this.toastCtrl.create({ message: "Item Added to Cart!", duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
		 }
      },
      // If there is an error
      async (data) => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }
}

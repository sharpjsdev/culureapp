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
  selector: 'app-order-details',
  templateUrl: './order-details.page.html',
  styleUrls: ['./order-details.page.scss'],
})
export class OrderDetailsPage implements OnInit {

	
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
  public order:any;
  public merchant: any = {};
  public category: any = {};
  public cart_items: any = [];
  public cart: any=[];
  public chats: any = {};
  public chat_id: any;
  public model: any = {};
  public qty=1;
  public price=0;

 
  public shopImage: any;
  public vcardImage: any;
  public selectedfile: any;
  public counter = 0;
  public showeditfrm = 0;

  public addsetting = 0;
  public editsetting = 0;
  
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
this.order=JSON.parse(localStorage.getItem('currentOrder'));
		//  console.log(this.product.profile_pic);

   const pid = this.route.snapshot.params.data; 
   this.getCart();

     // this.getProduct(pid);
	  this.content.scrollToTop(1500);
  
    }
 ngOnInit() {
	 this.order=JSON.parse(localStorage.getItem('currentOrder'));

  }
  
  backtohome() {
    this.router.navigate(['members/tab1/']);
  }
  
	show_profile_2(post: any) {
		if (post.profile_pic.user_id == this.user.user_id) {
			this.router.navigate(['/members/tab6']);
		} else {
			this.router.navigate(['show-profile/' + post.profile_pic.user_id]);
		}

	}
	
	  getCart() {

    this.fetch.get_cart({ user_id: this.user.user_id ,cart_id: this.order.cart_id }).subscribe((res) => {
	if(res.status=='error'){
		this.cart_items = [];
		this.cart = [];
		}else{
      this.cart_items = res.data;
      this.cart = res.cart;
	}

    });
     console.log(this.cart);

  }


  async updateStatus(item,status) {


		 const loading = await this.loadingCtrl.create({ message: 'Updating...' });
		 await loading.present();
		  this.fetch.updateOrderStatus({ id: item.id ,status: status }).subscribe( async (res) => {
             if(res['status']=="success"){
			
 
						//Update object's name property.
						this.order.status = status;
					 const toast = await this.toastCtrl.create({
							 message: 'Status Updated !',
							 duration: 2000,
							 color: 'dark'
					  });
						 await toast.present();
			  loading.dismiss();
			 console.log(res);
			 }else{
			  const toast = await this.toastCtrl.create({
							 message: 'Status not Updated !',
							 duration: 2000,
							 color: 'dark'
					  });
						 await toast.present();
			  loading.dismiss();
			 console.log(res);
			 
			 }
			
		 });
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

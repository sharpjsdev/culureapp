import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { async } from '@angular/core/testing';
import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { LoadingController, AlertController,ToastController,ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Response } from 'selenium-webdriver/http';
declare var paypal: any;
declare var $: any;

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit,OnDestroy {


  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private router: Router, private fetch: FetchService, private sanitizer: DomSanitizer, private datePipe: DatePipe,private auth: AuthService, private alertCtrl: AlertController, private toastCtrl: ToastController,	public modalController: ModalController,private loadingCtrl:LoadingController) { }

  public user: any = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public productUrl = environment.site_url + 'products/';
  public model: any = [];
  public show = 1;
  public chatter: any = {};
  public interval: any;
  public oldCartCount = 0;
  public notificationCount = 0;
  public wishlist_items: any = [];
  public wishlist: any=[];
  segment='I Liked';
  

  
  

  ngOnInit() {
    if (this.user === null || localStorage.getItem('is_loggin') !== 'true') {
      this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      this.getWishlist();
	      clearInterval(this.interval);
   //   this.interval = setInterval(() => { this.messageNotification(); }, 2000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
	  

  
  }


  showProduct(product: any) {
    localStorage.setItem('currentProduct', JSON.stringify(product));
    this.router.navigate(['/product-details']);
  }

  // get followers and following both
  getWishlist() {

    this.fetch.get_wishlist({ user_id: this.user.user_id }).subscribe((res) => {
	if(res.status=='error'){
		this.wishlist_items = [];
		this.wishlist = [];

		}else{
      this.wishlist_items = res.data;
      this.wishlist = res.wishlist;
	}

    });
     console.log(this.wishlist);

  }
  
	removeItem(product) {
    this.presentAlertRemoveItem(product);
	}
  async presentAlertRemoveItem(product) {
                const self = this;
      			const alert = await this.alertCtrl.create({
				cssClass: 'my-custom-class',
				header: 'Remove Item!',
				message: 'Do you really want to <strong>Remove</strong> this Item ?',
				buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
						console.log('Confirm Cancel: blah');
					}
				}, {
					text: 'Okay',
					handler: () => {
						console.log('Confirm Okay');
						var qty=0;
						  const fd = new FormData();

      fd.append('wid', product.id);

    this.fetch.removeWishlistItem(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        this.getWishlist();
        
		 }else{
		   
		  const toast = await this.toastCtrl.create({ message: "Item Removed!", duration: 2000, color: 'dark' });
        await toast.present();

		 this.getWishlist();
		 }
      },
      // If there is an error
      async (data) => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        await alert.present();
      }
    );

					}
				}]
			});

    await alert.present();
  }

}


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
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit, OnDestroy {


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
  public cart_items: any = [];
  public cart: any=[];
  segment='I Liked';
  
  
  public addScript = false;
  public finalAmount = this.cart.cart_amount;
  public paypalLoad = true;
  public subEndDate: any;
  
  
  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AVwC__hdK2iJMsZJ6kH7zg8_4ngB2SnE6w1vO4-WktV1rbxYT8tZY5BjwTXBG_ywSyQkz07hkLfICJd_',
	  production: 'AaGtz8sJ4SY6ceW1SylhZ40GUc2IeD-lFwLYcV9T4THaO4FFNqIjuIOJ2NFcGzqLwIRkoCU9cJsHnh3H'
    },
    commit: true,
    style: {
      color: 'silver',
      shape: 'pill',
      label: 'checkout',
      height: 40,
      size: 'responsive',
      tagline: true,
      fundingicons: true
    },
    payment: (data: any, actions: any) => {

      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.cart.cart_amount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data: any, actions: any) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
        let data1: any;
		var payer=payment.payer.payer_info;

          data1 = {
            cart_id: this.cart.id,
            buyer_id: this.user.user_id,
            seller_id: this.cart.merchant_id,
            txn_id: payment.id,
            name: payer.shipping_address.recipient_name,
            email: payer.email,
            mobile: payer.shipping_address.phone,
            address: payer.shipping_address.line1+" "+payer.shipping_address.line2,
            city: payer.shipping_address.city,
            state: payer.shipping_address.state,
            postal_code: payer.shipping_address.postal_code,
            status: 0
          };
         
        this.fetch.updateOrder(data1).subscribe(res => {
          if (res.status === 'success') {
            alert('Order Placed!');
            this.router.navigate(['/orders']);
          }
        });
      });
    }
  };

  ngOnInit() {
    if (this.user === null || localStorage.getItem('is_loggin') !== 'true') {
      this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      this.messageNotification();
      this.getCart();
	      clearInterval(this.interval);
   //   this.interval = setInterval(() => { this.messageNotification(); }, 2000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
	    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  
  }



  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().catch(error => {
        console.log(error);
      }).then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const loaded = this.isScriptLoaded('https://www.paypalobjects.com/api/checkout.js');
      if (!loaded) {
        const scripttagElement = document.createElement('script');
        scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
        scripttagElement.onload = resolve;
        document.body.appendChild(scripttagElement);
      } else {
        reject('Script is already loaded');
      }
    });
  }

  isScriptLoaded(src: any) {
    const check = document.querySelector('script[src="' + src + '"]');
    return check ? true : false;
  }




  toggleModel(state: string) {
    $('#myModalSub').modal(state);
  }


  payOther() {
    console.log('pay other');
  }



  messageNotification() {
    this.fetch.messageNotification({ user_id: this.user.user_id }).subscribe(res => {
      const count = res.data.count;
      if (parseInt(count, 10) === 0 && this.notificationCount === 0) {
        this.getCart();
        this.notificationCount = 1;
        return;
      }
      if (count > this.oldCartCount) {
        this.oldCartCount = count;
        this.getCart();
      }
    });
  }


  // get followers and following both
  getCart() {

    this.fetch.get_cart({ user_id: this.user.user_id }).subscribe((res) => {
	if(res.status=='error'){
		this.cart_items = [];
		this.cart = [];
		  $('#paypal-checkout-btn').hide();
		}else{
      this.cart_items = res.data;
      this.cart = res.cart;
	}

    });
     console.log(this.cart);

  }
  
  async updateCart(product,type) {
    const loading = await this.loadingCtrl.create({ message: 'Updating...' });
    await loading.present();
	var quantity=product.quantity;
	if(type==0){
	var qty= parseInt(quantity)-1;
		}else{
	var qty= parseInt(quantity)+ +1;
		
		}
	
	  const fd = new FormData();
      fd.append('user_id', this.user.user_id);
      fd.append('product_id', product.product_id);
      fd.append('qty',qty.toString());

    this.fetch.updateCart(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        
		 }else{
		   
		  const toast = await this.toastCtrl.create({ message: " Cart Updated!", duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
		 this.getCart();
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
      fd.append('user_id', this.user.user_id);
      fd.append('product_id', product.product_id);
      fd.append('qty',qty.toString());

    this.fetch.updateCart(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        this.getCart();
        
		 }else{
		   
		  const toast = await this.toastCtrl.create({ message: " Cart Updated!", duration: 2000, color: 'dark' });
        await toast.present();

		 this.getCart();
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


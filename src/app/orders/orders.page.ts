import { async } from '@angular/core/testing';
import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { LoadingController, AlertController,ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Response } from 'selenium-webdriver/http';
declare var paypal: any;
declare var $: any;

@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
})
export class OrdersPage implements OnInit {

  constructor(private http: HttpClient, private router: Router, private fetch: FetchService,private auth: AuthService, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  public user: any = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public model: any = {};
  public iLiked: any = [];
  public likedBy: any = [];
  public orders: any = [];
  public received: any = [];
  public dupLikedBy: any = [];
  public likedByUser: any = [];
  public followers: any = [];
  public ilike = '';
  public likes = '';
  public posts: any = [];
  public tab = 'tab-1';
  segment='I Liked';
  ngOnInit() {
    if (this.user === null) {
    //  this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      this.fetch.get_orders({ user_id: this.user.user_id }).subscribe((res) => {
		  console.log(res);
        this.orders = res.orders;
        this.received = res.received;

        this.fetch.toggleLoader(1);
      });

    }

  }
    async confirmFollowUser(followUser: any) {
		const self = this;
		if (followUser.follow_status === '1') {
      			const alert = await this.alertCtrl.create({
				cssClass: 'my-custom-class',
				header: 'Unfollow!',
				message: 'Do you really want to Unfollow ?',
				buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {

					}
				}, {
					text: 'Okay',
					handler: () => {
				
            followUser.follow_status = '0';
            followUser.text = 'follow';
            self.confirm_follow(followUser);
					}
				}]
			});

    await alert.present();
		}else{
		
	  followUser.follow_status = '1';
      followUser.text = 'following';
      this.confirm_follow(followUser);
		}
  }
  


  private confirm_follow(followUser: any) {
    const searchedUserId = followUser.id;
    const data = {
      user_id: this.user.user_id,
      follow_user_id: searchedUserId,
      status: followUser.follow_status
    };
    this.fetch.follow_user(data).subscribe((res) => {
      const followers = res.data;
    });
  }

  change_class(tab: any) {
    this.tab = tab;
	if(tab == "tab-2"){
		$("#tab-1").css("display","none");
		$("#tab-2").css("display","block");
	}else{
		$("#tab-2").css("display","none");
		$("#tab-1").css("display","block");
	}
  }
  
    showDetails(order: any) {
    localStorage.setItem('currentOrder', JSON.stringify(order));
	console.log(order);
    this.router.navigate(['/order-details']);
  }

}

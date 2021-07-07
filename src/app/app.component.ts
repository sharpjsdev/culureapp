import { Component, AfterViewInit, OnDestroy ,OnInit , QueryList, ViewChildren,Renderer2 } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { AlertController, IonRouterOutlet } from '@ionic/angular';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { AppState } from './app.global';
@Component({
	selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
	@ViewChildren(IonRouterOutlet) routerOutlets: QueryList < IonRouterOutlet > ;
	
	lastTimeBackPress = 0;
	timePeriodToExit = 2000;
	constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
	private alertController: AlertController,
    private statusBar: StatusBar,
	private auth: AuthService,
	public navCtrl: NavController,
	private storage: Storage,
	private router : Router,
	private location: Location,
	public global: AppState,
	private renderer:Renderer2,
  ) {
    this.backButtonEvent();
    this.initializeApp();
  }	

  public user = this.auth.getUser();
  public backButtonSubscription: any;
  public selectedIndex = 0;
  showBtnLogin = true;
    public appPages = [
    {
      title: 'Subscription',
      url: '/subscription',
      icon: 'card'
    },
    {
      title: 'Most Liked',
      url: '/most-liked',
      icon: 'heart'
    },
    {
      title: 'Saved',
      url: '/savedpost',
      icon: 'bookmark'
    },
    {
      title: 'My Story',
      url: '/my-story',
      icon: 'share-social'
    },
    {
      title: 'My Post',
      url: '/my-post',
      icon: 'image'
    },
    {
      title: 'Blogs',
      url: '/blogs',
      icon: 'wallet'
    },
    {
      title: 'Create Blog',
      url: '/create-blog',
      icon: 'calendar'
    },
    {
      title: 'My Blog',
      url: '/my-blogs',
      icon: 'bookmarks'
    },
    {
      title: 'My Products',
      url: '/my-products',
      icon: 'tablet-portrait'
    },
	{
      title: 'Wishlist',
      url: '/wishlist',
      icon: 'heart'
    }, 
	{
      title: 'Orders',
      url: '/orders',
      icon: 'swap-horizontal'
    },
    {
      title: 'Notification',
      url: '/notifications',
      icon: 'notifications'
    },
    {
      title: 'Themes',
      url: '/themes',
      icon: 'location'
    },
    {
      title: 'Change Password',
      url: '/change-password',
      icon: 'key'
    },
    {
      title: 'Blocked Accounts',
      url: '/blocked-user',
      icon: 'people-circle'
    }
  ];
  public labels = [];



async ngOnInit() {
	
  
}

  initializeApp() {
 
    this.platform.ready().then(() => {
	
	 this.global.set('theme', '');
	 this.global.set('cartCount',0);
      this.statusBar.styleDefault();
	  this.statusBar.backgroundColorByHexString('#ffffff');
      this.splashScreen.hide();
	  const uu=this.storage.get('udata');
	  	  var chk=localStorage.getItem('is_checked');

	  if(chk=='c'){
		 
		  this.renderer.setAttribute(document.body,'color-theme','dark');
		  }else{
		  
		   this.renderer.setAttribute(document.body,'color-theme','light');
		  }
	   if (localStorage.getItem('is_loggin') === 'true') {
    //  this.router.navigate(['/members/tab1']);
    }
         
	 // let u= this.auth.getUser();
      console.log(uu);
	  
    });
  } 
  
  backButtonEvent() {
		
		this.platform.backButton.subscribeWithPriority(0, () => {
			this.routerOutlets.forEach(async(outlet: IonRouterOutlet) => {
				if (this.router.url != '/members/tab1') {
					// await this.router.navigate(['/']);
					await this.location.back();
					} else if (this.router.url === '/members/tab1') {
					if (new Date().getTime() - this.lastTimeBackPress >= this.timePeriodToExit) {
						this.lastTimeBackPress = new Date().getTime();
						this.presentAlertConfirm();
						} else {
						navigator['app'].exitApp();
					}
				}
			});
		});
	}
	
	async presentAlertConfirm() {
		const alert = await this.alertController.create({
			// header: 'Confirm!',
			message: 'Are you sure you want to exit the app?',
			buttons: [{
				text: 'Cancel',
				role: 'cancel',
				cssClass: 'secondary',
				handler: (blah) => {}
				}, {
				text: 'Close App',
				handler: () => {
					navigator['app'].exitApp();
				}
			}]
		});
		
		await alert.present();
	}
    logout() {
    this.auth.logout();
  }
}

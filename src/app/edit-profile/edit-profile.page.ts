import { Component, OnInit, AfterViewChecked , ViewChild, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
declare var $: any;
declare let paypal: any;

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {

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
  ) { }

 public user: any = this.auth.getUser();
  public postUrl = environment.site_url + 'posts/';
  public coverUrl = environment.site_url + 'cover_images/';
  public newColor = '#FE1743';
  public bgImage = '';
  public model: any = {};
  public path: any;
  public posts: any = [];
  public media: any = [];
  public images: any = [];
  public vedios: any = [];
  public followers: any = [];
  public following: any = [];
  public followStatus = 0;
  public countFollowers: any;
  public countFollowing: any;
  public text = 'Follow';
  public hide = false;
  public show = 0;
  public index: number;
  public type: number;
  public first: any;
  public second: any;
  public profilePic: any;
  private counter = 0;
  public defaultImage = 'assets/images/loader.gif';
  public imageUrl = environment.site_url + 'posts/';

  public addScript = false;
  public finalAmount = 1.99;
  public paypalLoad = true;
  
  public is_blocked: any;
  public blocked_id: any;
  
	editform = new FormGroup({

    auth_id: new FormControl('', []),
    name: new FormControl('', []),
    username: new FormControl('', []),
	email: new FormControl('', [
			Validators.required,
			Validators.email,
		]),
	mobile: new FormControl('', [
		      Validators.minLength(10),
      Validators.maxLength(10),
		]),
	birthday: new FormControl('', []),
	gender: new FormControl('', []),
	city: new FormControl('', []),
	profession: new FormControl('', []),
	website: new FormControl('', []),
	subscription_price: new FormControl('', []),

	});
	
    @ViewChild('slides', { static: true }) slider: IonSlides;
   segment = 0;
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  } 
  ionViewWillEnter() {
  console.log('enter1');
           if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      const userId = this.user.user_id;
	  console.log(userId);
      this.getUser(userId);
	  
    }
	}
 ngOnInit() {
  console.log('enter2');

  }
  
  backtohome() {
    this.router.navigate(['members/tab1/']);
  }
 async getUser(userId: any) {
  
   const loading = await this.loadingCtrl.create({ message: 'Loading ...' });
    await loading.present();
	
    const id = {
      auth_id: userId,
      user_id: this.user.id
    };
    this.fetch.getuser(id).subscribe((res) => {
		console.log(res);
      this.counter++;
      if (this.counter > 2) {
        this.fetch.toggleLoader(1);
      }
      if (res.status === "error") {
        if (res.deactive !== undefined) {
          $.alert("User account is deactivated !");
        }
        this.router.navigate(['/members/tab1/']);
      }
      this.model = res.user_info;
      loading.dismiss();
    });
  }
  
  
  async onSubmitEdit() {
    const loading = await this.loadingCtrl.create({ message: 'Updating...' });
    await loading.present();
    this.fetch.updateuser(this.editform.value).subscribe(
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
		//const userId = this.user.user_id;
      //  this.getUser(userId);
        this.editform.reset();
       // this.showeditfrm=0;
		   this.router.navigate(['/members/tab7']);
		 }
      },
      // If there is an error
      async (data) => {
        const alert = await this.alertController.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }

}

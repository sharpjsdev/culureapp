import { Component, OnInit, AfterViewChecked ,ViewChild} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
declare var $: any;

@Component({
  selector: 'app-show-profile',
  templateUrl: './show-profile.page.html',
  styleUrls: ['./show-profile.page.scss'],
})
export class ShowProfilePage implements OnInit {

constructor(
    private http: HttpClient,
    private router: Router,
    private fetch: FetchService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
	private alertCtrl:AlertController
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

    @ViewChild('slides', { static: true }) slider: IonSlides;
   segment = 0;
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
  }
  ngOnInit() {

    if (!this.user) {
      this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      const userId = this.route.snapshot.params.id;
	  console.log(userId);
      this.getUser(userId);
      this.getPost(userId);
      this.getFollowers(userId);
      this.getFollowing(userId);
	  
    }
  }
  backtohome() {
    this.router.navigate(['members/tab1/']);
  }
  getUser(userId: any) {
    if (userId === this.user.user_id) {
      this.hide = true;
      this.router.navigate(['/members/tab6']);
    }
    const id = {
      auth_id: userId,
      user_id: this.user.user_id
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
        this.router.navigate(['/home']);
      }
      this.model = res.user_info;
	  
      if (this.model.blocked.length > 0) {
		this.blocked_id = this.model.blocked[0].id;
         let msg = '';
        let data = {
          blocked_user: this.model.id,
          user_id: this.user.user_id,
          id: 0
        }
        // $.alert(msg);
        if (this.model.blocked.length === 2) {
          msg = `Both of you have blocked each other ! Do you want to unblock ${this.model.name} ?`;
          for (const it of this.model.blocked) {
            if (it.user_id === this.user.user_id) {
              data.id = it.id;
            }
          }
          this.confirmUnblockUser(msg, data)
        } else {
          const blocked = this.model.blocked[0];
          console.log(blocked)
          data.id = blocked.id;
          if (blocked.user_id === this.user.user_id) {
            msg = `You have blocked ${this.model.name} ! Do you want unblock him`;
            this.confirmUnblockUser(msg, data);
          } else {
            msg = `You are blocked by ${this.model.name} !`;
            $.alert(msg);
            this.router.navigate(['/home']);
          }
        } 
      }else{
		this.is_blocked = 0;  
	  }
      if (this.model.bio === null) {
        this.model.bio = '';
      }
      if (this.model.profile_bg_color !== this.newColor) {
        this.newColor = this.model.profile_bg_color;
      }
      if (this.model.cover_image !== 'noimage.jpg') {
        this.bgImage = this.coverUrl + this.model.cover_image;
      }
      if (res.profile_pic === null) {
        this.profilePic = 'noimage.jpg';
        const profilePic = environment.site_url + 'images/noimage.jpg';
        this.model.profile_pic = profilePic;
      } else {
        this.profilePic = res.profile_pic.thumb_image;
        const imageUrl = environment.site_url + 'images/' + res.profile_pic.thumb_image;
        this.model.profile_pic = imageUrl;
      }
    });
  }
  getPost(userId: any) {
    this.fetch.getpost({ user_id: userId }).subscribe((res) => {
      this.counter++;
      if (this.counter > 2) {
        this.fetch.toggleLoader(1);
      }
      this.path = environment.site_url + 'posts/';
      this.posts = res.data;
      for (const post of this.posts) {
        for (const media of post.media) {
          const url = this.postUrl + media.uploads;
          media.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
          this.media.push(media);
          if (media.type === '1') {
            this.images.push(media);
          } else {
            this.vedios.push(media);
          }
        }
      }
    });
  }
  show_chat(item: any) {
    this.fetch.changeUser(item);
      item.thumb_image = this.profilePic;
      item.user_id = item.id;
    
    console.log(item);
    localStorage.setItem('chatter', JSON.stringify(item));
    this.router.navigate(['/chat-box/' + item.id]);
  }
  show_products(item: any) {
    this.router.navigate(['/user-products/' + item.id]);
  }
  getFollowers(userId: any) {
    this.fetch.get_followers({ user_id: userId }).subscribe((res) => {
      this.counter++;
      if (this.counter > 2) {
        this.fetch.toggleLoader(1);
      }
      this.followers = res.data;
      this.countFollowers = this.followers.length;
      if (this.countFollowers === 1) {
        this.first = this.followers[0].username;
      }
      if (this.countFollowers >= 2) {
        this.second = this.followers[1].username;
      }
      for (const follower of this.followers) {
        if (this.user.user_id === follower.user_id) {
          this.followStatus = 1;
          this.text = 'Following';
        }
      }
    });
  }

  getFollowing(userId: any) {
    this.fetch.get_following({ user_id: userId }).subscribe((res) => {
      this.counter++;
      if (this.counter > 2) {
        this.fetch.toggleLoader(1);
      }
      this.following = res.data;
      this.countFollowing = this.following.length;
    });
  }

  ngAfterViewChecked(): void {

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

  follow_user() {
    const self = this;
    if (this.followStatus === 1) {
      $.confirm({
        title: 'Unfollow!',
        content: 'Do you really want to Unfollow ?',
        buttons: {
          confirm() {
            self.followStatus = 0;
            self.countFollowers--;
            self.text = 'Follow';
            self.confirm_follow();
          },
          cancel() { }
        }
      });
    } else {
      this.followStatus = 1;
      this.countFollowers++;
      this.text = 'Following';
      this.confirm_follow();
    }
  }

  private confirm_follow() {
    const searchedUserId = this.route.snapshot.params.id;
    const data = {
      user_id: this.user.user_id,
      follow_user_id: searchedUserId,
      status: this.followStatus
    };
    let SendNotification = false;
    if (this.followStatus === 1) {
      SendNotification = true;
    }
    this.fetch.follow_user(data).subscribe((res) => {
     // this.followers = res.data;

      if (SendNotification) {
        const notificationData = {
          user_id: this.user.user_id,
          follow_user_id: searchedUserId,
          msg: 'is now following you.'
        };
        this.fetch.SendNotification(notificationData).subscribe(res1 => {
          console.log(res1);
          // alert(JSON.stringify(res1));
        });
      }
    });
  }
    async confirmFollowUser(followUser: any) {
		const self = this;
     if (this.followStatus === 1) {
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
				
            self.followStatus = 0;
            self.countFollowers--;
            self.text = 'Follow';
            self.confirm_follow();
					}
				}]
			});

    await alert.present();
		}else{
		
      this.followStatus = 1;
      this.countFollowers++;
      this.text = 'Following';
      this.confirm_follow();
		}
  }
  showFollower() {
    const searchedUserId = this.route.snapshot.params.id;
    if (this.followers.length > 0) {
      this.router.navigate(['/show-followers/' + searchedUserId]);
    }
  }

  showFollowing() {
    const searchedUserId = this.route.snapshot.params.id;
    if (this.followers.length > 0) {
      this.router.navigate(['/show-following/' + searchedUserId]);
    }
  }

  showFullView(index: number, type: any) {
    this.type = type;
    this.index = index;
    this.show = 2;
  }

  show_profile() {
    this.show = 0;
    this.index = 0;
  }

  play_pause_video(post) {
    console.log(post);
  }

  getMyStyles() {
    let myStyles: any;
    if (this.bgImage !== '') {
      myStyles = {
        'background-image': 'url(' + this.bgImage + ')',
      };
    } else {
      myStyles = {
        'background-color': this.newColor,
      };
    }      
    return myStyles;
  }



  confirmUnblockUser(msg : any,data : any) {
	
    const self = this;
    $.confirm({
      title: 'Unblock!',
      content: msg,
      buttons: {
        confirm() {
          self.unBlockUser(data)
        },
        cancel() {
          self.router.navigate(['/home']);
        }
      }
    });
  }

  unBlockUser(data: any) {
    console.log(data);
    this.fetch.unBlockuser(data).subscribe(res => {
	console.log(res);
      if (res.status === 'success') {
		this.is_blocked = 0;
        $.alert("User Unblocked !");
      } else {
        $.alert("Oops ! something went wrong please try again later !!");
      }
    }, err => {
      console.log(err);
    });
  }


}

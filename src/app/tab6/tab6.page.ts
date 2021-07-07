import { Component, OnInit, AfterViewChecked , ViewChild, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoadingController, AlertController, ToastController,ModalController,ActionSheetController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';
declare var $: any;
declare let paypal: any;

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit{

	
	options: CameraOptions = {
		sourceType: this.camera.PictureSourceType.CAMERA,
		quality: 100,
		destinationType: this.camera.DestinationType.FILE_URI,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		
	}; 
	fileoptions: CameraOptions = {
		sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		quality: 100,
		destinationType: this.camera.DestinationType.FILE_URI,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE, 
		
	};  
	

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
	private modalCtrl: ModalController,
	public actionSheetController: ActionSheetController,
	private camera: Camera,
	private file: File,
	private crop: Crop,
	private streamingMedia: StreamingMedia

  ) { }

 public user: any = this.auth.getUser();
  public postUrl = environment.site_url + 'posts/';
  public productUrl = environment.site_url + 'products/';
  public coverUrl = environment.site_url + 'cover_images/';
  public newColor = '#FE1743';
  public bgImage = '';
  public model: any = {};
  public path: any;
  public posts: any = [];
  public products: any = [];
  public media: any = [];
  public images: any = [];
  public vedios: any = [];
  public followers: any = [];
  public following: any = [];
  public selectedfile:any;
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
  
  playVdo(src){
	  let options: StreamingVideoOptions = {
  successCallback: () => { console.log('Video played') },
  errorCallback: (e) => { console.log('Error streaming') },
  orientation: 'landscape',
  shouldAutoClose: true,
  controls: true
}; 
	this.streamingMedia.playVideo('http://3.137.7.60/culture-web/social_media/posts/'+src, options);
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
      this.getPost(userId);
      this.getProducts(userId);
      this.getFollowers(userId);
      this.getFollowing(userId);

    }
	}
 ngOnInit() {

  console.log('enter2');
  }
  	async selectImage(uploader) {
		const actionSheet = await this.actionSheetController.create({
			header: "Select Image source",
			buttons: [{
				text: 'Load from Library',
				handler: () => {
					this.takePicturefile(uploader);
				}
			},
			{
				text: 'Use Camera',
				handler: () => {
					
					this.takePicture(uploader);
				}
			},	  
			{
				text: 'Cancel',
				role: 'cancel'
			}
			]
		});
		await actionSheet.present();
	}
	
	readFile(file: any,fname: any) {
		const reader = new FileReader();
		reader.onloadend = async () => {
			const imgBlob = new Blob([reader.result], {
				type: file.type
			});
			const formData = new FormData();
			formData.append('auth_id', this.user.user_id);

			if(fname=='cover_image'){
							//formData.append('image_name', fname);
			formData.append("cover_image", imgBlob, file.name);
			
			const loading = await this.loadingCtrl.create({ message: 'Uploading...' });
			await loading.present();
				this.http.post(environment.api_url +'set_cover_image.php', formData).subscribe( async (res) => {

					
					const toast = await this.toastCtrl.create({
						message: 'Image Updated !',
						duration: 2000,
						color: 'dark'
					});
					await toast.present();
					loading.dismiss();
					this.router.navigate(['members/tab7/']);
					//console.log(res);
					
				});
				
				
			}
            if(fname=='profile_pic'){
							//formData.append('image_name', fname);
			formData.append("user_image", imgBlob, file.name);
			
			const loading = await this.loadingCtrl.create({ message: 'Uploading...' });
			await loading.present();
				this.http.post(environment.api_url +'upload_avatar_test.php', formData).subscribe( async (res) => {
					
					
					const toast = await this.toastCtrl.create({
						message: 'Image Updated !',
						duration: 2000,
						color: 'dark'
					});
					await toast.present();
					loading.dismiss();
					//console.log(res);
					
				});
				
				
			}
			
			
		};
		reader.readAsArrayBuffer(file);
	}
	takePicture(fname) {
		this.camera.getPicture(this.options).then((imageData) => {
			
			this.cropImage(imageData,fname)
			
			}, (err) => {
			// Handle error
		});
	}
	takePicturefile(fname) {
		this.camera.getPicture(this.fileoptions).then((imageData) => {
			//this.imgURI = 'data:image/jpeg;base64,' + imageData;
			//let base64Image = 'data:image/jpeg;base64,' + imageData;
			this.cropImage(imageData,fname)
			
			}, (err) => {
			// Handle error
		});
	}
	cropImage(fileUrl,fname) {
		this.crop.crop(fileUrl, { quality: 50 })
		.then(
			newPath => {
				this.file.resolveLocalFilesystemUrl(newPath).then((entry: FileEntry) => {
					entry.file(file => {
						//	console.log(file);
						this.readFile(file,fname);
					});
				});
				
				this.showCroppedImage(newPath.split('?')[0] , fname)
			},
			error => {
				alert('Error cropping image' + error);
			}
		);
	}
	
	showCroppedImage(ImagePath , fname) {
		// this.isLoading = true;
		var copyPath = ImagePath;
		var splitPath = copyPath.split('/');
		var imageName = splitPath[splitPath.length - 1];
		var filePath = ImagePath.split(imageName)[0];
		
		this.file.readAsDataURL(filePath, imageName).then(base64 => {
			
			if(fname=='cover_image'){
				this.model.cover_image = base64;
			}
			if(fname=='profile_pic'){
				this.model.profile_pic = base64;
			}
			
			
			//  this.isLoading = false;
			}, error => {
			alert('Error in showing image' + error);
			//  this.isLoading = false;
		});
	}

  backtohome() {
    this.router.navigate(['members/tab1/']);
  }
 async getUser(userId: any) {
  
   const loading = await this.loadingCtrl.create({ message: 'Loading ...' });
    await loading.present();
	
    if (userId === this.user.user_id) {
      this.hide = true;
      this.router.navigate(['/members/tab6']);
    }
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
        this.router.navigate(['/home']);
      }
      this.model = res.user_info;
	  
      if (this.model.blocked.length > 0) {
		this.blocked_id = this.model.blocked[0].id;
         let msg = '';
        let data = {
          blocked_user: this.model.id,
          user_id: this.user.id,
          id: 0
        }
        // $.alert(msg);
        if (this.model.blocked.length === 2) {
          msg = `Both of you have blocked each other ! Do you want to unblock ${this.model.name} ?`;
          for (const it of this.model.blocked) {
            if (it.user_id === this.user.id) {
              data.id = it.id;
            }
          }
          this.confirmUnblockUser(msg, data)
        } else {
          const blocked = this.model.blocked[0];
          console.log(blocked)
          data.id = blocked.id;
          if (blocked.user_id === this.user.id) {
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
	   loading.dismiss();
    });
  }
  getPost(userId: any) {
  
    this.fetch.getuserspost({ user_id: userId,all: 'true' }).subscribe((res) => {
      this.counter++;
      if (this.counter > 2) {
        this.fetch.toggleLoader(1);
      }
      this.path = environment.site_url + 'posts/';
      this.posts = res.data;
	  console.log(this.posts);
	  		this.media=[];
		this.images=[];
		this.vedios=[];
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
  getProducts(userId: any) {
  
    this.fetch.getusersproduct({ user_id: userId,all: 'true' }).subscribe((res) => {
      this.products = res.data;
	  console.log(this.products);

    });
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
        if (this.user.id === follower.user_id) {
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
      user_id: this.user.id,
      follow_user_id: searchedUserId,
      status: this.followStatus
    };
    let SendNotification = false;
    if (this.followStatus === 1) {
      SendNotification = true;
    }
    this.fetch.follow_user(data).subscribe((res) => {
      this.followers = res.data;
      if (SendNotification) {
        const notificationData = {
          user_id: this.user.id,
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

async presentAlertPrompt() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Varification',
     message: ' <p><strong> Procedure :</strong></p> <p> 1.  We need varification document or image of document like Licence,Id card to varify you Account. </p><p> 2. After that we will check your profile. </p><p> 3. And then we will approve your Account. </p> ',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Upload Document',
          handler: () => {
            console.log('Confirm Ok');
			// this.selectImage('upload_doc');
			this.triggerVerification();
          }
        }
      ]
    });

    await alert.present();
  }
	  triggerVerification() {
    $('#uploadDocs').click();
  }
	async  uploadDoc($event: any) {
	  const loading = await this.loadingCtrl.create({ message: 'Uploading...' });
			await loading.present();
    this.selectedfile = $event.target.files[0] as File;
    const fd = new FormData();
    fd.append('user_id', this.user.user_id);
    fd.append('file', this.selectedfile, this.selectedfile.name);
    this.http.post(environment.api_url + 'create_verification_request.php', fd).subscribe(async (res: any) => {

      console.log(res);
      if (res.status === 'success') {
        					const toast = await this.toastCtrl.create({
						message: 'Verification Request Sent Successfully !',
						duration: 2000,
						color: 'dark'
					});
					await toast.present();
					loading.dismiss();
      } else if (res.status === 'error') {
       					const toast = await this.toastCtrl.create({
						message: res.message,
						duration: 2000,
						color: 'dark'
					});
					await toast.present();
					loading.dismiss();
      }
    });
  }
  
  	hideButton1(){
		    $( "#shop-button1" ).hide();
			$( "#hide-button1" ).show();
	}
	showButton1(){
		    $( "#shop-button1" ).show();
			$( "#hide-button1" ).hide();
	}
  
			
}

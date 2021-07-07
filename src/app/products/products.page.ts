import { Component, ViewChild ,  OnInit, HostListener } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
import { NavparamService } from '../services/navparam.service';
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
import { AppState } from '../../app/app.global';
declare var $: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
})
export class ProductsPage implements OnInit {


	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchService,
		private navparamService: NavparamService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private auth: AuthService,
		private datePipe: DatePipe,
		private sanitizer: DomSanitizer,
		private storage: Storage,
		public global: AppState,
		private route: ActivatedRoute,
		public actionSheetController: ActionSheetController
	) {

	}
	
    test: string;
	public user:any;
	public start = 0;
	public limit = 5;
	public model: any = {};
	public userStory: any = [];
	public mystory: any = {};
	public posts: any = [];
	public products: any = [];
	public suggestion: any = [];
	public imageUrl = environment.site_url + 'images/';
	public postUrl = environment.site_url + 'posts/';
	public productUrl = environment.site_url + 'products/';

	public followStatus = 0;
	public oldCartCount = 0;
	public media: any = [];
	public images: any = [];
	public vedios: any = [];
	public sortedpost: any = [];
	public comments: any = [];
	public show = 1;
	public showlikeicon = false;
	public sortedComment: any = [];
	public singlePost: any = [];
	public stories: any = [];
	public mystories: any = [];
	public mstories: any = [];
	public mystoriesthumb: any = [];
	public mystoriestype: any = [];
	public allstories: any = [];
	public story: any = {};
	public post: any = {};
	public liked = false;
	public disliked = false;
	public safeSrc: SafeResourceUrl;
	public selectedfile: File = null;
	public defaultImage = 'assets/images/loader.gif';
	public image = 'assets/images/1.jpg';
	public noimage = 'noimage.jpg';
	public dp: any;
	public opt: any;


	ngOnInit() {
		}
	ionViewWillEnter() {
	
	console.log('enter..');
	  var rdata=this.navparamService.getNavData();
	  this.navparamService.setNavData('');
	  
	 if(rdata){
		  this.products=rdata;
		 } 
	  
     this.user=this.auth.getUser();
	 if(localStorage.getItem('reloadhome')){
	 this.start=0;
		localStorage.removeItem('reloadhome');

		 }


			console.log(this.user);
			this.storage.set('udata', this.user);

			const profilePic = environment.site_url + 'images/' + this.user.profile_pic.thumb_image;
			console.log(profilePic);
			this.dp = profilePic;
			// this.model.profile_pic = profilePic;
			const parameters = {
				auth_id: this.user.user_id,
				start: this.start
			};
			const startTime = (new Date()).getTime();
			this.fetch.getNewHome(parameters).subscribe(res => {

				console.log(res);
				const posts = res['post'];
				const stories = res['stories'];
				this.mstories = res['mystories'];
				this.allstories = res['stories'];


				console.log("mm",this.mystories);
			//	this.getPost(posts);
				this.getProducts();
				
				// this.fetch.toggleLoader(1);
				const endTime = (new Date()).getTime();
				console.log(endTime - startTime);
			}, err => {
				console.log(err);
			});
		
	}
	

	  trimString(input: string, n: number) {
    if (input.length > n) {
      return `${input.substring(0, n)}...`;
    } else {
      return input;
    }
  }
	  getProducts() {
    const start = {
      start: this.start,
      uid: this.user.user_id
    };
    this.fetch.getAllProduct(start).subscribe(res => {
      const data = res.data;
	  this.oldCartCount=res.num;
	  this.global.set("cartCount" , this.oldCartCount);
      if (data.length !== 0) {
        for (const it of data) {
          it.desc = this.trimString(it.description, 60);
          this.products.push(it);
        }
        this.start += 5;
      }
      this.fetch.toggleLoader(1);
    });
	console.log("products",this.products);
  }
	delete_post(postid: number, userid: number, index: number) {
    const data = {
      post_id: postid,
      user_id: userid,
    };

    this.presentAlertdeletepost(data,index);
	
	}
  async presentAlertdeletepost(data,index) {
                const self = this;
      			const alert = await this.alertCtrl.create({
				cssClass: 'my-custom-class',
				header: 'Delete!',
				message: 'Do you really want to <strong>delete</strong> this Post ?',
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
						self.fetch.delete_post(data).subscribe(async (res) => {
            if (res.status === 'success') {
              self.sortedpost.splice(index, 1);
            } else {
              $.alert('Oops ! Something went wrong please try again later');
            }
          });
						//followUser.followStatus = 0;
						//self.confirm_follow(followUser, index);
					}
				}]
			});

    await alert.present();
  }
	follow_user(followUser: any, index: number) {
		const self = this;
		if (followUser.followStatus === 1) {

			const alert = this.alertCtrl.create({
				cssClass: 'my-custom-class',
				header: 'Unfollow!',
				message: 'Do you really want to <strong>Unfollow</strong> ?',
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
						followUser.followStatus = 0;
						self.confirm_follow(followUser, index);
					}
				}]
			});

			//   alert.present();

		} else {
			followUser.followStatus = 1;
			self.confirm_follow(followUser, index);
		}
	}

	private confirm_follow(followUser: any, index: number) {
		const searchedUserId = followUser.user_id;
		const data = {
			user_id: this.user.user_id,
			follow_user_id: searchedUserId,
			status: followUser.followStatus
		};
		let SendNotification = false;
		if (followUser.followStatus === 1) {
			SendNotification = true;
		}
		this.suggestion.splice(index, 1);
		//  $.alert('User followed !');
		this.fetch.follow_user(data).subscribe((res) => {
			const followers = res.data;
			if (SendNotification) {
				const notificationData = {
					user_id: this.user.user_id,
					follow_user_id: searchedUserId,
					msg: 'is now following you.'
				};
				this.fetch.SendNotification(notificationData).subscribe(res1 => {
					console.log(res1);
					// $.alert(JSON.stringify(res1));
				});
			}
		});
	}
 async blockUser(post: any) {
    const data = {
      'blocked_user': post.user_id,
      'user_id': this.user.user_id,
    };
    this.fetch.blockUser(data).subscribe(async (res) => {
      if (res.status === 'success') {
        this.sortedpost = this.sortedpost.filter((el: any) => el.user_id != data.blocked_user);
       				const toast = await this.toastCtrl.create({
					message: 'User Blocked !',
					duration: 2000,
					color: 'dark'
				});
				await toast.present();
      } else {
      				const toast = await this.toastCtrl.create({
					message: 'Something went wrong!!',
					duration: 2000,
					color: 'dark'
				});
				await toast.present();
      }
    }, err => {
      console.log(err);
    });
  }
	async save_post(post: any) {
		const data = {
			user_id: this.user.user_id,
			post_id: post.post_id,
			post_url: post.media[0].uploads,
			post_type: post.media[0].type,
			status: 1,
		};
		console.log(data);
		this.fetch.save_post(data).subscribe(async (res) => {
			console.log(res);
			if (res.status === 'success') {
				post.is_saved = 1;
				// const alert = await this.alertCtrl.create({ message: 'Post Saved', buttons: ['OK'] });
				// await alert.present();

				const toast = await this.toastCtrl.create({
					message: 'Post Saved',
					duration: 2000,
					color: 'dark'
				});
				await toast.present();

			} else {
				//  alert('Oops ! something went wrong please try again later !!');
				const alert = await this.alertCtrl.create({
					message: 'Oops ! something went wrong',
					buttons: ['OK']
				});
				await alert.present();
			}
		});
	}
	async unsave_post(post: any) {
		const data = {
			user_id: this.user.user_id,
			post_id: post.post_id,
			post_url: post.media[0].uploads,
			post_type: post.media[0].type,
			status: 0,
		};
		console.log(data);
		this.fetch.save_post(data).subscribe(async (res) => {
			console.log(res);
			if (res.status === 'success') {
				post.is_saved = 0;
				// const alert = await this.alertCtrl.create({ message: 'Post UnSaved', buttons: ['OK'] });
				///  await alert.present();
				const toast = await this.toastCtrl.create({
					message: 'Post UnSaved',
					duration: 2000,
					color: 'dark'
				});
				await toast.present();
			} else {
				const alert = await this.alertCtrl.create({
					message: 'Oops ! something went wrong',
					buttons: ['OK']
				});
				await alert.present();
			}
		});
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
	show_story(story: any) {
		this.story = story;
		this.show = 2;
		console.log(this.story);
	}
	show_story1(story: any) {
		this.story = story;
		this.show = 2;
		console.log(this.story);
	}
	show_all_likes(id) {

		this.fetch.all_likes({
			post_id: id
		}).subscribe((res) => {
			console.log(res);
			if (res['status'] == "true") {
				this.show = 3;
				this.model.all_likes_of_post = res['message'];
			} else {
				//$.alert('Sorry no likes found');
			}
		});
	}
	show_liked_by(post: any) {
		this.router.navigate(['liked-by/' + post.user_id + '/' + post.post_id]);
	}
	show_all_comment(post: any[], comments: any[]) {
		if (comments.length === 0) {
			//  $.alert('Sorry no comment found');
			return false;
		}
		this.singlePost = post;
		this.sortedComment=[];
		// this.fetch.toggleLoader(0);
		for (const comment of comments) {
			comment.created_date = this.datePipe.transform(new Date(comment.created_date), 'MMM d, y, h:mm:ss a');
			this.sortedComment.push(comment);
			this.show = 4;
			//  this.fetch.toggleLoader(1);
		}
	}
	onFileSelected(event: any) {

		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				const image = e.target.result;
				//  $('#story_pic').attr('src', image);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
		this.selectedfile = event.target.files[0] as File;
		const fd = new FormData();
		fd.append('auth_id', this.user.user_id);
		fd.append('story', this.selectedfile, this.selectedfile.name);

		this.http.post(environment.api_url + 'upload_story.php', fd).subscribe( async (res) => {
			this.mystory.thumbUrl = environment.story_url + res['story_name'];
			this.mystory.type = 'image';
					const toast = await this.toastCtrl.create({
							message: 'Story Updated !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
			this.mystory = res;
			console.log(res);
			this.stories.push(res);
		});
	}

	imageTapped(post: any) {
		this.post = post;
		this.show = 3;
		console.log(this.post);
	}
	like_post(post: any) {
		post.like = Number(post.like);
		let likeType: number;
		if (post.user_liked !== 'like') {
			if ((this.disliked === true && this.liked === false) || post.user_liked === 'dislike') {
				post.dislike = post.dislike - 1;
				this.disliked = false;
			}
			post.user_liked = 'like';
			post.like = post.like + 1;
			likeType = 1;
			this.liked = true;
			this.showlikeicon = true;
			setTimeout(() => {
				this.showlikeicon = false;
			}, 500);

		} else {
			post.user_liked = 'unlike';
			post.like = post.like - 1;
			likeType = 0;
			this.liked = false;
		}
		const data = {
			post_id: post.post_id,
			user_id: this.user.user_id,
			like: likeType,
			type: '0',
		};
		console.log(data);
		this.fetch.like_unlike(data).subscribe((res) => {
			console.log(res);
		});
	}
	hide_story(story: any) {
		this.story = story;
		this.show = 1;
	}

	numTimesLeft = 100;


	loadData(event) {
		setTimeout(() => {
			console.log('Done');
			this.addMoreItems();
			this.numTimesLeft -= 1;
			this.start = this.start + this.limit;
			event.target.complete();
		}, 500);
	}

	addMoreItems() {

		if (this.start > 0) {
this.getProducts();
}
	}

	getPost(data: any) {
		// console.log(data);
		if (data.length !== 0) {
			for (const it of data) {

				const isPresent = this.posts.some((el: any) => {
					return el.id === it.id;
				});
				if (isPresent === false) {
					if (it.user_status === '1') {
						this.posts.push(it);
					}
				}

			}

			this.start = this.start + this.limit;

			/* for (const post of this.sortData) {
		  //console.log(post);
        post.commentCount = post.comment.length;
        if (post.media.length !== 0) {
          this.sortedpost.push(post);
        }
		
      }
	  console.log(this.sortData);*/
			//console.log(this.sortedpost);
			this.sortedpost = data;
			for (const post of this.sortedpost) {
				//console.log(post);
				if (post.description === 'undefined') {
					post.description = '';
				}
				if (post.likedBy.length > 6) {
					post.likedBy.length = 6;
				}

				post.post_created_date = this.datePipe.transform(new Date(post.post_created_date), 'MMM d, y, h:mm:ss a');
				for (const media of post.media) {
					const url = this.postUrl + media.uploads;
					media.url = this.sanitizer.bypassSecurityTrustResourceUrl(url);
					if (typeof media.show === 'undefined') {
						media.show = true;
					}
					this.media.push(media);
					if (media.type === '1') {
						this.images.push(media);
					} else {
						this.vedios.push(media);
					}
				}
			}
			//console.log(this.sortedpost);
			this.sortedpost = this.getUnique(this.sortedpost, 'post_id');
			//console.log(this.sortedpost);
			const postUnique = this.sortedpost.filter((item: any, index: number) => {
				return this.sortedpost.indexOf(item) >= index;
			});
		//	console.log("spt", this.sortedpost);
		}
	}

  showProduct(product: any) {
    localStorage.setItem('currentProduct', JSON.stringify(product));
    this.router.navigate(['/product-details']);
  }

	private getUnique(arr: any, key: any) {

		const unique = arr
			.map((e: {
				[x: string]: any;
			}) => e[key])

			// store the keys of the unique objects
			.map((e: any, i: any, final: {
				indexOf: (arg0: any) => void;
			}) => final.indexOf(e) === i && i)

			// eliminate the dead keys & store unique objects
			.filter((e: string | number) => arr[e]).map((e: string | number) => arr[e]);

		return unique;
	}
	//Move to Next slide
	slideNext(object, slideView) {
		slideView.slideNext(500).then(() => {
			this.checkIfNavDisabled(object, slideView);
		});
	}

	//Move to previous slide
	slidePrev(object, slideView) {
		slideView.slidePrev(500).then(() => {
			this.checkIfNavDisabled(object, slideView);
		});;
	}

	//Method called when slide is changed by drag or navigation
	SlideDidChange(object, slideView) {
		this.checkIfNavDisabled(object, slideView);
	}

	//Call methods to check if slide is first or last to enable disbale navigation  
	checkIfNavDisabled(object, slideView) {
		this.checkisBeginning(object, slideView);
		this.checkisEnd(object, slideView);
	}

	checkisBeginning(object, slideView) {
		slideView.isBeginning().then((istrue) => {
			object.isBeginningSlide = istrue;
		});
	}
	checkisEnd(object, slideView) {
		slideView.isEnd().then((istrue) => {
			object.isEndSlide = istrue;
		});
	}


	removeSuggested(index) {
		// alert(index);

		this.suggestion.splice(index, 1);

		//array.splice(i, 1);
	}

  async addWishlistItem(product) {
    const loading = await this.loadingCtrl.create({ message: 'Saving...' });
    await loading.present();
	  const fd = new FormData();
      fd.append('user_id', this.user.user_id);
      fd.append('product_id', product.id);

    this.fetch.addWishlistItem(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        
		 }else{
		 
		  const toast = await this.toastCtrl.create({ message: "Item Added to Wishlist!", duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        product.is_favourite=true;
        product.wishlist_item_id=data['wid'];
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
  async removeWishlistItem(product) {
    const loading = await this.loadingCtrl.create({ message: 'Removing...' });
    await loading.present();
	  const fd = new FormData();

      fd.append('wid', product.wishlist_item_id);

    this.fetch.removeWishlistItem(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        
		 }else{
		 
		  const toast = await this.toastCtrl.create({ message: "Item Removed from Wishlist!", duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
		product.is_favourite=false;


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
  
  
    async addCartItem(product) {
    const loading = await this.loadingCtrl.create({ message: 'Saving...' });
    await loading.present();
	  const fd = new FormData();
      fd.append('user_id', this.user.user_id);
      fd.append('product_id', product.id);
      fd.append('merchant_id', product.user_id);
      fd.append('qty', '1');

    this.fetch.addCartItem(fd).subscribe(
      // If success
      async (data) => {
	  
	 if(data['status']=='error'){
		  const toast = await this.toastCtrl.create({ message: data['message'], duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        
		 }else{
		 this.global.set("cartCount",data['num']);
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


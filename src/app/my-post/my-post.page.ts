import { Component, ViewChild ,  OnInit, HostListener } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
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
declare var $: any;

@Component({
  selector: 'app-my-post',
  templateUrl: './my-post.page.html',
  styleUrls: ['./my-post.page.scss'],
})
export class MyPostPage implements OnInit {


	constructor(
		private http: HttpClient,
		private router: Router,
		private fetch: FetchService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private auth: AuthService,
		private datePipe: DatePipe,
		private sanitizer: DomSanitizer,
		private storage: Storage,
		private route: ActivatedRoute,
		public actionSheetController: ActionSheetController
	) {

	}
	
    test: string;
	public user = this.auth.getUser();
	public start = 0;
	public limit = 5;
	public model: any = {};
	public userStory: any = [];
	public mystory: any = {};
	public posts: any = [];
	public suggestion: any = [];
	public imageUrl = environment.site_url + 'images/';
	public postUrl = environment.site_url + 'posts/';
	public storyUrl = environment.site_url + 'stories/';
	public followStatus = 0;
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




	//Configuration for each Slider
	slideOptsuggested = {
		initialSlide: 0,
		//slidesPerView: 4
	};

	slideOpts = {
		initialSlide: 0,
		speed: 400
	};
	slideOptsstory = {
		initialSlide: 0,
		speed: 400
	};
	slideOptsProgressbar = {
    pagination: {
        el: '.swiper-pagination',
        type: 'custom',
        renderCustom: (swiper, current, total) => {
            return this.customProgressBar(current, total);
        }
    }
};
slidesDidLoad(slides) {
  slides.startAutoplay();
}
private customProgressBar(current: number, total: number): string {
    const ratio: number = current / total;

    const progressBarStyle: string = 'style=\'transform: translate3d(0px, 0px, 0px) scaleX(' + ratio + ') scaleY(1); transition-duration: 300ms;\'';
    const progressBar: string = '<span class=\'swiper-pagination-progressbar-fill\' ' + progressBarStyle + '></span>';

    let progressBarContainer: string = '<div class=\'swiper-pagination-progressbar\' style=\'height: 4px; top: 6px; width: 100%;\'>';
    progressBarContainer += progressBar;
    progressBarContainer += '</span></div>';

    return progressBarContainer;
}
	async presentActionSheet(post,index) {
		if (this.user.user_id == post.user_id) {
			if (post.is_saved == 0) {
				this.opt = [{
					text: 'Delete Post',
					role: 'destructive',
					icon: 'trash',
					handler: () => {
					    this.delete_post(post.post_id, post.user_id, index);
						console.log('Delete clicked');
						console.log(post);
					}
				}, {
					text: 'Save Post',
					icon: 'bookmark-outline',
					handler: () => {
					    this.save_post(post);
						console.log('Save clicked');
					}
				}, {
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}];

			} else {
				this.opt = [{
					text: 'Delete Post',
					role: 'destructive',
					icon: 'trash',
					handler: () => {
					    this.delete_post(post.post_id, post.user_id, index);
						console.log('Delete clicked');
						console.log(post);
					}
				}, {
					text: 'Unsave Post',
					icon: 'bookmark',
					handler: () => {
					    this.unsave_post(post);
						console.log('Unsave clicked');
					}
				}, {
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}];

			}



		} else {

			if (post.is_saved == 0) {
				this.opt = [{
					text: 'Save Post',
					icon: 'bookmark-outline',
					handler: () => {
					    this.save_post(post);
						console.log('Save clicked');
					}
				}, {
					text: 'Report Post',
					icon: 'flag',
					handler: () => {
					this.presentAlertRadio(post);
						console.log('Report clicked');
					}
				}, {
					text: 'Block User',
					icon: 'close-circle',
					handler: () => {
					  //  this.blockUser(post); 
						//console.log('Block clicked');
					}
				}, {
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}];

			} else {
				this.opt = [{
					text: 'Unsave Post',
					icon: 'bookmark',
					handler: () => {
					    this.unsave_post(post);
						console.log('Unsave clicked');
					}
				}, {
					text: 'Report Post',
					icon: 'flag',
					handler: () => {
					this.presentAlertRadio(post);
						console.log('Report clicked');
					}
				}, {
					text: 'Block User',
					icon: 'close-circle',
					handler: () => {
					  //  this.blockUser(post); 
						//console.log('Block clicked');
					}
				}, {
					text: 'Cancel',
					icon: 'close',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}];

			}

		}

		const actionSheet = await this.actionSheetController.create({
			cssClass: 'my-custom-class',
			buttons: this.opt,
		});

		await actionSheet.present();

	}

	checkc() {

		console.log("check");
	}

async presentAlertRadio(post) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Reason for Reporting!',
      inputs: [
        {
          name: 'Nudity',
          type: 'radio',
          label: 'Nudity',
          value: 'Nudity',
          checked: true
        },
        {
          name: 'Violence',
          type: 'radio',
          label: 'Violence',
          value: 'Violence'
        },
        {
          name: 'Harassment',
          type: 'radio',
          label: 'Harassment',
          value: 'Harassment'
        },
        {
          name: 'False News',
          type: 'radio',
          label: 'False News',
          value: 'False News'
        },
        {
          name: 'Hate Speech',
          type: 'radio',
          label: 'Hate Speech',
          value: 'Hate Speech'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Ok',
          handler: (data) => {
		  this.reportPostConfirmed(post,data);
            console.log('Confirm Ok',data);
          }
        }
      ]
    });

    await alert.present();
  }
  
  reportPostConfirmed(post: any, reason: string) {
    const data = {
      post_id: post.post_id,
      post_owner_id: post.user_id,
      reported_by: this.user.user_id,
      reason: reason
    };
    this.fetch.reportPost(data).subscribe(async (res) => {
      console.log(res);
      if (res.status === 'success') {
		const toast = await this.toastCtrl.create({
							message: 'Post reported !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
      } else {
        if (res.data !== undefined) {
		  const toast = await this.toastCtrl.create({
							message: res.message,
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
        } else {
		  		const toast = await this.toastCtrl.create({
							message: 'Oops ! something went wrong please try again later !!',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
        }
      }
    });
  }
	form = new FormGroup({
		comment: new FormControl('', [
			Validators.required,

		]),
	});

	async onSubmit(postid: any, index: number) {
		// const loading = await this.loadingCtrl.create({ message: 'Registering...' });
		// await loading.present();
		console.log(this.form.value);
		console.log(postid);
		console.log(index);
		const data = {
			post_id: postid,
			user_id: this.user.user_id,
			comment: this.form.value.comment,
			operation: 'add',
			type: '0',
		};

		this.fetch.comment(data).subscribe(
			// If success
			async (res) => {
					if (res.status === 'success') {
						//   $.alert('Comment added successfully');
						res.data.profile_pic = this.user.profile_pic;
						res.data.username = this.user.username;
						//  $('#co_' + postid).val('');
						this.sortedpost[index].commentCount++;
						// this.sortedpost[index].comment.push(res.data);
						this.sortedpost[index].comment.unshift(res.data);
						const toast = await this.toastCtrl.create({
							message: 'Comment Added',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
						this.form.reset();
					} else {
						// $.alert('Oops ! something went wrong please try again later !!');
					}

				},
				// If there is an error
				async () => {
					const alert = await this.alertCtrl.create({
						message: 'There is an error',
						buttons: ['OK']
					});
					await alert.present();
				}
		);
	}

	ngOnInit() {
		}
	ionViewWillEnter() {

	 if(localStorage.getItem('reloadhome')){
	 this.start=0;
		localStorage.removeItem('reloadhome');

		 }

		if (this.user === null) {
			this.router.navigate(['/login']);
		} else {
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
			this.fetch.getNewMyPosts(parameters).subscribe(res => {

				console.log(res);
				const posts = res['post'];
				

				const suggested = res['suggest_friends'];
				this.getPost(posts);

		
				// this.fetch.toggleLoader(1);
				const endTime = (new Date()).getTime();
				console.log(endTime - startTime);
			}, err => {
				console.log(err);
			});
		}
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
			const parameters = {
				auth_id: this.user.user_id,
				start: this.start,
				select: 'one'
			};
			this.fetch.getNewMyPosts(parameters).subscribe(res => {
				//this.model.test = 1;
				const posts = res['post'];
				var self = this;
				posts.forEach(function(value) {
					self.sortedpost.push(value);
				});
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
				//this.sortedpost.push(posts);
				console.log(this.sortedpost);
				//this.getPost(posts);
			}, err => {
				console.log(err);
			});
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



}

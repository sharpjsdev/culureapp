import { AuthService } from '../services/auth.service';
import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media/ngx';

import { IonSlides } from '@ionic/angular';
declare var $: any;
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {

  constructor(private auth: AuthService , private http: HttpClient, private router: Router, private fetch: FetchService,private sanitizer: DomSanitizer,private streamingMedia: StreamingMedia) { }
  
  public user = this.auth.getUser();
  public suggestedFriends: any[];
  public search: any;
  public searchType=0;
  public selectSearchType=false;
  public searchResult: any[];
  public showlist = false;
  public showUserList = false;
  public showPostList = false;
  public imagePath = environment.site_url + 'images/';
  public count = 6;
  public model: any = {};
  public path: any;
  public posts: any = [];
  public media: any = [];
  public images: any = [];
  public vedios: any = [];
  public defaultImage = 'assets/images/loader.gif';
  public postUrl = environment.site_url + 'posts/';
  public imageUrl = environment.site_url + 'posts/';
 public categoryArray = ['Style', 'Shopping', 'Art', 'Animals', 'Beauty', 'Tv', 'Fashion', 'Politics', 'Music', 'Games', 'Food', 'Fitness', 'Current Events', 'Economics'];
 
    @ViewChild('slides', { static: true }) slider: IonSlides;
   segment = 0;
  async segmentChanged() {
    await this.slider.slideTo(this.segment);
	this.searchType=this.segment;
  }

  async slideChanged() {
    this.segment = await this.slider.getActiveIndex();
	this.searchType=this.segment;
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
          this.getAllPosts(58);
	}
   ngOnInit() {
    if (localStorage.getItem('is_loggin') === null || localStorage.getItem('is_loggin') !== 'true') {
      this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
 
      const id = {
        user_id: this.user.user_id
      };
      this.fetch.friend_suggestion(id).subscribe((res) => {
        this.suggestedFriends = res.data;
        console.log(this.suggestedFriends);
        this.suggestedFriends = this.suggestedFriends.filter((friend) => {
          if (friend.image.thumb_image !== 'noimage.jpg') {
            return true;
          }
        });
        this.fetch.toggleLoader(1);
      });
	   
    }
  }

  onSearch() {
    if (this.search !== '') {
      const data = {
        name: this.search
      };
      this.fetch.search_user(data).subscribe(res => {
	  if(res.status=="success"){
	  if(res.users.length>0){
		  		          for (const user of res.users) {
          if (user.profile_pic === null) {
            user.profile_pic = { thumb_image: 'noimage.jpg' };
          }
        }
		this.searchResult = res.users;
        this.showUserList = true;
		  
		  }

        
	  }
      });
    } else {
      this.showUserList = false;
    }
  }
  onSearchPost() {
    if (this.search !== '') {
      const data = {
        name: this.search
      };
    this.fetch.search_post({ name: this.search,all: 'true' }).subscribe((res) => {
      this.count++;
      if (this.count > 2) {
        this.fetch.toggleLoader(1);
      }
      this.path = environment.site_url + 'posts/';
      this.posts = res.data;
	  console.log(this.posts);
	  		this.media=[];
		this.images=[];
		this.vedios=[];
		var chk=1;
      for (const post of this.posts) {
        for (const media of post.media) {
		if(chk==1){
			media.className='tall';
		}else if(chk==2){
			media.className='wide';
		}else if(chk==3){
			media.className='';
		}else if(chk==4){
			media.className='wide';
		}else if(chk==5){
			media.className='';
		}else if(chk==6){
			media.className='wide';
		}else if(chk==7){
			media.className='tall';
		}else if(chk==8){
			media.className='';
		}else if(chk==9){
			media.className='big';
			 chk=0;
		}
        chk++;
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
	  this.showUserList = false;
	  this.showPostList = true;
    });
    } else {
      this.showPostList = false;
    }
  }
    categoryPost(category: any) {
    if (category !== '') {

    this.fetch.getcategoryposts({ category: category,all: 'true' }).subscribe((res) => {
      this.count++;
      if (this.count > 2) {
        this.fetch.toggleLoader(1);
      }
      this.path = environment.site_url + 'posts/';
      this.posts = res.data;
	  console.log(this.posts);
	  		this.media=[];
		this.images=[];
		this.vedios=[];
		var chk=1;
      for (const post of this.posts) {
        for (const media of post.media) {
				if(chk==1){
			media.className='tall';
		}else if(chk==2){
			media.className='wide';
		}else if(chk==3){
			media.className='';
		}else if(chk==4){
			media.className='wide';
		}else if(chk==5){
			media.className='';
		}else if(chk==6){
			media.className='wide';
		}else if(chk==7){
			media.className='tall';
		}else if(chk==8){
			media.className='';
		}else if(chk==9){
			media.className='big';
			 chk=0;
		}
        chk++;

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
	  this.showUserList = false;
	  this.showPostList = true;
    });
    } else {
		this.showUserList = false;
      this.showPostList = false;
    }
  }
  getAllPosts(userId: any) {
  
    this.fetch.getallposts({ user_id: userId,all: 'true' }).subscribe((res) => {
      this.count++;
      if (this.count > 2) {
        this.fetch.toggleLoader(1);
      }
      this.path = environment.site_url + 'posts/';
      this.posts = res.data;
	  console.log(this.posts);
	  		this.media=[];
		this.images=[];
		this.vedios=[];
		var chk=1;
      for (const post of this.posts) {
        for (const media of post.media) {
		
		if(chk==1){
			media.className='tall';
		}else if(chk==2){
			media.className='wide';
		}else if(chk==3){
			media.className='';
		}else if(chk==4){
			media.className='wide';
		}else if(chk==5){
			media.className='';
		}else if(chk==6){
			media.className='wide';
		}else if(chk==7){
			media.className='tall';
		}else if(chk==8){
			media.className='';
		}else if(chk==9){
			media.className='big';
			 chk=0;
		}
        chk++;
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
	  this.showUserList = false;
    });
  }
  hideSearch() {
    if (this.showlist === true) {
      this.showlist = false;
    }
  }

  showUser() {
    // console.log(this.searchResult);
    if (this.searchResult.length > 0) {
      this.showUserList = true;
    }
  }

  showProfile(id: any) {
    this.router.navigate(['/show-profile/' + id]);
  }

  showPosts(category: any) {
    alert(category);
  }
  
  searchBarOnFocus(){
	 // alert("focus"); 
	  this.selectSearchType=true;
  }
  
  selectType(type: any){
	//  alert(type); 
	 
	  this.searchType=type;
	  this.selectSearchType=false;
	  this.showUserList = false;
  }
  onBlur(){
  // alert("input lost focus");
   this.selectSearchType=false;
}
}

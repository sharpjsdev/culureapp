<ion-header>
  <ion-toolbar color="#fff">
   <ion-buttons  slot="start">
           <ion-back-button color="gray" defaultHref="/members/tab1" text=""></ion-back-button>

    </ion-buttons>
		         <ion-input
		*ngIf="searchType==0"	 
        type="text"
        [(ngModel)]="search"
        (keyup)="onSearchPost()"
        class="form-control post_bottom_comment_2"
        placeholder="Search Posts"
		(ionFocus)="searchBarOnFocus()"
		
      ></ion-input>
       <ion-input
	   *ngIf="searchType==1"	
        type="text"
        [(ngModel)]="search"
        (keyup)="onSearch()"
        class="form-control post_bottom_comment_2"
        placeholder="Search Users"
		(ionFocus)="searchBarOnFocus()"
		
      ></ion-input>
	  

	  
	  
  </ion-toolbar>
</ion-header>
<ion-content color="white" padding >
      <ion-grid *ngIf="selectSearchType" class="suggest1" padding>
      <ion-row class="forecast_container" >
	  		 
			                <ion-button small shape="round" fill="outline" class="merchant-btn" (click)="selectType(0)">Search Posts</ion-button>
       
        
			                <ion-button small shape="round" fill="outline" class="merchant-btn" (click)="selectType(1)">Search Users</ion-button>
       


  </ion-row>
   </ion-grid>
      <ion-grid *ngIf="searchType==0" class="suggest1" padding>
      <ion-row class="forecast_container" >
	           <ion-col>
			                <ion-button small shape="round" fill="outline" class="merchant-btn" (click)="getAllPosts(58)">All</ion-button>
         </ion-col>
         <ion-col *ngFor="let cat of categoryArray">
			                <ion-button small shape="round" fill="outline" class="merchant-btn" (click)="categoryPost(cat)">{{cat}}</ion-button>
         </ion-col>

  </ion-row>
   </ion-grid>
<ion-grid  *ngIf="showUserList">	
	<p style="color: #fe1743;
margin: 0px 0px 0px 15px;">Search Results</p>
  <ion-list *ngFor="let user of searchResult">
	  <ion-list-header (click)="showProfile(user.id)">
      <ion-avatar item-start >
        <img src="{{ imagePath }}{{ user.profile_pic.thumb_image }}" >
      </ion-avatar>
	  	  <ion-label style="margin:15px;">
      <h2 (click)="showProfile(user.id)">{{user.name}}</h2>
      <p>{{user.username}}</p>
	   </ion-label>
  
    </ion-list-header>
  </ion-list>
</ion-grid>

	  	  <ion-grid *ngIf="searchType==0">
       <ion-row>
		  <ion-col size="4" *ngFor="let post of media; let s = index" class="ion-no-padding">
      <div style="height:110px !important;">
       <img *ngIf="post.type=='1'" ionImgViewer  scheme="dark" [slideOptions]="{ allowTouchMove:false}" style="object-fit:cover;width:100%;height:100%;" src="{{imageUrl}}{{post.uploads}}">
	   
	   <video (click)="playVdo(post.uploads)" *ngIf="post.type=='2'"  style="height:100%;width:100%;object-fit:cover;object-position:top;" class="stories_video" autoplay [muted]="true" >
            <source src="{{imageUrl}}{{post.uploads}}" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
		   <img *ngIf="post.type=='2'" (click)="playVdo(post.uploads)" style="object-fit:cover;width:35%;position:absolute;left:25%;top:20%;z-index:+999999;" src="assets/images/vdobtn.png">
		  
		 </div>
        </ion-col>
     </ion-row>
</ion-grid>
  </ion-content> 

	

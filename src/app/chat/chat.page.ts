import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
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
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit, OnDestroy {


  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private router: Router, private fetch: FetchService, private sanitizer: DomSanitizer, private datePipe: DatePipe,private auth: AuthService, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  public user: any = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public model: any = [];
  public show = 1;
  public chatter: any = {};
  public interval: any;
  public oldCount = 0;
  public notificationCount = 0;
  public followers: any = [];
  public following: any = [];
  public contacts: any = [];
  segment='I Liked';
  
  ngOnInit() {
    if (this.user === null || localStorage.getItem('is_loggin') !== 'true') {
      this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      this.messageNotification();
      this.getFollowers();
      this.interval = setInterval(() => { this.messageNotification(); }, 2000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  show_div(state: number) {
    this.show = state;
  }

  show_chat(item: any) {
    this.fetch.changeUser(item);
    if (this.show === 2) {
      item.thumb_image = item.image.thumb_image;
    }
    console.log(item);
    localStorage.setItem('chatter', JSON.stringify(item));
    this.router.navigate(['/chat-box/' + item.user_id]);
  }

  getAllChatHistory() {
    this.fetch.getAllChatHistory({ user_id: this.user.user_id }).subscribe(res => {
		console.log(res);
      const model = res.data;
      this.fetch.toggleLoader(1);
      for (const i of model) {
        i.date = this.datePipe.transform(new Date(i.date), 'MMM d, y, h:mm a');
      }
      this.model = model;
      this.model.sort((a: any, b: any) => {
        const date1 = new Date(b.date) as any;
        const date2 = new Date(a.date) as any;
        return new Date(date1 - date2);
      });
    });
	
  }

  messageNotification() {
    this.fetch.messageNotification({ user_id: this.user.user_id }).subscribe(res => {
      const count = res.data.count;
      if (parseInt(count, 10) === 0 && this.notificationCount === 0) {
        this.getAllChatHistory();
        this.notificationCount = 1;
        return;
      }
      if (count > this.oldCount) {
        this.oldCount = count;
        this.getAllChatHistory();
      }
    });
  }

  // get followers and following both
  getFollowers() {
    this.fetch.get_followers({ user_id: this.user.user_id }).subscribe((res) => {
      this.followers = res.data;
      localStorage.setItem('followers', JSON.stringify(this.followers));
    });

    this.fetch.get_following({ user_id: this.user.user_id }).subscribe((res) => {
      this.following = res.data;
      localStorage.setItem('following', JSON.stringify(this.following));
    });
    // console.log(this.contacts);
    this.mergeFollowersAndFollowing();
  }

  mergeFollowersAndFollowing() {
    const followers = localStorage.getItem('followers');
    const following = localStorage.getItem('following');
    this.followers = JSON.parse(followers);
    this.following = JSON.parse(following);
    if (this.followers === null && this.following === null) {
      return;
    }
    if (this.followers.length > this.following.length) {
      this.contacts = this.followers;
      if (this.following !== null) {
        for (const i of this.following) {
          this.contacts.push(i);
        }
      }
    } else {
      this.contacts = this.following;
      if (this.followers !== null) {
        for (const i of this.followers) {
          this.contacts.push(i);
        }
      }
    }
    // console.log(this.contacts);
    this.contacts = this.getUnique(this.contacts, 'user_id');
    console.log(this.contacts);
  }

  private getUnique(arr: any, key: any) {

    const unique = arr
      .map((e: { [x: string]: any; }) => e[key])

      // store the keys of the unique objects
      .map((e: any, i: any, final: { indexOf: (arg0: any) => void; }) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e: string | number) => arr[e]).map((e: string | number) => arr[e]);

    return unique;
  }

}


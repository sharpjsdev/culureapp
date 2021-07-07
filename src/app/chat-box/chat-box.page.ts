import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { async } from '@angular/core/testing';
import { Component, OnInit,ViewChild, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { LoadingController, AlertController,ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { Response } from 'selenium-webdriver/http';
import { IonContent } from '@ionic/angular';
declare var paypal: any;
declare var $: any;

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.page.html',
  styleUrls: ['./chat-box.page.scss'],
})
export class ChatBoxPage implements OnInit, OnDestroy {

  @ViewChild(IonContent) content: IonContent;
  constructor(private http: HttpClient, private router: Router, private fetch: FetchService, private sanitizer: DomSanitizer, private datePipe: DatePipe,private auth: AuthService, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  public user: any = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public defaultImage = environment.site_url + 'images/noimage.jpg';
  public model: any = [];
  public show = 1;
  public chatter: any = {};
  public chat: any = [];
  public reply: any;
  public chatlen = 0;
  public chatStatus = 0;
  public interval: any;

  ngOnInit() {
    if (this.user === null || localStorage.getItem('is_loggin') !== 'true') {
      this.router.navigate(['/login']);
    } else {
    //  $('#spinner_2').show();
    //  $('#blur').addClass('hide_body');
      const chatter = localStorage.getItem('chatter');
      this.chatter = JSON.parse(chatter);
    //  $('body').addClass('noflow');
      this.getChatHistory();
      setTimeout(() => {   this.scrollToBottom(); }, 1500);
      this.interval = setInterval(() => { this.getChatHistory(); }, 2000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  getChatHistory() {
    const data = {
      login_id: this.user.user_id,
      other_user_id: this.chatter.user_id
    };
    this.fetch.getChatHistory(data).subscribe(res => {
    //  $('#spinner_2').hide(1000);
    //  $('#blur').removeClass('hide_body');
      if (res.data.length > this.chatlen || res.count > this.chatStatus) {
        this.updateReadingStatus();
        this.chat = res.data;
		console.log(this.chat);
        this.chatStatus = res.count;
        this.chatlen = this.chat.length;
        for (const i of this.chat) {
          i.sending_date = this.datePipe.transform(new Date(i.sending_date), 'MMM d, y, h:mm a');
        }
        this.scrollToBottom();
      }
    });
  }

  updateReadingStatus() {
    const data = {
      sender_user_id: this.chatter.user_id,
      receiver_user_id: this.user.user_id
    };

    this.fetch.updateReadingStatus(data).subscribe(res => {
      if (res.status === 'success') {
        console.log('Status updated');
      }
    });
  }
  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    }, 100);
  }

  send_messge() {
    if (this.reply !== '') {
      let srId: string;
      const reply = this.reply;
      if (this.user.user_id < this.chatter.user_id) {
        srId = this.user.user_id + ',' + this.chatter.user_id;
      } else {
        srId = this.chatter.user_id + ',' + this.user.user_id;
      }
      this.reply = '';

      const data = {
        sender_user_id: this.user.user_id,
        receiver_user_id: this.chatter.user_id,
        sender_reciever_id: srId,
        message_text: reply,
      };

      const data2 = {
        sender_user_id: this.user.user_id,
        receiver_user_id: this.chatter.user_id,
        sender_reciever_id: srId,
        message: reply,
        sending_date: this.currentDateTime(),
      };

      this.chat.push(data2);
      this.scrollToBottom();

      this.fetch.sendMessage(data).subscribe(res => {
        if (res.status === 'error') {
        //  $.alert('Oops ! Something went wrong please try again later !');
        }
      });
    }
  }

  currentDateTime() {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateTime = date + ' ' + time;
    dateTime = this.datePipe.transform(new Date(dateTime), 'MMM d, y, h:mm a');
    return dateTime;
  }

}

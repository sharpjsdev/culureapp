import { async } from '@angular/core/testing';
import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Response } from 'selenium-webdriver/http';

declare var $: any;
declare let paypal: any; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private http: HttpClient, private router: Router, private fetch: FetchService, private auth: AuthService) { }

  public user: any = this.auth.getUser();
  public login: any;
  public show = false;
  public oldCount = 0;
  public newCount = 0;
  public interval: any;
  public addScript = false;
  public finalAmount = 1.99;
  public paypalLoad = true;
  public subEndDate: any;


  ngOnInit() {
    window.scrollTo(0, 0);
    if (localStorage.getItem('is_loggin') === null) {
      this.login = 'false';
      this.show = false;
    } else {
      this.login = localStorage.getItem('is_loggin');
      this.show = true;

      if (localStorage.getItem('subcription') === 'true') {
        let subDate = this.user.subscription_end_date;
        subDate = new Date(subDate);
        this.subEndDate = new Date(+subDate + 30 * 86400000);
        this.subEndDate = this.subEndDate.toDateString();
      }
      this.interval = setInterval(() => { this.messageNotification(); }, 2000);
    }
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }



  messageNotification() {
    this.fetch.messageNotificationHeader({ user_id: this.user.user_id }).subscribe(res => {
      this.newCount = res.data.count;
      this.oldCount = this.newCount;
    }, err => {
      console.log(err);
    });
  }


}

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
  selector: 'app-subscription',
  templateUrl: './subscription.page.html',
  styleUrls: ['./subscription.page.scss'],
})
export class SubscriptionPage implements OnInit{

  constructor(private http: HttpClient, private router: Router, private fetch: FetchService,private auth: AuthService) { }

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

  paypalConfig = {
    env: 'sandbox',
    client: {
      sandbox: 'AVwC__hdK2iJMsZJ6kH7zg8_4ngB2SnE6w1vO4-WktV1rbxYT8tZY5BjwTXBG_ywSyQkz07hkLfICJd_',
	  production: 'AaGtz8sJ4SY6ceW1SylhZ40GUc2IeD-lFwLYcV9T4THaO4FFNqIjuIOJ2NFcGzqLwIRkoCU9cJsHnh3H'
    },
    commit: true,
    style: {
      color: 'silver',
      shape: 'pill',
      label: 'paypal',
      height: 40,
      size: 'responsive',
      tagline: false,
      fundingicons: true
    },
    payment: (data: any, actions: any) => {

      return actions.payment.create({
        payment: {
          transactions: [
            { amount: { total: this.finalAmount, currency: 'USD' } }
          ]
        }
      });
    },
    onAuthorize: (data: any, actions: any) => {
      return actions.payment.execute().then((payment) => {
        console.log(payment);
        let data1: any;
        if (localStorage.getItem('subcription') === 'true') {
          data1 = {
            user_id: this.user.user_id,
            current_status: 1,
            status: 1
          };
        } else {
          data1 = {
            user_id: this.user.user_id,
            status: 1
          };
        }
        this.fetch.updateSubscription(data1).subscribe(res => {
          if (res.status === 'success') {
            alert('Subscription Activated!');
            if (localStorage.getItem('subcription') === 'true') {
              let subDate = this.user.subscription_end_date;
              subDate = new Date(subDate);
              this.subEndDate = new Date(+subDate + 30 * 86400000);
              this.subEndDate = this.subEndDate.toDateString();
            } else {
              localStorage.setItem('subcription', 'true');
              const today = new Date();
              today.setDate(today.getDate() + 30);
              this.subEndDate = today.toDateString();
            }
          }
        });
      });
    }
  };

  ngOnInit() {
  }

  ngOnDestroy() {
    $('body').removeClass('modal-open');
    $('.modal-backdrop').remove();
  }

  ngAfterViewChecked(): void {
    if (!this.addScript) {
      this.addPaypalScript().catch(error => {
        console.log(error);
      }).then(() => {
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      });
    }
  }

  addPaypalScript() {
    this.addScript = true;
    return new Promise((resolve, reject) => {
      const loaded = this.isScriptLoaded('https://www.paypalobjects.com/api/checkout.js');
      if (!loaded) {
        const scripttagElement = document.createElement('script');
        scripttagElement.src = 'https://www.paypalobjects.com/api/checkout.js';
        scripttagElement.onload = resolve;
        document.body.appendChild(scripttagElement);
      } else {
        reject('Script is already loaded');
      }
    });
  }

  isScriptLoaded(src: any) {
    const check = document.querySelector('script[src="' + src + '"]');
    return check ? true : false;
  }




  toggleModel(state: string) {
    $('#myModalSub').modal(state);
  }

  messageNotification() {
    this.fetch.messageNotificationHeader({ user_id: this.user.user_id }).subscribe(res => {
      this.newCount = res.data.count;
      this.oldCount = this.newCount;
    }, err => {
      console.log(err);
    });
  }

  payOther() {
    console.log('pay other');
  }





}

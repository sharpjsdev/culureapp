import { async } from '@angular/core/testing';
import { Component, OnInit, AfterViewChecked, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { LoadingController, AlertController,ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Response } from 'selenium-webdriver/http';
declare var paypal: any;
declare var $: any;

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  constructor(private http: HttpClient, private router: Router, private fetch: FetchService,private auth: AuthService, private alertCtrl: AlertController, private toastCtrl: ToastController,private datePipe: DatePipe) { }

  public user: any = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public model: any = {};
  public notification: any = [];
  
  ngOnInit() {
    if (this.user === null) {
    //  this.router.navigate(['/login']);
    } else {
      this.fetch.toggleLoader(0);
      this.fetch.getNotification(this.user.user_id).subscribe((res) => {
		  console.log(res);
        if (res.status !== 'error') {
          const data = res.data;
          if (data.length > 0) {
            for (const item of data) {
              item.created_at = this.datePipe.transform(new Date(item.created_at), 'MMM d, y');
            }
            this.notification = data;
          }
        }
      });

    }

  }
    async confirmDelete(id: any, index: any) {
		        const self = this;
      			const alert = await this.alertCtrl.create({
				cssClass: 'my-custom-class',
				header: 'Delete!',
				message: 'Do you really want to Delete ?',
				buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {

					}
				}, {
					text: 'Okay',
					handler: () => {
				
          self.fetch.deleteNotification(id).subscribe((res) => {
            if (res.status === 'success') {
              self.notification.splice(index, 1);
            } else {
              $.alert('Oops ! Something went wrong please try again later');
            }
          }, err => {
            console.log(err);
          });
					}
				}]
			});

    await alert.present();
		
  }
  

  showUser(userId: string) {
    this.router.navigate(['show-profile/' + userId]);
  }

}


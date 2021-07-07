import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoadingController, AlertController,ToastController } from '@ionic/angular';

declare var $: any;
@Component({
  selector: 'app-blocked-user',
  templateUrl: './blocked-user.page.html',
  styleUrls: ['./blocked-user.page.scss'],
})
export class BlockedUserPage implements OnInit {


 constructor(private http: HttpClient, private router: Router, private fetch: FetchService,private auth: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer, private alertCtrl: AlertController, private toastCtrl: ToastController) { }

  public user = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public model: any = {};

  ngOnInit() {
	if (localStorage.getItem('is_loggin') === null || this.user === null) {
		this.router.navigate(['/login']);
	} else{
		this.fetch.toggleLoader(0);
		this.fetch.blocked_user_list({ user_id: this.user.user_id }).subscribe((res) => {
			console.log(res);
			if(res['status'] == "success"){
				this.model.noblock = "no";
				this.model.blocked_users = res['data']; 
				console.log(this.model.blocked_users);
			}else{
				this.model.blocked_users = null; 
			}
			if(res['status'] == "error"){
				this.model.noblock = "noblock";
			}
		});
	}
  }
  unblock_user(id,block_id){
		let data = {
			blocked_user: id,
			user_id: this.user.user_id,
			id: block_id
        }
		let msg = `Do you want unblock him`;
		this.confirmUnblockUser(msg, data);
  }

  
    async confirmUnblockUser(msg: string, data: any) {
		const self = this;
      			const alert = await this.alertCtrl.create({
				cssClass: 'my-custom-class',
				header: 'Unblock!',
				message: msg,
				buttons: [{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: (blah) => {
					    self.router.navigate(['/members/tab1']);
						console.log('Confirm Cancel: blah');
					}
				}, {
					text: 'Okay',
					handler: () => {
						console.log('Confirm Okay');
						this.fetch.unBlockuser(data).subscribe(async (res) => {
            if (res.status === 'success') {
				const toast = await this.toastCtrl.create({
							message: 'User Unblocked !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
			  this.ngOnInit();
            } else {
			const toast = await this.toastCtrl.create({
							message: 'Oops ! Something went wrong please try again later',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
            //  $.alert('Oops ! Something went wrong please try again later');
            }
          });
						//followUser.followStatus = 0;
						//self.confirm_follow(followUser, index);
					}
				}]
			});

    await alert.present();
  }
  

  show_profile(post: any) {
    this.router.navigate(['show-profile/' + post.blocked_user]);
  }

}


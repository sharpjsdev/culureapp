import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingController, ToastController } from '@ionic/angular';
import { Md5 } from 'ts-md5/dist/md5';
declare var $: any;

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {


  constructor(private http: HttpClient,
	  private router: Router,
	  private loadingCtrl: LoadingController,
	  private toastCtrl: ToastController,
	  private fetch: FetchService,
	  private auth: AuthService) { }
  
  public user = this.auth.getUser();
  public model: any = {};
  public match = false;
  public userdata: any;
  public hash: any;

  ngOnInit() {
  console.log(this.user);
    const id = {
          auth_id: this.user.user_id,
        };

        this.fetch.getuser(id).subscribe((nres) => {
		console.log(nres);
          localStorage.setItem('password', nres.user_info.password);
        });
  }

  onKey() {
    const currentpassword = localStorage.getItem('password');
console.log(currentpassword);
    if (this.model.password === '') {
      return this.match = false;
    }

    this.hash = Md5.hashStr(this.model.password);
console.log(this.hash);
    if (currentpassword !== this.hash) {
      return this.match = true;
    } else {
      this.match = false;
    }
  }

  async changepassword() {
  			const loading = await this.loadingCtrl.create({ message: 'Saving...' });
			await loading.present();

    const data = {
      auth_id: this.user.user_id,
      password: this.hash,
      new_password: this.model.new_password,
      c_new_password: this.model.c_new_password
    };

    this.fetch.change_password(data).subscribe( async (res) => {
      if (res.status === 'success') {
    //    $.alert('Password updated Successfully !');
        localStorage.removeItem('password');
        const toast = await this.toastCtrl.create({
						message: 'Password updated Successfully !',
						duration: 2000,
						color: 'dark'
					});
					await toast.present();
					loading.dismiss();
					
        const id = {
          auth_id: this.user.user_id,
        };

        this.fetch.getuser(id).subscribe((nres) => {
          localStorage.setItem('password', nres.user_info.password);
        });
this.router.navigate(['members/tab1']);
      } else {
	  const toast = await this.toastCtrl.create({
						message: res.message,
						duration: 2000,
						color: 'dark'
					});
					await toast.present();
					loading.dismiss();
       // $.alert(res.message);
      }
    });
  }
}

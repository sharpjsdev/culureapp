import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
 
  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
	private storage: Storage,
  ) {
             let check=localStorage.getItem('is_loggin'); 
			 if(check=='true'){
			 this.router.navigateByUrl('/members');
				 }
  }
 
 form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  });
 

  
  async onSubmit() {
  
    const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
    await loading.present();

    this.authService.login(this.form.value).subscribe(
      async token => {
		if(token){
			 localStorage.setItem('token', token);
			 localStorage.setItem('is_loggin', 'true');
			 //this.storage.setItem('token', token);
             loading.dismiss();
			 this.router.navigateByUrl('/members');
			}else{
			const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
			
			}
	 
      },
      async () => {
        const alert = await this.alertCtrl.create({ message: 'Login Failed', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    );
  }
  
  
  // login11() {
    // this.auth.login(this.credentials).subscribe(async res => {
      // if (res) {
        // this.router.navigateByUrl('/members');
      // } else {
        // const alert = await this.alertCtrl.create({
          // header: 'Login Failed',
          // message: 'Wrong credentials.',
          // buttons: ['OK']
        // });
        // await alert.present();
      // }
    // });
  // }
 
}
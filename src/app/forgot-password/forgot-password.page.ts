import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  public emails: any = [];
  public showlogin = 1;
  public user: any;
  
  constructor(
    private authService: AuthService,
	private fetch: FetchService,
    private router: Router,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
  ) {}

  ngOnInit() {
    if (localStorage.getItem('is_loggin') === 'true') {
      this.router.navigate(['/home']);
	  } else {
      this.fetch.get_email().subscribe((res) => {
        this.emails = res.email;
        console.log(this.emails);
      });
    }
  }
  
  
  form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
  
  });
   form1 = new FormGroup({
  uid: new FormControl('', [

    ]),
	   
    a: new FormControl('', [
      Validators.required,
    ]),
	b: new FormControl('', [
      Validators.required,
    ]),
	c: new FormControl('', [
      Validators.required,
 
    ]),
	d: new FormControl('', [
      Validators.required,

    ]),
	e: new FormControl('', [
      Validators.required,
 
    ]),
	f: new FormControl('', [
      Validators.required,

    ]),
  
  });
  form2 = new FormGroup({
   new_password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
     c_new_password: new FormControl('', [
         Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16),
      ]),
  
  });

  moveFocus(event, nextElement, previousElement) {
    if (event.keyCode == 8 && previousElement) {
      previousElement.setFocus();
    } else if (event.keyCode >= 48 && event.keyCode <= 57) {
      if (nextElement) {
        nextElement.setFocus();
      }
    } else {
      event.path[0].value = '';
    }

  }
  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Sending Email ...' });
    await loading.present();

    this.fetch.forget_password(this.form.value).subscribe(
      async res => {
		if(res.status=='success'){
             loading.dismiss();
			 this.showlogin = 2;
             this.user = res.data;

			}else{
			const alert = await this.alertCtrl.create({ message: 'Invalid Email', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
			
			}
	 
      }
    );
  }
  
  
   async verifyOtp() {
   
    const loading = await this.loadingCtrl.create({ message: 'Verifying OTP ...' });
    await loading.present();
    
	let otpno=this.form1.value.a+this.form1.value.b+this.form1.value.c+this.form1.value.d+this.form1.value.e+this.form1.value.f;
	console.log(otpno);
    const data = { otp: otpno, user_id: this.user.user_id };
    this.fetch.check_otp(data).subscribe(
		async res => {
		if(res.status=='success'){
             loading.dismiss();
			 this.showlogin = 3;
           
		
			}else{
			const alert = await this.alertCtrl.create({ message: 'Invalid OTP', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
			
			}
	 
      }
    );
  }
      async resetPassword() {
   
    const loading = await this.loadingCtrl.create({ message: 'Setting New Password ...' });
    await loading.present();
    
	let p1=this.form2.value.new_password;
	let p2=this.form2.value.c_new_password;
	if(p1!=p2){
		const alert = await this.alertCtrl.create({ message: 'Password Not Match', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
		
		}else{
	if(this.user.user_id){
    const pdata = { password: p1 , user_id: this.user.user_id };
    this.fetch.reset_password(pdata).subscribe(
		async res => {
		if(res.status=='success'){
             loading.dismiss();
			 this.showlogin = 1;
           
		
			}else{
			const alert = await this.alertCtrl.create({ message: 'Invalid Password', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
			
			}
	 
      }
    );
	}else{
		const alert = await this.alertCtrl.create({ message: 'Please Retry', buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
		
		}
  }
	  }
  

}


 

 
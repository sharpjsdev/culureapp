import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AlertController, ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {

constructor(
    private authService: AuthService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController
  ) { }

  form = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
  email: new FormControl('', [
			Validators.required,
			Validators.email,
		]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    gender: new FormControl('', [
      Validators.required,
    ]),
	    username: new FormControl('', [
      Validators.required,
    ]),

    password: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
	    birthday: new FormControl('', [
      Validators.required,
    ]),
  });

  async onSubmit() {
    const loading = await this.loadingCtrl.create({ message: 'Registering...' });
    await loading.present();
    this.authService.register(this.form.value).subscribe(
      // If success
      async () => {
        const toast = await this.toastCtrl.create({ message: 'User Created', duration: 2000, color: 'dark' });
        await toast.present();
        loading.dismiss();
        this.form.reset();
      },
      // If there is an error
      async () => {
        const alert = await this.alertCtrl.create({ message: 'There is an error', buttons: ['OK'] });
        loading.dismiss();
        await alert.present();
      }
    );
  }
}

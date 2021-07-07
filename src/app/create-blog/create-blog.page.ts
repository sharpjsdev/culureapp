import { Component, OnInit, AfterViewChecked , ViewChild, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { LoadingController, AlertController, ToastController,ModalController,ActionSheetController } from '@ionic/angular';
import { IonSlides } from '@ionic/angular';
import { File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';

declare var $: any;

@Component({
  selector: 'app-create-blog',
  templateUrl: './create-blog.page.html',
  styleUrls: ['./create-blog.page.scss'],
})
export class CreateBlogPage implements OnInit {



	
	options: CameraOptions = {
		sourceType: this.camera.PictureSourceType.CAMERA,
		quality: 100,
		destinationType: this.camera.DestinationType.FILE_URI,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE,
		
	}; 
	fileoptions: CameraOptions = {
		sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
		quality: 100,
		destinationType: this.camera.DestinationType.FILE_URI,
		encodingType: this.camera.EncodingType.JPEG,
		mediaType: this.camera.MediaType.PICTURE, 
		
	}; 
	

   constructor(
    private http: HttpClient,
    private router: Router,
    private fetch: FetchService,
    private auth: AuthService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
	private alertCtrl:AlertController,
	private loadingCtrl: LoadingController,
	private toastCtrl: ToastController,
	private modalCtrl: ModalController,
	public actionSheetController: ActionSheetController,
	private camera: Camera,
	private file: File,
	private crop: Crop,

  ) { }

  public user = this.auth.getUser();
  public blog: any = {};
  public selectedImage: any = {};
  public imageSelectedStatus = false;
  public bodyError = 0;

  // tslint:disable-next-line: max-line-length
  public categoryArray = ['Sports', 'Travel', 'Technology', 'Science', 'Education', 'Entertainment', 'Fashion', 'Politics', 'Music', 'Games', 'Food', 'Fitness', 'Current Events', 'Economics'];
  form = new FormGroup({
      user_id: new FormControl('', []),
      heading: new FormControl('', [
      Validators.required,
	]),
    category: new FormControl('', [
      Validators.required,
	]),
    body: new FormControl('', [
      Validators.required,
	]),
	image: new FormControl('', [
		
		 Validators.required,
		]),
	thumb_image: new FormControl('', []),

  });
  ngOnInit() {

    
        //this.showHideLoader(0);

  
  }
    async onSubmit() {
  
    const loading = await this.loadingCtrl.create({ message: 'Creating ...' });
    await loading.present();
	      const fd = new FormData();
      fd.append('user_id', this.form.value.user_id);
      fd.append('heading', this.form.value.heading);
      fd.append('category', this.form.value.category);
      fd.append('body', this.form.value.body);
      fd.append('feature_image', this.selectedImage, this.selectedImage.name);
    this.fetch.createBlog(fd).subscribe(
      async res => {
		if(res){

			         this.blog = {};
        this.selectedImage = {};
        this.imageSelectedStatus = false;
		loading.dismiss();
		  const toast = await this.toastCtrl.create({
							message: res.message,
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
             
	
			}else{
			const alert = await this.alertCtrl.create({ message: res.message, buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
			
			}
	 
      },
      async (token) => {
	  

        const alert = await this.alertCtrl.create({ message: token['msg'], buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    );
  }
  
  showHideLoader(show: number) {
    if (show === 0) {
      $('#spinner_2').show();
      $('#blur').addClass('hide_body');
    } else {
      $('#spinner_2').hide();
      $('#blur').removeClass('hide_body');
    }
  }

  onChange($event: any) {
    this.bodyError++;
    this.showHideLoader(1);
  }

  trigger() {
    $('#image').click();
  }

  createBlog() {
    if (this.imageSelectedStatus) {
      $('#spinner_2').show();
      const fd = new FormData();
      fd.append('user_id', this.user.user_id);
      fd.append('heading', this.blog.heading);
      fd.append('category', this.blog.category);
      fd.append('body', this.blog.body);
      fd.append('feature_image', this.selectedImage, this.selectedImage.name);
      this.fetch.createBlog(fd).subscribe(res => {
        $('#spinner_2').hide();
        this.blog = {};
        this.selectedImage = {};
        this.imageSelectedStatus = false;
        if (res.status === 'success') {
        //  $.alert('Blog created successfully !');
        } else {
        //  $.alert('Oops ! Something wents wrong please try again later.');
        }
      });
    } else {
   //   $.alert('Please select a feature image !');
    }
  }

  onFileSelected($event: any) {
    this.selectedImage = $event.target.files[0] as File;
    this.imageSelectedStatus = true;
  }

  changeTheme(theme: any) {
    $('#blur').addClass('hide_body');
    $('#spinner_2').css('display', 'block');
    if (theme === 'green') {
      this.greenTheme();
    } else if (theme === 'dark') {
      this.darkTheme();
    } else {
      this.defaultTheme();
    }
  }

  getMyStyles1() {
    let myStyles: any;
    if (this.user.theme === '1') {
      myStyles = {
        'background-color': 'white',
        'box-shadow': 'none'
      };
    } else if (this.user.theme === '0') {
      myStyles = {
        'background-color': 'white',
        'box-shadow': '1px 1px 10px 0px #ccc'
      };
    } else {
      myStyles = {
        'background-color': '#a6a4a4',
        'box-shadow': 'none'
      };
    }
    return myStyles;
  }

  getColor() {
    let myStyles: any;
    if (this.user.theme === '1') {
      myStyles = {
        color: '#d6ffe7 !important',
      };
    } else if (this.user.theme === '0') {
      myStyles = {
        color: 'white !important',
      };
    } else {
      myStyles = {
        color: '#a6a4a4 !important',
      };
    }
    return myStyles;
  }

  checkTheme() {
    if (this.user.theme === '1') {
      $('link[href="assets/css/style.css"]').remove();
      $('link[href="assets/css/darkTheme.css"]').remove();
      $('head').append('<link rel="stylesheet" href="assets/css/greenTheme.css" type="text/css" />');
    } else {
      $('link[href="assets/css/style.css"]').remove();
      $('link[href="assets/css/greenTheme.css"]').remove();
      $('head').append('<link rel="stylesheet" href="assets/css/darkTheme.css" type="text/css" />');
    }
  }

  defaultTheme() {
    $('link[href="assets/css/darkTheme.css"]').remove();
    $('link[href="assets/css/greenTheme.css"]').remove();
    $('head').append('<link rel="stylesheet" href="assets/css/style.css" type="text/css" />');
    setTimeout(() => {
      $('#blur').removeClass('hide_body');
      $('#spinner_2').css('display', 'none');
    }, 400);
    this.updateTheme('0');
  }


  greenTheme() {
    $('link[href="assets/css/style.css"]').remove();
    $('link[href="assets/css/darkTheme.css"]').remove();
    $('head').append('<link rel="stylesheet" href="assets/css/greenTheme.css" type="text/css" />');
    setTimeout(() => {
      $('#blur').removeClass('hide_body');
      $('#spinner_2').css('display', 'none');
    }, 400);
    this.updateTheme('1');
  }

  darkTheme() {
    $('link[href="assets/css/style.css"]').remove();
    $('link[href="assets/css/greenTheme.css"]').remove();
    $('head').append('<link rel="stylesheet" href="assets/css/darkTheme.css" type="text/css" />');
    setTimeout(() => {
      $('#blur').removeClass('hide_body');
      $('#spinner_2').css('display', 'none');
    }, 400);
    this.updateTheme('2');
  }

  updateTheme(themeColor: any) {
    const data = {
      auth_id: this.user.id,
      theme: themeColor
    };
    if (this.user.theme !== themeColor) {
      this.user.theme = themeColor;
      localStorage.setItem('user_data', JSON.stringify(this.user));
      this.fetch.updateuser(data).subscribe(res => { });
    }
  }

}


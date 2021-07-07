import { Component, ViewChild ,  OnInit, HostListener } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
import { Router } from '@angular/router';
import { LoadingController, AlertController,ToastController } from '@ionic/angular';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { resolve } from 'url';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ActionSheetController } from '@ionic/angular';
import {File, IWriteOptions, FileEntry} from '@ionic-native/file/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Crop } from '@ionic-native/crop/ngx';
declare var $: any;




@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.page.html',
  styleUrls: ['./new-post.page.scss'],
})
export class NewPostPage implements OnInit {



    public user = this.auth.getUser();
    public start =0;
	displayItems: any = [];

	currentPage = 1;
	totalPage = 0;
	totalData = 0;
	perPageData = 0;


	information=null;
	public selectedfile: File = null;
	msg:any;
	rawdata=[];
	rawfiles=[];
	rawfilestoshow=[];
	public spin = false;
	public spinimg = false;
	public imagearray: any = [];
	croppedImagepath :any;
	uploadImagname = "";
	isLoading = false;
	description:any;
	public progress = '0';
    public uploading = false;
  slideOptsuggested = {
		initialSlide: 0,
		//slidesPerView: 4
	};
  constructor(
	private loadingController: LoadingController,
	private alertCtrl: AlertController,
	private toastCtrl: ToastController,
    private http: HttpClient,
    private router: Router,
    private fetch: FetchService,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
    private actionSheetController: ActionSheetController,
    private file: File,
	private camera: Camera,
	private crop: Crop,
	
  ) {
    console.log('Hello WebserviceProvider Provider');

  }

 form = new FormGroup({
    caption: new FormControl('', [
     
    ])
  });
 

  ngOnInit() {
  }
    async selectImage() {
    const actionSheet = await this.actionSheetController.create({
      header: "Select Image source",
      buttons: [{
        text: 'Load from Library',
        handler: () => {
		//document.querySelector('#uploader');
		 $('#postuploader').trigger('click');
       //  this.pickImage(1);
        }
      },
	     {
        text: 'Use Camera',
        handler: () => {
         this.pickImage(0);
        }
      },
      {
        text: 'Remove Image',
        handler: () => {
          this.removeImage();
        }
      },
      {
        text: 'Cancel',
        role: 'cancel'
      }
      ]
    });
    await actionSheet.present();
  }


  
			async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'fields are Required!',
      message: 'Please Enter Name & Date.',
      buttons: ['OK']
    });

    await alert.present();
  }




  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };


 optionsCamera: CameraOptions = {
    quality: 100,
	targetWidth: 600,
	sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };
 optionsGallery: CameraOptions = {
    quality: 100,
	sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

	removeSuggested(index) {
		// alert(index);

		this.rawfilestoshow.splice(index, 1);
		this.imagearray.splice(index, 1);

		//array.splice(i, 1);
	}

readFile(file: any) {
	this.spinimg=true;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();
      formData.append('name', 'contact');
      formData.append('file', imgBlob, file.name);
      // this.uploadService.uploadFile(formData).subscribe(dataRes => {
		// this.uploadImagname=dataRes['url'];
		// this.spinimg=false;
      // });
    };
    reader.readAsArrayBuffer(file);
  }
  takePicture() {
    this.camera.getPicture(this.optionsCamera).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });
    }, (err) => {
      // Handle error
    });
  } 
  openGallery() {

    this.camera.getPicture(this.optionsGallery).then((imageData) => {
      this.file.resolveLocalFilesystemUrl(imageData).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });
    }, (err) => {
      // Handle error
    });
  }
    removeImage() {
		this.croppedImagepath='';
		this.uploadImagname='';
		}
  pickImage(sourceType) {
  if(sourceType==0){

    this.camera.getPicture(this.optionsCamera).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
       let pathImage = 'file://' + imageData;
	 //  alert(imageData);
    this.cropImage(imageData);

    }, (err) => {
      // Handle error
    });
	
	  
	  }else{

    this.camera.getPicture(this.optionsGallery).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      // let base64Image = 'data:image/jpeg;base64,' + imageData;
	  alert(imageData);
    this.cropImage(imageData);

    }, (err) => {
      // Handle error
    });
	  

	  
	  }

	
	
  }


  cropImage(fileUrl) {
    this.crop.crop(fileUrl, { quality: 50 })
      .then(
        newPath => {
	    this.file.resolveLocalFilesystemUrl(newPath).then((entry: FileEntry) => {
        entry.file(file => {
          console.log(file);
          this.readFile(file);
        });
      });
          this.showCroppedImage(newPath.split('?')[0])
        },
        error => {
          alert('Error cropping image' + error);
        }
      );
  }
   onFileSelected1(event: any) {
   
   
   if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				const image = e.target.result;
				this.rawfilestoshow.push(image);
				//  $('#story_pic').attr('src', image);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
    this.selectedfile = event.target.files as File;
    for (const file of event.target.files) {
      this.imagearray.push(file);
    }
    const extension = ['gif', 'jpg', 'jpeg', 'png', 'mp4', 'avi', '3gp', 'mov', 'mpeg'];
    const videoExt = ['mp4', 'avi', '3gp', 'mov', 'mpeg'];
    for (const image of this.imagearray) {
      if (image.size > 15728640) {
        alert('Size of file must be less than 15 MB');
        this.selectedfile = undefined;
        this.imagearray = undefined;
        return false;
      }
      const name = image.name.split('.');
      const ext = name[1].toLowerCase();
      if (extension.includes(ext) === false) {
       alert('File type not allowed');
        this.selectedfile = undefined;
        this.imagearray = undefined;
        return false;
      }
      if (this.imagearray.length > 1 && videoExt.includes(ext) === true) {
        alert('Only 1 video or multiple pictures are allowed');
        this.imagearray.length = 0;
       // this.newpost();
        return false;
      }
    }
    if (this.imagearray.length > 3) {
      alert('Maximum 3 files can be upload at once !');
      this.imagearray.length = 0;
    //  this.newpost();
      return false;
    }
   
  console.log(this.imagearray);

  }

  onFileSelected2(event: any) {

		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			reader.onload = (e: any) => {
				const image = e.target.result;
				this.rawfilestoshow.push(image);
				//  $('#story_pic').attr('src', image);
			};
			reader.readAsDataURL(event.target.files[0]);
		}
		this.selectedfile = event.target.files[0] as File;
		 
	  this.rawfiles.push(event.target.files[0]);
	//	console.log(this.selectedfile); 
		console.log(this.rawfiles); 
	//	console.log(this.rawfilestoshow); 
	/*	const fd = new FormData();
		fd.append('auth_id', this.user.user_id);
		fd.append('story', this.selectedfile, this.selectedfile.name);

		this.http.post(environment.api_url + 'upload_story.php', fd).subscribe( async (res) => {
			this.mystory.thumbUrl = environment.story_url + res['story_name'];
			this.mystory.type = 'image';
					const toast = await this.toastCtrl.create({
							message: 'Story Updated !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
			this.mystory = res;
			console.log(res);
	});*/
	}
 async onSubmit() {
 this.description=this.form.value.caption;
     if (this.selectedfile === undefined || this.user === null) {
      alert('Please Select a Image');
      return false;
    }
    const fd = new FormData();
    fd.append('auth_id', this.user.user_id);
    fd.append('is_private', '0');
    if (this.description === undefined) {
        this.description = '';
    } else {
      fd.append('description', this.description);
    }
    for (const image of this.imagearray) {
      fd.append('file[]', image, image.name);
    }
    this.http.post(environment.api_url + 'create_post_new.php', fd, { reportProgress: true, observe: 'events' }).subscribe((event: any) => {
		
     // this.uploading = true;
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(event.loaded / event.total * 100) + '';
      } else if (event.type === HttpEventType.Response) {
        this.progress = '0';
        if (event.body.status !== 'success') {
          alert(event.body.message);
        } else {
          alert('Post created Successfully !');
		 this.router.navigate(['/savedpost']);
        }
       // this.uploading = false;
       // this.newpost();
      }
    });
  }



async onSubmit1() {
  		   this.rawfiles.forEach(function(number) {
    console.log(number);
});
let caption=this.form.value.caption;
const fd = new FormData();
		//fd.append('auth_id', this.user.user_id);
	//	fd.append('file', this.rawfiles);
		//fd.append('file', this.selectedfile, this.selectedfile.name);

	/*	this.http.post(environment.api_url + 'upload_story.php', fd).subscribe( async (res) => {
			this.mystory.thumbUrl = environment.story_url + res['story_name'];
			this.mystory.type = 'image';
					const toast = await this.toastCtrl.create({
							message: 'Story Updated !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
			this.mystory = res;
			console.log(res);
	}); */
 /*   const loading = await this.loadingCtrl.create({ message: 'Logging in ...' });
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
 ); */
  }
  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
      this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  }
  
  



  
 
}


  

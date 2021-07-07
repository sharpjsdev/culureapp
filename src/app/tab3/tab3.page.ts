import { Component, ViewChild ,  OnInit, HostListener } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { FetchService } from '../services/fetch.service';
import { UploadService } from '../services/upload.service';
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
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Crop } from '@ionic-native/crop/ngx';
declare var $: any;
declare var navigator: any; 

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{

   
    public user = this.auth.getUser();
    public start =0;
	displayItems: any = [];
	  public followers: any = [];
	  public following: any = [];
	  public contacts: any = [];
	currentPage = 1;
	totalPage = 0;
	totalData = 0;
	perPageData = 0;

    autocompleteItemsAsObjects = [
        {value: 'Item1', id: 0, extra: 0},
        {value: 'item2', id: 1, extra: 1},
        'item3'
    ];
    posts=[{Username:"abc", UserId:"1234567889"}, {Username:"dgfh",UserId:"678902"}];
	information=null;
	public selectedfile: File = null;
	msg:any;
	rawdata=[];
	item=[];
	rawfiles=[];
	rawfilestoshow=[];
	public spin = false;
	public spinimg = false;
	public imagearray: any = [];
	croppedImagepath :any;
	uploadImagname = "";
	isLoading = false;
	description:any;
	category:any;
	cameraimg=false;
	cameraimgfile:any;
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
    private uploadService: UploadService,
    private auth: AuthService,
    private sanitizer: DomSanitizer,
    private actionSheetController: ActionSheetController,
    private file: File,
	private camera: Camera,
	private crop: Crop,
	
	
  ) {
    console.log('Hello WebserviceProvider Provider');

  }
public categoryArray = ['Style', 'Shopping', 'Art', 'Animals', 'Beauty', 'Tv', 'Fashion', 'Politics', 'Music', 'Games', 'Food', 'Fitness', 'Current Events', 'Economics'];
 form = new FormGroup({
    caption: new FormControl('', []),
	category: new FormControl('', [
      Validators.required,
	]),
	tags: new FormControl('', []),
  });
 

  ngOnInit() {
	  this.getFollowers();
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
		//this.getCameraImage();
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
	sourceType: this.camera.PictureSourceType.CAMERA,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
	correctOrientation:true,
  };
 optionsGallery: CameraOptions = {
    quality: 100,
	sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE,
	correctOrientation:true,
  };

	removeSuggested(index) {
		// alert(index);

		this.rawfilestoshow.splice(index, 1);
		this.imagearray.splice(index, 1);

		//array.splice(i, 1);
	}

async readFile(file: any , description: string) {
		 const loading = await this.loadingController.create({ message: 'Creating Post...' });
    await loading.present();
    const reader = new FileReader();
    reader.onloadend = () => {
      const imgBlob = new Blob([reader.result], {
        type: file.type
      });
      const formData = new FormData();

      formData.append('file', imgBlob, file.name);
	  formData.append('auth_id', this.user.user_id);
      formData.append('is_private', '0');
      formData.append('description', description);
	  
	  this.http.post(environment.api_url + 'create_post_camera-2.php', formData, { reportProgress: true, observe: 'events' }).subscribe( async (event: any) => {
		
     // this.uploading = true;
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(event.loaded / event.total * 100) + '';
      } else if (event.type === HttpEventType.Response) {
        this.progress = '0';
        if (event.body.status !== 'success') {
          alert(event.body.message);
        } else {
		 loading.dismiss();
		  const toast = await this.toastCtrl.create({
							message: 'Post created Successfully !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
         
		   localStorage.setItem('reloadhome', '1');
           this.selectedfile = undefined;
           this.imagearray = undefined;
           this.cameraimg = false;
		   this.croppedImagepath='';
           this.rawfilestoshow=[];
		 this.router.navigate(['/members/tab1']);
        }
       // this.uploading = false;
       // this.newpost();
      }
    });
     /*  this.uploadService.uploadFile(formData).subscribe(dataRes => {
		 this.uploadImagname=dataRes['url'];
		this.spinimg=false;
	 }); */
    };
    reader.readAsArrayBuffer(file);
  }


    removeImage() {
		this.croppedImagepath='';
		this.uploadImagname='';
		this.cameraimg=false;
		}
  pickImage(sourceType) {
  if(sourceType==0){

    this.camera.getPicture(this.optionsCamera).then((imageData) => {
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
		  this.cameraimgfile=file;

        });
      });
          this.showCroppedImage(newPath.split('?')[0])
		  this.cameraimg=true;
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
    const videoExt = ['mp4', 'avi', '3gp', 'mov', 'mpeg' ,'mkv'];
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
		this.rawfilestoshow=undefined;
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

 async onSubmit() {
 
console.log(this.form.value.tags);
var result = this.form.value.tags.map(function (e) {
  return e.user_id;
}).join(', ');

console.log(result);
	this.description=this.form.value.caption;
	this.category=this.form.value.category;
	if(this.cameraimg==true){
		this.readFile(this.cameraimgfile,this.description);
		}else{
		 const loading = await this.loadingController.create({ message: 'Creating Post...' });
    await loading.present();
		     if (this.selectedfile === undefined || this.user === null) {
      alert('Please Select a Image');
	   loading.dismiss();
      return false;
    }
    const fd = new FormData();
    fd.append('auth_id', this.user.user_id);
	fd.append('tags', JSON.stringify(result));
    fd.append('is_private', '0');
    if (this.description === undefined) {
        this.description = '';
    } else {
      fd.append('description', this.description);
    }
	    if (this.category === undefined) {
        this.category = '';
    } else {
      fd.append('category', this.category);
    }
    for (const image of this.imagearray) {
      fd.append('file[]', image, image.name);
    }
    this.http.post(environment.api_url + 'create_post_new.php', fd, { reportProgress: true, observe: 'events' }).subscribe( async (event: any) => {
		
     // this.uploading = true;
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round(event.loaded / event.total * 100) + '';
      } else if (event.type === HttpEventType.Response) {
        this.progress = '0';
        if (event.body.status !== 'success') {
          alert(event.body.message); 
		  loading.dismiss();
        } else {
		  loading.dismiss();
		  const toast = await this.toastCtrl.create({
							message: 'Post created Successfully !',
							duration: 2000,
							color: 'dark'
						});
						await toast.present();
         
		   localStorage.setItem('reloadhome', '1');
           this.selectedfile = undefined;
           this.imagearray = undefined;
           this.rawfilestoshow=[];
		 this.router.navigate(['/members/tab1']);
        }
       // this.uploading = false;
       // this.newpost();
      }
    });
		
		}


  }

  showCroppedImage(ImagePath) {
    this.isLoading = true;
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then(base64 => {
      this.croppedImagepath = base64;
	 // this.rawfilestoshow.push(this.croppedImagepath);
      this.isLoading = false;
    }, error => {
      alert('Error in showing image' + error);
      this.isLoading = false;
    });
  }
  
  

  // get followers and following both
  getFollowers() {
    this.fetch.get_followers({ user_id: this.user.user_id }).subscribe((res) => {
      this.followers = res.data;
      localStorage.setItem('followers', JSON.stringify(this.followers));
    });

    this.fetch.get_following({ user_id: this.user.user_id }).subscribe((res) => {
      this.following = res.data;
      localStorage.setItem('following', JSON.stringify(this.following));
    });
    // console.log(this.contacts);
    this.mergeFollowersAndFollowing();
  }

  mergeFollowersAndFollowing() {
    const followers = localStorage.getItem('followers');
    const following = localStorage.getItem('following');
    this.followers = JSON.parse(followers);
    this.following = JSON.parse(following);
    if (this.followers === null && this.following === null) {
      return;
    }
    if (this.followers.length > this.following.length) {
      this.contacts = this.followers;
      if (this.following !== null) {
        for (const i of this.following) {
          this.contacts.push(i);
        }
      }
    } else {
      this.contacts = this.following;
      if (this.followers !== null) {
        for (const i of this.followers) {
          this.contacts.push(i);
        }
      }
    }
    // console.log(this.contacts);
    this.contacts = this.getUnique(this.contacts, 'user_id');
    console.log(this.contacts);
  }

  private getUnique(arr: any, key: any) {

    const unique = arr
      .map((e: { [x: string]: any; }) => e[key])

      // store the keys of the unique objects
      .map((e: any, i: any, final: { indexOf: (arg0: any) => void; }) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter((e: string | number) => arr[e]).map((e: string | number) => arr[e]);

    return unique;
  }


  
 
}


  

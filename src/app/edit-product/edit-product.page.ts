import { Component, OnInit, AfterViewChecked , ViewChild, HostListener} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from '../services/auth.service';
import { NavparamService } from '../services/navparam.service';
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
  selector: 'app-edit-product',
  templateUrl: './edit-product.page.html',
  styleUrls: ['./edit-product.page.scss'],
})
export class EditProductPage implements OnInit {


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
    private navparamService: NavparamService,
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
  public product = JSON.parse(localStorage.getItem('editProduct'));
  public selectedImage: any = {};
  public categories: any;
  public products: any;
  public imageSelectedStatus = false;
  public bodyError = 0;
  public imageUrl = environment.site_url + 'products/';
  public defaultImage = environment.site_url + 'images/noimage.jpg';
  
  	form = new FormGroup({
		
    product_id: new FormControl('', []),
    user_id: new FormControl('', []),
    product_name: new FormControl('', [
		Validators.required,
		]),
	total: new FormControl('', [
		Validators.required,
		]),
	category_id: new FormControl('', [
		Validators.required,
		]),
	description: new FormControl('', []),
    is_discount: new FormControl(false, []),
	discount: new FormControl('', []),
	image: new FormControl('', []),
	thumb_image: new FormControl('', []),
	});
  
  ionViewWillEnter() {
           
	console.log(this.product);
	  this.fetch.getCategories().subscribe((res) => {
      this.categories = res.data; 
	console.log(this.categories);
    });
	 

    }
  ngOnInit() {

    
        //this.showHideLoader(0);

  
  }
    async onSubmit() {
  if (this.imageSelectedStatus) {
    const loading = await this.loadingCtrl.create({ message: 'Updating ...' });
    await loading.present();
	      const fd = new FormData();
      fd.append('user_id', this.form.value.user_id);
      fd.append('product_id', this.form.value.product_id);
      fd.append('product_name', this.form.value.product_name);
      fd.append('category_id', this.form.value.category_id);
      fd.append('description', this.form.value.description);
      fd.append('is_discount', this.form.value.is_discount);
      fd.append('discount', this.form.value.discount);
      fd.append('total', this.form.value.total);
      fd.append('feature_image', this.selectedImage, this.selectedImage.name);
	  
    this.fetch.updateProduct(fd).subscribe(
      async res => {
		if(res){

		this.product = {};
        this.selectedImage = {};
        this.imageSelectedStatus = false;
		loading.dismiss();
		localStorage.setItem('editBlog', JSON.stringify(this.product));
			this.products=res.products;
		       this.navparamService.setNavData(this.products);
		   this.router.navigate(['/my-products']);
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
      async (res) => {
	  

        const alert = await this.alertCtrl.create({ message: res.message, buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    );
	} else {
	
	    const loading = await this.loadingCtrl.create({ message: 'Updating ...' });
    await loading.present();
		  this.product.user_id=this.form.value.user_id;
		  this.product.product_name=this.form.value.product_name;
		  this.product.category_id=this.form.value.category_id;
		  this.product.description=this.form.value.description;
		  this.product.is_discount=this.form.value.is_discount;
		  this.product.discount=this.form.value.discount;
		  this.product.total=this.form.value.total;
		  
		 
	      console.log("edit-data",this.product);

    this.fetch.updateProduct(this.product).subscribe(
      async res => {
		if(res){

			         this.product = {};
        this.selectedImage = {};
        this.imageSelectedStatus = false;
		loading.dismiss();
		 localStorage.setItem('editBlog', JSON.stringify(this.product));
		 	
			this.products=res.products;
		       this.navparamService.setNavData(this.products);
		   this.router.navigate(['/my-products']);
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
      async (res) => {
	  

        const alert = await this.alertCtrl.create({ message: res.message, buttons: ['OK'] });
        await alert.present();
        loading.dismiss();
      }
    );

    }
	
	
	
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
addValue(e): void {
  	const check= e.currentTarget.checked;	
			if(check==true){
			$( "#discount" ).show();
	
		}else{
		$( "#discount" ).hide();
		}
}

  onFileSelected($event: any) {
    this.selectedImage = $event.target.files[0] as File;
    this.imageSelectedStatus = true;
  }


    		async removeContent(name) {
		const alert = await this.alertCtrl.create({
			cssClass: 'my-custom-class',
			header: 'Remove Media!',
			message: 'Are You <strong>Sure</strong>?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					cssClass: 'secondary',
					handler: async (blah) => {
						////
					}
					}, {
					text: 'Okay',
					handler: async () => {
				if(name=='image'){
			this.product.image='';
			}

						
					}
				}
			]
		});
		
		await alert.present();
	}
	

}


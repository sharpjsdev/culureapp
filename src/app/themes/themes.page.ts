import { Component, OnInit, Renderer2 } from '@angular/core';
import { AppState } from '../../app/app.global';
@Component({
  selector: 'app-themes',
  templateUrl: './themes.page.html',
  styleUrls: ['./themes.page.scss'],
})
export class ThemesPage implements OnInit {

  constructor(public global: AppState,private renderer:Renderer2) { }
  public check='uc';
  public checkValue=false;
  ngOnInit() {
	  var chk=localStorage.getItem('is_checked');

	  if(chk=='c'){
		  this.checkValue=true;
		  this.renderer.setAttribute(document.body,'color-theme','dark');
		  }else{
		   this.checkValue=false;
		   this.renderer.setAttribute(document.body,'color-theme','light');
		  }
  }
  changeTheme(theme) {

    this.global.set('theme', theme);
  }
  
  onToggleColorTheme(event){

	  if(event.detail.checked){
	  
	  this.renderer.setAttribute(document.body,'color-theme','dark');
	  localStorage.setItem('is_checked','c');
	  this.checkValue=true;
		 // document.body.setAttribute('color-theme','dark');
		  }else{
		  localStorage.setItem('is_checked','uc');
		  this.checkValue=false;
		   this.renderer.setAttribute(document.body,'color-theme','light');
		//  document.body.setAttribute('color-theme','light');
		  }
	  }
}




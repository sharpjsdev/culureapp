import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../services/auth.service';
import { take, map } from 'rxjs/operators';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
 constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) { }
  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.auth.user.pipe(
      take(1),
      map(user => {

 if (user) {
 
 if(this.router.url=='/login' || this.router.url=='/'){
	  this.router.navigate(['/members/tab1']);
	 }
     

    }
    return true;
      })
    )
  }
  
}




 

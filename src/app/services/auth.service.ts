import { User } from './user.model';
import { Platform } from '@ionic/angular';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwttokenkeyculture';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);
 
  constructor(private storage: Storage, private http: HttpClient, private plt: Platform, private router: Router) { 
    this.loadStoredToken();  
  }
 
  loadStoredToken() {
    let platformObs = from(this.plt.ready());
 
    this.user = platformObs.pipe(
      switchMap(() => {
        return from(this.storage.get(TOKEN_KEY));
      }),
      map(token => {
        if (token) {
          let decoded = helper.decodeToken(token); 
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }
 
	
  getUser() {
    return this.userData.getValue();
  }

  register(user: User) {
    return this.http.post(environment.api_url+'registration.php', user);
  }
  
  login(credentials: User): Observable<string> {
     return this.http.post<{ token: string }>(environment.api_url+'login_new.php', credentials).pipe(
      map(response => response.token),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
        this.userData.next(decoded);
 
        let storageObs = from(this.storage.set(TOKEN_KEY, token));
        return storageObs;
      })

    );
  }
  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
	  localStorage.clear();
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }
 
}
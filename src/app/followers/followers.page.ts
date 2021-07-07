import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';


declare var $: any;

@Component({
  selector: 'app-followers',
  templateUrl: './followers.page.html',
  styleUrls: ['./followers.page.scss'],
})
export class FollowersPage implements OnInit {


  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private router: Router, private fetch: FetchService, private auth: AuthService,  private route: ActivatedRoute) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  public user = this.auth.getUser();
  public model: any = {};
  public followers: any = [];
  public searchFollowers: any = [];
  public imagePath = environment.site_url + 'images/';
  public search = '';
  public searchResult: any[];
  public defaultImage = 'assets/images/loader.gif';

  ngOnInit() {
    const userId = this.user.user_id;
	 console.log(this.user);
    if (this.user === null) {
    //  this.router.navigate(['/login']);
    } else {
      this.fetch.get_followers({ user_id: userId }).subscribe((res) => {
        this.followers = res.data;
        console.log(res.data);
        for (const follower of this.followers) {
          if (follower.image === null) {
            follower.image = 'noimage.jpg';
          }
        }
        this.searchFollowers = this.followers;
      });
    }
  }

  onSearch() {
    if (this.search !== '') {
      // console.log('function run');
      const results = this.followers.filter((follower: any) => {
        if (follower.name.toLowerCase().startsWith(this.search.toLowerCase())) {
          return true;
        }
      });
      this.followers = results;
    } else {
      this.followers = this.searchFollowers;
    }
  }

  showProfile(id: any) {
    console.log(id);
    this.router.navigate(['/show-profile/' + id]);
  }
  
  
  

}






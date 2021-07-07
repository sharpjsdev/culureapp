import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FetchService } from 'src/app/services/fetch.service';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-liked-by',
  templateUrl: './liked-by.page.html',
  styleUrls: ['./liked-by.page.scss'],
})
export class LikedByPage implements OnInit {

 constructor(private http: HttpClient, private router: Router, private fetch: FetchService,private auth: AuthService, private route: ActivatedRoute, private sanitizer: DomSanitizer) { }

  public user = this.auth.getUser();
  public imageUrl = environment.site_url + 'images/';
  public users: any = [];

  ngOnInit() {
    if (localStorage.getItem('is_loggin') !== 'true') {

      this.router.navigate(['/']);

    } else {

      const userId = this.route.snapshot.params.uid;

      const postId = this.route.snapshot.params.pid;

      const data = { user_id: userId, post_id: postId };

      this.fetch.get_liked(data).subscribe((res) => {

        this.users = res.data.liked_by;

      
      });

    }
  }

  show_profile(post: any) {
    this.router.navigate(['show-profile/' + post.user_id]);
  }

}

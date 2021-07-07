import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';

declare var $: any;

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http: HttpClient) { }

  private user = new BehaviorSubject(0);

  currentUser = this.user.asObservable();

  toggleLoader(show: number) {
    if (show === 0) {
      $('#blur').css('opacity', '0').addClass('hide_body');
      $('#spinner_2').show();
    } else {
      $('#blur').css('opacity', '1').removeClass('hide_body');
      $('#spinner_2').hide();
    }
  }

  changeUser(user: any) {
    this.user.next(user);
  }

  registerUser(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'registration.php', data);
  }

  userlogin(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'login.php', data);
  }

  getuser(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'edit_profile.php', id);
  }

  getpost(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_post.php', id);
  }
  
  getallposts(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_posts.php', id);
  }
  
  getcategoryposts(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_category_post.php', id);
  }
  
  getuserspost(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_users_post.php', id);
  }
  
  gettaggedpost(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_users_post.php', id);
  }
  
  getusersproduct(id: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_users_product.php', id);
  }

  updateuser(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_profile.php', data);
  }

  change_password(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'change_password.php', data);
  }

  comment(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'comment.php', data);
  }

  like_unlike(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'like_unlike.php', data);
  }

  delete_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'delete_post.php', data);
  }

  delete_single_image(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'delete_single_image.php', data);
  }

   get_cart(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_cart.php', data);
  } 

   get_wishlist(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_wishlist.php', data);
  }


  get_followers(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_follower.php', data);
  }

  get_following(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_following.php', data);
  }

  gethome(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'home.php', data);
  }

  search_user(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'search_user.php', data);
  }
  
  search_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'search_post.php', data);
  }

  follow_user(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'follow_user.php', data);
  }

  get_email(): Observable<any> {
    return this.http.get(environment.api_url + 'get_all_email.php');
  }

  forget_password(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'forget_password.php', data);
  }

  check_otp(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'check_otp.php', data);
  }

  reset_password(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'reset_password.php', data);
  }

  save_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'save_post.php', data);
  }

  get_saved_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_save_post.php', data);
  }

  friend_suggestion(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'friend_suggestion.php', data);
  }

  get_stories(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_stories.php', data);
  }

  get_my_stories(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'my_stories.php', data);
  }

  delete_story(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'delete_story.php', data);
  }

  get_liked(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_liked_likedBy.php', data);
  }

  get_profile_pic(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_profile_pic.php', data);
  }
  
  getRating(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_rating.php', data);
  }

  get_all_liked_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_liked_post.php', data);
  } 
  
  get_orders(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_orders.php', data);
  }

  check_follower(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'check_user_follows.php', data);
  }

  get_all_disliked_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_disliked_post.php', data);
  }

  get_disliked(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_disliked_dislikedBy.php', data);
  }

  get_most_liked_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_most_like_post.php', data);
  }

  get_most_disliked_post(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_most_dislike_post.php', data);
  }

  get_all_user_who_liked(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_user_liked.php', data);
  }

  get_all_user_who_disliked(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_user_disliked.php', data);
  }

  updateSubscription(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_subscription.php', data);
  }


 updateOrder(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_order.php', data);
  }
  
  getAllChatHistory(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_chat_history.php', data);
  }

  messageNotification(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'message_notification.php', data);
  }

  messageNotificationHeader(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'message_notification2.php', data);
  }

  getChatHistory(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_message_history.php', data);
  }

  sendMessage(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'send_message.php', data);
  }

  updateReadingStatus(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_reading_status.php', data);
  }
  
  addWishlistItem(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'add_wishlist_item.php', data);
	}
  
  removeWishlistItem(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'remove_wishlist_item.php', data);
  }
  
  addCartItem(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'add_cart_item.php', data);
	}

  updateCart(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_cart.php', data);
	}
	
    addRating(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'add_rating.php', data);
  }
  
  addProduct(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'add_product.php', data);
  }
  
  updateProduct(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_product.php', data);
  } 
  
  deleteProduct(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'delete_product.php', data);
  }

  createBlog(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'create_blog.php', data);
  }
  
  getCategories(): Observable<any> {
    return this.http.get(environment.api_url + 'get_categories.php');
  }

  getAllBlog(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_blogs.php', data);
  }

  getMyBlog(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_my_blogs.php', data);
  }

  deleteBlog(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'delete_blog.php', data);
  }

  editBlog(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'edit_blog.php', data);
  }
  
  getAllProduct(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_all_products.php', data);
  }

  getMyProduct(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_my_products.php', data);
  }


  getNewHome(id: any): Observable<any> {
    let url = '';
    if (id.select === undefined) {
      url = `${environment.api_url}new_home.php?auth_id=${id.auth_id}&start=${id.start}`;
    } else {
      url = `${environment.api_url}new_home.php?auth_id=${id.auth_id}&start=${id.start}&select=${id.select}`;
    }
    return this.http.get(url);
  }
  getNewMyPosts(id: any): Observable<any> {
    let url = '';
    if (id.select === undefined) {
      url = `${environment.api_url}new_get_my_posts.php?auth_id=${id.auth_id}&start=${id.start}`;
    } else {
      url = `${environment.api_url}new_get_my_posts.php?auth_id=${id.auth_id}&start=${id.start}&select=${id.select}`;
    }
    return this.http.get(url);
  }
  getNewVideoPost(id: any): Observable<any> {
    let url = '';
    if (id.select === undefined) {
      url = `${environment.api_url}new_video.php?auth_id=${id.auth_id}&start=${id.start}`;
    } else {
      url = `${environment.api_url}new_video.php?auth_id=${id.auth_id}&start=${id.start}&select=${id.select}`;
    }
    return this.http.get(url);
  }

  getMostLikedPost(id: any): Observable<any> {
    let url = '';
    if (id.select === undefined) {
      url = `${environment.api_url}new_getMostlikedPost.php?user_id=${id.user_id}&start=${id.start}`;
    } else {
      url = `${environment.api_url}new_getMostlikedPost.php?user_id=${id.user_id}&start=${id.start}&select=${id.select}`;
    }
    return this.http.get(url);
  }

  getMostDislikedPost(id: any): Observable<any> {
    let url = '';
    if (id.select === undefined) {
      url = `${environment.api_url}new_getMostDislikedPost.php?user_id=${id.user_id}&start=${id.start}`;
    } else {
      url = `${environment.api_url}new_getMostDislikedPost.php?user_id=${id.user_id}&start=${id.start}&select=${id.select}`;
    }
    return this.http.get(url);
  }

  getMyPostsNew(id: any): Observable<any> {
    let url = '';
    if (id.select === undefined) {
      url = `${environment.api_url}new_getMyPost.php?auth_id=${id.auth_id}&start=${id.start}`;
    } else {
      url = `${environment.api_url}new_getMyPost.php?auth_id=${id.auth_id}&start=${id.start}&select=${id.select}`;
    }
    return this.http.get(url);
  }

  updateToken(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_token.php', data);
  } 
  
  updateOrderStatus(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'update_order_status.php', data);
  }

  SendNotification(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'sendNotificationMessage.php', data);
  }

  getNotification(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}getAllNotification.php?id=${id}`);
  }

  deleteNotification(id: any): Observable<any> {
    return this.http.get(`${environment.api_url}deleteNotification.php?id=${id}`);
  }

  reportPost(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'report_post.php', data);
  }

  blockUser(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'block_user.php', data);
  }

  unBlockuser(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'unblock_user.php', data);
  }
  
  all_likes(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'show_all_likes.php', data);
  }
  all_dislikes(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'show_all_dislikes.php', data);
  }
  blocked_user_list(data: any): Observable<any> {
    return this.http.post(environment.api_url + 'get_blocked_users.php', data);
  }


}


// http://3.137.7.60/phpinfo.php
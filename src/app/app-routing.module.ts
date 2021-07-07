import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';
 
const routes: Routes = [
  {
    path: 'members',
    loadChildren: () =>
      import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  }, 
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard]
  },
  {
    path: 'register',
    loadChildren: () =>
	import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then( m => m.ForgotPasswordPageModule)
  },
  {
    path: 'tab4',
    loadChildren: () => import('./tab4/tab4.module').then( m => m.Tab4PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab5',
    loadChildren: () => import('./tab5/tab5.module').then( m => m.Tab5PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab6',
    loadChildren: () => import('./tab6/tab6.module').then( m => m.Tab6PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-profile/:id',
    loadChildren: () => import('./show-profile/show-profile.module').then( m => m.ShowProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'savedpost',
    loadChildren: () => import('./savedpost/savedpost.module').then( m => m.SavedpostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'subscription',
    loadChildren: () => import('./subscription/subscription.module').then( m => m.SubscriptionPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'liked-by/:uid/:pid',
    loadChildren: () => import('./liked-by/liked-by.module').then( m => m.LikedByPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'blocked-user',
    loadChildren: () => import('./blocked-user/blocked-user.module').then( m => m.BlockedUserPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'most-liked',
    loadChildren: () => import('./most-liked/most-liked.module').then( m => m.MostLikedPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-story',
    loadChildren: () => import('./my-story/my-story.module').then( m => m.MyStoryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-post',
    loadChildren: () => import('./my-post/my-post.module').then( m => m.MyPostPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'blogs',
    loadChildren: () => import('./blogs/blogs.module').then( m => m.BlogsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'themes',
    loadChildren: () => import('./themes/themes.module').then( m => m.ThemesPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then( m => m.ChangePasswordPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-post',
    loadChildren: () => import('./new-post/new-post.module').then( m => m.NewPostPageModule),
    canActivate: [AuthGuard]
  },
  {    
    path: 'members/tab1/:id',
    loadChildren: () => import('./tab1/tab1.module').then( m => m.Tab1PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'tab7',
    loadChildren: () => import('./tab7/tab7.module').then( m => m.Tab7PageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'followers',
    loadChildren: () => import('./followers/followers.module').then( m => m.FollowersPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'following',
    loadChildren: () => import('./following/following.module').then( m => m.FollowingPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create-blog',
    loadChildren: () => import('./create-blog/create-blog.module').then( m => m.CreateBlogPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'my-blogs',
    loadChildren: () => import('./my-blogs/my-blogs.module').then( m => m.MyBlogsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'show-blog',
    loadChildren: () => import('./show-blog/show-blog.module').then( m => m.ShowBlogPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'edit-blog',
    loadChildren: () => import('./edit-blog/edit-blog.module').then( m => m.EditBlogPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'image-post',
    loadChildren: () => import('./image-post/image-post.module').then( m => m.ImagePostPageModule)
  },
  {
    path: 'video-post',
    loadChildren: () => import('./video-post/video-post.module').then( m => m.VideoPostPageModule)
  },
  {
    path: 'chat-box/:id',
    loadChildren: () => import('./chat-box/chat-box.module').then( m => m.ChatBoxPageModule)
  },
  {
    path: 'products',
    loadChildren: () => import('./products/products.module').then( m => m.ProductsPageModule)
  },
  {
    path: 'my-products',
    loadChildren: () => import('./my-products/my-products.module').then( m => m.MyProductsPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'edit-product',
    loadChildren: () => import('./edit-product/edit-product.module').then( m => m.EditProductPageModule)
  },
  {
    path: 'product-details',
    loadChildren: () => import('./product-details/product-details.module').then( m => m.ProductDetailsPageModule)
  },
  {
    path: 'cart',
    loadChildren: () => import('./cart/cart.module').then( m => m.CartPageModule)
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then( m => m.OrdersPageModule)
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule)
  },
  {
    path: 'order-details',
    loadChildren: () => import('./order-details/order-details.module').then( m => m.OrderDetailsPageModule)
  },
  {
    path: 'user-products/:id',
    loadChildren: () => import('./user-products/user-products.module').then( m => m.UserProductsPageModule)
  }
];
 
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
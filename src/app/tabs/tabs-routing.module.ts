import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
 
const routes: Routes = [
  {
    path: '',
    redirectTo: '/members/tab1',
    pathMatch: 'full'
  },
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab1/tab1.module').then(m => m.Tab1PageModule)
          }
        ]
      },
      {
        path: 'tab2',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab2/tab2.module').then(m => m.Tab2PageModule)
          }
        ]
      },
      {
        path: 'tab3',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab3/tab3.module').then(m => m.Tab3PageModule)
          }
        ]
      },
      {
        path: 'tab4',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab4/tab4.module').then(m => m.Tab4PageModule)
          }
        ]
      },
	  {
        path: 'tab5',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab5/tab5.module').then(m => m.Tab5PageModule)
          }
        ]
      },
      {
        path: 'tab6',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab6/tab6.module').then(m => m.Tab6PageModule)
          }
        ]
      },
	  {
        path: 'tab7',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../tab7/tab7.module').then(m => m.Tab7PageModule)
          }
        ]
      },
	  {
        path: 'new-post',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../new-post/new-post.module').then( m => m.NewPostPageModule)
          }
        ]
      },
	  {
        path: 'edit-profile',
        children: [
          {
            path: '',
            loadChildren: () =>
            import('../edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
          }
        ]
      },
    ]
  }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
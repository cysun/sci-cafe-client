import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import { DashBoardComponent } from './dashBoard.component';
import {SharedModule} from '../../../shared/shared.module';


export const DashBoardRoutes: Routes = [
  {
    path: '',
    component: DashBoardComponent,
    children: [
      {
        path: 'default',
        loadChildren: '../../dashboard/dashboard-default/dashboard-default.module#DashboardDefaultModule'
      },{
        path: 'profile',
        loadChildren: '../../user/profile/profile.module#ProfileModule'
      }, {
        path: 'user',
        loadChildren: '../../user/userDetail/userDetail.module#UserDetailModule'
      }, {
        path: 'users',
        loadChildren: '../../user/users/users.module#UsersModule'
      }, {
        path: 'events',
        loadChildren: '../../event/event.module#EventModule'
      }, {
        path: 'news',
        loadChildren: '../../news/news.module#NewsModule'
      }, {
        path: 'rewards',
        loadChildren: '../../reward/reward.module#RewardModule'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(DashBoardRoutes),
    SharedModule
  ],
  declarations: [DashBoardComponent]
})
export class DashBoardModule { }

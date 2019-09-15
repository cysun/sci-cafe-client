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
        path: 'approve',
        loadChildren: '../../dashboard/dashboard-approve/dashboard-approve.module#DashboardApproveModule'
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
        path: 'programs',
        loadChildren: '../../program/program.module#ProgramModule'
      },{
        path: 'news',
        loadChildren: '../../news/newslist.module#NewsListModule'
      }, {
        path: 'rewards',
        loadChildren: '../../reward/reward.module#RewardModule'
      }, {
        path: 'qrcode',
        loadChildren: '../qrcode/qrcode.module#QrcodeModule'
      }, {
        path: 'checkIn',
        loadChildren: '../attendees/attendees.module#AttendeesModule'
      },{
        path: 'myEvents',
        loadChildren: '../events/myEvents.module#MyEventsModule'
      },{
        path: 'myRewards',
        loadChildren: '../rewards/myRewards.module#MyRewardsModule'
      }, {
        path: 'qualifiedEvents',
        loadChildren: '../qualified-events/qualifiedEvents.module#QualifiedEventsModule'
      },{
        path: 'userDetail',
        loadChildren: '../../user/userDetail/userDetail.module#UserDetailModule'
      }, {
        path: 'tags',
        loadChildren: '../../tag/tag.module#TagModule'
      },
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

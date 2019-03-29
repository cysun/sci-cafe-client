import {Routes} from '@angular/router';
import {AuthComponent} from './layout/auth/auth.component';
import {HomeComponent} from './pages/homePage/home/home.component';
import {RegularComponent} from './layout/regular/regular.component';
import { AuthGuard } from './guards';

export const AppRoutes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'authentication',
        loadChildren: './pages/authentication/authentication.module#AuthenticationModule'
      }, {
        path: 'maintenance/offline-ui',
        loadChildren: './pages/maintenance/offline-ui/offline-ui.module#OfflineUiModule'
      }
    ]
  },{
    path: '',
    component: RegularComponent,
    children: [
      {
        path: 'home',
        loadChildren: './pages/homePage/home/home.module#HomeModule'
      },{
        path: 'home/events',
        loadChildren: './pages/homePage/events/events.module#EventsModule'
      },{
        path: 'home/programs',
        loadChildren: './pages/homePage/programs/programs.module#ProgramsModule'
      },{
        path: 'home/events/detail',
        loadChildren: './pages/homePage/events/singleEvent.module#SingleEventModule'
      },{
        path: 'home/programs/detail',
        loadChildren: './pages/homePage/programs/singleProgram.module#SingleProgramModule'
      },{
        path: 'about',
        loadChildren: './pages/homePage/about/about.module#AboutModule'
      },{
        path: 'home/rewards',
        loadChildren: './pages/homePage/rewards/rewards.module#RewardsModule'
      },{
        path: 'home/rewards/detail',
        loadChildren: './pages/homePage/rewards/singleReward.module#SingleRewardModule'
      },{
        path: 'home/news',
        loadChildren: './pages/homePage/news/news.module#NewsModule'
      },{
        path: 'home/news/detail',
        loadChildren: './pages/homePage/news/singleNews.module#SingleNewsModule'
      },{
        path: 'home/user/dashboard',
        loadChildren: './pages/homePage/dashBoard/dashBoard.module#DashBoardModule'
      },
    ]
  },
  { path: '**', redirectTo: 'home' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

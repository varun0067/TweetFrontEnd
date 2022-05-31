import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './home/forgot-password/forgot-password.component';
import { HomeComponent } from './Home/home/home.component';
import { RegisterComponent } from './home/register/register.component';
import { UserDashboardComponent } from './Dashboard/user-dashboard/user-dashboard.component';
import { ViewUserComponent } from './Dashboard/view-user/view-user.component';
import { AuthGuardService } from './auth-guard/auth-guard.service';
import { ViewMyTweetsComponent } from './Dashboard/view-my-tweets/view-my-tweets.component';

const routes: Routes = [
  {path: '', component:HomeComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'forgot-password', component: ForgotPasswordComponent},
  { path: 'user-dashboard', component: UserDashboardComponent,canActivate:[AuthGuardService]},
  { path: 'view-user/:username', component: ViewUserComponent,canActivate:[AuthGuardService]},
  { path: 'view-my-tweets/:username', component: ViewMyTweetsComponent,canActivate:[AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

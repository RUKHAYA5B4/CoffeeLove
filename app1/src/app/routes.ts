import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { MainshopComponent } from './mainshop/mainshop.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import {  EmployeeComponent } from './employee/employee.component';
import { LocatecafeComponent } from './locatecafe/locatecafe.component';
export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'masterpage', component: MasterpageComponent
    },
    {
        path: 'adminlogin', component:  AdminComponent
    },
    {
        path: 'locatecafe', component: LocatecafeComponent,canActivate:[AuthGuard]
    },
    
    {
         path: 'homepage', component: HomepageComponent,canActivate:[AuthGuard] 
    },
    {
        path: 'admin', component:  EmployeeComponent
   },
    {
         path: 'shopid/:id', component:  MainshopComponent,canActivate:[AuthGuard]
    },
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: '', redirectTo: '/masterpage', pathMatch: 'full'
    }
];
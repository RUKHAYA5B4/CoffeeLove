//inbuilt modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgImageSliderModule } from 'ng-image-slider';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { SliderModule } from 'angular-image-slider';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { MainshopComponent } from './mainshop/mainshop.component';
import { appRoutes } from './routes';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSliderModule } from '@angular/material/slider';

import { HomepageComponent } from './homepage/homepage.component';
import { MasterpageComponent } from './masterpage/masterpage.component';
import { MatToolbarModule , } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthGuard } from './auth/auth.guard';

import { AuthInterceptor } from './auth/auth.interceptor';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';  
import { MatBadgeModule } from '@angular/material/badge';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { UserProfileComponent } from './user-profile/user-profile.component'

import { LocatecafeComponent } from './locatecafe/locatecafe.component';
import { HomePageFilterPipe } from './homepage/homepage-filter.pipe';
import { EmployeeComponent } from './employee/employee.component';
import { CoffeeshopService } from './shared/coffeeshop.service';
import { EmployeeService } from './shared/employee.service';
import { AdminComponent } from './admin/admin.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    SignInComponent,
    HomepageComponent,
    MasterpageComponent,
    MainshopComponent,
    UserProfileComponent,
    
    LocatecafeComponent,
    HomePageFilterPipe,
    EmployeeComponent,
    AdminComponent,
   
  ],
  imports: [
    FlexLayoutModule,
    MatListModule,
    MatSidenavModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    NgImageSliderModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSliderModule,
    MatSnackBarModule,
    CommonModule,
    MatTableModule,
    MatCardModule,
    MatBadgeModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    SliderModule,
    CarouselModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService,CoffeeshopService,EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }

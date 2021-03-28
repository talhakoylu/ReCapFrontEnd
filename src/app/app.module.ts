import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrandComponent } from './components/brand/brand.component';
import { ColorComponent } from './components/color/color.component';
import { CarComponent } from './components/car/car.component';
import { CustomerComponent } from './components/customer/customer.component';
import { RentalComponent } from './components/rental/rental.component';
import { AppHeaderComponent } from './components/_layout/app-header/app-header.component';
import { AppLayoutComponent } from './components/_layout/app-layout/app-layout.component';
import { HomeComponent } from './pages/home/home.component';
import { Error404Component } from './pages/error404/error404.component';
import { RentalsComponent } from './pages/rentals/rentals.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { CarDetailPageComponent } from './pages/car-detail-page/car-detail-page.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilterBrandPipe } from './pipes/filter-brand.pipe';
import { FilterColorPipe } from './pipes/filter-color.pipe';
import { CarFilterComponent } from './components/car-filter/car-filter.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { SimpleLayoutComponent } from './components/_layout/simple-layout/simple-layout.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { LoginComponent } from './components/account-components/login/login.component';
import { RegisterComponent } from './components/account-components/register/register.component';

import { ToastrModule } from 'ngx-toastr';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { JwtModule } from '@auth0/angular-jwt';

import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AppHeaderAccountAreaComponent } from './components/_layout/app-header-account-area/app-header-account-area.component';
import { NavUserComponent } from './components/account-components/nav-user/nav-user.component';
import { NavLoginComponent } from './components/account-components/nav-login/nav-login.component';
import { UserComponent } from './components/user/user.component';
import { UserSidebarComponent } from './components/user/user-sidebar/user-sidebar.component';
import { UserSettingsComponent } from './components/user/user-settings/user-settings.component';
import { UserPasswordComponent } from './components/user/user-password/user-password.component';
import { UserCompanyComponent } from './components/user/user-company/user-company.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    BrandComponent,
    ColorComponent,
    CarComponent,
    CustomerComponent,
    RentalComponent,
    AppHeaderComponent,
    AppLayoutComponent,
    HomeComponent,
    Error404Component,
    RentalsComponent,
    CustomersComponent,
    CarDetailPageComponent,
    CarDetailComponent,
    FilterBrandPipe,
    FilterColorPipe,
    CarFilterComponent,
    RentCarComponent,
    PaymentComponent,
    PaymentPageComponent,
    CarAddComponent,
    AddPageComponent,
    ColorAddComponent,
    BrandAddComponent,
    CarUpdateComponent,
    ColorUpdateComponent,
    BrandUpdateComponent,
    SimpleLayoutComponent,
    MembershipPageComponent,
    LoginComponent,
    RegisterComponent,
    AppHeaderAccountAreaComponent,
    NavUserComponent,
    NavLoginComponent,
    UserComponent,
    UserSidebarComponent,
    UserSettingsComponent,
    UserPasswordComponent,
    UserCompanyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ToastrModule.forRoot({
      positionClass: 'toast-top-right',
      closeButton: true
    }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config:{
        tokenGetter: tokenGetter,
      }
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIconPacks(far);
  }
}

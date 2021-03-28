import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/account-components/login/login.component';
import { RegisterComponent } from './components/account-components/register/register.component';

import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { UserCompanyComponent } from './components/user/user-company/user-company.component';
import { UserPasswordComponent } from './components/user/user-password/user-password.component';
import { UserSettingsComponent } from './components/user/user-settings/user-settings.component';
import { UserComponent } from './components/user/user.component';
import { AppLayoutComponent } from './components/_layout/app-layout/app-layout.component';
import { SimpleLayoutComponent } from './components/_layout/simple-layout/simple-layout.component';
import { AdminRoleGuard } from './guards/admin-role.guard';
import { LoggedInGuard } from './guards/logged-in.guard';
import { LoginGuard } from './guards/login.guard';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { CarDetailPageComponent } from './pages/car-detail-page/car-detail-page.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
import { MembershipPageComponent } from './pages/membership-page/membership-page.component';
import { PaymentPageComponent } from './pages/payment-page/payment-page.component';
import { RentalsComponent } from './pages/rentals/rentals.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '', component: HomeComponent, children: [
          { path: '', component: CarComponent },
          { path: 'cars', component: CarComponent },
          { path: 'cars/brand/:brandId', component: CarComponent },
          { path: 'cars/color/:colorId', component: CarComponent },
          { path: 'cars/filter/:colorId/:brandId', component: CarComponent },
        ]
      },
      {path: 'user', component: UserComponent, canActivate: [LoginGuard], children: [
        {path: 'settings', component: UserSettingsComponent},
        {path: 'password', component: UserPasswordComponent},
        {path: 'cards', component: UserPasswordComponent},
        {path: 'company', component: UserCompanyComponent},
      ]},
      { path: 'car-detail/:carId', component: CarDetailPageComponent },
      {
        path: 'payment', component: PaymentPageComponent, canActivate: [LoginGuard], children: [
          { path: '', component: PaymentComponent }
        ]
      },
      { path: 'rentals', component: RentalsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: '404', component: Error404Component },
      {
        path: 'add', component: AddPageComponent, canActivate: [LoginGuard, AdminRoleGuard], children: [
          { path: '', component: AddPageComponent },
          { path: 'car', component: CarAddComponent },
          { path: 'brand', component: BrandAddComponent },
          { path: 'color', component: ColorAddComponent },
        ]
      },
      {
        path: 'update', component: AddPageComponent, canActivate: [LoginGuard, AdminRoleGuard], children: [
          { path: '', component: AddPageComponent },
          { path: 'car/:carId', component: CarUpdateComponent },
          { path: 'brand/:brandId', component: BrandUpdateComponent },
          { path: 'color/:colorId', component: ColorUpdateComponent },
        ]
      },

    ]
  },
  {
    path: '', component: SimpleLayoutComponent, children: [
      {
        path: '', component: MembershipPageComponent, children: [
          { path: 'login', component: LoginComponent, canActivate: [LoggedInGuard]},
          { path: 'register', component: RegisterComponent, canActivate: [LoggedInGuard] },
        ]
      }
    ]
  },
  {
    path: '**', component: AppLayoutComponent, children: [
      { path: '', component: Error404Component }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

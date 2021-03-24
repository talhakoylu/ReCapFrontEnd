import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AppLayoutComponent } from './components/_layout/app-layout/app-layout.component';
import { AddPageComponent } from './pages/add-page/add-page.component';
import { CarDetailPageComponent } from './pages/car-detail-page/car-detail-page.component';
import { CustomersComponent } from './pages/customers/customers.component';
import { Error404Component } from './pages/error404/error404.component';
import { HomeComponent } from './pages/home/home.component';
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
      { path: 'car-detail/:carId', component: CarDetailPageComponent },
      {
        path: 'payment', component: PaymentPageComponent, children: [
          { path: '', component: PaymentComponent }
        ]
      },
      { path: 'rentals', component: RentalsComponent },
      { path: 'customers', component: CustomersComponent },
      { path: '404', component: Error404Component },
      {
        path: 'add', component: AddPageComponent, children: [
          { path: '', component: AddPageComponent },
          { path: 'car', component: CarAddComponent },
          { path: 'brand', component: BrandAddComponent },
          { path: 'color', component: ColorAddComponent },
        ]
      },
      {
        path: 'update', component: AddPageComponent, children: [
          { path: '', component: AddPageComponent },
          { path: 'car/:carId', component: CarUpdateComponent },
          { path: 'brand/:brandId', component: BrandUpdateComponent },
          { path: 'color/:colorId', component: ColorUpdateComponent },
        ]
      },
      { path: '**', component: Error404Component },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

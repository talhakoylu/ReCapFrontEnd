[![GitHub license](https://img.shields.io/github/license/talhakoylu/ReCapFrontEnd?style=for-the-badge)](https://github.com/talhakoylu/ReCapFrontEnd/blob/master/LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/talhakoylu/ReCapFrontEnd?style=for-the-badge)](https://github.com/talhakoylu/ReCapFrontEnd/stargazers)
<a href="https://www.linkedin.com/in/talhakoylu/">
    <img src="https://img.shields.io/badge/linkedin-%230077B5.svg?&style=for-the-badge&logo=linkedin&logoColor=white" />
</a>
<a href="https://www.twitter.com/talhakoylu/">
    <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" />
</a>

<p align="center"><img src="https://i.imgur.com/S7YH4eA.png" width = 500px ></p>

# ReCap Project FrontEnd
Front side of ReCapBackend project. Angular v11.2.3 used to develop the frontend.

Click on the link below to get information about BackEnd side. Backend is developing with C# & .Net Core 3.1.1. For more information:

<b>BackEnd:</b> <a href="https://github.com/talhakoylu/ReCapProject"><b>ReCapProject BackEnd</b></a>

## Used Technologies and Their Versions
[![Angular](https://img.shields.io/badge/Angular-v11.2.3-red?style=for-the-badge&logo=angular)](https://angular.io)
[![Angular-Fontawesome](https://img.shields.io/badge/Angular%20Fontawesome-0.8.2-red?style=for-the-badge&logo=angular)](https://github.com/FortAwesome/angular-fontawesome)
[![Bootstrap](https://img.shields.io/badge/Bootstrap-v5.0.0--beta2-blueviolet?style=for-the-badge&logo=bootstrap)](https://getbootstrap.com)

## Images
You can get information about what the project looks like via the images below.

<img src="https://i.imgur.com/SIRtYgJ.png" width="30%"></img> <img src="https://i.imgur.com/ARmGeDl.png" width="30%"></img> <img src="https://i.imgur.com/ftdjdBT.png" width="30%"></img> <img src="https://i.imgur.com/4todd8Z.png" width="30%"></img> <img src="https://i.imgur.com/1oG6Cmf.png" width="30%"></img> <img src="https://i.imgur.com/hGd0Brm.png" width="30%"></img> <img src="https://i.imgur.com/06RyQr6.png" width="30%"></img> <img src="https://i.imgur.com/CdirkPE.png" width="30%"></img> 

## Folder Structure

### General Folder Structure
You can get information about general folder structure of this project.
<details>
  <summary>General Folder Structure</summary>

          src
           |-- app
           |   |-- app-routing.module.ts
           |   |-- app.component.css
           |   |-- app.component.html
           |   |-- app.component.spec.ts
           |   |-- app.component.ts
           |   |-- app.module.ts
           |   |-- components
           |   |   |-- _layout
           |   |   |   |-- app-header
           |   |   |   |-- app-layout
           |   |   |-- brand-add
           |   |   |-- brand-update
           |   |   |-- brand
           |   |   |-- car-add
           |   |   |-- car-detail
           |   |   |-- car-filter
           |   |   |-- car-update
           |   |   |-- car
           |   |   |-- color-add
           |   |   |-- color-update
           |   |   |-- color
           |   |   |-- customer
           |   |   |-- payment
           |   |   |-- rent-car
           |   |   |-- rental
           |   |-- models
           |   |-- pages
           |   |   |-- add-page
           |   |   |-- car-detail-page
           |   |   |-- customers
           |   |   |-- error404
           |   |   |-- home
           |   |   |-- payment-page
           |   |   |-- rentals
           |   |-- pipes
           |   |-- services
           |-- assets
           |   |-- .gitkeep
           |-- environments
           |   |-- environment.prod.ts
           |   |-- environment.ts
</details>

### Components
Service and components are binding in files from these folders. In addition, the HTML views of the components are located in these folders.
<details>
  <summary>Components Folder Structure</summary>
   
     app
     |   |-- components
     |   |   |-- _layout
     |   |   |   |-- app-header
     |   |   |   |   |-- app-header.component.css
     |   |   |   |   |-- app-header.component.html
     |   |   |   |   |-- app-header.component.spec.ts
     |   |   |   |   |-- app-header.component.ts
     |   |   |   |-- app-layout
     |   |   |   |   |-- app-layout.component.css
     |   |   |   |   |-- app-layout.component.html
     |   |   |   |   |-- app-layout.component.spec.ts
     |   |   |   |   |-- app-layout.component.ts
     |   |   |-- brand-add
     |   |   |   |-- brand-add.component.css
     |   |   |   |-- brand-add.component.html
     |   |   |   |-- brand-add.component.ts
     |   |   |-- brand-update
     |   |   |   |-- brand-update.component.css
     |   |   |   |-- brand-update.component.html
     |   |   |   |-- brand-update.component.ts
     |   |   |-- brand
     |   |   |   |-- brand.component.css
     |   |   |   |-- brand.component.html
     |   |   |   |-- brand.component.spec.ts
     |   |   |   |-- brand.component.ts
     |   |   |-- car-add
     |   |   |   |-- car-add.component.css
     |   |   |   |-- car-add.component.html
     |   |   |   |-- car-add.component.ts
     |   |   |-- car-detail
     |   |   |   |-- car-detail.component.css
     |   |   |   |-- car-detail.component.html
     |   |   |   |-- car-detail.component.spec.ts
     |   |   |   |-- car-detail.component.ts
     |   |   |-- car-filter
     |   |   |   |-- car-filter.component.css
     |   |   |   |-- car-filter.component.html
     |   |   |   |-- car-filter.component.ts
     |   |   |-- car-update
     |   |   |   |-- car-update.component.css
     |   |   |   |-- car-update.component.html
     |   |   |   |-- car-update.component.ts
     |   |   |-- car
     |   |   |   |-- car.component.css
     |   |   |   |-- car.component.html
     |   |   |   |-- car.component.spec.ts
     |   |   |   |-- car.component.ts
     |   |   |-- color-add
     |   |   |   |-- color-add.component.css
     |   |   |   |-- color-add.component.html
     |   |   |   |-- color-add.component.ts
     |   |   |-- color-update
     |   |   |   |-- color-update.component.css
     |   |   |   |-- color-update.component.html
     |   |   |   |-- color-update.component.ts
     |   |   |-- color
     |   |   |   |-- color.component.css
     |   |   |   |-- color.component.html
     |   |   |   |-- color.component.spec.ts
     |   |   |   |-- color.component.ts
     |   |   |-- customer
     |   |   |   |-- customer.component.css
     |   |   |   |-- customer.component.html
     |   |   |   |-- customer.component.spec.ts
     |   |   |   |-- customer.component.ts
     |   |   |-- payment
     |   |   |   |-- payment.component.css
     |   |   |   |-- payment.component.html
     |   |   |   |-- payment.component.ts
     |   |   |-- rent-car
     |   |   |   |-- rent-car.component.css
     |   |   |   |-- rent-car.component.html
     |   |   |   |-- rent-car.component.ts
     |   |   |-- rental
     |   |   |   |-- rental.component.css
     |   |   |   |-- rental.component.html
     |   |   |   |-- rental.component.spec.ts
     |   |   |   |-- rental.component.ts

</details>

## Updates
#### 25.03.2021

<details>
  <summary>Details and Images</summary>
  
  - [x] Login and register services added.
  - [x] Register, Login, Token Models added.
  - [x] Html views of login and register components were included in the project.

  <img src="https://i.imgur.com/KsayNlY.png" width="30%"> <img src="https://i.imgur.com/Jl9JWRV.png" width="30%">
</details>

#### 27.03.2021

<details>
  <summary>Details and Images</summary>
  
  - [x] Login, Register and Account buttons added on the navbar.
  - [x] Logged in, not login, logout situations handled. Buttons change according to the situation.
  - [x] Not login, already logged in, role guards were added into the project and included in routes.
  - [x] Administration buttons were hided from normal users and visitors. If the user has admin or author role, then the user will be able to see those buttons.

  <img src="https://i.imgur.com/5eJ2xnH.png" width="30%"> <img src="https://i.imgur.com/CAezxAu.png" width="30%"> <img src="https://i.imgur.com/nQ8CxZn.png" width="30%">
</details>

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router 
  ) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName: ["", Validators.required]
    })
  }

  addColor(){
    if (this.colorAddForm.valid) {
      let colorModel = Object.assign({}, this.colorAddForm.value);
      this.colorService.addColor(colorModel).subscribe(response => {
        this.toastrService.success("Renk başarıyla eklendi.");
        this.router.navigate(['/']);
        this.toastrService.info("Ana sayfaya yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Renk Eklenemedi");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }
  }
}

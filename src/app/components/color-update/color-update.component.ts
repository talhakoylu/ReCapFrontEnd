import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {
  color: Color;
  colorUpdateForm: FormGroup;
  constructor(
    private colorService: ColorService,
    private toastrService: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["colorId"]) {
        this.createColorUpdateForm();
        this.getCurrentColor(params["colorId"]);
      }
    });
  }

  getCurrentColor(colorId: number) {
    this.colorService.getColorById(colorId).subscribe(response => {
      this.color = response.data;
      this.colorUpdateForm.get('colorId')?.setValue(this.color.colorId);
      this.colorUpdateForm.get('colorName')?.setValue(this.color.colorName);
    })
  }

  createColorUpdateForm() {
    this.colorUpdateForm = this.formBuilder.group({
      colorId: ["", Validators.required],
      colorName: ["", Validators.required]
    });
  }

  updateColor() {
    if (this.colorUpdateForm.valid) {
      let colorModel = Object.assign({}, this.colorUpdateForm.value);
      this.colorService.updateColor(colorModel).subscribe(response => {
        this.toastrService.success("Renk başarıyla güncellendi.");
        this.router.navigate(['/']);
        this.toastrService.info("Ana sayfaya yönlendiriliyorsunuz.");
      }, responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            const element = responseError.error.Errors[i];
            this.toastrService.error(element.ErrorMessage, "Renk güncellenemedi!");
          }
        }
      });
    } else {
      this.toastrService.warning("Formu eksiksiz doldurmalısınız.");
    }
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddProductComponent } from './components/add-product/add-product.component';



@NgModule({
  declarations: [
    AddProductComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AddProductComponent
  ]
})
export class ProductModule { }

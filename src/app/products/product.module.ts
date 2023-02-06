import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { AddProductComponent } from './components/add-product/add-product.component';
import { ProductComponent } from './components/product/product.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddProductComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductRoutingModule,
  ],
  exports: [
    ProductComponent,
  ]
})
export class ProductModule { }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../../interface/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  searchIcon = '../../../../assets/search.svg'
  loading: boolean = false
  productID!: number;
  products: product[] = [];
  constructor(
    private productService:ProductService,
    private router: Router,
    ) {
  }
  ngOnInit() {
    this.getAllProducts();
  }
  // get All Products
  getAllProducts() {
    this.productService.getAllProducts().subscribe(
    (res:any)=> {
      this.loading = true
      this.products = res;
    }
    )
  }
  takeAction(id:number) {
    debugger
    this.router.navigate(['/product', id]);
  }
}

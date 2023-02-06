import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalComponent } from 'src/app/shared/components/modal/modal.component';
import { product } from '../../interface/product';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.sass'],
})
export class AddProductComponent {
  @ViewChild('confirmationModal') 
  modalComponent!: ModalComponent;
  modalButtonText: string = '';
  modalTitle: string = '';
  modalBody: string = '';
  modalButtonColor: string = '';
  actionType: any;
  loading: boolean = false;
  editMood: boolean = false
  modal: any;
  passwordIcon = '../../../../assets/eye.svg';
  typeInput = 'Password';
  toastMsg: string = '';
  product!: product;
  manageProductForm!: FormGroup;
  manageProduct: boolean = false;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: any) => {
      if (params.id) {
        this.editMood = true;
        this.getProductByID(params.id);
      }
    });
  }
  ngOnInit() {
    // Type validation form
    this.manageProductForm = this.formBuilder.group({
      id: [],
      productName: ['', [Validators.required]],
      productType: ['', [Validators.required]],
      password: ['', [Validators.required,     Validators.pattern(/^(?=.*[0-9])(?=.*[-!@#$%^&*])(?=.*[a-zA-Z]).{4,}$/),],
      ],
      deliveryPercentage: ['',[Validators.required, Validators.min(1), Validators.max(100)],
      ],
      delivery: ['', [Validators.required]],
      referenceID: [''],
      productSubCategory: [''],
      productCategory: ['', [Validators.required]],
    });
  }
  async openModal() {
    return await this.modalComponent.open();
  }
  // show Password
  showPassword(type: string) {
    if (type == 'Password') {
      this.typeInput = 'text';
      this.passwordIcon = '../../../../assets/close-eyes.svg';
    } else {
      this.typeInput = 'Password';
      this.passwordIcon = '../../../../assets/eye.svg';
    }
  }

  //  Type validation form submit data
  formSubmit(formValue: product) {
    debugger;
    this.manageProduct = true;
    if(this.manageProductForm.status == "VALID") {
      if (!this.manageProductForm.controls['id'].value) {
        this.productService.addProduct(formValue).subscribe((res: any) => {
          if (res) {
            this.loading = true;
            this.toastMsg = 'add Product successfully';
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          }
        });
      }
      else {
        this.productService.updateProductByID(formValue.id, formValue).subscribe((res: any) => {
          if (res) {
            this.loading = true;
            this.toastMsg = 'update Product successfully';
            setTimeout(() => {
              this.router.navigate(['/']);
            }, 1000);
          }
        });
  
      }
    }
  }
  // Returns the type validation form
  get type() {
    debugger
    return this.manageProductForm.controls;
  }
  // open model add or edit
  conformationAddOrEdit() {
    this.modalTitle = `'Save changes?'`;
    this.modalBody = "Are you sure you want to save changes made?";
    this.modalButtonText = 'Save';
    this.modalButtonColor = 'btn-primary';
    this.actionType= "Add";
    this.openModal();
  }
  // get Product By ID
  getProductByID(id: number) {
    debugger;
    this.productService.getProductByID(id).subscribe((res: any) => {
      this.manageProductForm.patchValue({
        id: res[0].id,
        productName: res[0].productName,
        productType: res[0].productType,
        password: res[0].password,
        deliveryPercentage: res[0].deliveryPercentage,
        delivery: res[0].delivery,
        referenceID: res[0].referenceID,
        productSubCategory: res[0].productSubCategory,
        productCategory: res[0].productCategory,
      });
    });
  }
  // open model delete
  conformationDelete() {
    this.modalTitle = `'Delete "${this.manageProductForm.controls['productName'].value}"?'`;
    this.modalBody = "Are you sure you want to delete product? Once deleted, you won't be able to access it again.";
    this.modalButtonText = 'Delete';
    this.modalButtonColor = 'btn-danger';
    this.actionType= "Delete";

    this.openModal();
  }
  // conformation Delete
  getConfirmationValue(value: any) {
    debugger
    if (value == 'Add') {
      this.formSubmit(this.manageProductForm.value)
    }
    else if(value == 'Delete') {
      this.deleteProductByID()
    }
  }
  // delete product by id 
  deleteProductByID() {
    debugger
    this.productService.deleteProductByID(this.manageProductForm.controls['id'].value).subscribe((res: any) => {
      this.loading = true;
      this.toastMsg = 'delete successfully';
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000);
    });

  }
}

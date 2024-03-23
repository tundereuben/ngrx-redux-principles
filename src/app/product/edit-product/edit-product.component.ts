import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { State, getCurrentProduct } from '../products/state/product.reducer';
import * as ProductActions from '../products/state/product.actions';
import { Product } from '../products/products.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  public currentProduct!: Product | null;
  public productForm!: FormGroup;

  public product$!: Observable<Product | null>
  
  constructor(
    private store: Store<State>,
    private fb: FormBuilder,
  ) {}


  ngOnInit(): void {
    // Watch for changes to the current selected product
    this.product$ = this.store.select(getCurrentProduct).pipe(
      tap(currentProduct => this.displayProduct(currentProduct))
    );
    this.createProductForm();
  }

  createProductForm() {
    this.productForm = this.fb.group({
      id: [''],
      title: ['']
    });
  }

  displayProduct(product: Product | null) {
    this.currentProduct = product;
    this.productForm?.patchValue({
      id: product?.id === 0 ? 'New' : product?.id,
      title: product?.title
    });
  }

  clearProduct() {
    this.store.dispatch(ProductActions.clearCurrentProduct())
  }

  saveProduct(originalProduct: Product) {
    if (this.productForm.valid) {
      if (this.productForm.dirty) {
        const product = {...originalProduct, title: this.productForm.value.title }

        if (product.id === 0) {
          // create product 
          this.store.dispatch(ProductActions.createProduct({ product }))
        } else {
          // update product
          this.store.dispatch(ProductActions.updateProduct({ product }))
        }
      }
    }
  }

  deleteProduct(productToDelete: Product) {
    const product = { ...productToDelete }
    if (product.id !== 0) {
      this.store.dispatch(ProductActions.deleteProduct({ product }));
    }
  }

}

import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { State, getShowProductCode, getCurrentProduct, getproducts, getError } from './state/product.reducer';
import * as ProductActions from '../products/state/product.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  displayCode$!: Observable<boolean>
  currentProduct$!: Observable<Product>
  products$!: Observable<Product[]>
  errorMessages$!: Observable<string>;

  constructor(
    private store: Store<State>,
    ) {}


  ngOnInit(): void {

    this.products$ = this.store.select(getproducts);

    this.errorMessages$ = this.store.select(getError);

    this.store.dispatch(ProductActions.loadProducts());

    this.currentProduct$ = this.store.select(getCurrentProduct);

    this.displayCode$ = this.store.select(getShowProductCode);
  }


  showHideCode(e: any): void {
    this.store.dispatch(ProductActions.toggleProductCode());
  }

  selectProduct(product: Product) {
    this.store.dispatch(ProductActions.setCurrentProduct({ currentProductId: product.id }));
  }

  initializeProduct() {
    this.store.dispatch(ProductActions.initializeCurrentProduct())
  }

}

export interface Product {
  id: number;
  title: string;
}
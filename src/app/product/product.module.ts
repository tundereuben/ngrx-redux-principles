import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products/products.component';
import { StoreModule } from '@ngrx/store';
import { productReducer } from './products/state/product.reducer';
import { RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './edit-product/edit-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { ProductEffects } from './products/state/product.effects';

const productRoutes: Routes = [
  { path: '', component: ProductsComponent }
];

@NgModule({
  declarations: [
    ProductsComponent,
    EditProductComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(productRoutes),
    StoreModule.forFeature('products', productReducer),
    EffectsModule.forFeature([ProductEffects]),
    ReactiveFormsModule
  ],
  exports: [
    ProductsComponent
  ]
})
export class ProductModule { }

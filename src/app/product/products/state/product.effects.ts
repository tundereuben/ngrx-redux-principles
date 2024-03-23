import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ProductService } from "../../product.service";
import * as ProductActions from '../state/product.actions';
import { catchError, concatMap, map, mergeMap, of } from "rxjs";

@Injectable()
export class ProductEffects {

    constructor(
        private actions$: Actions,
        private productService: ProductService,
    ) {}

    loadProducts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(ProductActions.loadProducts),
            mergeMap(() => this.productService.getProducts().pipe(
                map(products => products.slice(5, 10)),
                map(products => ProductActions.loadProductsSuccess({ products })),
                catchError(error => of(ProductActions.loadProductsFailure({ error })))
            ))
        );
    });

    updateProduct$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProductActions.updateProduct),
            concatMap(action => 
                this.productService.updateProduct(action.product)
                .pipe(
                    map(product => ProductActions.updateProductSuccess({ product })),
                    catchError(error => of(ProductActions.updateProductFailure({ error })))
                )
            )
        )
    });

    saveProduct$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProductActions.createProduct),
            concatMap(action => 
                this.productService.save(action.product)
                .pipe(
                    map(product => ProductActions.createProductSuccess({ product })),
                    catchError(error => of(ProductActions.createProductFailure({ error })))
                )
            )
        )
    });

    deleteProduct$ = createEffect(() => {
        return this.actions$
        .pipe(
            ofType(ProductActions.deleteProduct),
            concatMap(action => 
                this.productService.deleteProduct(action.product)
                .pipe(
                    map( product => ProductActions.deleteProductSuccess({ product })), 
                    catchError(error => of(ProductActions.deleteProductFailure({ error })))
                )
            )
        )
    });
}
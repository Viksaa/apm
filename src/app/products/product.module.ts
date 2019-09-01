import { NgModule } from '@angular/core';
import { ProductListComponent } from './product-list.component';
import { ProductDetailComponent } from './product-detail.component';
import { ConvertToSpacesPipe } from '../shared/convert-to-spaces.pipe';
import { RouterModule } from '@angular/router';
import { ProductDetailGuard } from './product-detail.guard';
import { SharedModule } from '../shared/shared.module';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { ProductData } from './product-data';
import { ProductEditComponent } from './product-edit.component';

@NgModule({
    declarations: [
        ProductListComponent,
        ProductDetailComponent,
        ConvertToSpacesPipe,
        ProductEditComponent,
    ],
    imports: [
        RouterModule.forChild([
            { path: 'products', component: ProductListComponent },
            {
                path: 'products/:id',
                canActivate: [ ProductDetailGuard ],
                component: ProductDetailComponent
            },
            {
                path: 'products/edit/:id',
                component: ProductEditComponent
            }
        ]),
        SharedModule,
        InMemoryWebApiModule.forRoot(ProductData)
    ]
})
export class ProductModule { }

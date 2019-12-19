import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule, MatSidenavModule, MatProgressBarModule,
  MatToolbarModule, MatListModule, MatSlideToggleModule } from "@angular/material";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductAddComponent } from './product-add/product-add.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { FileUploadModule } from 'ng2-file-upload';
import { RouterModule } from "@angular/router";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFileUploadModule } from 'angular-material-fileupload';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    ProductDetailComponent,
    ProductAddComponent,
    ProductEditComponent,
    SideNavComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule, SlimLoadingBarModule.forRoot(), MatProgressBarModule,
    MatSidenavModule, MatToolbarModule, LayoutModule, MatListModule,
    MatExpansionModule, MatTabsModule, MatSlideToggleModule, MatFileUploadModule, 
    FileUploadModule,
    RouterModule.forRoot([
      {path: '', component: ProductAddComponent}
    ]/*, {useHash: false}*/),
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [MatSortModule]
})
export class AppModule { }

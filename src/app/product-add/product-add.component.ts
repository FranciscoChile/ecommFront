import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})

export class ProductAddComponent implements OnInit {

  productForm: FormGroup;

  constructor(
    private router: Router, 
    private api: ApiService, 
    private formBuilder: FormBuilder,
    private cd: ChangeDetectorRef,
    private slimLoadingBarService: SlimLoadingBarService
    ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'sku' : [null, Validators.required],
      'nameProduct' : [null, Validators.required],
      'description' : [null, Validators.required],
      'priceList' : [null, Validators.required],
      'priceSell' : [null, Validators.required],
      'stock' : [null, Validators.required],
      'active' : [null, Validators.required]
    });

  }

  onFormSubmit() {

    let active = this.productForm.value['active'] ? 1 : 0;
    this.productForm.value['active'] = active;
    
    this.api.addProduct(this.productForm.value)
      .subscribe(product => {          
          console.log(product);
          this.router.navigate(['/products']);
          //let id = res['_id']; 
          //this.router.navigate(['/product-details', 1]);
        }, (err) => {
          console.log(err);
        });
  }

  cancelEdit() {
    this.startLoading();
    this.router.navigate(['/products']);
    this.completeLoading();
  }

  startLoading() {
    this.slimLoadingBarService.start(() => {
        console.log('Loading complete');
    });
  }

  stopLoading() {
      this.slimLoadingBarService.stop();
  }

  completeLoading() {
      this.slimLoadingBarService.complete();
  }
}

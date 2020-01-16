import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  productForm: FormGroup;
  _id:string='';
  prod_name:string='';
  prod_desc:string='';
  prod_price:number=null;

  constructor(private router: Router, private route: ActivatedRoute, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getProduct(this.route.snapshot.params['id']);
    this.productForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required]
    });
  }

  getProduct(id) {
    this.api.getProduct(id).subscribe(data => {
      this._id = data.idProduct ;
      this.productForm.setValue({
        prod_name: data.nameProduct,
        prod_desc: data.description,
        prod_price: data.priceList
      });
    });
  }

  onFormSubmit(form:NgForm) {
    this.api.updateProduct(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/products']);
        }, (err) => {
          console.log(err);
        });
  }

  productDetails() {
    this.router.navigate(['/product-details', this._id]);
  }

}

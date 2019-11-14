import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    private cd: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      'prod_name' : [null, Validators.required],
      'prod_desc' : [null, Validators.required],
      'prod_price' : [null, Validators.required],
      'prod_file': ["", null]
    });

  }

  onFormSubmit() {
    this.api.addProduct(this.productForm.value)
      .subscribe(res => {
          let id = res['_id']; 
          this.router.navigate(['/product-details', id]);
        }, (err) => {
          console.log(err);
        });
  }

  onFileChange(event) {
    let reader = new FileReader();
   
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.productForm.patchValue({
          'prod_file': reader.result
        });
        
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
      };
    }
  }

}

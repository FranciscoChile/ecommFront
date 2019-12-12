import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Product } from '../product';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {SlimLoadingBarService} from 'ng2-slim-loading-bar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['sku', 'nameProduct', 'description', 'priceList', 'priceSell', 'stock', 'active'];
  dataSource = new MatTableDataSource<Product>();
 
  //formulario edicion
  productForm: FormGroup;
  _id:string='';

  f_firstPanel = false;
  f_secondPanel = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private slimLoadingBarService: SlimLoadingBarService, private api: ApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.f_firstPanel = true;
    
    this.api.getProducts()
      .subscribe(res => {
        this.dataSource.data = res;
        console.log(this.dataSource.data);
      }, err => {
        console.log(err);
      });

      this.productForm = this.formBuilder.group({
        'idProduct': [null, Validators.required],
        'sku': [null, Validators.required],
        'nameProduct' : [null, Validators.required],
        'description' : [null, Validators.required],
        'priceList' : [null, Validators.required],
        'priceSell' : [null, Validators.required],
        'stock' : [null, Validators.required],
        'active' : [null, Validators.required]

      });
  }

  selectRow(row) {
    console.log(row);
    this.startLoading();

    this.f_firstPanel = false;
    this.f_secondPanel = true;
    this._id = row.idProduct;

    this.productForm.setValue({ 
      idProduct: row.idProduct,
      sku: row.sku,
      nameProduct: row.nameProduct,
      description: row.description,
      priceList: row.priceList,
      priceSell: row.priceSell,
      stock: row.stock,
      active: row.active
    });
    this.completeLoading();

  }

  cancelEdit() {
    this.startLoading();
    this.f_firstPanel = true;
    this.f_secondPanel = false;
    this.completeLoading();
  }

  //modificar producto
  onFormSubmit(form:NgForm) {

    this.startLoading();

    let active = form['active'] ? 1 : 0;
    form['active'] = active;

    this.api.updateProduct(this._id, form)
      .subscribe(res => {
          this.completeLoading();
          this.f_firstPanel = true;
          this.f_secondPanel = false;
          this.ngOnInit();
        }, (err) => {
          console.log(err);
          this.stopLoading();
        });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  delete() {
    this.startLoading();

    this.api.deleteProduct(this._id)
      .subscribe(res => {
          this.completeLoading();
          this.f_firstPanel = true;
          this.f_secondPanel = false;
          this.ngOnInit();
        }, (err) => {
          console.log(err);
          this.stopLoading();
        }
      );
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}

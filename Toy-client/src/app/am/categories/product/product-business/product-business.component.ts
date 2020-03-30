import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';

import { Product } from '../product';
import { Constants } from '../../../common/util/constants';
import { ProductForm } from '../product-form.component';
import { ProductService } from '../product.service';
import { CategoryService } from '../../category/category.service';
import { ManufacturerService } from '../../manufacturer/manufacturer.service';
import { Manufacturer } from '../../manufacturer/Manufacturer';
import { Category } from '../../category/category';
declare var $;
@Component({
  selector: 'app-product-business',
  templateUrl: './product-business.component.html',
  providers: [ProductService, CategoryService, ManufacturerService]
})

/**
 * @description: Component management create, update
 */
export class ProductBusinessComponent implements OnInit {
  private sub: any;
  /**the id of object */
  id: number;
  /** the name of business */
  business: string;
  /** the form object */
  ProductForm: FormGroup;
  Product: Product;
  indexCategorySelection: number;
  indexManufactererSelection: number;
  categorySelections: Array<any> = [];
  manufacturerSelections: Array<any> = [];
  codeManfacture: string;
  product: Product;
  listCategory: Category[]
  listManfacturer: Manufacturer[]


  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private categoryService: CategoryService,
    private manufacturerService: ManufacturerService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParam
    this.getListCategory();
    this.getListManfacture();
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.ProductForm = ProductForm.ProductForm(this.fb, this.business);
      if (this.business == 'create') {
        this.isUpdate = false;
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.bindingData(this.ProductForm, this.id);
      }
    });
  }

  isEqualOld(thenew, type) {
    try {
      var old;
      if (type == "name") {
        old = this.Product.name;
      }
      if (old != thenew && old == this.standardized(thenew, type)) {
        return false;
      } else return true;
    } catch (e) { }
  }
  standardized(thenew, type) {
    thenew = thenew.trim();
    if (type == "name") {
      thenew = thenew.split(" ").join("");
    } else {
      // console.log('xsa');
      thenew = thenew.replace(/\s+/g, ' ');
    }
    return thenew;
  }

  private getListManfacture() {
    this.manufacturerService.getListManufacturer()
      .then(response => {
        // console.log("cate", response.data)
        // console.log("id", response.data.id)
        this.listManfacturer = response.data;
        if (this.product && this.product.manfacturer) {
          this.initializeManfacturerSelection(this.product.manfacturer.id);

        } else {
          this.initializeManfacturerSelection(0);
        }

      }).catch(error => {
        console.log(error)
      });
  }

  private initializeManfacturerSelection(selectItem: number) {
    let manfacturer_datas = []
    var countItems = 0;
    if (this.listManfacturer) {
      this.listManfacturer.forEach(element => {
        //   console.log(element);
        var item = {
          id: null, text: null
        };
        item.text = element.name;
        item.id = element.id;
        manfacturer_datas.push(item)
        if (item.id == selectItem) {
          this.indexManufactererSelection = countItems
        }
        countItems += 1
      });
    }
    this.manufacturerSelections = manfacturer_datas
    // console.log(this.manufacturerSelections)
  }

  manfacturerChanged(id: number) {
    //debugger 
    var id1: number
    //this.ProductForm.get('province.id').setValue(id);
    this.ProductForm.get('manufacturerId').setValue(id);
    this.manufacturerService.findOne(id).then(response => {
      this.id = response.data.id;
      //console.log("Cáccs", response)
      this.ProductForm.get('manufacturerId').setValue(id);
    }).catch(error => {
      console.log(error)
    });

  }

  private getListCategory() {
    this.categoryService.getListCategory()
      .then(response => {
        // console.log("cate", response.data)
        // console.log("id", response.data.id)
        this.listCategory = response.data;
        if (this.product && this.product.category) {
          this.initializeCategorySelection(this.product.category.id);

        } else {
          this.initializeCategorySelection(0);
        }

      }).catch(error => {
        console.log(error)
      });
  }




  private initializeCategorySelection(selectItem: number) {
    let category_datas = []
    var countItems = 0;
    if (this.listCategory) {
      this.listCategory.forEach(element => {
        //  console.log(element);
        var item = {
          id: null, text: null
        };
        item.text = element.name;
        item.id = element.id;
        category_datas.push(item)
        if (item.id == selectItem) {
          this.indexCategorySelection = countItems
        }
        countItems += 1
      });
    }
    this.categorySelections = category_datas
    //console.log(this.categorySelections)
  }
  codeCategory: string;
  categoryChanged(id: number) {
    //debugger 
    var id1: number
    
    this.ProductForm.get('categoryId').setValue(id);
    this.categoryService.findOne(id).then(response => {
      this.id = response.data.id;
      this.ProductForm.get('categoryId').setValue(id);

    }).catch(error => {
      console.log(error)
    });

  }


  bindingData(productForm, id) {
    debugger
    this.productService.findOne(id)
      .then(response => {
        debugger
        //console.log(response)
        this.product = new Product()
        this.product = response.data;
        // this.Product = JSON.parse(JSON.stringify(response.data));
        ProductForm.bindingData(productForm, this.product);
        this.urlPhoto = 'assets/layouts/layout/img/' + this.product.thumbai;
        //console.log(this.product)
        if (this.product.thumbai != null) {
          $('#apiEditThumb').attr('src', this.urlPhoto)
        }
        else {
          $('#apiEditThumb').attr('src', "assets/layouts/layout/img/api-default.jpeg")
        }

      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : submit data
   * @param Province : the data
   */
  submit(Product: Product) {
    if (this.isUpdate) {
      // console.log(Product);
      debugger
      this.updateProduct(Product);
    } else {
      this.createProduct(Product);
    }
  }

  /**
   * Creat a new object
   */
  private createProduct(product: Product) {
    debugger
    this.productService.createApiImage(this.apiFile);
    // Product.thumbai=this.apiFile.name;
    product.thumbai = this.apiFile.name;
    //console.log("ten nay",this.Product.thumbai)
    this.productService.create(product)
      .then(response => {
        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.CreateFail').subscribe((res: string) => {
          message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
      });
  }

  /**
   * Update a object
   * @param Province
   */
  private updateProduct(Product) {
    this.productService.createApiImage(this.apiFile);
    // Product.thumbai=this.apiFile.name;
    Product.thumbai = this.apiFile.name;

    this.productService.update(Product)
      .then(response => {

        this.goBack();
      })
      .catch(error => {
        let message;
        this.translate.get('Message.UpdateFail').subscribe((res: string) => {
          message = res;
        });
        this.toastr.error('', message, { dismiss: 'controlled' })
          .then((toast: Toast) => {
            setTimeout(() => {
              this.toastr.dismissToast(toast);
            }, 3000);
          });
      });
  }

  /**
   * Check data is valid
   */
  isValidForm() {

    // check Province name is valid
    if (this.ProductForm.get('name').invalid) {
      if (this.ProductForm.get('name').errors.required) {
        return false;
      }
      if (this.ProductForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.ProductForm.get('name').errors.maxlength != null) {
        return false;
      }
    }


    return true;
  }
  public apiFile: any = File;
  urlPhoto: string = '';
  onFileSelected(event) {
    debugger
    this.urlPhoto = '';
    const file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (event) => {
        const urlPhoto: string = reader.result as string;
        $('#apiEditThumb').attr('src', urlPhoto)

      }
      // console.log(file);
      this.apiFile = file;
      //this.apiService.createApiImage(file);
    }
  }

  /**
   * return to the previous page
  */
  goBack() {
    this.location.back();
  }
}

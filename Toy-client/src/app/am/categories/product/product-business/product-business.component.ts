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
import { Category } from '../../category/category';
declare var $;
@Component({
  selector: 'app-product-business',
  templateUrl: './product-business.component.html',
  providers: [ProductService, CategoryService]
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

  isUpdate: boolean = true;

  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private translate: TranslateService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParam
    this.getListCategory();
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
        old = this.Product.nameProduct;
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
  product: Product;
  listCategory: Category[]
  private getListCategory() {
    this.categoryService.getListClassroom()
      .then(response => {
        console.log("cate", response.data)
        console.log("id", response.data.id)
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
        console.log(element);
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
    console.log(this.categorySelections)
  }
  codeCategory: string;
  categoryChanged(id: number) {
    //debugger 
    var id1: number
    //this.ProductForm.get('province.id').setValue(id);
    this.categoryService.findOne(id).then(response => {
      this.codeCategory = response.data.code;
      console.log("Cáccs", response)
      //this.ProductForm.get('categoryId').setValue(this.codeCategory)
    }).catch(error => {
      console.log(error)
    });

  }


  bindingData(productForm, id) {
    debugger
    this.productService.findOne(id)
      .then(response => {
        debugger
        this.Product = JSON.parse(JSON.stringify(response.data));
        ProductForm.bindingData(productForm, this.Product);
      })
      .catch(error => console.log("errors: " + error));
  }

  /**
   * @description : submit data
   * @param Province : the data
   */
  submit(Product) {
    if (this.isUpdate) {
      console.log(Product);
      debugger
      this.updateProduct(Product);
    } else {
      this.createProduct(Product);
    }
  }

  /**
   * Creat a new object
   */
  private createProduct(Product) {
    debugger
    this.productService.create(Product)
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
    if (this.ProductForm.get('nameProduct').invalid) {
      if (this.ProductForm.get('nameProduct').errors.required) {
        return false;
      }
      if (this.ProductForm.get('nameProduct').errors.pattern != null) {
        return false;
      }
      if (this.ProductForm.get('nameProduct').errors.maxlength != null) {
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
      console.log(file);
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

import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr';
import { TranslateService } from '@ngx-translate/core';
import { browser } from 'protractor';
import { CategoryService } from '../category.service';
import { CategoryForm } from '../category-form.component';
import { Category } from '../category';
import { ProductService } from '../../product/product.service';
import { Product } from '../../product/product';
import { Action } from 'rxjs/scheduler/Action';
import { Constants } from '../../../common/util/constants';

@Component({
  selector: 'app-category-business',
  templateUrl: './category-business.component.html',
  providers: [CategoryService, ProductService]
})

/**
 * @description: Component management create, update
 */
export class CategoryBusinessComponent implements OnInit {
  private sub: any;
  /**the id of object */
  id: number;
  idAmphitheater: number;
  product: Product;
  /** the name of business */
  business: string;
  /** the form object */
  categoryForm: FormGroup;
  category: Category;
  isUpdate: boolean = true;
  listProduct = null;
  indexProductSelection = null;
  productSelections = null;
  listCategory = null;
  indexCategorySelection = null;
  categorySelections = null;
  listStatus = Constants.STATUS_LIST;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private translate: TranslateService,
    private productService: ProductService,
    public toastr: ToastsManager, vcr: ViewContainerRef
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    // Lấy bản ghi theo 'id' từ @PathParamf

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
      this.business = params['business'];
      this.categoryForm = CategoryForm.categoryForm(this.fb, this.business);
      if (this.business == 'create') {
        debugger
        this.isUpdate = false;
        this.getListProduct();
        // console.log()
      }
      if (this.business == 'update') {
        this.isUpdate = true;
        this.getListProduct();
        this.bindingData(this.categoryForm, this.id);
      }
    });
  }

  isEqualOld(thenew, type) {
    try {
      var old;
      if (type == "name") {
        old = this.category.name;
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


  bindingData(categoryForm, id) {
    this.categoryService.findOne(id)
      .then(response => {
        debugger
        this.category = JSON.parse(JSON.stringify(response.data));
        CategoryForm.bindingData(categoryForm, this.category);
        this.getListProduct();
        // this.getListClassroom();
      })
      .catch(error => console.log("errors: " + error));

  }

  /**
   * @description : submit data
   * @param Province : the data
   */
  submit(Category) {
    if (this.isUpdate) {
      console.log(Category);
      debugger
      this.updateCategory(Category);
    } else {
      this.createCategory(Category);
    }
  }

  /**
   * Creat a new object
   */
  private createCategory(Classroom) {

    this.categoryService.create(Classroom)
      .then(response => {
        debugger
        this.getListProduct();
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
  private updateCategory(Category) {
    this.categoryService.update(Category)
      .then(response => {
        //this.getListAmphitheater();
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
    if (this.categoryForm.get('name').invalid) {
      if (this.categoryForm.get('name').errors.required) {
        return false;
      }
      if (this.categoryForm.get('name').errors.pattern != null) {
        return false;
      }
      if (this.categoryForm.get('name').errors.maxlength != null) {
        return false;
      }
    }
    // if (this.categoryForm.get('symbol').invalid) {
    //   if (this.categoryForm.get('symbol').errors.required) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('symbol').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('symbol').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    // check Province name is valid
    // if (this.categoryForm.get('size').invalid) {
    //   if (this.categoryForm.get('size').errors.required) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('size').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('size').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    // // check Province name is valid
    // if (this.categoryForm.get('chucNang').invalid) {
    //   if (this.categoryForm.get('chucNang').errors.required) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('chucNang').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('chucNang').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    // // check Province name is valid
    // if (this.categoryForm.get('amount').invalid) {
    //   if (this.categoryForm.get('amount').errors.required) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('amount').errors.pattern != null) {
    //     return false;
    //   }
    //   if (this.categoryForm.get('amount').errors.maxlength != null) {
    //     return false;
    //   }
    // }

    return true;

  }

  private getListProduct() {
    this.productService.getListProduct()
      .then(response => {
        this.listProduct = response.data;

        this.initializeAmphitheaterSelection(0);


      }).catch(error => {
        console.log(error)
      });
  }

  private initializeAmphitheaterSelection(selectItem: number) {
    debugger
    let amphitheater_datas = []
    var countItems = 0;
    if (this.listProduct) {
      this.listProduct.forEach(element => {
        var item = {
          id: null, text: null
        };
        item.text = element.nameAmphitheater
        item.id = element.idAmphitheater;
        amphitheater_datas.push(item)
        // if(this.classroom!=undefined&&this.classroom!=null&&item.id == this.classroom.amphitheater.idProduct){
        //   // this.indexPolicySelection = countItems;
        //   this.indexAmphitheaterSelection = countItems
        // }
        countItems += 1
      });
    }
    this.productSelections = amphitheater_datas
    console.log(this.productSelections)
  }

  amphitheaterChanged(id: number) {
    // this.ClassroomForm.get('classroom').setValue(new Classroom())
    debugger
    this.categoryForm.get('amphitheater.idAmphitheater').setValue(id)
    if (!id) {
      debugger
      this.listCategory = []
      this.categorySelections = []
      this.indexCategorySelection = 0
      this.amphitheaterChanged(0)
    } else {
      // this.getListAmphitheater()
    }

  }

  public refreshPolicyValue(value: any): void {
    this.indexProductSelection = null;
    this.categorySelections.get('amphitheater.idAmphitheater').setValue(null);
  }




  // private getListClassroom(classRoomId: number) {
  //     this.classroomService.findOne(this.id)
  //     .then(response => {
  //         this.listClassroom = response.data
  //         this.initializeClassroomSelection(0)
  //     }).catch(error => {
  //         console.log(error)
  //     });
  // }

  // private initializeClassroomSelection(selectItem: number) {
  //     let classroom_datas = []
  //     var countItems = 0;
  //     if (this.listClassroom) {
  //       this.listClassroom.forEach(element => {
  //         var item = {
  //           id: null, text: null
  //         };
  //         item.text = element.classRoomName
  //         item.id = element.classroomId;
  //         classroom_datas.push(item)
  //         if (item.id == selectItem) {
  //           this.indexClassroomSelection = countItems
  //         }
  //         countItems += 1
  //       });
  //     }
  //     this.classroomSelections = classroom_datas
  //     console.log(this.classroomSelections)
  // }

  // classroomChanged(id: number) {
  //     debugger
  //     this.ClassroomForm.get('classroom.classRoomId').setValue(id)

  // }

  /**
   * return to the previous page
  */
  goBack() {
    this.location.back();
  }
}

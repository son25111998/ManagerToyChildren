package com.ncs.endpoint;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ncs.common.ResponseData;
import com.ncs.common.constants.CommonConstants;
import com.ncs.common.constants.Constants;
import com.ncs.common.util.Result;
import com.ncs.entity.AmActionHistory;
import com.ncs.entity.CategoryEntity;
import com.ncs.entity.ProductEntity;
import com.ncs.service.ActionHistoryService;
import com.ncs.service.CategoryService;
import com.ncs.service.ProductService;



/**
 * @author: SonNc
 **/
@EnableAutoConfiguration
@Controller
@RequestMapping("/api/v1/categories")
public class CategoryResource {
	@Autowired
	private ActionHistoryService actionHistoryService;
	@Autowired
	private CategoryService categoryService;
	@Autowired
	private ProductService productService;

	@GetMapping(value = "/category-management/managed-category/search/{name}/{status}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<CategoryEntity>> searchAllCategory(@PathVariable String name,
															  @PathVariable String status, Pageable pageable) {
		ResponseData<Page<CategoryEntity>> response = new ResponseData<>();

		Page<CategoryEntity> categorys = null;

		try {
			categorys = categoryService.searchAllCategory(name, status, pageable);
			response.setData(categorys);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}


	@GetMapping(value = "/category-management/managed-category/search-name/{name}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<CategoryEntity>> searchNameCategory(@PathVariable String name,
                                                               Pageable pageable) {
		ResponseData<Page<CategoryEntity>> response = new ResponseData<>();

		Page<CategoryEntity> categorys = null;

		try {
			categorys = categoryService.searchNameCategory(name, pageable);
			response.setData(categorys);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}
    //testok
//	@GetMapping(value = "/category-management/managed-category/search-status/{status}", produces = {
//			MediaType.APPLICATION_JSON_UTF8_VALUE })
//	public @ResponseBody
//	ResponseData<Page<CategoryEntity>> searchStatusProduct(@PathVariable String status,
//                                                                 Pageable pageable) {
//		ResponseData<Page<CategoryEntity>> response = new ResponseData<>();
//
//		Page<CategoryEntity> products = null;
//
//		try {
//			products = categoryService.searchStatusProduct(status, pageable);
//			response.setData(products);
//			response.setCode(Constants.SUCCESS_CODE);
//			response.setMessage(Constants.SUCCESS_MSG);
//		} catch (Exception e) {
//			// TODO: handle exception
//			response.setData(null);
//			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
//			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
//		}
//
//		return response;
//	}
	//testok
	//select page db in amphitheater
	@GetMapping(value = "/category-management/managed-category", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<CategoryEntity>> getAllCategory(Pageable pageable) {
		ResponseData<Page<CategoryEntity>> response = new ResponseData<>();

		Page<CategoryEntity> categorys = null;

		try {
			categorys = categoryService.findPaging(pageable);
			response.setData(categorys);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}
    //testok
	//create new Amphitheater
	@PostMapping(value = "/category-management/managed-category", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> create(@RequestBody CategoryEntity categorys) {
		ResponseData<Integer> response = new ResponseData<>();
		try {
			if (categoryService.create(categorys) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
				response.setData(Constants.SUCCESS_CODE_FIELD_UNEXIST);
				// create log
				AmActionHistory actionHistory = new AmActionHistory();
				actionHistory.setAction(CommonConstants.ACTION_HISTORY_ACTION.CREATED);
				actionHistory.setModule(CommonConstants.ACTION_HISTORY_MODULE.CATEGORY.CATEGORY);
				actionHistory.setRecordId(categorys.getId() + "");


				actionHistory.setCategory(categorys.getName());
				actionHistory.setUserName(CommonConstants.DEFAULT_USER);
				actionHistory.setManipulation("Tạo mới thể loại");
				actionHistory.setDetailAction(categorys.toString());
				actionHistory.setStatus(CommonConstants.STATUS_HISTORY.CREATED);
				actionHistoryService.createActionHistoryItem(actionHistory);
			} else {
				response.setData(Constants.CAUTION_CODE_FIELD_EXISTED);
				throw new Exception();
			}
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			if (response.getData() == Constants.CAUTION_CODE_FIELD_EXISTED) {
				response.setCode(Constants.ERR_CODE_BAD_REQUEST);
				response.setMessage(
						Constants.MSG_CAUTION + Result.CODE_IS_EXISTED.getMessage());
			} else {
				response.setData(0);
				response.setCode(Constants.ERR_CODE_BAD_REQUEST);
				response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
			}
		}

		return response;
	}
	@GetMapping(value = "/category-management/managed-category/all", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<List<CategoryEntity>> getListCategory() {
		ResponseData<List<CategoryEntity>> response = new ResponseData<>();

		List<CategoryEntity> categorys = null;

		try {
			categorys = categoryService.findAll();
			response.setData(categorys);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

	@GetMapping(value = "/category-management/managed-category/find-id/{id}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<CategoryEntity> findOne(@PathVariable("id") int id) {
		ResponseData<CategoryEntity> response = new ResponseData<>();

		CategoryEntity categorys = null;

		try {
			categorys = categoryService.findOne(id);
			response.setData(categorys);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

	/**
	 * update
	 */
	@PutMapping(value = "/category-management/managed-category", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> update(@RequestBody CategoryEntity categorys) {
		ResponseData<Integer> response = new ResponseData<>();
		CategoryEntity oldData = categoryService.findOne(categorys.getId());
		String dataSave = oldData.toString();
		try {
			if (categoryService.update(categorys) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
				response.setData(Constants.SUCCESS_CODE_FIELD_UNEXIST);
				// create log
				AmActionHistory actionHistory = new AmActionHistory();
				actionHistory.setAction(CommonConstants.ACTION_HISTORY_ACTION.UPDATED);
				actionHistory.setModule(CommonConstants.ACTION_HISTORY_MODULE.CATEGORY.CATEGORY);
				actionHistory.setRecordId(categorys.getId() + "");


				actionHistory.setCategory(categorys.getName());
				actionHistory.setUserName(CommonConstants.DEFAULT_USER);
				actionHistory.setManipulation("Chỉnh sửa thể loại");
				actionHistory.setDetailAction("Dữ liệu cũ: " + dataSave);
				actionHistory.setDetailAction1("Dữ liệu mới: " + categorys.toString());
				actionHistory.setStatus(CommonConstants.STATUS_HISTORY.UPDATE);
				actionHistoryService.createActionHistoryItem(actionHistory);
			} else {
				response.setData(Constants.CAUTION_CODE_FIELD_EXISTED);
				throw new Exception();
			}
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			if (response.getData() == Constants.CAUTION_CODE_FIELD_EXISTED) {
				response.setCode(Constants.ERR_CODE_BAD_REQUEST);
				response.setMessage(
						Constants.MSG_CAUTION + Result.CODE_IS_EXISTED.getMessage());
			} else {
				response.setData(0);
				response.setCode(Constants.ERR_CODE_BAD_REQUEST);
				response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
			}
		}

		return response;
	}

	/**
	 * delete by id
	 */
	@DeleteMapping(value = "/category-management/managed-category/delete/{id}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> delete(@PathVariable("id") int id) {
		ResponseData<Integer> response = new ResponseData<>();

		int result = categoryService.delete(id);
		if (result == 1) {
			response.setData(result);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} else {
			response.setData(0);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

	/**
	 * delete multiple
	 */
	@DeleteMapping(value = "/category-management/managed-category/delete-multiple/{entityids}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> deleteMultiple(@PathVariable("entityids") int[] entityIds) {
		ResponseData<Integer> response = new ResponseData<>();

		List<CategoryEntity> categorys = new ArrayList<CategoryEntity>();
		for (int i = 0; i < entityIds.length; i++) {
			categorys.add(categoryService.findOne(entityIds[i]));
		}
		List<ProductEntity> productEntity = new ArrayList<>();
		for (int i = 0; i < categorys.size(); i++) {
			productEntity = productService.getListCategory(categorys.get(i).getId());
		}
		if (productEntity.size() == 0) {
		int result = categoryService.deleteAllBatch(categorys);
		if (result == 1) {
			for (CategoryEntity item : categorys) {
				AmActionHistory actionHistory = new AmActionHistory();
				actionHistory.setAction(CommonConstants.ACTION_HISTORY_ACTION.DELETED);
				actionHistory.setModule(CommonConstants.ACTION_HISTORY_MODULE.CATEGORY.CATEGORY);
				actionHistory.setRecordId(item.getId() + "");
				actionHistory.setCategory(item.getName());
				actionHistory.setManipulation("Xóa thể loại");
				actionHistory.setDetailAction(item.toString());
				actionHistory.setUserName(CommonConstants.DEFAULT_USER);
				actionHistory.setStatus(CommonConstants.STATUS_HISTORY.DELETE);
				actionHistoryService.createActionHistoryItem(actionHistory);

			}
			
			response.setData(result);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		}
		} else {
			response.setData(0);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}
		return response;
	}



	// tim kiem
	@PostMapping(value = "/category-management/managed-category/advance-search", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<CategoryEntity>> search(@RequestBody CategoryEntity category,
                                               Pageable pageable) {
		ResponseData<Page<CategoryEntity>> response = new ResponseData<>();

		Page<CategoryEntity> categorys = null;

		try {
			categorys = categoryService.search(category, pageable);
			
			response.setData(categorys);
			response.setCode(Constants.SUCCESS_CODE);
			response.setMessage(Constants.SUCCESS_MSG);
		} catch (Exception e) {
			// TODO: handle exception
			response.setData(null);
			response.setCode(Constants.ERR_CODE_BAD_REQUEST);
			response.setMessage(Constants.MSG_TEMP + Constants.ERR_MSG_BAD_REQUEST);
		}

		return response;
	}

}

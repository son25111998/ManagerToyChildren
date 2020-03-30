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
import com.ncs.entity.ManufacturerEntity;
import com.ncs.entity.ProductEntity;
import com.ncs.service.ActionHistoryService;
import com.ncs.service.ManufacturerService;
import com.ncs.service.ProductService;

@EnableAutoConfiguration
@Controller
@RequestMapping("/api/v1/categories")
public class ManufacturerResource {
	@Autowired
	private ProductService productService;
	@Autowired
	private ManufacturerService manufacturerService;
	@Autowired
	private ActionHistoryService actionHistoryService;

	@GetMapping(value = "/manufacturer-management/managed-manufacturer/search/{name}/{status}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<ManufacturerEntity>> searchAllManufacturer(@PathVariable String name,
															  @PathVariable String status, Pageable pageable) {
		ResponseData<Page<ManufacturerEntity>> response = new ResponseData<>();

		Page<ManufacturerEntity> manufacturers = null;

		try {
			manufacturers = manufacturerService.searchAllManufacturer(name, status, pageable);
			response.setData(manufacturers);
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


	@GetMapping(value = "/manufacturer-management/managed-manufacturer/search-name/{name}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<ManufacturerEntity>> searchNameManufacturer(@PathVariable String name,
                                                               Pageable pageable) {
		ResponseData<Page<ManufacturerEntity>> response = new ResponseData<>();

		Page<ManufacturerEntity> manufacturers = null;

		try {
			manufacturers = manufacturerService.searchManufacturer(name, pageable);
			response.setData(manufacturers);
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
//	@GetMapping(value = "/manufacturer-management/managed-manufacturer/search-status/{status}", produces = {
//			MediaType.APPLICATION_JSON_UTF8_VALUE })
//	public @ResponseBody
//	ResponseData<Page<ManufacturerEntity>> searchStatusProduct(@PathVariable String status,
//                                                                 Pageable pageable) {
//		ResponseData<Page<ManufacturerEntity>> response = new ResponseData<>();
//
//		Page<ManufacturerEntity> products = null;
//
//		try {
//			products = manufacturerService.searchStatusProduct(status, pageable);
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
	@GetMapping(value = "/manufacturer-management/managed-manufacturer", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<ManufacturerEntity>> getAllManufacturer(Pageable pageable) {
		ResponseData<Page<ManufacturerEntity>> response = new ResponseData<>();

		Page<ManufacturerEntity> manufacturers = null;

		try {
			manufacturers = manufacturerService.findPaging(pageable);
			response.setData(manufacturers);
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
	@PostMapping(value = "/manufacturer-management/managed-manufacturer", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> create(@RequestBody ManufacturerEntity manufacturers) {
		ResponseData<Integer> response = new ResponseData<>();
		try {
			if (manufacturerService.create(manufacturers) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
				response.setData(Constants.SUCCESS_CODE_FIELD_UNEXIST);
				// create log
				AmActionHistory actionHistory = new AmActionHistory();
				actionHistory.setAction(CommonConstants.ACTION_HISTORY_ACTION.CREATED);
				actionHistory.setModule(CommonConstants.ACTION_HISTORY_MODULE.CATEGORY.MANUFACTURER);
				actionHistory.setRecordId(manufacturers.getId() + "");


				actionHistory.setManufacturer(manufacturers.getName());
				actionHistory.setUserName(CommonConstants.DEFAULT_USER);
				actionHistory.setManipulation("Tạo mới nhà sản xuất");
				actionHistory.setDetailAction(manufacturers.toString());
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
    //test ok
	// get all list Amphitheater
	@GetMapping(value = "/manufacturer-management/managed-manufacturer/all", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<List<ManufacturerEntity>> getListManufacturer() {
		ResponseData<List<ManufacturerEntity>> response = new ResponseData<>();

		List<ManufacturerEntity> manufacturers = null;

		try {
			manufacturers = manufacturerService.findAll();
			response.setData(manufacturers);
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

	@GetMapping(value = "/manufacturer-management/managed-manufacturer/find-id/{id}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<ManufacturerEntity> findOne(@PathVariable("id") int id) {
		ResponseData<ManufacturerEntity> response = new ResponseData<>();

		ManufacturerEntity manufacturers = null;

		try {
			manufacturers = manufacturerService.findOne(id);
			response.setData(manufacturers);
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
	@PutMapping(value = "/manufacturer-management/managed-manufacturer", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> update(@RequestBody ManufacturerEntity manufacturers) {
		ManufacturerEntity oldData = manufacturerService.findOne(manufacturers.getId());
		String dataSave = oldData.toString();
		ResponseData<Integer> response = new ResponseData<>();
		try {
			if (manufacturerService.update(manufacturers) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
				response.setData(Constants.SUCCESS_CODE_FIELD_UNEXIST);
				// create log
				AmActionHistory actionHistory = new AmActionHistory();
				actionHistory.setAction(CommonConstants.ACTION_HISTORY_ACTION.UPDATED);
				actionHistory.setModule(CommonConstants.ACTION_HISTORY_MODULE.CATEGORY.MANUFACTURER);
				actionHistory.setRecordId(manufacturers.getId() + "");


				actionHistory.setManufacturer(manufacturers.getName());
				actionHistory.setUserName(CommonConstants.DEFAULT_USER);
				actionHistory.setManipulation("chỉnh sửa nhà sản xuất");
				actionHistory.setDetailAction("Dữ liệu cũ: " + dataSave);
				actionHistory.setDetailAction1("Dữ liệu mới: " + manufacturers.toString());
				actionHistory.setDetailAction(manufacturers.toString());
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
	@DeleteMapping(value = "/manufacturer-management/managed-manufacturer/delete/{id}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> delete(@PathVariable("id") int id) {
		ResponseData<Integer> response = new ResponseData<>();

		int result = manufacturerService.delete(id);
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
	@DeleteMapping(value = "/manufacturer-management/managed-manufacturer/delete-multiple/{entityids}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> deleteMultiple(@PathVariable("entityids") int[] entityIds) {
		ResponseData<Integer> response = new ResponseData<>();

		List<ManufacturerEntity> manufacturers = new ArrayList<ManufacturerEntity>();
		for (int i = 0; i < entityIds.length; i++) {
			manufacturers.add(manufacturerService.findOne(entityIds[i]));
		}
		List<ProductEntity> productEntity = new ArrayList<>();
		for (int i = 0; i < manufacturers.size(); i++) {
			productEntity = productService.getListManufacturer(manufacturers.get(i).getId());
		}
		if (productEntity.size() == 0) {
		int result = manufacturerService.deleteAllBatch(manufacturers);
		if (result == 1) {
			for (ManufacturerEntity item : manufacturers) {
				AmActionHistory actionHistory = new AmActionHistory();
				actionHistory.setAction(CommonConstants.ACTION_HISTORY_ACTION.DELETED);
				actionHistory.setModule(CommonConstants.ACTION_HISTORY_MODULE.CATEGORY.MANUFACTURER);
				actionHistory.setRecordId(item.getId() + "");
				actionHistory.setManufacturer(item.getName());
				actionHistory.setManipulation("Xóa nhà sản xuất");
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
	@PostMapping(value = "/manufacturer-management/managed-manufacturer/advance-search", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<ManufacturerEntity>> search(@RequestBody ManufacturerEntity manufacturer,
                                               Pageable pageable) {
		ResponseData<Page<ManufacturerEntity>> response = new ResponseData<>();

		Page<ManufacturerEntity> manufacturers = null;

		try {
			manufacturers = manufacturerService.search(manufacturer, pageable);
			response.setData(manufacturers);
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

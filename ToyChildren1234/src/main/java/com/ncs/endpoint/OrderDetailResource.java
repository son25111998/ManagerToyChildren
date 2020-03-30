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
import com.ncs.common.constants.Constants;
import com.ncs.common.util.Result;
import com.ncs.entity.OrderDetailEntity;
import com.ncs.service.OrderDetailService;

@EnableAutoConfiguration
@Controller
@RequestMapping("/api/v1/categories")
public class OrderDetailResource {
	@Autowired
	private OrderDetailService orderDetailService;
	@GetMapping(value = "/orderdetail-management/managed-orderdetail/search/{name}/{status}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<OrderDetailEntity>> searchAllOrder(@PathVariable String name,
															  @PathVariable String status, Pageable pageable) {
		ResponseData<Page<OrderDetailEntity>> response = new ResponseData<>();

		Page<OrderDetailEntity> orders = null;

		try {
			orders = orderDetailService.searchAllOrder(name, status, pageable);
			response.setData(orders);
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


	@GetMapping(value = "/orderdetail-management/managed-orderdetail/search-name/{name}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<OrderDetailEntity>> searchNameOrder(@PathVariable String name,
                                                               Pageable pageable) {
		ResponseData<Page<OrderDetailEntity>> response = new ResponseData<>();

		Page<OrderDetailEntity> orders = null;

		try {
			orders = orderDetailService.searchNameOrder(name, pageable);
			response.setData(orders);
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
//	@GetMapping(value = "/order-management/managed-order/search-status/{status}", produces = {
//			MediaType.APPLICATION_JSON_UTF8_VALUE })
//	public @ResponseBody
//	ResponseData<Page<OrderDetailEntity>> searchStatusProduct(@PathVariable String status,
//                                                                 Pageable pageable) {
//		ResponseData<Page<OrderDetailEntity>> response = new ResponseData<>();
//
//		Page<OrderDetailEntity> products = null;
//
//		try {
//			products = orderDetailService.searchStatusProduct(status, pageable);
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
	@GetMapping(value = "/orderdetail-management/managed-orderdetail", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<OrderDetailEntity>> getAllOrder(Pageable pageable) {
		ResponseData<Page<OrderDetailEntity>> response = new ResponseData<>();

		Page<OrderDetailEntity> orders = null;

		try {
			orders = orderDetailService.findPaging(pageable);
			response.setData(orders);
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
	@PostMapping(value = "/orderdetail-management/managed-orderdetail", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> create(@RequestBody OrderDetailEntity orders) {
		ResponseData<Integer> response = new ResponseData<>();
		try {
			if (orderDetailService.create(orders) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
				response.setData(Constants.SUCCESS_CODE_FIELD_UNEXIST);
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
	@GetMapping(value = "/orderdetail-management/managed-orderdetail/all", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<List<OrderDetailEntity>> getListOrder() {
		ResponseData<List<OrderDetailEntity>> response = new ResponseData<>();

		List<OrderDetailEntity> orders = null;

		try {
			orders = orderDetailService.findAll();
			response.setData(orders);
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

	@GetMapping(value = "/orderdetail-management/managed-orderdetail/find-id/{id}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<OrderDetailEntity> findOne(@PathVariable("id") int id) {
		ResponseData<OrderDetailEntity> response = new ResponseData<>();

		OrderDetailEntity orders = null;

		try {
			orders = orderDetailService.findOne(id);
			response.setData(orders);
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
	@PutMapping(value = "/orderdetail-management/managed-orderdetail", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> update(@RequestBody OrderDetailEntity orders) {
		ResponseData<Integer> response = new ResponseData<>();
		try {
			if (orderDetailService.update(orders) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
				response.setData(Constants.SUCCESS_CODE_FIELD_UNEXIST);
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
	@DeleteMapping(value = "/orderdetail-management/managed-orderdetail/delete/{id}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> delete(@PathVariable("id") int id) {
		ResponseData<Integer> response = new ResponseData<>();

		int result = orderDetailService.delete(id);
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
	@DeleteMapping(value = "/orderdetail-management/managed-orderdetail/delete-multiple/{entityids}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Integer> deleteMultiple(@PathVariable("entityids") int[] entityIds) {
		ResponseData<Integer> response = new ResponseData<>();

		List<OrderDetailEntity> orders = new ArrayList<OrderDetailEntity>();
		for (int i = 0; i < entityIds.length; i++) {
			orders.add(orderDetailService.findOne(entityIds[i]));
		}

		int result = orderDetailService.deleteAllBatch(orders);
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



	// tim kiem
	@PostMapping(value = "/orderdetail-management/managed-orderdetail/advance-search", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<OrderDetailEntity>> search(@RequestBody OrderDetailEntity product,
                                               Pageable pageable) {
		ResponseData<Page<OrderDetailEntity>> response = new ResponseData<>();

		Page<OrderDetailEntity> orders = null;

		try {
			orders = orderDetailService.search(product, pageable);
			response.setData(orders);
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

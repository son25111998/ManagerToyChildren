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

import com.ncs.common.constants.Constants;
import com.ncs.common.util.Result;
import com.ncs.dto.ServiceResponse;
import com.ncs.entity.ProductEntity;
import com.ncs.service.ProductService;



/**
 * @author: SonNc
 **/
@EnableAutoConfiguration
@Controller
@RequestMapping("/api/v1/categories")
public class ProductResource {
	@Autowired
	private ProductService productService;

	@GetMapping(value = "/product-management/managed-amphitheater/search/{name}/{status}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Page<ProductEntity>> searchAllProduct(@PathVariable String name,
															  @PathVariable String status, Pageable pageable) {
		ServiceResponse<Page<ProductEntity>> response = new ServiceResponse<>();

		Page<ProductEntity> products = null;

		try {
			products = productService.searchAllProduct(name, status, pageable);
			response.setData(products);
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


	@GetMapping(value = "/product-management/managed-product/search-name/{name}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Page<ProductEntity>> searchNameProduct(@PathVariable String name,
                                                               Pageable pageable) {
		ServiceResponse<Page<ProductEntity>> response = new ServiceResponse<>();

		Page<ProductEntity> products = null;

		try {
			products = productService.searchNameProduct(name, pageable);
			response.setData(products);
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
	@GetMapping(value = "/product-management/managed-product/search-status/{status}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Page<ProductEntity>> searchStatusProduct(@PathVariable String status,
                                                                 Pageable pageable) {
		ServiceResponse<Page<ProductEntity>> response = new ServiceResponse<>();

		Page<ProductEntity> products = null;

		try {
			products = productService.searchStatusProduct(status, pageable);
			response.setData(products);
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
	//select page db in amphitheater
	@GetMapping(value = "/product-management/managed-product", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Page<ProductEntity>> getAllProduct(Pageable pageable) {
		ServiceResponse<Page<ProductEntity>> response = new ServiceResponse<>();

		Page<ProductEntity> products = null;

		try {
			products = productService.findPaging(pageable);
			response.setData(products);
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
	@PostMapping(value = "/product-management/managed-product", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Integer> create(@RequestBody ProductEntity products) {
		ServiceResponse<Integer> response = new ServiceResponse<>();
		try {
			if (productService.create(products) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
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
	@GetMapping(value = "/product-management/managed-product/all", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<List<ProductEntity>> getListProduct() {
		ServiceResponse<List<ProductEntity>> response = new ServiceResponse<>();

		List<ProductEntity> product = null;

		try {
			product = productService.findAll();
			response.setData(product);
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

	@GetMapping(value = "/product-management/managed-product/find-id/{id}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<ProductEntity> findOne(@PathVariable("id") int id) {
		ServiceResponse<ProductEntity> response = new ServiceResponse<>();

		ProductEntity product = null;

		try {
			product = productService.findOne(id);
			response.setData(product);
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
	@PutMapping(value = "/product-management/managed-product", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Integer> update(@RequestBody ProductEntity amphitheaters) {
		ServiceResponse<Integer> response = new ServiceResponse<>();
		try {
			if (productService.update(amphitheaters) == Constants.SUCCESS_CODE_FIELD_UNEXIST) {
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
	@DeleteMapping(value = "/product-management/managed-product/delete/{id}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Integer> delete(@PathVariable("id") int id) {
		ServiceResponse<Integer> response = new ServiceResponse<>();

		int result = productService.delete(id);
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
	@DeleteMapping(value = "/product-management/managed-product/delete-multiple/{entityids}", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Integer> deleteMultiple(@PathVariable("entityids") int[] entityIds) {
		ServiceResponse<Integer> response = new ServiceResponse<>();

		List<ProductEntity> products = new ArrayList<ProductEntity>();
		for (int i = 0; i < entityIds.length; i++) {
			products.add(productService.findOne(entityIds[i]));
		}

		int result = productService.deleteAllBatch(products);
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
	@PostMapping(value = "/product-management/managed-product/advance-search", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ServiceResponse<Page<ProductEntity>> search(@RequestBody ProductEntity product,
                                               Pageable pageable) {
		ServiceResponse<Page<ProductEntity>> response = new ServiceResponse<>();

		Page<ProductEntity> products = null;

		try {
			products = productService.search(product, pageable);
			response.setData(products);
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

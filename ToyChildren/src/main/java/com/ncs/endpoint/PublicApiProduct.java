package com.ncs.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.common.ResponseData;
import com.ncs.common.constants.Constants;
import com.ncs.entity.ProductEntity;
import com.ncs.service.ProductService;
@RestController
@RequestMapping("api/public")
public class PublicApiProduct {
	@Autowired
	private ProductService productService;
	@GetMapping(value = "/product-management/managed-product", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<ProductEntity>> getAllProduct(Pageable pageable) {
		ResponseData<Page<ProductEntity>> response = new ResponseData<>();

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
}

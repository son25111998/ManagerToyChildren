package com.ncs.endpoint;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.common.ResponseData;
import com.ncs.common.constants.Constants;
import com.ncs.entity.CategoryEntity;
import com.ncs.entity.ManufacturerEntity;
import com.ncs.entity.ProductEntity;
import com.ncs.service.CategoryService;
import com.ncs.service.ManufacturerService;
import com.ncs.service.ProductService;

@RestController
@RequestMapping("api/public")
public class PublicApiProduct {
	@Autowired
	private ProductService productService;
	@Autowired
	private ManufacturerService manufacturerService;
	@Autowired
	private CategoryService categoryService;

	@GetMapping(value = "/product-management/managed-product", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<Page<ProductEntity>> getAllProduct(Pageable pageable) {
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

	@GetMapping(value = "/product-management/managed-product/all", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<List<ProductEntity>> getAllProduct() {
		ResponseData<List<ProductEntity>> response = new ResponseData<>();

		List<ProductEntity> products = null;

		try {
			products = productService.findAll();
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

	@GetMapping(value = "/product-management/managed-product/find-id/{id}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<ProductEntity> findOne(@PathVariable("id") int id) {
		ResponseData<ProductEntity> response = new ResponseData<>();

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

	@GetMapping(value = "/product-management/managed-product/sort-price", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<Page<ProductEntity>> getListProductByPrice(Pageable pageable) {
		ResponseData<Page<ProductEntity>> response = new ResponseData<>();

		Page<ProductEntity> product = null;

		try {
			product = productService.findByPriceDesc(pageable);
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

	@GetMapping(value = "/product-management/managed-product/sort-price/asc", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<Page<ProductEntity>> getListProductByPriceAsc(Pageable pageable) {
		ResponseData<Page<ProductEntity>> response = new ResponseData<>();

		Page<ProductEntity> product = null;

		try {
			product = productService.findByPriceAsc(pageable);
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

	@PostMapping(value = "/product-management/managed-product/advance-search", consumes = {
			MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<List<ProductEntity>> search(@RequestBody ProductEntity product
			 ) {
		ResponseData<List<ProductEntity>> response = new ResponseData<>();

		List<ProductEntity> products = null;

		try {
			products = productService.searchcategoryandmanufacturer(product);
//			CountResquest countRequest=new CountResquest();
//			countRequest.setIdProduct(product.getId());
//			countRequest.setRequestCount(1);
//			ProductEntity productExsits=new ProductEntity();
//			productExsits=productService.findOne(countRequest.getIdProduct());
//			if(productExsits!=null) {
//				countRequest.setRequestCount(countRequest.getRequestCount()+1);
//			}
//			countRequestService.create(countRequest);
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

	@GetMapping(value = "/manufacturer-management/managed-manufacturer/all", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<List<ManufacturerEntity>> getListManufacturer() {
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

	@GetMapping(value = "/category-management/managed-category/all", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<List<CategoryEntity>> getListCategory() {
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

	@GetMapping(value = "/product-management/managed-product/find-idCategory/{idCategory}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<List<ProductEntity>> findByCategory(@PathVariable("idCategory") int idCategory) {
		ResponseData<List<ProductEntity>> response = new ResponseData<>();

		try {
			response.setData(productService.getListCategory(idCategory));
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

	@GetMapping(value = "/product-management/managed-product/find-idManufacturer/{idManufacturer}", produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<List<ProductEntity>> findByManufacturer(
			@PathVariable("idManufacturer") int idManufacturer) {
		ResponseData<List<ProductEntity>> response = new ResponseData<>();
		try {
			response.setData(productService.getListManufacturer(idManufacturer));
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

package com.ncs.endpoint;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ncs.common.ResponseData;
import com.ncs.common.constants.Constants;
import com.ncs.endpoint.dto.ActionHistoryDTO;
import com.ncs.entity.AmActionHistory;
import com.ncs.service.ActionHistoryService;


/**
 * @author 
 * @created 
 * 
 * @modified  SonNV
 * @modifier 11/10/2019
 */
@EnableAutoConfiguration
@Controller
@RequestMapping("/savis/categories/api/v1/action-histories")
public class ActionHistoryResource {
	@Autowired
	private ActionHistoryService actionHistoryService;

	@RequestMapping(value = "", method = RequestMethod.GET, produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody Page<AmActionHistory> findAll(Pageable pageable) {
		return actionHistoryService.findAll(pageable);
	}

	@PostMapping(value = "/search", consumes = { MediaType.APPLICATION_JSON_UTF8_VALUE }, produces = {
			MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody
	ResponseData<Page<AmActionHistory>> search(@RequestBody ActionHistoryDTO actionHistory, Pageable pageable) {
		ResponseData<Page<AmActionHistory>> response = new ResponseData<>();

		Page<AmActionHistory> amActionHistory = null;

		try {
			replaceWhitespace(actionHistory);
			AmActionHistory obj = new AmActionHistory();
			obj.setId(actionHistory.getId());
			obj.setUserName(actionHistory.getUserName());
			obj.setAction(actionHistory.getAction());
			obj.setModule(actionHistory.getModule());
			obj.setDetailAction(actionHistory.getDetailAction());
			obj.setDateAction(actionHistory.getDateAction());
			obj.setStatus(actionHistory.getStatus());
			obj.setManipulation(actionHistory.getManipulation());
			obj.setProduct(actionHistory.getProduct());
			obj.setAccount(actionHistory.getAccount());
			obj.setCategory(actionHistory.getCategory());

			amActionHistory = actionHistoryService.advanceFilterSearch(obj, actionHistory.getStartDate(),
					actionHistory.getEndDate(), pageable);
			response.setData(amActionHistory);
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

	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public ResponseEntity<Void> create(@RequestBody AmActionHistory amActionHistory) {
		int result = actionHistoryService.create(amActionHistory);
		if (result == 1) {
			return new ResponseEntity<Void>(HttpStatus.CREATED);
		}
		return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@GetMapping(value = "/{id}", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<AmActionHistory> findOne(@PathVariable("id") Integer id) {
		ResponseData<AmActionHistory> response = new ResponseData<>();

		AmActionHistory actionHistory = null;

		try {
			actionHistory = actionHistoryService.findOne(id);
			response.setData(actionHistory);
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

	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public ResponseEntity<Void> update(@RequestBody AmActionHistory amActionHistory) {
		int result = actionHistoryService.update(amActionHistory);
		if (result == 1) {
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable("id") Integer id) {
		int result = actionHistoryService.delete(id);
		if (result == 1) {
			return new ResponseEntity<Void>(HttpStatus.OK);
		}
		return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@DeleteMapping(value = "/delete-multiple/{entityIds}", produces = { MediaType.APPLICATION_JSON_UTF8_VALUE })
	public @ResponseBody ResponseData<Integer> deleteMultiple(@PathVariable("entityIds") Integer[] entityIds) {
		ResponseData<Integer> response = new ResponseData<>();

		List<AmActionHistory> amActionHistories = new ArrayList<>();
		for (int i = 0; i < entityIds.length; i++) {
			amActionHistories.add(actionHistoryService.findOne(entityIds[i]));
		}
		int result = actionHistoryService.deleteAllBatch(amActionHistories);
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

	
	private void replaceWhitespace(ActionHistoryDTO actionHistory){
		String userName = actionHistory.getUserName();
		String action = actionHistory.getAction();
		String module = actionHistory.getModule();
		String detailAction = actionHistory.getDetailAction();
		
		try{
			actionHistory.setUserName(userName.trim());
		}catch(Exception e){}
		
		try{
			actionHistory.setAction(action.trim());
		}catch(Exception e){}
		
		try{
			actionHistory.setModule(module.trim());
		}catch(Exception e){}
		
		try{
			actionHistory.setDetailAction(detailAction.trim());
		}catch(Exception e){}
	}
}

package com.ncs.common;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ncs.common.util.Result;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Response data form
 * 
 * @author LongTT
 *
 * @param <T>
 */

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResponseData<T> {

	/** the response code */
	private int code;

	/** the response message */
	private String message;

	/** the response data */
	private T Data;

	/**
	 * constructor
	 * 
	 * @param result
	 *            the result
	 */
	public ResponseData(Result result) {
		this.code = result.getCode();
		this.message = result.getMessage();
	}

	/**
	 * constructor
	 * 
	 * @param data
	 *            the data
	 * @param result
	 *            the result
	 */
	public ResponseData(T data, Result result) {
		this.Data = data;
		this.code = result.getCode();
		this.message = result.getMessage();
	}

	/**
	 * check response status is success
	 * @return 
	 */
	@JsonIgnore
	public boolean isSucess() {
		return (this.code == 1);
	}

}

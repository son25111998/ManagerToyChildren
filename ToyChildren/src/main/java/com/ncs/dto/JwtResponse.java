package com.ncs.dto;

public class JwtResponse {

	public String type;
	public String token;
	public double expired_in = 16000;
	public JwtResponse() {
	}
	public JwtResponse(String type, String token) {
		super();
		this.type = type;
		this.token = token;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public double getExpired_in() {
		return expired_in;
	}
	public void setExpired_in(double expired_in) {
		this.expired_in = expired_in;
	}	
}

package com.ncs.dto;

public class UserTokenState {
	private String jws;
    private long expires;

    public UserTokenState(){
    	
    }
    
    public UserTokenState(String jws, long expires){
        this.jws = jws;
        this.expires = expires;
    }

    public String getJws() {
        return jws;
    }

    public void setJws(String jws) {
        this.jws = jws;
    }

    public long getExpires() {
        return expires;
    }

    public void setExpires(long expire) {
        this.expires = expire;
    }
}

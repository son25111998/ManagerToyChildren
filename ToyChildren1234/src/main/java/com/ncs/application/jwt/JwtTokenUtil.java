package com.ncs.application.jwt;

import java.io.Serializable;
import java.sql.Timestamp;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ncs.entity.AccountEntity;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil implements Serializable {

	private static final long serialVersionUID = 1L;

	@Value("Jwt.secret")
	String secret;

	final int timeExpiration = 5 * 60 * 60;

	/**
	 * Get user_name from token
	 * 
	 * @param token
	 * @return
	 */
	public String getUsernameByToken(String token) {
		return getClaimsFromToken(token, Claims::getSubject);
	}

	public <T> T getClaimsFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
	}

	// for retrieveing any information from token we will need the secret key
	public Claims getAllClaimsFromToken(String token) {
		return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
	}

	public boolean isTokenExpired(String token) {
		Date expiredDate = getExpiredDateFromToken(token);
		return expiredDate.after(new Date());
	}

	private Date getExpiredDateFromToken(String token) {
		return getClaimsFromToken(token, Claims::getExpiration);
	}
	
	/**
	 * General User to Token
	 * 
	 * @param userDetails
	 * @return
	 */
	@SuppressWarnings("unchecked")
	public String generalToken(AccountEntity user) {
		HashMap<String, Object> claims = new HashMap<String, Object>();
		JSONObject obj = new JSONObject();
		obj.put("username", user.getUsername());
		obj.put("id",""+user.getId());
		obj.put("email",user.getEmail());
		obj.put("active", user.getActive());
		obj.put("iat", (new Timestamp(System.currentTimeMillis()).getTime()));
		obj.put("exp",(new Timestamp(System.currentTimeMillis() + timeExpiration * 1000)).getTime());
		obj.put("sub", user.getUsername());
		return doGeneralToken(obj.toJSONString(), claims);
	}

	public String doGeneralToken(String userName, HashMap<String, Object> claims) {
		return Jwts.builder().setClaims(claims).setPayload(userName).signWith(SignatureAlgorithm.HS512, secret).compact();
		/**
		 * setSubject(userName).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + timeExpiration * 1000))
				.signWith(SignatureAlgorithm.HS512, secret).compact()
		 */
	}
	
	public boolean validateJwt(String token,UserDetails userDetails) {
		String username = getUsernameByToken(token);
		return (username.equals(userDetails.getUsername())&& isTokenExpired(token));
	}
}

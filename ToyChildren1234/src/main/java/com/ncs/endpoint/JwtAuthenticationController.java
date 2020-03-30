package com.ncs.endpoint;

import java.util.logging.Logger;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ncs.dto.JwtResponse;
import com.ncs.application.jwt.JwtTokenUtil;
import com.ncs.entity.AccountEntity;
import com.ncs.service.UserDetailServices;

@RestController
@CrossOrigin
public class JwtAuthenticationController {

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	JwtTokenUtil jwtTokenUtil;
	
	@Autowired
	UserDetailServices userDetailService;
	
	@PostMapping("/api/auth/authenticate")
	public JwtResponse authentication(@RequestBody AccountEntity user) {
		try {
			authenticate(user.getUsername(), user.getPassword());
			AccountEntity userResult = userDetailService.loadByUsername(user.getUsername());
			String token = jwtTokenUtil.generalToken(userResult);
			JwtResponse jwtResponse = new JwtResponse("Bearer",token);
			
			
			return jwtResponse;
		}catch(Exception e) {
			return null;
		}
	}

	public void authenticate(String username, String password) {
		try {
			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
					username, password);
			authenticationManager.authenticate(usernamePasswordAuthenticationToken);
		} catch (Exception e) {
			Logger logger = Logger.getLogger(getClass().getName());
			logger.info("Password or User faild");
			logger.info("Bad certain");
			throw new BadCredentialsException("invalid_username_password");
		}
	}
}

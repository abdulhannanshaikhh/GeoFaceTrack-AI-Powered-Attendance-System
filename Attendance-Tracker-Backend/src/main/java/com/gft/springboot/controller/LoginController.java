package com.gft.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gft.springboot.model.Login;
import com.gft.springboot.service.LoginService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class LoginController {

	@Autowired
	private LoginService loginService;


	// Returns a list of all login credentials
	@GetMapping("/logins")
	public ResponseEntity<List<Login>> viewAllLoginCredentials() {
		List<Login> logins = loginService.viewAllLoginCredentials();
		return new ResponseEntity<List<Login>>(logins, HttpStatus.OK);
	}

}
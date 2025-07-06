package com.gft.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gft.springboot.model.Login;
import com.gft.springboot.repository.LoginRepository;

@Service
public class LoginServiceImpl implements LoginService {

    @Autowired
    private LoginRepository loginRepository;

    // Retrieves all login credentials from the database
    public List<Login> viewAllLoginCredentials() {
        List<Login> login = loginRepository.findAll();
        return login;
    }
}

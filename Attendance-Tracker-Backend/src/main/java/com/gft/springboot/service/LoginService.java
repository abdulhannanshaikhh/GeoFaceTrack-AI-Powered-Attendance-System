package com.gft.springboot.service;

import java.util.List;

import com.gft.springboot.model.Login;

public interface LoginService {

    // Returns a list of all login credentials
    public List<Login> viewAllLoginCredentials();
}
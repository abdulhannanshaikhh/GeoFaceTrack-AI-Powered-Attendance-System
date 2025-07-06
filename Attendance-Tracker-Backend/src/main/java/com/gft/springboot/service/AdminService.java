package com.gft.springboot.service;

import java.util.List;

import com.gft.springboot.model.Admin;

public interface AdminService {

    // Returns a list of all admin records
    public List<Admin> viewAdminRecords();
}
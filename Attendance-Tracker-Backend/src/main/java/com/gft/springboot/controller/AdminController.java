package com.gft.springboot.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.gft.springboot.model.Admin;
import com.gft.springboot.service.AdminService;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:4200")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Handles GET requests to /api/admins and returns a list of admin records
    @GetMapping("/admins")
    public ResponseEntity<List<Admin>> viewAdminRecords() {
        List<Admin> records = adminService.viewAdminRecords();
        return new ResponseEntity<List<Admin>>(records, HttpStatus.OK);
    }
}

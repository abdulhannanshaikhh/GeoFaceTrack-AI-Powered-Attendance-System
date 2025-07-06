package com.gft.springboot.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gft.springboot.model.Admin;
import com.gft.springboot.repository.AdminRepository;

@Service
public class AdminServiceImpl implements AdminService {
	@Autowired
	private AdminRepository adminRepository;

	// Returns a list of all admin records
	public List<Admin> viewAdminRecords() {
		List<Admin> records = adminRepository.findAll();
		return records;
	}
}
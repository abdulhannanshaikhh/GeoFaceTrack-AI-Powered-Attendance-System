package com.gft.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gft.springboot.model.Admin;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Integer> {

}
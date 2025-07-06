package com.gft.springboot.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gft.springboot.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, String> {
}
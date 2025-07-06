package com.gft.springboot.exception;

import java.time.LocalDate;

public class ExceptionResponse {

    private LocalDate timestamp; // The date when the exception occurred
    private String message; // A brief message describing the exception
    private String details; // Additional details about the exception
    private String httpCodeMessage; // HTTP status code message related to the exception


	public LocalDate getTimestamp() {
		return timestamp;
	}

	public void setTimestamp(LocalDate timestamp) {
		this.timestamp = timestamp;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getDetails() {
		return details;
	}

	public void setDetails(String details) {
		this.details = details;
	}

	public String getHttpCodeMessage() {
		return httpCodeMessage;
	}

	public void setHttpCodeMessage(String httpCodeMessage) {
		this.httpCodeMessage = httpCodeMessage;
	}

	public ExceptionResponse(LocalDate timestamp, String message, String details, String httpCodeMessage) {
		super();
		this.timestamp = timestamp;
		this.message = message;
		this.details = details;
		this.httpCodeMessage = httpCodeMessage;
	}

	public ExceptionResponse() {

	}

}
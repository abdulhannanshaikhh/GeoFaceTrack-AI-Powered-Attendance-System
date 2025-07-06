package com.gft.springboot.exception;

import java.time.LocalDate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class ExceptionResponseHandler extends ResponseEntityExceptionHandler {

    // Handles all uncaught exceptions and returns a 500 Internal Server Error response
    @ExceptionHandler(Exception.class)
    public final ResponseEntity<Object> handleAllExceptions(Exception ex, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
            LocalDate.now(),
            ex.getMessage(),
            request.getDescription(false),
            "Internal Server Error"
        );
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handles InvalidEmployeeException and returns a 404 Not Found response
    @ExceptionHandler({ InvalidEmployeeException.class })
    public final ResponseEntity<ExceptionResponse> handleNotFoundException(Exception ex, WebRequest request) {
        ExceptionResponse response = new ExceptionResponse(
            LocalDate.now(),
            ex.getMessage(),
            request.getDescription(false),
            "Not Found"
        );
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Handles validation errors and returns a 400 Bad Request response
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
        MethodArgumentNotValidException ex,
        HttpHeaders headers,
        HttpStatusCode status,
        WebRequest request
    ) {
        ExceptionResponse response = new ExceptionResponse(
            LocalDate.now(),
            ex.getMessage(),
            request.getDescription(false),
            "Bad Request"
        );
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}

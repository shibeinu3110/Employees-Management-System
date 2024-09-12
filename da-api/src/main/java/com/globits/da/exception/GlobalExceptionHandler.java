package com.globits.da.exception;

import com.globits.da.response.CustomizedResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

@RestControllerAdvice
//throw exception in JSON type
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler(value = MethodArgumentTypeMismatchException.class)
    public ResponseEntity<?> handleMethodArgumentTypeMismatchException(MethodArgumentTypeMismatchException e) {
        logger.error("error", e);
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.NOT_FOUND.toString(), "Mismatch argument exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(value = NumberFormatException.class)
    public ResponseEntity<?> handleNumberFormatException(NumberFormatException e) {
        logger.error("error", e);
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.NOT_FOUND.toString(), "Number format exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NullOrNotFoundException.class)
    public ResponseEntity<?> handleNullException(NullOrNotFoundException e) {
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.NOT_FOUND.toString(), "Null exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(IncorrectInputException.class)
    public ResponseEntity<?> handleIncorrectInputException(IncorrectInputException e) {
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.NOT_FOUND.toString(), "Incorrect type exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AlreadyExistException.class)
    public ResponseEntity<?> handleAlreadyExistException(AlreadyExistException e) {
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.NOT_FOUND.toString(), "Already exist exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LogicException.class)
    public ResponseEntity<?> handleLogicException(LogicException e) {
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.NOT_FOUND.toString(), "Logic exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.NOT_ACCEPTABLE);
    }


    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleGlobalException(Exception e) {
        CustomizedResponse customizedResponse = new CustomizedResponse<>(HttpStatus.INTERNAL_SERVER_ERROR.toString(), "Global exception handler", e.getMessage());
        return new ResponseEntity<>(customizedResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    }

}

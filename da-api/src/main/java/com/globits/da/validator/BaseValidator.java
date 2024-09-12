package com.globits.da.validator;

import com.globits.da.exception.IncorrectInputException;
import com.globits.da.exception.NullOrNotFoundException;
import org.springframework.web.method.annotation.MethodArgumentTypeMismatchException;

public class BaseValidator {
    public static void checkValidString(String string, String objectName) {
        if(string == null || string.trim().isEmpty() || string.equals("null")) {
            throw new IncorrectInputException(objectName + " can't be null");
        }
    }
    public static void checkValidValue(Integer value, String objectName) {
        if(value == null) {
            throw  new IncorrectInputException(objectName + " can't be null");
        }
    }

    public static void checkSpace(String string, String objectName) {
        if (string.contains(" ")) {
            throw new IncorrectInputException(objectName + " can't have space");
        }
    }

    public static void checkIsNumeric(String string, String name) {
        if(string == null || string.isEmpty()) {
            throw new NullOrNotFoundException(name + " can't be null");
        }

        try {
            Integer.parseInt(string);
        } catch (MethodArgumentTypeMismatchException e) {
            throw new RuntimeException(name + " must be a valid number");
        }
    }
}

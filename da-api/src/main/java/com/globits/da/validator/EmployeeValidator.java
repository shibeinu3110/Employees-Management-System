package com.globits.da.validator;

import com.globits.da.dto.EmployeeDto;
import com.globits.da.exception.IncorrectInputException;
import com.globits.da.repository.EmployeeRepository;
import com.globits.da.utils.Constant;

import java.util.regex.Pattern;

public class EmployeeValidator {

    public static void checkCodeLength(String code, Integer min, Integer max) {
        if(code.length() < min || code.length() > max) {
            throw new IncorrectInputException("Length of code must be greater than " + min + " and smaller than " + max);
        }
    }
    public static void checkCodeExisted(String code, EmployeeRepository employeeRepository) {
        if(employeeRepository.findByCode(code) != null) {
            throw new IncorrectInputException("This code is already exists");
        }
    }

    public static void checkValidEmail(String email) {
        String pattern = "^[a-zA-Z0-9-_./|]+@[a-zA-Z0-9]+[.][a-zA-Z0-9]{2,3}$";
        if(!Pattern.matches(pattern,email)) {
            throw new IncorrectInputException("Email regex incorrect");
        }
    }

    public static void checkPhoneNumber(String phoneNumber) {
        String pattern = "^[0-9]{6,11}$";
        if(!Pattern.matches(pattern, phoneNumber)) {
            throw new IncorrectInputException("Phone number format incorrect");
        }
    }


    public static void checkAge(Integer age) {
        if(age < 0) {
            throw new IncorrectInputException("Age can't smaller than 0");
        }
    }

    public static void checkEmployeeDto(EmployeeDto employeeDto) {
        String code = employeeDto.getCode();
        String name = employeeDto.getName();
        String email = employeeDto.getEmail();
        String phone = employeeDto.getPhone();
        Integer age = employeeDto.getAge();

        //code check
        BaseValidator.checkSpace(code, "Code");
        checkCodeLength(code, Constant.MIN_LENGTH,Constant.MAX_LENGTH);
        BaseValidator.checkValidString(code, "Code");

        //name check
        BaseValidator.checkValidString(name, "Name");

        //email check
        BaseValidator.checkValidString(email, "Email");
        checkValidEmail(email);

        //phone check
        BaseValidator.checkValidString(phone, "Phone");
        checkPhoneNumber(phone);

        //age check
        BaseValidator.checkValidValue(age, "Age");
        checkAge(age);
    }



}

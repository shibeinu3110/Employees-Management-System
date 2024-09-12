package com.globits.da.validator;

import com.globits.da.domain.Commune;
import com.globits.da.domain.District;
import com.globits.da.dto.EmployeeDto;
import com.globits.da.exception.IncorrectInputException;
import com.globits.da.exception.LogicException;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.repository.CommuneRepository;
import com.globits.da.repository.DistrictRepository;
import com.globits.da.repository.EmployeeRepository;
import com.globits.da.utils.Constant;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

public class ExcelValidator {
    public static String checkCodeLength(String code, Integer min, Integer max, Integer rowNum) {
        if(code.length() < min || code.length() > max) {
            return new String("Code length error at row: " + rowNum);
        }
        return null;
    }
    public static String checkCodeExisted(String code, EmployeeRepository employeeRepository, Integer rowNum) {
        if(employeeRepository.findByCode(code) != null) {
            return new String("Code is already exists at row: " + rowNum);
        }
        return null;
    }

    public static String checkValidEmail(String email, Integer rowNum) {
        String pattern = "^[a-zA-Z0-9-_./|]+@[a-zA-Z0-9]+[.][a-zA-Z0-9]{2,3}$";
        if(!Pattern.matches(pattern,email)) {
            return new String("Email error at row: " + rowNum);
        }
        return null;
    }

    public static String checkPhoneNumber(String phoneNumber, Integer rowNum) {
        String pattern = "^[0-9]{6,11}$";
        if(!Pattern.matches(pattern, phoneNumber)) {
            return new String("Phone number format incorrect at row: " + rowNum);
        }
        return null;
    }


    public static String checkAge(Integer age) {
        if(age == null) {
            return new String("Age can't be null");
        }
        if(age < 0) {
            return new String("Age can't smaller than 0");
        }
        return null;
    }

    public static List<String> checkEmployeeDto(EmployeeDto employeeDto, Integer rowNum) {
        List<String> errorMessage = new ArrayList<>();
        String code = employeeDto.getCode();
        String name = employeeDto.getName();
        String email = employeeDto.getEmail();
        String phone = employeeDto.getPhone();
        Integer age = employeeDto.getAge();

        //code check
        errorMessage.add(checkSpace(code, "Code"));
        errorMessage.add(checkCodeLength(code, Constant.MIN_LENGTH,Constant.MAX_LENGTH,rowNum));
        errorMessage.add(checkValidString(code, "Code"));

        //name check
        errorMessage.add(checkValidString(name, "Name"));

        //email check
        errorMessage.add(checkValidString(email, "Email"));
        checkValidEmail(email,rowNum);

        //phone check
        errorMessage.add(checkValidString(phone, "Phone"));
        errorMessage.add(checkPhoneNumber(phone,rowNum));

        //age check
        //errorMessage.add(checkValidValue(age, "Age"));
        //errorMessage.add(checkAge(age));
        //errorMessage.add(checkIsNumeric(age, "Age", rowNum));

        return errorMessage;
    }

    public static String checkSpace(String string, String name) {
        if (string.contains(" ")) {
            return new String(name + " can't have space");
        }
        return null;
    }
    public static String checkValidString(String string, String name) {
        if(string == null || string.trim().isEmpty() || string.equals("null")) {
            return new String(name + " can't be null");
        }
        return null;
    }
    public static String checkValidValue(Integer value, String name) {
        if(value == null) {
            return new String(name + " can't be null");
        }
        return null;
    }


    public static String checkDistrictBelongsToProvince(Integer provinceId, Integer districtId, DistrictRepository districtRepository, Integer rowNum) {
        District district = districtRepository.findById(districtId).get();
        if(district.getProvince().getId() != provinceId) {
            return new String("District doesn't belong to province at row " + rowNum );
        }
        return null;
    }

    public static String checkCommuneBelongsToDistrict(Integer districtId, Integer communeId, CommuneRepository communeRepository, Integer rowNum) {
        Commune commune = communeRepository.findById(communeId).get();
        if(commune.getDistrict().getId() != districtId) {
            return new String("Commune doesn't belong to district at row " + rowNum);
        }
        return null;
    }

    public static String checkIsNumeric(String string, String name, Integer rowNum) {
        if(string == null || string.isEmpty()) {
           return new String(name + " can't be null");
        }

        if(!string.matches("\\d+")){
            return new String(name + " at row:  " + rowNum + " must be a valid number");
        }
        return null;
    }

}

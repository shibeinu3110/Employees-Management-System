package com.globits.da.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CustomizedResponse<T> {
    private String code;
    private String message;
    private T data;

    public CustomizedResponse(String code, String message) {
        this.code = code;
        this.message = message;
    }

    public CustomizedResponse(String code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

package com.globits.da.formatter;

import com.globits.da.exception.IncorrectInputException;
import org.codehaus.jackson.JsonParser;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationContext;
import org.codehaus.jackson.map.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateDeserializer extends JsonDeserializer<LocalDate> {
    private final DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
    @Override
    public LocalDate deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
        String dateString = jsonParser.getText();
        try {
            return LocalDate.parse(dateString, dateTimeFormatter);
        } catch (DateTimeParseException e) {
            throw new IncorrectInputException("Date format must be yyyy-MM-dd");
        }
    }
}

package com.globits.da.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.globits.da.domain.Certificate;
import com.globits.da.exception.NullOrNotFoundException;
import com.globits.da.formatter.DateDeserializer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CertificateDto extends BaseDto{
    private String name;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = DateDeserializer.class)
    private LocalDate startDate;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    @JsonDeserialize(using = DateDeserializer.class)
    private LocalDate endDate;
    private boolean isValid;

    public CertificateDto(Certificate certificate) {
        if(certificate != null) {
            this.setId(certificate.getId());
            this.name = certificate.getName();
            this.description = certificate.getDescription();
            this.startDate = certificate.getStartDate();
            this.endDate = certificate.getEndDate();
            this.isValid = certificate.isValid();
        } else {
            throw new NullOrNotFoundException("Certificate can't be null");
        }
    }


















}

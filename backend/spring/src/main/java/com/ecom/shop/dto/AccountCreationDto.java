package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountCreationDto {
    String street;
    String postcode;
    String province;
    String lastname;
    String firstname;
    String email;
    Date birthday;

    @Override
    public String toString() {
        return "AccountCreationDto{" +
                "street='" + street + '\'' +
                ", postcode='" + postcode + '\'' +
                ", province='" + province + '\'' +
                ", lastname='" + lastname + '\'' +
                ", firstname='" + firstname + '\'' +
                ", email='" + email + '\'' +
                ", birthday=" + (birthday != null ? birthday.toString() : "null") +
                '}';
    }
}

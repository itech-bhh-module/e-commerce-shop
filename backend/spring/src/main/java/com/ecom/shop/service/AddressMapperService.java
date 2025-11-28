// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.AddressDto;
import com.ecom.shop.entity.Address;
import org.springframework.stereotype.Service;

@Service
public class AddressMapperService {

    public AddressDto toAddressDto(Address a) {
        if (a == null) return null;
        return new AddressDto(
                a.getStreet(),
                a.getPostcode(),
                a.getProvince()
        );
    }
}


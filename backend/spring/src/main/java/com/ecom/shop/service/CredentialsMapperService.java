// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.CredentialsDto;
import com.ecom.shop.entity.Credentials;
import org.springframework.stereotype.Service;

@Service
public class CredentialsMapperService {

    public CredentialsDto toCredentialsDto(Credentials c) {
        if (c == null) return null;
        return new CredentialsDto(
                c.getUsername(),
                c.getPassword(),
                c.getLastLogin()
        );
    }
}


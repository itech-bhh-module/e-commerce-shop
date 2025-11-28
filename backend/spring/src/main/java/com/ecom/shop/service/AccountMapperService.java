// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.AccountDto;
import com.ecom.shop.entity.Account;
import org.springframework.stereotype.Service;

@Service
public class AccountMapperService {

    public AccountDto toAccountDto(Account a) {
        if (a == null) return null;
        return new AccountDto(
                a.getFirstName(),
                a.getLastName(),
                a.getEmail(),
                a.getBirthday(),
                a.getGender(),
                a.getIsGuest()
        );
    }
}


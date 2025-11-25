package com.ecom.shop.service;

import com.ecom.shop.entity.Account;
import com.ecom.shop.repository.AccountRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AccountService {
    private final AccountRepo accountRepo;

    public Optional<Account> getAccountById(Integer id){
        return accountRepo.findById(id);
    }
}

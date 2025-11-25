package com.ecom.shop.controller;

import com.ecom.shop.entity.Account;
import com.ecom.shop.service.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/api/account")
@RequiredArgsConstructor
public class AccountController {
    private final AccountService accountService;

    @GetMapping("/getAccountById/{id}")
    public Optional<Account> getAccountById(@PathVariable int id){
        return accountService.getAccountById(id);
    }
}

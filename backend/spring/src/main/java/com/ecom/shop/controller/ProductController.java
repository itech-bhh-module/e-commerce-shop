package com.ecom.shop.controller;

import com.ecom.shop.dto.ProductDto;
import com.ecom.shop.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/offer")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping("/getAvailableProducts")
    public List<ProductDto> getAllProduct(){
        return productService.getAllAvailableOffers();
    }

    @GetMapping("/getAvailableProducts/{username}")
    public List<ProductDto>getAllProductByUsername(@PathVariable String username){
        return productService.getAllAvailableOffersByUsername(username);
    }
}

package com.ecom.shop.service;

import com.ecom.shop.dto.ProductDto;
import com.ecom.shop.repository.ProductRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepo productRepo;
    private final ProductMapperService productMapperService;

    public List<ProductDto> getAllAvailableOffers(){
        return productRepo.getAllAvailableProducts()
                            .stream().map(productMapperService :: toProductDto)
                            .collect(Collectors.toList());
    }

}

// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.ProductOfferDto;
import com.ecom.shop.entity.ProductOffer;
import org.springframework.stereotype.Service;

@Service
public class ProductOfferMapperService {

    public ProductOfferDto toProductOfferDto(ProductOffer po) {
        if (po == null) return null;
        return new ProductOfferDto(
                po.getQuantity()
        );
    }
}


// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.OrderOfferDto;
import com.ecom.shop.entity.OrderOffer;
import org.springframework.stereotype.Service;

@Service
public class OrderOfferMapperService {

    public OrderOfferDto toOrderOfferDto(OrderOffer oo) {
        if (oo == null) return null;
        return new OrderOfferDto(
                oo.getQuantity()
        );
    }
}


// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.OfferDto;
import com.ecom.shop.entity.Offer;
import org.springframework.stereotype.Service;

@Service
public class OfferMapperService {

    public OfferDto toOfferDto(Offer o) {
        if (o == null) return null;
        return new OfferDto(
                o.getOfferPrice(),
                o.getOfferAmount(),
                o.getOfferTitle()
        );
    }
}


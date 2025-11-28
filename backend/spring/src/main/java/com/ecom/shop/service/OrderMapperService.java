// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.OrderDto;
import com.ecom.shop.entity.Order;
import org.springframework.stereotype.Service;

@Service
public class OrderMapperService {

    public OrderDto toOrderDto(Order o) {
        if (o == null) return null;
        return new OrderDto(
                o.getPaymentMethod(),
                o.getOrderPrice(),
                o.getDate(),
                o.getStatus()
        );
    }
}


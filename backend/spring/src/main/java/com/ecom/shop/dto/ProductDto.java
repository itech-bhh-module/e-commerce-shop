package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    String description;
    int price;
    int amount;
    String condition;
    String title;
    String status;
    List<ProductImageDto> images;
}


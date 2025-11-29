package com.ecom.shop.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class ProductFilterDto {
    String category;
    Integer minPrice;
    Integer maxPrice;
    //more can be added later
}

// ...existing code...
package com.ecom.shop.service;

import com.ecom.shop.dto.CategoryDto;
import com.ecom.shop.entity.Category;
import org.springframework.stereotype.Service;

@Service
public class CategoryMapperService {

    public CategoryDto toCategoryDto(Category c) {
        if (c == null) return null;
        return new CategoryDto(
                c.getName(),
                c.getDescription()
        );
    }
}


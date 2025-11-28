package com.ecom.shop.repository;

import com.ecom.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query(value = "select p " +
            "from Product p " +
            "where p.status= 'Aktiv'")
    List<Product> getAllAvailableProducts();
}

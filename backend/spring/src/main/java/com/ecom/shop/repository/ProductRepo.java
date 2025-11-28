package com.ecom.shop.repository;

import com.ecom.shop.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    @Query("select p " +
            "from Product p " +
            "join ProductOffer po on po.productId = p.productId " +
            "join Offer o on po.offerId = o.offerId " +
            "where o.status = 'Aktiv'")
    List<Product> getAllAvailableProducts();
}

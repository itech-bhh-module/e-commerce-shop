package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "product_offer")
public class ProductOffer {
    @Column(name = "prod_off_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int prodOffId;

    @Column(name = "offer_id")
    private int offerId;

    @Column(name = "product_id")
    private int productId;

    @Column
    private int quantity;
}

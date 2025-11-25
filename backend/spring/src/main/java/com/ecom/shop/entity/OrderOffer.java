package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name = "order_offer")
public class OrderOffer {
    @Column(name = "order_item_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderItemId;

    @Column(name = "oder_id")
    private int orderId;

    @Column(name = "offer_id")
    private int offerId;

    @Column
    private int quantity;
}

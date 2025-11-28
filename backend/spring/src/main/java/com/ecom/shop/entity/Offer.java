package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Offer {
    @Column(name="offer_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int offerId;

    @Column(name = "product_id") //brauchen wir hier nicht eigentlich die product_offer id?
    private int productId;

    @Column(name = "account_id")
    private int accountId;

    @Column(name = "offer_price")
    private int offerPrice; //in cent!

    @Column(name = "offer_amount")
    private int offerAmount;

    @Column(name = "offer_title")
    private String offerTitle;

    @Column
    private String status;

}

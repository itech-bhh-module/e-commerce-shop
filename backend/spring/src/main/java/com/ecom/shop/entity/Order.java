package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table
public class Order {
    @Column(name = "order_id")
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int orderId;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "order_price")
    private int orderPrice;

    @Column
    private Date date;

    @Column
    private String status;
}

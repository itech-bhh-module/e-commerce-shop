package com.ecom.shop.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@Table(name="address")
public class Address {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column
    private int addressId;

    @Column
    private String street;

    @Column
    private String postcode;

    @Column
    private String province;
}

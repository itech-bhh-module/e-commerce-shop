package com.ecom.shop.repository;

import com.ecom.shop.dto.AddressDto;
import com.ecom.shop.entity.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface AddressRepo extends JpaRepository<Address, Integer> {
    @Modifying
    @Query("update Address a set a.street = :street where a.addressId in (" +
            "select a.address.addressId from Credentials c " +
            "inner join Account  a on c.accountId = c.accountId " +
            "where c.username = : username)")
    void updateAddressStreetById(
            @Param("username") String username,
            @Param("street") String street
    );

    @Modifying
    @Query("update Address a set a.postcode = :postcode where a.addressId in (" +
            "select a.address.addressId from Credentials c " +
            "inner join Account  a on c.accountId = c.accountId " +
            "where c.username = : username)")
    void updateAddressPostcodeById(
            @Param("addressId") String username,
            @Param("postcode") String postcode
    );

    @Modifying
    @Query("update Address a set a.province = :province where a.addressId in (" +
            "select a.address.addressId from Credentials c " +
            "inner join Account  a on c.accountId = c.accountId " +
            "where c.username = : username)")
    void updateAddressProvinceId(
            @Param("addressId") String username,
            @Param("province") String province
    );

    @Query(value = "select a from Address a join Account ac on ac.address.addressId = a.addressId join Credentials c on ac.accountId = c.accountId where c.username = :username")
    public Address findAddressByUsername(@Param("username")String username);
}

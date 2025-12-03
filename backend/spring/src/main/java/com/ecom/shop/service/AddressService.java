package com.ecom.shop.service;

import com.ecom.shop.repository.AddressRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressRepo addressRepo;
    public void updateAddressStreet(String username, String newStreetValue){
        addressRepo.updateAddressStreetById(username,newStreetValue);
    }

    public void updateAddressProvince(String username, String newProvinceValue){
        addressRepo.updateAddressProvinceId(username, newProvinceValue);
    }

    public void updateAddressPostcode(String username, String newPostcodeValue){
        addressRepo.updateAddressPostcodeById(username, newPostcodeValue);
    }

}

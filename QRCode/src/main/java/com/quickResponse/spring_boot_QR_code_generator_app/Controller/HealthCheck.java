package com.quickResponse.spring_boot_QR_code_generator_app.Controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthCheck {

    @GetMapping("/health-check")
    public ResponseEntity<?> HealthCheck(){
        return new ResponseEntity<>("OK",HttpStatus.OK);
    }


}

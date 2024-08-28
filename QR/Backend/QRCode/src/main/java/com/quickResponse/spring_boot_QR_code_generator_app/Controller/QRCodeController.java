package com.quickResponse.spring_boot_QR_code_generator_app.Controller;

import com.quickResponse.spring_boot_QR_code_generator_app.Service.QRCodeGeneratorService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class QRCodeController {

    @GetMapping(value = "/downloadQRCode/{codeText}/{width}/{height}")
    public ResponseEntity<byte[]> downloadQRCode(
            @PathVariable("codeText") String codeText,
            @PathVariable("width") Integer width,
            @PathVariable("height") Integer height)
            throws Exception {
        byte[] qrCodeImage = QRCodeGeneratorService.getQRCodeImage(codeText, width, height);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_PNG);
        headers.setContentDispositionFormData("attachment", "QRCode.png");

        return new ResponseEntity<>(qrCodeImage, headers, HttpStatus.OK);
    }

    @GetMapping(value = "/generateQRCode/{codeText}/{width}/{height}")
    public ResponseEntity<byte[]> generateQRCode(
            @PathVariable("codeText") String codeText,
            @PathVariable("width") Integer width,
            @PathVariable("height") Integer height)
            throws Exception {
        return ResponseEntity.status(HttpStatus.OK).body(QRCodeGeneratorService.getQRCodeImage(codeText, width, height));
    }
}
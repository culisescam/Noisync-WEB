package com.noisync.backend.controller;

import com.noisync.backend.dto.ResendVerificationRequest;
import com.noisync.backend.service.EmailVerificationService;

import jakarta.validation.Valid;

import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class VerificationController {

    private final EmailVerificationService verificationService;

    public VerificationController(
            EmailVerificationService verificationService) {
        this.verificationService = verificationService;
    }

    @GetMapping("/verify-email")
    public String verify(@RequestParam String token) {

        verificationService.verify(token);
        return "Correo verificado correctamente.";
    }
@PostMapping("/resend-verification")
public String resend(@Valid @RequestBody ResendVerificationRequest req) {

    try {
        verificationService.resendVerification(req.email());
        return "Si el correo existe, se ha enviado un nuevo enlace de verificación.";
    } catch (IllegalArgumentException e) {

        if ("YA_VERIFICADO".equals(e.getMessage())) {
            return "Este correo ya está verificado.";
        }

        if ("COOLDOWN".equals(e.getMessage())) {
            return "Debes esperar unos minutos antes de solicitar otro correo.";
        }

        return "Si el correo existe, se ha enviado un nuevo enlace de verificación.";
    }
}
} 
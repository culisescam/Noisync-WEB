package com.noisync.backend.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

import java.util.List;


public record InviteMusicianRequest(
    @NotBlank(message = "El nombre es obligatorio")
    String nombreCompleto,

    @NotBlank(message = "El correo es obligatorio")
    @Email(message = "Formato de correo inválido")
    String correo,

    String username,
    List<String> instrumentos  
) {}

package com.noisync.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record SectionCreateRequest(
        @NotBlank String etiqueta,
        @NotBlank String contenido
) {}
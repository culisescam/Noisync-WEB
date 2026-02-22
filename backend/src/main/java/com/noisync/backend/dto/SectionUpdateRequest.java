package com.noisync.backend.dto;

import jakarta.validation.constraints.NotBlank;

public record SectionUpdateRequest(
        @NotBlank String etiqueta,
        @NotBlank String contenido
) {}
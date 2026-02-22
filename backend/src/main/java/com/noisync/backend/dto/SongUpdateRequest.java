package com.noisync.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record SongUpdateRequest(
        @NotBlank String titulo,
        @NotBlank String artistaAutor,
        @NotNull Integer bpm,
        @NotBlank String tonoOriginal,
        @NotBlank String escalaBase,
        @NotBlank String visibilidad,
        String coverUrl
) {}
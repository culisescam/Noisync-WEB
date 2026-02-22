package com.noisync.backend.dto;

public record SectionResponse(
        Long sectionId,
        Long songId,
        Integer ordenSeccion,
        String etiqueta,
        String contenido
) {}
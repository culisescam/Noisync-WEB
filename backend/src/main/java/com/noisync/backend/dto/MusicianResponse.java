package com.noisync.backend.dto;
import java.util.List;


public record MusicianResponse(
    Long userId,
    Long bandId,
    String nombreCompleto,
    String correo,
    String username,
    String estatus,
    List<String> instrumentos 
) {}
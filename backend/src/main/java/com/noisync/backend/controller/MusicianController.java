package com.noisync.backend.controller;

import com.noisync.backend.dto.InstrumentResponse;
import com.noisync.backend.dto.MusicianResponse;
import com.noisync.backend.service.MusicianInstrumentService;
import com.noisync.backend.service.MusicianService;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import com.noisync.backend.service.PasswordResetService; 

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/musicians")
public class MusicianController {
    private final MusicianInstrumentService service;
    private final MusicianService musicianService;

private final PasswordResetService passwordResetService;

public MusicianController(MusicianInstrumentService service, MusicianService musicianService, PasswordResetService passwordResetService) {
    this.service = service;
    this.musicianService = musicianService;
    this.passwordResetService = passwordResetService;
}
    private Long bandId(Authentication auth) {
        @SuppressWarnings("unchecked")
        Map<String, Object> details = (Map<String, Object>) auth.getDetails();
        return ((Number) details.get("bandId")).longValue();
    }

    private Long userId(Authentication auth) {
        return Long.parseLong(auth.getPrincipal().toString());
    }

    private boolean isLeader(Authentication auth) {
        return auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_LEADER"));
    }

    // solo leader
@GetMapping
public List<MusicianResponse> list(Authentication auth) {
    return service.listMusicians(bandId(auth));
}

    // leader o el mismo musico
    @GetMapping("/{musicianId}/instruments")
    public List<InstrumentResponse> listInstruments(@PathVariable Long musicianId, Authentication auth) {
        boolean allowed = isLeader(auth) || userId(auth).equals(musicianId);
        if (!allowed) throw new IllegalArgumentException("No autorizado");
        return service.listMusicianInstruments(bandId(auth), musicianId);
    }
    @PutMapping("/{musicianId}/instruments")
public Map<String, Object> updateInstruments(
        @PathVariable Long musicianId,
        @RequestBody List<String> instrumentos,
        Authentication auth) {
    if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede editar instrumentos");
    service.updateInstruments(bandId(auth), musicianId, instrumentos);
    return Map.of("ok", true, "message", "Instrumentos actualizados");
}

    // solo leader
    @PostMapping("/{musicianId}/instruments/{instrumentId}")
    public Map<String, Object> assign(@PathVariable Long musicianId, @PathVariable Long instrumentId, Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede asignar instrumentos");
        service.assign(bandId(auth), musicianId, instrumentId);
        return Map.of("ok", true, "message", "Instrumento asignado");
    }

    // solo leader
    @DeleteMapping("/{musicianId}/instruments/{instrumentId}")
    public Map<String, Object> unassign(@PathVariable Long musicianId, @PathVariable Long instrumentId, Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede quitar instrumentos");
        service.unassign(bandId(auth), musicianId, instrumentId);
        return Map.of("ok", true, "message", "Instrumento removido");
    }
    @DeleteMapping("/{musicianId}")
    public Map<String, Object> softRemove(@PathVariable Long musicianId,
                                          @RequestParam(defaultValue = "false") boolean removeInstruments,
                                          Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede sacar musicos");
        musicianService.softRemoveMusician(bandId(auth), musicianId, removeInstruments);
        return Map.of("ok", true, "message", "Musico removido");
    }
    @PutMapping("/{musicianId}/activate")
    public Map<String, Object> activate(@PathVariable Long musicianId,
                                        @RequestParam(defaultValue = "false") boolean forcePasswordChange,
                                        Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede activar musicos");
        musicianService.activateMusician(bandId(auth), musicianId, forcePasswordChange);
        return Map.of("ok", true, "message", "Musico activado");
    }
    @PostMapping("/{musicianId}/reset-password")
public Map<String, Object> resetPassword(@PathVariable Long musicianId, Authentication auth) {
    if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede restablecer contraseñas");
    passwordResetService.leaderResetPassword(bandId(auth), musicianId);
    return Map.of("ok", true, "message", "Contraseña restablecida y enviada al músico");
}
}
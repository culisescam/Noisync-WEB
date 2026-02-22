package com.noisync.backend.controller;

import com.noisync.backend.dto.*;
import com.noisync.backend.service.SongSectionService;
import jakarta.validation.Valid;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class SongSectionController {

    private final SongSectionService service;

    public SongSectionController(SongSectionService service) {
        this.service = service;
    }

    private Long bandId(Authentication auth) {
        @SuppressWarnings("unchecked")
        Map<String, Object> details = (Map<String, Object>) auth.getDetails();
        return ((Number) details.get("bandId")).longValue();
    }

    private boolean isLeader(Authentication auth) {
        return auth.getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("ROLE_LEADER"));
    }

    // LIST
    @GetMapping("/songs/{songId}/sections")
    public List<SectionResponse> list(@PathVariable Long songId, Authentication auth) {
        return service.list(bandId(auth), songId);
    }

    // CREATE (auto al final)
    @PostMapping("/songs/{songId}/sections")
    public SectionResponse create(@PathVariable Long songId, @Valid @RequestBody SectionCreateRequest req, Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede modificar secciones");
        return service.create(bandId(auth), songId, req);
    }

    // UPDATE
    @PutMapping("/sections/{sectionId}")
    public SectionResponse update(@PathVariable Long sectionId, @Valid @RequestBody SectionUpdateRequest req, Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede modificar secciones");
        return service.update(bandId(auth), sectionId, req);
    }

    // DELETE
    @DeleteMapping("/sections/{sectionId}")
    public Map<String, Object> delete(@PathVariable Long sectionId, Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede modificar secciones");
        service.delete(bandId(auth), sectionId);
        return Map.of("ok", true, "message", "Seccion eliminada");
    }

    // REORDER (Opcion A)
    @PutMapping("/songs/{songId}/sections/reorder")
    public Map<String, Object> reorder(@PathVariable Long songId, @Valid @RequestBody ReorderSectionsRequest req, Authentication auth) {
        if (!isLeader(auth)) throw new IllegalArgumentException("Solo un lider puede reordenar secciones");
        service.reorder(bandId(auth), songId, req);
        return Map.of("ok", true, "message", "Orden actualizado");
    }
}
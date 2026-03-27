package com.noisync.backend.service;

import com.noisync.backend.dto.InstrumentRequest;
import com.noisync.backend.dto.InstrumentResponse;
import com.noisync.backend.dto.MusicianResponse;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class InstrumentService {

    private final JdbcTemplate jdbc;

    public InstrumentService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    private final RowMapper<InstrumentResponse> mapper = (rs, rn) -> new InstrumentResponse(
            rs.getLong("instrument_id"),
            rs.getLong("band_id"),
            rs.getString("nombre"),
            rs.getInt("activo"),
            rs.getInt("total_musicos")
    );

    private final RowMapper<MusicianResponse> musicianMapper = (rs, rn) -> new MusicianResponse(
            rs.getLong("user_id"),
            rs.getLong("band_id"),
            rs.getString("nombre_completo"),
            rs.getString("correo"),
            rs.getString("username"),
            rs.getString("estatus"),
            List.of()
    );

    public List<InstrumentResponse> list(Long bandId) {
        return jdbc.query("""
            SELECT i.instrument_id, i.band_id, i.nombre, i.activo,
                   COUNT(mi.user_id) AS total_musicos
            FROM instrument i
            LEFT JOIN musician_instrument mi ON mi.instrument_id = i.instrument_id
            WHERE i.band_id = ?
              AND i.activo = 1
            GROUP BY i.instrument_id, i.band_id, i.nombre, i.activo
            ORDER BY i.nombre ASC
        """, mapper, bandId);
    }

    public List<MusicianResponse> listMusiciansByInstrument(Long bandId, Long instrumentId) {
        return jdbc.query("""
            SELECT u.user_id, u.band_id, p.nombre_completo, p.correo, u.username, u.estatus
            FROM musician_instrument mi
            JOIN app_user u ON u.user_id = mi.user_id
            JOIN person p ON p.person_id = u.person_id
            WHERE mi.instrument_id = ?
              AND u.band_id = ?
              AND u.activo = 1
            ORDER BY p.nombre_completo ASC
        """, musicianMapper, instrumentId, bandId);
    }

    @Transactional
    public InstrumentResponse create(Long bandId, Long userId, InstrumentRequest req) {
        Integer total = jdbc.queryForObject(
                "SELECT COUNT(*) FROM instrument WHERE band_id = ? AND activo = 1",
                Integer.class, bandId
        );
        if (total != null && total >= 30) throw new IllegalArgumentException("Límite de 30 categorías alcanzado");

        Integer count = jdbc.queryForObject("""
            SELECT COUNT(*) FROM instrument
            WHERE band_id = ? AND LOWER(nombre) = LOWER(?)
        """, Integer.class, bandId, req.nombre());

        if (count != null && count > 0) throw new IllegalArgumentException("Ese instrumento ya existe");

        jdbc.update("""
            INSERT INTO instrument (band_id, nombre, activo, created_by)
            VALUES (?, ?, 1, ?)
        """, bandId, req.nombre(), userId);

        Long id = jdbc.queryForObject("""
            SELECT MAX(instrument_id) FROM instrument WHERE band_id = ?
        """, Long.class, bandId);

        return jdbc.queryForObject("""
            SELECT i.instrument_id, i.band_id, i.nombre, i.activo,
                   COUNT(mi.user_id) AS total_musicos
            FROM instrument i
            LEFT JOIN musician_instrument mi ON mi.instrument_id = i.instrument_id
            WHERE i.instrument_id = ? AND i.band_id = ?
            GROUP BY i.instrument_id, i.band_id, i.nombre, i.activo
        """, mapper, id, bandId);
    }

    @Transactional
    public InstrumentResponse update(Long bandId, Long instrumentId, InstrumentRequest req) {

        int updated = jdbc.update("""
            UPDATE instrument
            SET nombre = ?
            WHERE instrument_id = ?
              AND band_id = ?
              AND activo = 1
        """, req.nombre(), instrumentId, bandId);

        if (updated == 0) throw new IllegalArgumentException("Instrumento no encontrado");

        return jdbc.queryForObject("""
            SELECT i.instrument_id, i.band_id, i.nombre, i.activo,
                   COUNT(mi.user_id) AS total_musicos
            FROM instrument i
            LEFT JOIN musician_instrument mi ON mi.instrument_id = i.instrument_id
            WHERE i.instrument_id = ? AND i.band_id = ?
            GROUP BY i.instrument_id, i.band_id, i.nombre, i.activo
        """, mapper, instrumentId, bandId);
    }

    @Transactional
    public void delete(Long bandId, Long instrumentId) {

        // Solo bloquear si hay músicos ACTIVOS asignados
        Integer enUso = jdbc.queryForObject("""
            SELECT COUNT(*) FROM musician_instrument mi
            JOIN app_user u ON u.user_id = mi.user_id
            WHERE mi.instrument_id = ? AND u.activo = 1
        """, Integer.class, instrumentId);

        if (enUso != null && enUso > 0) throw new IllegalArgumentException("EN_USO");

        // Limpiar relaciones (incluyendo músicos inactivos) antes del hard delete
        // para no violar la FK musician_instrument → instrument
        jdbc.update("""
            DELETE FROM musician_instrument
            WHERE instrument_id = ?
        """, instrumentId);

        jdbc.update("""
            DELETE FROM instrument
            WHERE instrument_id = ?
              AND band_id = ?
        """, instrumentId, bandId);
    }
}
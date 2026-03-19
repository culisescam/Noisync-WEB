package com.noisync.backend.service;

import com.noisync.backend.dto.*;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;

@Service
public class BandProfileService {

    private final JdbcTemplate jdbc;

    public BandProfileService(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    public BandResponse getBand(Long bandId) {
        return jdbc.queryForObject("""
            SELECT band_id, nombre, descripcion, fecha_creacion, leader_user_id
            FROM band
            WHERE band_id = ?
        """, (rs, rn) -> new BandResponse(
                rs.getLong("band_id"),
                rs.getString("nombre"),
                rs.getString("descripcion"),
                toInstant(rs.getTimestamp("fecha_creacion")),
                rs.getObject("leader_user_id") == null ? null : rs.getLong("leader_user_id")
        ), bandId);
    }

    @Transactional
    public BandResponse updateBand(Long bandId, BandUpdateRequest req) {
        int updated = jdbc.update("""
            UPDATE band
            SET nombre = ?, descripcion = ?
            WHERE band_id = ?
        """, req.nombre(), req.descripcion(), bandId);

        if (updated == 0) throw new IllegalArgumentException("Banda no encontrada");
        return getBand(bandId);
    }

    public List<BandSocialResponse> listSocials(Long bandId) {
        return jdbc.query("""
            SELECT band_social_id, band_id, plataforma, url
            FROM band_social
            WHERE band_id = ?
            ORDER BY plataforma ASC
        """, (rs, rn) -> new BandSocialResponse(
                rs.getLong("band_social_id"),
                rs.getLong("band_id"),
                rs.getString("plataforma"),
                rs.getString("url")
        ), bandId);
    }

    @Transactional
    public BandSocialResponse addSocial(Long bandId, BandSocialRequest req) {

        jdbc.update("""
            INSERT INTO band_social (band_id, plataforma, url)
            VALUES (?, ?, ?)
        """, bandId, req.plataforma(), req.url());

        Long id = jdbc.queryForObject("""
            SELECT MAX(band_social_id) FROM band_social WHERE band_id = ?
        """, Long.class, bandId);

        return jdbc.queryForObject("""
            SELECT band_social_id, band_id, plataforma, url
            FROM band_social
            WHERE band_social_id = ? AND band_id = ?
        """, (rs, rn) -> new BandSocialResponse(
                rs.getLong("band_social_id"),
                rs.getLong("band_id"),
                rs.getString("plataforma"),
                rs.getString("url")
        ), id, bandId);
    }
        @Transactional
        public void replaceSocials(Long bandId, List<BandSocialRequest> socials) {

            jdbc.update("""
                DELETE FROM band_social
                WHERE band_id = ?
            """, bandId);

            for (BandSocialRequest s : socials) {
                jdbc.update("""
                    INSERT INTO band_social (band_id, plataforma, url)
                    VALUES (?, ?, ?)
                """, bandId, s.plataforma(), s.url());
            }
        }

    @Transactional
    public void deleteSocial(Long bandId, Long bandSocialId) {
        int deleted = jdbc.update("""
            DELETE FROM band_social
            WHERE band_social_id = ? AND band_id = ?
        """, bandSocialId, bandId);

        if (deleted == 0) throw new IllegalArgumentException("Red social no encontrada");
    }

    private Instant toInstant(Timestamp ts) {
        return ts == null ? null : ts.toInstant();
    }

@Transactional
public void deleteBand(Long bandId) {
    jdbc.update("DELETE FROM musician_instrument WHERE instrument_id IN (SELECT instrument_id FROM instrument WHERE band_id = ?)", bandId);
    jdbc.update("DELETE FROM password_reset_token WHERE user_id IN (SELECT user_id FROM app_user WHERE band_id = ?)", bandId);
    jdbc.update("DELETE FROM email_verification WHERE user_id IN (SELECT user_id FROM app_user WHERE band_id = ?)", bandId);
    jdbc.update("DELETE FROM email_verification_token WHERE user_id IN (SELECT user_id FROM app_user WHERE band_id = ?)", bandId);
    jdbc.update("DELETE FROM refresh_token WHERE user_id IN (SELECT user_id FROM app_user WHERE band_id = ?)", bandId);
    jdbc.update("DELETE FROM band_invitation WHERE band_id = ?", bandId);
    jdbc.update("DELETE FROM band_social WHERE band_id = ?", bandId);
    jdbc.update("DELETE FROM song_section WHERE song_id IN (SELECT song_id FROM song WHERE band_id = ?)", bandId);
    jdbc.update("DELETE FROM song WHERE band_id = ?", bandId);
    jdbc.update("DELETE FROM instrument WHERE band_id = ?", bandId);
    // Guardar person_ids antes de borrar usuarios
    List<Long> personIds = jdbc.queryForList(
        "SELECT person_id FROM app_user WHERE band_id = ?", Long.class, bandId
    );
    jdbc.update("DELETE FROM app_user WHERE band_id = ?", bandId);
    // Ahora sí borrar persons
    for (Long personId : personIds) {
        jdbc.update("DELETE FROM person WHERE person_id = ?", personId);
    }
    jdbc.update("DELETE FROM band WHERE band_id = ?", bandId);
}
}
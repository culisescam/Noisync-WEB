package com.noisync.backend.dto;

import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public record ReorderSectionsRequest(
        @NotEmpty List<Long> orderedSectionIds
) {}
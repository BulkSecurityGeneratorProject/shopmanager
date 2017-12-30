package com.informatix.shopmanager.service.dto;

import javax.validation.constraints.NotNull;
import java.time.LocalDate;

/**
 * A DTO for the Product profit.
 */
public class ProductProfitDTO {

    private Float result;

    @NotNull
    private LocalDate from;

    @NotNull
    private Long productId;


    public Float getResult() {
        return result;
    }

    public void setResult(Float result) {
        this.result = result;
    }

    public LocalDate getFrom() {
        return from;
    }

    public void setFrom(LocalDate from) {
        this.from = from;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}

package com.informatix.shopmanager.service.dto;


import java.time.LocalDate;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Product entity.
 */
public class ProductDTO implements Serializable {

    private Long id;

    @NotNull
    private String label;

    @NotNull
    @DecimalMin(value = "1")
    private Float buyingPrice;

    @NotNull
    @DecimalMin(value = "1")
    private Float sellingPrice;

    @NotNull
    @Min(value = 1)
    private Integer amount;

    @NotNull
    @Min(value = 0)
    private Integer stays;

    private LocalDate modified;

    private Long userId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Float getBuyingPrice() {
        return buyingPrice;
    }

    public void setBuyingPrice(Float buyingPrice) {
        this.buyingPrice = buyingPrice;
    }

    public Float getSellingPrice() {
        return sellingPrice;
    }

    public void setSellingPrice(Float sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getStays() {
        return stays;
    }

    public void setStays(Integer stays) {
        this.stays = stays;
    }

    public LocalDate getModified() {
        return modified;
    }

    public void setModified(LocalDate modified) {
        this.modified = modified;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProductDTO productDTO = (ProductDTO) o;
        if(productDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), productDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProductDTO{" +
            "id=" + getId() +
            ", label='" + getLabel() + "'" +
            ", buyingPrice=" + getBuyingPrice() +
            ", sellingPrice=" + getSellingPrice() +
            ", amount=" + getAmount() +
            ", stays=" + getStays() +
            ", modified='" + getModified() + "'" +
            "}";
    }
}

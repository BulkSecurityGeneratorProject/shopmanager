package com.informatix.shopmanager.service.dto;


import java.time.Instant;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the TransactionTag entity.
 */
public class TransactionTagDTO implements Serializable {

    private Long id;

    @NotNull
    @Size(min = 5)
    private String value;

    private Instant modified;

    private Long transactionId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public Instant getModified() {
        return modified;
    }

    public void setModified(Instant modified) {
        this.modified = modified;
    }

    public Long getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(Long transactionId) {
        this.transactionId = transactionId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        TransactionTagDTO transactionTagDTO = (TransactionTagDTO) o;
        if(transactionTagDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), transactionTagDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "TransactionTagDTO{" +
            "id=" + getId() +
            ", value='" + getValue() + "'" +
            ", modified='" + getModified() + "'" +
            "}";
    }
}

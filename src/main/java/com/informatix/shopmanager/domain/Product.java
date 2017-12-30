package com.informatix.shopmanager.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A Product.
 */
@Entity
@Table(name = "product")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "jhi_label", nullable = false)
    private String label;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "buying_price", nullable = false)
    private Float buyingPrice;

    @NotNull
    @DecimalMin(value = "1")
    @Column(name = "selling_price", nullable = false)
    private Float sellingPrice;

    @NotNull
    @Min(value = 0)
    @Column(name = "amount", nullable = false)
    private Integer amount;

    @NotNull
    @Min(value = 0)
    @Column(name = "stays", nullable = false)
    private Integer stays;

    @Column(name = "modified")
    private LocalDate modified;

    @OneToMany(mappedBy = "product", fetch = FetchType.LAZY)
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Transaction> transactions = new HashSet<>();

    @ManyToOne
    private User user;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLabel() {
        return label;
    }

    public Product label(String label) {
        this.label = label;
        return this;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Float getBuyingPrice() {
        return buyingPrice;
    }

    public Product buyingPrice(Float buyingPrice) {
        this.buyingPrice = buyingPrice;
        return this;
    }

    public void setBuyingPrice(Float buyingPrice) {
        this.buyingPrice = buyingPrice;
    }

    public Float getSellingPrice() {
        return sellingPrice;
    }

    public Product sellingPrice(Float sellingPrice) {
        this.sellingPrice = sellingPrice;
        return this;
    }

    public void setSellingPrice(Float sellingPrice) {
        this.sellingPrice = sellingPrice;
    }

    public Integer getAmount() {
        return amount;
    }

    public Product amount(Integer amount) {
        this.amount = amount;
        return this;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public Integer getStays() {
        return stays;
    }

    public Product stays(Integer stays) {
        this.stays = stays;
        return this;
    }

    public void setStays(Integer stays) {
        this.stays = stays;
    }

    public LocalDate getModified() {
        return modified;
    }

    public Product modified(LocalDate modified) {
        this.modified = modified;
        return this;
    }

    public void setModified(LocalDate modified) {
        this.modified = modified;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public Product products(Set<Transaction> transactions) {
        this.transactions = transactions;
        return this;
    }

    public Product addTransaction(Transaction transaction) {
        this.transactions.add(transaction);
        transaction.setProduct(this);
        return this;
    }

    public Product removeTransaction(Transaction transaction) {
        this.transactions.remove(transaction);
        transaction.setProduct(null);
        return this;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public User getUser() {
        return user;
    }

    public Product user(User user) {
        this.user = user;
        return this;
    }

    public void setUser(User user) {
        this.user = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Product product = (Product) o;
        if (product.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), product.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Product{" +
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

package com.ncs.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "shipping", schema = "dmdc", catalog = "")
public class ShippingEntity {
    private int id;
    private Integer shippingType;
    private Double shippingCost;

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID")
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Basic
    @Column(name = "SHIPPING_TYPE")
    public Integer getShippingType() {
        return shippingType;
    }

    public void setShippingType(Integer shippingType) {
        this.shippingType = shippingType;
    }

    @Basic
    @Column(name = "SHIPPING_COST")
    public Double getShippingCost() {
        return shippingCost;
    }

    public void setShippingCost(Double shippingCost) {
        this.shippingCost = shippingCost;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShippingEntity that = (ShippingEntity) o;
        return id == that.id &&
                Objects.equals(shippingType, that.shippingType) &&
                Objects.equals(shippingCost, that.shippingCost);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, shippingType, shippingCost);
    }
}

package com.ncs.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "tax", schema = "dmdc", catalog = "")
public class TaxEntity {
    private int id;
    private String type;
    private Double percentage;

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
    @Column(name = "TYPE")
    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Basic
    @Column(name = "PERCENTAGE")
    public Double getPercentage() {
        return percentage;
    }

    public void setPercentage(Double percentage) {
        this.percentage = percentage;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        TaxEntity taxEntity = (TaxEntity) o;
        return id == taxEntity.id &&
                Objects.equals(type, taxEntity.type) &&
                Objects.equals(percentage, taxEntity.percentage);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, type, percentage);
    }
}

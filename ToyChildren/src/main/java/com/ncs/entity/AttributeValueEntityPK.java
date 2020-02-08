package com.ncs.entity;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

public class AttributeValueEntityPK implements Serializable {
    private int id;
    private int attributeId;

    @Column(name = "ID")
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name = "ATTRIBUTE_ID")
    @Id
    public int getAttributeId() {
        return attributeId;
    }

    public void setAttributeId(int attributeId) {
        this.attributeId = attributeId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AttributeValueEntityPK that = (AttributeValueEntityPK) o;
        return id == that.id &&
                attributeId == that.attributeId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, attributeId);
    }
}

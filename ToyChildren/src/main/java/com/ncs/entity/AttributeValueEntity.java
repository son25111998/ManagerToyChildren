package com.ncs.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "attribute_value", schema = "dmdc", catalog = "")
@IdClass(AttributeValueEntityPK.class)
public class AttributeValueEntity {
    private int id;
    private String name;
    private int attributeId;

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
    @Column(name = "NAME")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Id
    @Column(name = "ATTRIBUTE_ID")
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
        AttributeValueEntity that = (AttributeValueEntity) o;
        return id == that.id &&
                attributeId == that.attributeId &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, attributeId);
    }
}

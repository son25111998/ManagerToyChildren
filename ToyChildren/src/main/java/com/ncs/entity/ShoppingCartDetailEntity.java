package com.ncs.entity;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "shopping_cart_detail", schema = "dmdc", catalog = "")
@IdClass(ShoppingCartDetailEntityPK.class)
public class ShoppingCartDetailEntity {
    private int shoppingCartId;
    private int productId;
    private String attribute;
    private Integer quantity;

    @Id
    @Column(name = "SHOPPING_CART_ID")
    public int getShoppingCartId() {
        return shoppingCartId;
    }

    public void setShoppingCartId(int shoppingCartId) {
        this.shoppingCartId = shoppingCartId;
    }

    @Id
    @Column(name = "PRODUCT_ID")
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Basic
    @Column(name = "ATTRIBUTE")
    public String getAttribute() {
        return attribute;
    }

    public void setAttribute(String attribute) {
        this.attribute = attribute;
    }

    @Basic
    @Column(name = "QUANTITY")
    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShoppingCartDetailEntity that = (ShoppingCartDetailEntity) o;
        return shoppingCartId == that.shoppingCartId &&
                productId == that.productId &&
                Objects.equals(attribute, that.attribute) &&
                Objects.equals(quantity, that.quantity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(shoppingCartId, productId, attribute, quantity);
    }
}

package com.ncs.entity;

import javax.persistence.Column;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Objects;

public class ShoppingCartDetailEntityPK implements Serializable {
    private int shoppingCartId;
    private int productId;

    @Column(name = "SHOPPING_CART_ID")
    @Id
    public int getShoppingCartId() {
        return shoppingCartId;
    }

    public void setShoppingCartId(int shoppingCartId) {
        this.shoppingCartId = shoppingCartId;
    }

    @Column(name = "PRODUCT_ID")
    @Id
    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ShoppingCartDetailEntityPK that = (ShoppingCartDetailEntityPK) o;
        return shoppingCartId == that.shoppingCartId &&
                productId == that.productId;
    }

    @Override
    public int hashCode() {
        return Objects.hash(shoppingCartId, productId);
    }
}

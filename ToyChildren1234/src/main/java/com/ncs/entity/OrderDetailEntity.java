package com.ncs.entity;

import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "order_detail", schema = "dmdc")
public class OrderDetailEntity implements java.io.Serializable{
    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private int id;
    private int productId;
    private String attribute;
    private Integer quantity;
   // private OrderEntity orderEntity;
    private int orderId;
    @Column(name = "ORDER_ID")
	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	@Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Column(name = "ID")
    public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}


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
//    @ManyToOne
//    @JoinColumn(name="ORDER_ID", referencedColumnName = "ID")
//    @JsonIgnore
//    public OrderEntity getOrderEntity() {
//		return orderEntity;
//	}
//
//	public void setOrderEntity(OrderEntity orderEntity) {
//		this.orderEntity = orderEntity;
//	}
    

  
}

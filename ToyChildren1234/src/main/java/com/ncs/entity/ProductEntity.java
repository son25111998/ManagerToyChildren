package com.ncs.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Objects;

import javax.persistence.Basic;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "product")
public class ProductEntity {
	private int id;
	private String name;
	private String description;
	private String thumbai;
	private double price;
	private int amount;
	private String updatedBy;
	private String createdBy;
	private int manufacturerId;
	private int categoryId;
	private Date createTime;
	private Date updateTime;
	private Double lenght;
	
	private Double width;
	private Double height;
	private Integer discount;
	private Integer status;
	private List<ProductReviewEntity> productReviewEntities ;
	private List<ProductAttributeEntity> productAttributeEntities ;

	@Id
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

	@Basic
	@Column(name = "DESCRIPTION")
	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Basic
	@Column(name = "THUMBAI")
	public String getThumbai() {
		return thumbai;
	}

	public void setThumbai(String thumbai) {
		this.thumbai = thumbai;
	}

	@Basic
	@Column(name = "PRICE")
	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	@Basic
	@Column(name = "amount")
	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}

	@Basic
	@Column(name = "updated_by")
	public String getUpdatedBy() {
		return updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	@Basic
	@Column(name = "created_by")
	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Basic
	@Column(name = "manufacturer_id")
	public int getManufacturerId() {
		return manufacturerId;
	}

	public void setManufacturerId(int manufacturerId) {
		this.manufacturerId = manufacturerId;
	}

	@Basic
	@Column(name = "CATEGORY_ID")
	public int getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}

	@Basic
	@Column(name = "create_time")
	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	@Basic
	@Column(name = "update_time")
	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	@Basic
	@Column(name = "lenght")
	public Double getLenght() {
		return lenght;
	}

	public void setLenght(Double lenght) {
		this.lenght = lenght;
	}

	@Basic
	@Column(name = "width")
	public Double getWidth() {
		return width;
	}

	public void setWidth(Double width) {
		this.width = width;
	}

	@Basic
	@Column(name = "height")
	public Double getHeight() {
		return height;
	}

	public void setHeight(Double height) {
		this.height = height;
	}

	@Basic
	@Column(name = "status")
	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	@Basic
	@Column(name = "discount")
	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	@OneToMany(mappedBy = "productEntity")
	public List<ProductReviewEntity> getProductReviewEntities() {
		return productReviewEntities;
	}
	public void setProductReviewEntities(List<ProductReviewEntity> productReviewEntities) {
		this.productReviewEntities = productReviewEntities;
	}
	@OneToMany(mappedBy = "productEntity")
	public List<ProductAttributeEntity> getProductAttributeEntities() {
		return productAttributeEntities;
	}

	public void setProductAttributeEntities(List<ProductAttributeEntity> productAttributeEntities) {
		this.productAttributeEntities = productAttributeEntities;
	}


//	@OneToMany(mappedBy = "ID", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
//	private List<ProductAttributeEntity> children1 = new ArrayList<ProductAttributeEntity>();

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		ProductEntity that = (ProductEntity) o;
		return id == that.id && Double.compare(that.price, price) == 0 && amount == that.amount
				&& manufacturerId == that.manufacturerId && categoryId == that.categoryId
				&& Objects.equals(name, that.name) && Objects.equals(description, that.description)
				&& Objects.equals(thumbai, that.thumbai) && Objects.equals(updatedBy, that.updatedBy)
				&& Objects.equals(createdBy, that.createdBy) && Objects.equals(createTime, that.createTime)
				&& Objects.equals(updateTime, that.updateTime) && Objects.equals(lenght, that.lenght)
				&& Objects.equals(width, that.width) && Objects.equals(height, that.height)
				&& Objects.equals(discount, that.discount) && Objects.equals(status, that.status);
	}




	@Override
	public int hashCode() {
		return Objects.hash(id, name, description, thumbai, price, amount, updatedBy, createdBy, manufacturerId,
				categoryId, createTime, updateTime, lenght, width, height, status, discount);
	}

	@Override
	public String toString() {
		return "  Mã: " + id + ", Tên sản phẩm: " + name + ", Mô tả " + description + ", Giá: " + price
				+ ", Thời gian tạo: " + createTime + ", Số lượng: " + amount + ", Nhà sản xuất: " + manufacturerId
				+ ",Thể loại:" + categoryId + ",Giảm giá" + discount + ",Trạng thái:" + status;

	}
}
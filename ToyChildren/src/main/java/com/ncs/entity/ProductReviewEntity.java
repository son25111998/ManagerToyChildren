package com.ncs.entity;

import javax.persistence.*;
import java.sql.Date;
import java.util.Objects;

@Entity
@Table(name = "product_review", schema = "dmdc", catalog = "")
public class ProductReviewEntity {
    private int id;
    private Integer reviewRating;
    private Date reviewDate;
    private String reviewContent;

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
    @Column(name = "REVIEW_RATING")
    public Integer getReviewRating() {
        return reviewRating;
    }

    public void setReviewRating(Integer reviewRating) {
        this.reviewRating = reviewRating;
    }

    @Basic
    @Column(name = "REVIEW_DATE")
    public Date getReviewDate() {
        return reviewDate;
    }

    public void setReviewDate(Date reviewDate) {
        this.reviewDate = reviewDate;
    }

    @Basic
    @Column(name = "REVIEW_CONTENT")
    public String getReviewContent() {
        return reviewContent;
    }

    public void setReviewContent(String reviewContent) {
        this.reviewContent = reviewContent;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ProductReviewEntity that = (ProductReviewEntity) o;
        return id == that.id &&
                Objects.equals(reviewRating, that.reviewRating) &&
                Objects.equals(reviewDate, that.reviewDate) &&
                Objects.equals(reviewContent, that.reviewContent);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, reviewRating, reviewDate, reviewContent);
    }
}

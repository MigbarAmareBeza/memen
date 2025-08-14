/**
 * Product Gallery JavaScript
 * Handles thumbnail clicks to change main product image
 */

class ProductGallery {
  constructor() {
    this.mainImage = document.querySelector('.product-image__main');
    this.thumbnails = document.querySelectorAll('.product-image__thumbnail');
    this.productImages = [];
    
    this.init();
  }

  init() {
    if (!this.mainImage || this.thumbnails.length === 0) return;
    
    // Store all image URLs
    this.thumbnails.forEach((thumbnail, index) => {
      const fullSizeUrl = thumbnail.src.replace(/(_\d+x\d+)?(\.[^.]*)?$/, '$2');
      this.productImages.push({
        thumbnail: thumbnail.src,
        full: fullSizeUrl
      });
    });
    
    // Add click event listeners to thumbnails
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => this.changeMainImage(index));
    });
  }

  changeMainImage(index) {
    if (!this.productImages[index]) return;
    
    // Update main image
    this.mainImage.src = this.productImages[index].full;
    
    // Update active thumbnail
    this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
    this.thumbnails[index].classList.add('active');
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductGallery();
});
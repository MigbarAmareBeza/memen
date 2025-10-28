/**
 * Product Gallery JavaScript
 * Handles navigation-style image gallery with thumbnails and controls
 */

class ProductGallery {
  constructor() {
    this.mainImage = document.querySelector('.product-image__main');
    this.mainImageButton = document.querySelector('.product-image__main-button');
    this.thumbnails = document.querySelectorAll('.product-image__thumbnail');
    this.prevButton = document.querySelector('.image-nav__prev');
    this.nextButton = document.querySelector('.image-nav__next');
    this.currentImageSpan = document.querySelector('.current-image');
    this.currentIndex = 0; // 0+ represents thumbnail images, no featured image shown
    this.featuredImageUrl = null;
    this.productImages = [];
    
    this.init();
  }

  init() {
    if (!this.mainImage) return;
    
    // Store first non-featured image URL as default
    if (this.mainImageButton) {
      this.featuredImageUrl = this.mainImageButton.dataset.featuredImage;
      this.mainImageButton.addEventListener('click', () => this.returnToFirstImage());
    }
    
    // Store all image URLs from thumbnail data attributes
    this.thumbnails.forEach((thumbnail, index) => {
      const fullSizeUrl = thumbnail.dataset.imageSrc;
      this.productImages.push({
        thumbnail: thumbnail.querySelector('img').src,
        full: fullSizeUrl
      });
    });
    
    // Add click event listeners to thumbnails
    this.thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', () => this.changeMainImage(index));
    });
    
    // Add navigation button listeners
    if (this.prevButton) {
      this.prevButton.addEventListener('click', () => this.previousImage());
    }
    
    if (this.nextButton) {
      this.nextButton.addEventListener('click', () => this.nextImage());
    }
    
    // Set first thumbnail as active on load
    if (this.thumbnails.length > 0) {
      this.thumbnails[0].classList.add('active');
    }
    
    // Initialize navigation state
    this.updateNavigationState();
  }

  changeMainImage(index) {
    if (!this.productImages[index] || index === this.currentIndex) return;
    
    this.currentIndex = index;
    
    // Update main image with fade effect
    this.mainImage.style.opacity = '0.5';
    
    setTimeout(() => {
      this.mainImage.src = this.productImages[index].full;
      this.mainImage.style.opacity = '1';
    }, 150);
    
    // Update active thumbnail
    this.thumbnails.forEach(thumb => thumb.classList.remove('active'));
    if (this.thumbnails[index]) {
      this.thumbnails[index].classList.add('active');
    }
    
    // Update navigation state
    this.updateNavigationState();
    
    // Scroll thumbnail into view
    this.scrollThumbnailIntoView(index);
  }
  
  returnToFirstImage() {
    if (this.currentIndex === 0) return; // Already on first image
    
    this.changeMainImage(0);
  }
  
  previousImage() {
    if (this.currentIndex > 0) {
      this.changeMainImage(this.currentIndex - 1);
    }
  }
  
  nextImage() {
    if (this.currentIndex < this.productImages.length - 1) {
      this.changeMainImage(this.currentIndex + 1);
    }
  }
  
  
  updateNavigationState() {
    if (this.prevButton) {
      this.prevButton.disabled = this.currentIndex === 0;
    }
    
    if (this.nextButton) {
      this.nextButton.disabled = this.currentIndex === this.productImages.length - 1;
    }
  }
  
  scrollThumbnailIntoView(index) {
    const thumbnail = this.thumbnails[index];
    if (thumbnail && thumbnail.scrollIntoView) {
      thumbnail.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest'
      });
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new ProductGallery();
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  const gallery = window.productGallery;
  if (!gallery) return;
  
  switch(e.key) {
    case 'ArrowLeft':
      e.preventDefault();
      gallery.previousImage();
      break;
    case 'ArrowRight':
      e.preventDefault();
      gallery.nextImage();
      break;
  }
});

// Store gallery instance globally for keyboard access
window.productGallery = null;
document.addEventListener('DOMContentLoaded', () => {
  window.productGallery = new ProductGallery();
});
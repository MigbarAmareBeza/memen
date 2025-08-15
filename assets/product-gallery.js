/**
 * Product Gallery JavaScript
 * Handles navigation-style image gallery with thumbnails and controls
 */

class ProductGallery {
  constructor() {
    this.mainImage = document.querySelector('.product-image__main');
    this.thumbnails = document.querySelectorAll('.product-image__thumbnail');
    this.prevButton = document.querySelector('.image-nav__prev');
    this.nextButton = document.querySelector('.image-nav__next');
    this.currentImageSpan = document.querySelector('.current-image');
    this.currentIndex = 0;
    this.productImages = [];
    
    this.init();
  }

  init() {
    if (!this.mainImage || this.thumbnails.length === 0) return;
    
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
    this.thumbnails[index].classList.add('active');
    
    // Update counter and navigation state
    this.updateCounter();
    this.updateNavigationState();
    
    // Scroll thumbnail into view
    this.scrollThumbnailIntoView(index);
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
  
  updateCounter() {
    if (this.currentImageSpan) {
      this.currentImageSpan.textContent = this.currentIndex + 1;
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
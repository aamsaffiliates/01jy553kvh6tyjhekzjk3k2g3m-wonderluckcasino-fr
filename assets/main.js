// Main JavaScript for WonderLuck Casino

// Redirect function for CTA buttons
function redirectToGo() {
  window.location.href = "/go"
}

// Mobile menu toggle
function toggleMobileMenu() {
  const mobileMenu = document.getElementById("mobile-menu")
  mobileMenu.classList.toggle("hidden")
}

// FAQ toggle functionality
function toggleFAQ(button) {
  const faqItem = button.parentElement
  const answer = faqItem.querySelector(".faq-answer")
  const icon = button.querySelector("i")

  // Toggle answer visibility
  answer.classList.toggle("hidden")

  // Toggle icon rotation
  button.classList.toggle("active")

  // Close other FAQ items
  const allFaqItems = document.querySelectorAll(".faq-item")
  allFaqItems.forEach((item) => {
    if (item !== faqItem) {
      item.querySelector(".faq-answer").classList.add("hidden")
      item.querySelector(".faq-question").classList.remove("active")
    }
  })
}

// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Add smooth scrolling to all navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]')

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight
        const targetPosition = targetSection.offsetTop - headerHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      const mobileMenu = document.getElementById("mobile-menu")
      if (!mobileMenu.classList.contains("hidden")) {
        mobileMenu.classList.add("hidden")
      }
    })
  })

  // Add scroll effect to header
  const header = document.querySelector("header")
  let lastScrollTop = 0

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop

    if (scrollTop > 100) {
      header.classList.add("bg-black/80")
    } else {
      header.classList.remove("bg-black/80")
    }

    lastScrollTop = scrollTop
  })


  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset
    const parallaxBg = document.querySelector(".parallax-bg")

    if (parallaxBg) {
      const speed = scrolled * 0.5
      parallaxBg.style.transform = `translateY(${speed}px)`
    }
  })

  // Add hover effects to game cards
  const gameCards = document.querySelectorAll(".game-card")
  gameCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.05)"
    })

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })

  // Add click tracking for analytics (placeholder)
  document.addEventListener("click", (e) => {
    if (e.target.matches(".cta-button, .cta-button-large, .play-btn")) {
      // Analytics tracking would go here
      console.log("CTA button clicked:", e.target.textContent)
    }
  })
})

// Preload critical images
function preloadImages() {
  const criticalImages = ["/images/hero.webp", "/images/bonus-crab.webp"]

  criticalImages.forEach((src) => {
    const img = new Image()
    img.src = src
  })
}

// Initialize preloading when DOM is ready
document.addEventListener("DOMContentLoaded", preloadImages)

// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // ESC key closes mobile menu
  if (e.key === "Escape") {
    const mobileMenu = document.getElementById("mobile-menu")
    if (!mobileMenu.classList.contains("hidden")) {
      mobileMenu.classList.add("hidden")
    }
  }

  // Enter key on FAQ questions
  if (e.key === "Enter" && e.target.classList.contains("faq-question")) {
    toggleFAQ(e.target)
  }
})

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Apply debouncing to scroll events
const debouncedScrollHandler = debounce(() => {
  // Scroll-based animations and effects
  const scrolled = window.pageYOffset

  // Update floating elements based on scroll
  const floatingElements = document.querySelectorAll(".floating-card, .floating-chip, .floating-dice, .floating-star")
  floatingElements.forEach((element, index) => {
    const speed = (index + 1) * 0.1
    element.style.transform += ` translateY(${scrolled * speed}px)`
  })
}, 16) // ~60fps

window.addEventListener("scroll", debouncedScrollHandler)

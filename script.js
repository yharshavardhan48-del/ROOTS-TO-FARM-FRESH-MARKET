// Mobile Navigation Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMobile = document.getElementById('navMobile');

mobileMenuToggle.addEventListener('click', () => {
    mobileMenuToggle.classList.toggle('active');
    navMobile.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.nav-mobile a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navMobile.classList.remove('active');
    });
});

// Product Card Click Handling
const productCards = document.querySelectorAll('.product-card');
const paymentSection = document.getElementById('paymentSection');
const selectedProductName = document.getElementById('selectedProductName');
const selectedProductPrice = document.getElementById('selectedProductPrice');
const closePaymentBtn = document.getElementById('closePayment');
const paymentForm = document.getElementById('paymentForm');

productCards.forEach(card => {
    const buyButton = card.querySelector('.buy-button');
    
    buyButton.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        
        // Get product details from data attributes
        const productName = card.dataset.name;
        const productPrice = card.dataset.price;
        
        // Update payment form with selected product
        selectedProductName.textContent = productName;
        selectedProductPrice.textContent = `$${productPrice}`;
        
        // Show payment section
        paymentSection.classList.add('active');
        
        // Smooth scroll to payment section
        paymentSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
        
        // Add a small delay to ensure smooth scrolling completes
        setTimeout(() => {
            // Focus on the first input field
            document.getElementById('fullName').focus();
        }, 800);
    });
});

// Close Payment Form
closePaymentBtn.addEventListener('click', () => {
    paymentSection.classList.remove('active');
    
    // Scroll back to products section
    document.getElementById('products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Handle Payment Form Submission
paymentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(paymentForm);
    const productName = selectedProductName.textContent;
    const productPrice = selectedProductPrice.textContent;
    
    // Create order summary
    const orderSummary = {
        product: productName,
        price: productPrice,
        customerInfo: {
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            address: formData.get('address')
        },
        paymentInfo: {
            cardNumber: formData.get('cardNumber').replace(/\s/g, ''), // Remove spaces
            expiry: formData.get('expiry'),
            cvv: formData.get('cvv')
        }
    };
    
    // Simulate processing
    const submitButton = document.querySelector('.payment-submit');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Processing...';
    submitButton.disabled = true;
    
    // Simulate API call delay
    setTimeout(() => {
        alert(`Thank you for your purchase!\n\nOrder Summary:\nProduct: ${orderSummary.product}\nPrice: ${orderSummary.price}\nCustomer: ${orderSummary.customerInfo.fullName}\n\nA confirmation email will be sent to ${orderSummary.customerInfo.email}`);
        
        // Reset form and close payment section
        paymentForm.reset();
        paymentSection.classList.remove('active');
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        
        // Scroll back to top
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, 2000);
});

// Input Formatting
const cardNumberInput = document.getElementById('cardNumber');
const expiryInput = document.getElementById('expiry');
const cvvInput = document.getElementById('cvv');

// Format card number input (add spaces every 4 digits)
cardNumberInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\s/g, '').replace(/\D/g, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    if (formattedValue.length > 19) formattedValue = formattedValue.substr(0, 19);
    e.target.value = formattedValue;
});

// Format expiry date input (MM/YY)
expiryInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
});

// Restrict CVV to numbers only
cvvInput.addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(255, 107, 53, 0.95), rgba(247, 147, 30, 0.95))';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #ff6b35, #f7931e)';
        header.style.backdropFilter = 'none';
    }
});

// Add loading animation for images
document.querySelectorAll('.product-card img').forEach(img => {
    img.addEventListener('load', function() {
        this.style.opacity = '1';
    });
    
    // Set initial opacity for loading effect
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s ease';
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe product cards for animation
document.querySelectorAll('.product-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});
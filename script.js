// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Toggle mobile menu (if added later)
const mobileMenuToggle = document.createElement('button');
mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
mobileMenuToggle.classList.add('mobile-menu-toggle');
mobileMenuToggle.style.display = 'none';

const header = document.querySelector('header .container');
header.appendChild(mobileMenuToggle);

const nav = document.querySelector('nav');

function toggleMobileMenu() {
    nav.style.display = nav.style.display === 'none' ? 'block' : 'none';
}

mobileMenuToggle.addEventListener('click', toggleMobileMenu);

function checkMobileMenu() {
    if (window.innerWidth <= 768) {
        mobileMenuToggle.style.display = 'block';
        nav.style.display = 'none';
    } else {
        mobileMenuToggle.style.display = 'none';
        nav.style.display = 'block';
    }
}

window.addEventListener('resize', checkMobileMenu);
checkMobileMenu();

// Plugin card click handler
document.querySelectorAll('.plugin-card').forEach(card => {
    card.addEventListener('click', function(e) {
        // Don't navigate if clicking on a link inside the card
        if (e.target.tagName === 'A' || e.target.closest('a')) {
            return;
        }
        
        const link = this.querySelector('a');
        if (link) {
            window.location.href = link.href;
        }
    });
});

// Search functionality
const searchBox = document.querySelector('.search-box');
if (searchBox) {
    const searchInput = searchBox.querySelector('input');
    const searchButton = searchBox.querySelector('button');
    
    function performSearch() {
        const query = searchInput.value.trim();
        if (query) {
            alert(`Searching for: ${query}`);
            // In a real implementation, you would redirect to search results
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Plugin page tabs (if needed)
function setupPluginTabs() {
    const tabButtons = document.querySelectorAll('.plugin-tab-button');
    const tabContents = document.querySelectorAll('.plugin-tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        function showTab(tabId) {
            tabContents.forEach(content => {
                content.style.display = 'none';
            });
            
            tabButtons.forEach(button => {
                button.classList.remove('active');
            });
            
            document.getElementById(tabId).style.display = 'block';
            document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
        }
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                showTab(this.getAttribute('data-tab'));
            });
        });
        
        // Show first tab by default
        showTab(tabButtons[0].getAttribute('data-tab'));
    }
}

setupPluginTabs();

// Copy code blocks
document.querySelectorAll('.code-block').forEach(block => {
    const copyButton = document.createElement('button');
    copyButton.innerHTML = '<i class="far fa-copy"></i>';
    copyButton.classList.add('copy-button');
    copyButton.title = 'Copy to clipboard';
    
    copyButton.addEventListener('click', function() {
        const code = block.querySelector('pre').innerText;
        navigator.clipboard.writeText(code).then(() => {
            copyButton.innerHTML = '<i class="fas fa-check"></i>';
            copyButton.title = 'Copied!';
            setTimeout(() => {
                copyButton.innerHTML = '<i class="far fa-copy"></i>';
                copyButton.title = 'Copy to clipboard';
            }, 2000);
        });
    });
    
    block.style.position = 'relative';
    block.appendChild(copyButton);
});

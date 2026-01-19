
// Component Injection
document.addEventListener('DOMContentLoaded', () => {
    loadHeader();
    loadFooter();
    highlightActiveLink();
});

function loadHeader() {
    const headerHTML = `
    <header class="site-header">
        <div class="container">
            <a href="index.html" class="logo">
                <img src="assets/images/GOGO NOUVEAU V1 OK.png" alt="GoGo Logo">
            </a>
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html">Home</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="fuel-delivery.html">Fuel</a></li>
                    <li><a href="lubricants.html">Lubricants</a></li>
                    <li><a href="b2b-solutions.html">B2B</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
            <div class="header-actions">
                <a href="mobile-app.html" class="btn btn-secondary">Get App</a>
                <a href="b2b-login.html" class="btn btn-primary">B2B Login</a>
                <select class="lang-switch">
                    <option value="en">EN</option>
                    <option value="fr">FR</option>
                </select>
            </div>
        </div>
    </header>
    `;
    document.body.insertAdjacentHTML('afterbegin', headerHTML);
}

function loadFooter() {
    const footerHTML = `
    <footer class="site-footer">
        <div class="container">
            <div class="footer-grid">
                <div class="footer-brand">
                    <img src="assets/images/GOGO NOUVEAU V1 OK.png" alt="GoGo Logo" style="filter: brightness(0) invert(1); height: 40px; margin-bottom: 1rem;">
                    <p>Fueling Africa's Future with Technology & Trust.</p>
                </div>
                <div class="footer-links">
                    <h4>Company</h4>
                    <ul>
                        <li><a href="about.html">About Us</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="blog.html">Blog</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Products</h4>
                    <ul>
                        <li><a href="fuel-delivery.html">Gasoline & Diesel</a></li>
                        <li><a href="lubricants.html">Industrial Lubricants</a></li>
                    </ul>
                </div>
                <div class="footer-links">
                    <h4>Legal</h4>
                    <ul>
                        <li><a href="privacy.html">Privacy Policy</a></li>
                        <li><a href="privacy.html">Terms of Service</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom" style="border-top: 1px solid rgba(255,255,255,0.1); padding-top: 1.5rem; display: flex; justify-content: space-between; align-items: center;">
                <p>&copy; 2026 Imperial Energy. All rights reserved.</p>
                <div class="social-icons">
                    <a href="#" aria-label="Facebook">F</a>
                    <a href="#" aria-label="Twitter">X</a>
                    <a href="#" aria-label="LinkedIn">In</a>
                    <a href="#" aria-label="Instagram">Ig</a>
                </div>
            </div>
        </div>
    </footer>
    `;
    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

function highlightActiveLink() {
    // Simple active state checking
    const path = window.location.pathname;
    const page = path.split("/").pop();
    // Logic to add 'active' class to nav links after header is injected
    // setTimeout to wait for injection
    setTimeout(() => {
        const links = document.querySelectorAll('.nav-links a');
        links.forEach(link => {
            if(link.getAttribute('href') === page) {
                link.classList.add('active');
            }
        });
    }, 100);
}

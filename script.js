document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const loginPopup = document.getElementById('login-popup');
    const overlay = document.getElementById('overlay');
    const dashboard = document.getElementById('dashboard');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const navButtons = document.getElementById('nav-buttons');
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const loginForm = document.querySelector('.login-form');
    const burgerMenu = document.getElementById('burger-menu');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const popupClose = document.getElementById('popup-close');
   
    // Define all functions first
   
    // Function to show login popup
    function showLoginPopup() {
        overlay.style.display = 'block';
        loginPopup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        if (username) {
            setTimeout(() => {
                username.focus();
            }, 100);
        }
    }
    
    // Function to hide login popup
    function hideLoginPopup() {
        overlay.style.display = 'none';
        loginPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Clear form fields
        if (username) username.value = '';
        if (password) password.value = '';
        
        // Remove any error or success messages
        const messages = document.querySelectorAll('.error-message, .login-message');
        messages.forEach(msg => msg.remove());
    }
   
    // Function to show dashboard
    function showDashboard() {
        // Show navigation buttons and burger menu
        navButtons.style.display = 'flex';
        burgerMenu.style.display = 'block';
        
        // Show sidebar
        if (sidebar) {
            sidebar.style.display = 'block';
        }
        
        // Hide login popup
        hideLoginPopup();
    }
   
    // Function to load content
    function loadContent(section, page) {
        if (!content) return;
       
        // Display loading indicator
        content.innerHTML = '<div class="loading">Loading content...</div>';
       
        // Simulate loading delay (remove in production)
        setTimeout(() => {
            // For IT section, display IT (App) instead of just IT
            const sectionTitle = section === 'it' ? 'IT (App)' : section.charAt(0).toUpperCase() + section.slice(1);
            
            content.innerHTML = `
                <h2>${sectionTitle} > ${page}</h2>
                <div class="content-box">
                    <p>Content for ${page} will be displayed here.</p>
                </div>
            `;
        }, 300);
    }
   
    // Handle logout
    function handleLogout(e) {
        if (e) e.preventDefault();
       
        // Clear session data
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isAdmin');
       
        // Hide menu and navigation elements
        navButtons.style.display = 'none';
        burgerMenu.style.display = 'none';
        if (sidebar) {
            sidebar.style.display = 'none';
        }
        
        // Reset UI state
        content.innerHTML = `
            <div class="welcome-content">
                <h2>Welcome to MJC Portal V.2</h2>
                <div class="content-box">
                    <p>Please login to access the portal features.</p>
                </div>
            </div>
        `;
        
        // Show login popup with slight delay
        setTimeout(showLoginPopup, 200);
    }
   
    // Login handler
    function handleLogin(e) {
        if (e) e.preventDefault();
       
        // Basic validation
        if (!username || !password || !username.value || !password.value) {
            alert('Please enter both username and password');
            return;
        }
       
        // Check credentials
        if (username.value === 'admin' && password.value === 'admin123') {
            // Store login state
            sessionStorage.setItem('loggedIn', 'true');
            sessionStorage.setItem('username', username.value);
            sessionStorage.setItem('isAdmin', 'true');
           
            // Show success message
            if (loginForm) {
                const loginMessage = document.createElement('div');
                loginMessage.className = 'login-message';
                loginMessage.textContent = 'Login successful! Loading dashboard...';
                loginForm.appendChild(loginMessage);
            }
           
            // Show dashboard after delay
            setTimeout(() => {
                showDashboard();
                // Show default content for admin
                loadContent('master', 'Branch');
            }, 1000);
        } else {
            // Show error message
            if (loginForm) {
                let errorMessage = document.querySelector('.error-message');
               
                if (!errorMessage) {
                    errorMessage = document.createElement('div');
                    errorMessage.className = 'error-message';
                    loginForm.appendChild(errorMessage);
                }
               
                errorMessage.textContent = 'Invalid username or password. Please try again.';
               
                // Clear password field
                if (password) {
                    password.value = '';
                    password.focus();
                }
            }
        }
    }
   
    // Initialize portal function
    function initializePortal() {
        // Toggle sidebar with burger menu
        if (burgerMenu && sidebar) {
            burgerMenu.addEventListener('click', function() {
                this.classList.toggle('active');
                sidebar.classList.toggle('active');
            });
        }
       
        // Toggle submenu on menu item click
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function() {
                const menuName = this.getAttribute('data-menu');
                const submenu = document.getElementById(`${menuName}-submenu`);
               
                // First, close all submenus to prevent overlapping
                document.querySelectorAll('.submenu').forEach(menu => {
                    menu.classList.remove('active');
                });
               
                document.querySelectorAll('.menu-item').forEach(menuItem => {
                    menuItem.classList.remove('active');
                });
               
                // Then toggle the clicked menu
                if (submenu) {
                    submenu.classList.toggle('active');
                    this.classList.toggle('active');
                }
            });
        });
       
        // Handle submenu item click
        document.querySelectorAll('.submenu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent event bubbling to parent menu item
               
                // Highlight selected submenu item
                document.querySelectorAll('.submenu-item').forEach(subItem => {
                    subItem.classList.remove('selected');
                });
                this.classList.add('selected');
               
                const parentMenu = this.closest('.submenu').id.replace('-submenu', '');
                const itemName = this.textContent.trim();
               
                // For mobile, close the sidebar after selection
                if (window.innerWidth <= 768 && sidebar) {
                    sidebar.classList.remove('active');
                    if (burgerMenu) burgerMenu.classList.remove('active');
                }
               
                // Load content
                loadContent(parentMenu, itemName);
            });
        });
       
        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (sidebar &&
                window.innerWidth <= 768 &&
                !e.target.closest('.sidebar') &&
                !e.target.closest('.burger-menu') &&
                sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
                if (burgerMenu) burgerMenu.classList.remove('active');
            }
        });
       
        // Close login popup when clicking close button
        if (popupClose) {
            popupClose.addEventListener('click', hideLoginPopup);
        }
        
        // Close login popup when clicking overlay
        if (overlay) {
            overlay.addEventListener('click', hideLoginPopup);
        }
        
        // Show Master submenu by default when logged in
        const defaultMenu = document.querySelector('[data-menu="master"]');
        const defaultSubmenu = document.getElementById('master-submenu');
       
        if (defaultMenu && defaultSubmenu) {
            defaultMenu.classList.add('active');
            defaultSubmenu.classList.add('active');
        }
    }
    
    // Check login status function
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const storedUsername = sessionStorage.getItem('username');
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
       
        if (isLoggedIn) {
            // Set username in nav button
            const navButton = document.querySelector('.nav-button');
            if (navButton && storedUsername) {
                navButton.textContent = storedUsername.toUpperCase();
            }
           
            // Show dashboard elements
            navButtons.style.display = 'flex';
            burgerMenu.style.display = 'block';
            
            // Show sidebar if admin
            if (isAdmin && sidebar) {
                sidebar.style.display = 'block';
            }
           
            // If not admin, show limited access message
            if (!isAdmin) {
                if (content) {
                    content.innerHTML = `
                        <h2>Limited Access</h2>
                        <div class="content-box">
                            <p>You are logged in as ${storedUsername}, but you don't have administrator privileges.</p>
                            <p>Please contact your system administrator for assistance.</p>
                        </div>
                    `;
                }
            } else {
                // Show default content for admin
                loadContent('master', 'Branch');
            }
        } else {
            // User is not logged in, hide menu elements
            navButtons.style.display = 'none';
            burgerMenu.style.display = 'none';
            if (sidebar) {
                sidebar.style.display = 'none';
            }
            
            // Show welcome content
            content.innerHTML = `
                <div class="welcome-content">
                    <h2>Welcome to MJC Portal V.2</h2>
                    <div class="content-box">
                        <p>Please login to access the portal features.</p>
                    </div>
                </div>
            `;
            
            // Show login popup with slight delay
            setTimeout(showLoginPopup, 500);
        }
    }
   
    // Now that all functions are defined, we can start using them
   
    // Check if user is already logged in
    checkLoginStatus();
   
    // Login button click handler
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
   
    // Handle Enter key press on login form
    if (loginForm) {
        loginForm.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleLogin(e);
            }
        });
    }
   
    // Logout button click handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
   
    // Initialize dashboard functionality
    initializePortal();
});

document.addEventListener('DOMContentLoaded', function() {
    // Elements - global references
    const burgerMenu = document.getElementById('burger-menu');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const logoutBtn = document.getElementById('logout-btn');
    const usernameDisplay = document.getElementById('username-display');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const touchFeedback = document.getElementById('touch-feedback');
    
    // สร้างตัวแปรสำหรับเก็บ timeout ของการปิด sidebar อัตโนมัติ
    let sidebarTimeout;
    // ตัวแปรสำหรับอนิเมชั่น
    let isContentTransitioning = false;
    
    // Mark document as loaded for transition effects
    document.body.classList.add('loaded');
    
    // Check login status - ตรวจสอบสถานะล็อกอินก่อนแสดงแดชบอร์ด
    checkLoginStatus();
    
    // Initialize touch feedback effects
    initTouchFeedback();
    
    // Initialize dashboard functionality
    initializeDashboard();
    
    // Function to check login status
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const storedUsername = sessionStorage.getItem('username');
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
        
        console.log("Checking login status:", isLoggedIn ? "Logged in" : "Not logged in");
        
        if (!isLoggedIn) {
            // Add transition effect
            showPageTransition();
            
            // Redirect to login page if not logged in
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 300); // Delay for transition
            return;
        }
        
        // Update username display
        if (usernameDisplay && storedUsername) {
            usernameDisplay.textContent = storedUsername.toUpperCase();
            usernameDisplay.title = storedUsername; // เพิ่ม title attribute เพื่อแสดงชื่อเต็มเมื่อ hover
        }
        
        // หากไม่ใช่ admin แสดงข้อความแจ้งเตือน
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
        }
    }
    
    // Function to handle logout
    function handleLogout(e) {
        if (e && e.cancelable) e.preventDefault();
        
        console.log("Logging out...");
        
        // Clear session data
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isAdmin');
        
        // Clear menu state
        localStorage.removeItem('activeMenus');
        
        // Add transition
        showPageTransition();
        
        // Redirect to login page after animation
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 300); // Delay to show transition
    }
    
    // Function to close sidebar completely
    function closeSidebar() {
        if (!sidebar) return;
        
        // ไม่ปิด sidebar ถ้าอยู่บนคอมพิวเตอร์หรือโน้ตบุ๊ค
        if (window.innerWidth > 768) {
            return;  // แก้ไขตรงนี้: เพิ่มการตรวจสอบขนาดหน้าจอ
        }
        
        // Add closing animation class
        sidebar.classList.add('closing');
        
        // Change state after animation
        setTimeout(() => {
            sidebar.classList.remove('active');
            sidebar.classList.remove('closing');
            sidebar.style.left = '-250px';
            
            if (sidebarOverlay) {
                sidebarOverlay.classList.remove('active');
            }
            
            if (burgerMenu) {
                burgerMenu.classList.remove('active');
            }
            
            // Re-enable body scrolling
            document.body.style.overflow = '';
        }, 50); // Short timeout for smoother animation
        
        // ยกเลิก timeout การปิดอัตโนมัติ
        clearTimeout(sidebarTimeout);
    }
    
    // Function to toggle sidebar
    function toggleSidebar(e) {
        if (e && e.cancelable) {
            e.preventDefault();
            e.stopPropagation();
        }
        
        // ตรวจสอบขนาดหน้าจอ - ถ้าเป็นคอมพิวเตอร์หรือโน้ตบุ๊ค ให้ไม่ทำอะไร
        if (window.innerWidth > 768) {
            return; // แก้ไขตรงนี้: เพิ่มการตรวจสอบขนาดหน้าจอเพื่อไม่ทำงานบนคอมพิวเตอร์หรือโน้ตบุ๊ค
        }
        
        // Create ripple effect if clicked
        if (e && e.type === 'click' && burgerMenu) {
            createRippleEffect(burgerMenu, e);
        }
        
        if (burgerMenu) {
            burgerMenu.classList.toggle('active');
        }
        
        if (sidebar) {
            const isActive = sidebar.classList.contains('active');
            
            if (isActive) {
                // ถ้า sidebar กำลังเปิดอยู่ ให้ปิด
                closeSidebar();
            } else {
                // ถ้า sidebar กำลังปิดอยู่ ให้เปิด
                sidebar.classList.add('active');
                sidebar.style.left = '0';
                
                if (sidebarOverlay) {
                    sidebarOverlay.classList.add('active');
                }
                
                // ล็อค scrolling เมื่อเปิด sidebar บนมือถือ
                if (window.innerWidth <= 768) {
                    document.body.style.overflow = 'hidden';
                }
                
                // ตั้งเวลาปิดอัตโนมัติหลังจากไม่ได้ใช้งาน
                setupSidebarAutoClose();
            }
        }
        
        console.log("Toggled sidebar, active:", sidebar ? sidebar.classList.contains('active') : 'sidebar not found');
    }
    
    // Function to setup auto-close for sidebar
    function setupSidebarAutoClose() {
        if (window.innerWidth <= 768) {
            // ตั้งเวลาปิด sidebar หลังจากไม่ได้ใช้งาน 60 วินาที (บนมือถือเท่านั้น)
            clearTimeout(sidebarTimeout);
            
            sidebarTimeout = setTimeout(() => {
                if (sidebar && sidebar.classList.contains('active')) {
                    // แสดงการแจ้งเตือนว่ากำลังจะปิด sidebar
                    showSidebarCloseNotification().then(() => {
                        closeSidebar();
                    });
                }
            }, 60000); // 60 วินาที
        }
    }
    
    // Show countdown notification before auto-closing
    function showSidebarCloseNotification() {
        return new Promise((resolve) => {
            // Remove any existing notifications
            const existingNotification = document.querySelector('.sidebar-notification');
            if (existingNotification) {
                existingNotification.remove();
            }
            
            // Create notification
            const notification = document.createElement('div');
            notification.className = 'sidebar-notification';
            notification.textContent = 'Menu will close automatically in 5 seconds...';
            
            // Add to DOM
            document.body.appendChild(notification);
            
            // Resolve after 5 seconds
            setTimeout(() => {
                notification.style.animation = 'fadeOut 0.3s ease forwards';
                setTimeout(() => {
                    notification.remove();
                    resolve();
                }, 300);
            }, 5000);
        });
    }
    
    // Initialize touch feedback
    function initTouchFeedback() {
        if (!touchFeedback) return;
        
        // Listen for touches/clicks on menu items and buttons
        document.addEventListener('click', function(e) {
            // Only on mobile/tablet
            if (window.innerWidth <= 768) {
                const target = e.target;
                const isMenuOrButton = 
                    target.classList.contains('menu-item') || 
                    target.classList.contains('submenu-item') ||
                    target.classList.contains('logout-btn') ||
                    target.classList.contains('nav-button') ||
                    target.classList.contains('burger-menu') ||
                    target.closest('.menu-item') ||
                    target.closest('.submenu-item') ||
                    target.closest('.logout-btn') ||
                    target.closest('.nav-button') ||
                    target.closest('.burger-menu');
                
                if (isMenuOrButton) {
                    createRippleEffect(target, e);
                }
            }
        });
    }
    
    // Create ripple effect for touch/click feedback
    function createRippleEffect(target, e) {
        if (!touchFeedback) return;
        
        // Get position
        const x = e.clientX || (e.touches && e.touches[0].clientX) || target.getBoundingClientRect().left + target.offsetWidth / 2;
        const y = e.clientY || (e.touches && e.touches[0].clientY) || target.getBoundingClientRect().top + target.offsetHeight / 2;
        
        // Position the feedback element
        touchFeedback.style.left = `${x}px`;
        touchFeedback.style.top = `${y}px`;
        
        // Trigger animation
        touchFeedback.classList.remove('active');
        void touchFeedback.offsetWidth; // Force reflow
        touchFeedback.classList.add('active');
        
        // Remove class after animation completes
        setTimeout(() => {
            touchFeedback.classList.remove('active');
        }, 600);
    }
    
    // Function to initialize dashboard functionality
    function initializeDashboard() {
        // Toggle sidebar with burger menu
        if (burgerMenu) {
            burgerMenu.addEventListener('click', toggleSidebar);
            
            // Keyboard accessibility
            burgerMenu.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSidebar(e);
                }
            });
        }
        
        // Close sidebar when overlay is clicked
        if (sidebarOverlay) {
            sidebarOverlay.addEventListener('click', function(e) {
                if (e.target === sidebarOverlay) {
                    closeSidebar();
                }
            });
        }
        
        // Toggle submenu on menu item click
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', function(e) {
                e.stopPropagation();
                
                const menuName = this.getAttribute('data-menu');
                const submenu = document.getElementById(`${menuName}-submenu`);
                
                if (!submenu) {
                    console.error(`Submenu element not found: ${menuName}-submenu`);
                    return;
                }
                
                // Create ripple effect
                createRippleEffect(this, e);
                
                // ปิดทุก submenu ก่อน (ยกเว้นเมนูปัจจุบัน)
                document.querySelectorAll('.submenu').forEach(menu => {
                    if (menu.id !== `${menuName}-submenu`) {
                        menu.classList.remove('active');
                        menu.style.maxHeight = '0';
                    }
                });
                
                document.querySelectorAll('.menu-item').forEach(menuItem => {
                    if (menuItem !== this) {
                        menuItem.classList.remove('active');
                        menuItem.setAttribute('aria-expanded', 'false');
                    }
                });
                
                // สลับ active state (เปิด/ปิด submenu ปัจจุบัน)
                this.classList.toggle('active');
                submenu.classList.toggle('active');
                
                // อัปเดต aria-expanded สำหรับการเข้าถึง
                this.setAttribute('aria-expanded', this.classList.contains('active') ? 'true' : 'false');
                
                if (submenu.classList.contains('active')) {
                    submenu.style.maxHeight = '2000px';
                    
                    // Smooth scroll to ensure menu item is visible
                    if (window.innerWidth <= 768) {
                        const itemPosition = this.getBoundingClientRect().top;
                        const offset = itemPosition - 60; // ให้มีพื้นที่ด้านบน
                        
                        if (offset < 0) {
                            sidebar.scrollBy({
                                top: offset,
                                behavior: 'smooth'
                            });
                        }
                    }
                } else {
                    submenu.style.maxHeight = '0';
                }
                
                // รีเซ็ตเวลาปิดอัตโนมัติ (ถ้ามี)
                setupSidebarAutoClose();
                
                // บันทึกสถานะเมนู
                saveMenuState();
            });
            
            // Keyboard accessibility for menu items
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
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
                
                // Create ripple effect
                createRippleEffect(this, e);
                
                // Get menu and item name
                const parentMenu = this.closest('.submenu').id.replace('-submenu', '');
                const itemName = this.textContent.trim();
                
                // For mobile, close the sidebar after selection
                if (window.innerWidth <= 768 && sidebar) {
                    // Small delay to show selection before closing
                    setTimeout(() => {
                        closeSidebar();
                    }, 300);
                }
                
                // Load content with transition
                loadContent(parentMenu, itemName);
                
                // Reset auto-close timer
                setupSidebarAutoClose();
            });
            
            // Keyboard accessibility for submenu items
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
        
        // Add logout event listener
        if (logoutBtn) {
            logoutBtn.addEventListener('click', handleLogout);
            
            // Keyboard accessibility
            logoutBtn.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleLogout(e);
                }
            });
        }
        
        // Handle window resize for responsive sidebar
        const debounce = (func, delay) => {
            let timeout;
            return function() {
                const context = this;
                const args = arguments;
                clearTimeout(timeout);
                timeout = setTimeout(() => func.apply(context, args), delay);
            };
        };
        
        window.addEventListener('resize', debounce(function() {
            checkScreenSize();
        }, 250));
        
        // Close sidebar with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar && sidebar.classList.contains('active')) {
                closeSidebar();
            }
        });
        
        // เรียกใช้ฟังก์ชัน checkScreenSize เมื่อโหลดหน้า
        checkScreenSize();
        
        // ปิด submenu ทั้งหมดเมื่อเริ่มต้น
        closeAllSubmenus();
        
        // เพิ่มบรรทัดนี้เพื่อตรวจสอบอีกครั้งหลังจากปิด submenu
        checkScreenSize();
    }
    
    // Function to close all submenus
    function closeAllSubmenus() {
        document.querySelectorAll('.submenu').forEach(submenu => {
            submenu.classList.remove('active');
            submenu.style.maxHeight = '0';
        });
        
        document.querySelectorAll('.menu-item').forEach(menuItem => {
            menuItem.classList.remove('active');
            menuItem.setAttribute('aria-expanded', 'false');
        });
    }
    
    // Function to save menu state
    function saveMenuState() {
        const activeMenus = [];
        
        document.querySelectorAll('.menu-item.active').forEach(menuItem => {
            activeMenus.push(menuItem.getAttribute('data-menu'));
        });
        
        if (activeMenus.length > 0) {
            localStorage.setItem('activeMenus', JSON.stringify(activeMenus));
        } else {
            localStorage.removeItem('activeMenus');
        }
    }
    
    // Function to check screen size and adjust UI
    function checkScreenSize() {
        const windowWidth = window.innerWidth;
        
        if (windowWidth > 768) {
            // บนคอมพิวเตอร์หรือโน้ตบุ๊ค ให้แสดง sidebar ตลอดเวลา
            if (sidebar) {
                sidebar.style.left = '0';
                sidebar.classList.remove('active');
                sidebar.style.width = windowWidth >= 1200 ? '250px' : '220px';
            }
            if (sidebarOverlay) sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
            
            // ปรับ content ให้มีพื้นที่สำหรับ sidebar
            if (content) {
                content.style.width = windowWidth >= 1200 ? 'calc(100% - 250px)' : 'calc(100% - 220px)';
                content.style.marginLeft = windowWidth >= 1200 ? '250px' : '220px';
            }
        } else {
            // บนมือถือ ให้ซ่อน sidebar เมื่อไม่ได้กดเปิด
            if (sidebar && !sidebar.classList.contains('active')) {
                sidebar.style.left = '-250px';
                sidebar.style.width = '250px'; // มือถือใช้ความกว้าง 250px เสมอ
            }
            
            // ปรับ content ให้ใช้พื้นที่เต็มหน้าจอ
            if (content) {
                content.style.width = '100%';
                content.style.marginLeft = '0';
            }
        }
    }
    
    // Function to show page transition
    function showPageTransition() {
        let transition = document.querySelector('.page-transition');
        
        if (!transition) {
            transition = document.createElement('div');
            transition.className = 'page-transition';
            document.body.appendChild(transition);
        }
        
        // Trigger animation
        setTimeout(() => {
            transition.classList.add('active');
        }, 10);
    }
    
    // Function to load content based on menu selection
    function loadContent(section, page) {
        if (!content) {
            console.error("Content element not found");
            return;
        }
        
        // Prevent multiple simultaneous transitions
        if (isContentTransitioning) return;
        isContentTransitioning = true;
        
        // Log the requested content for debugging
        console.log("Loading content for section:", section, "page:", page);
        
        // Add transition out class
        content.style.opacity = '0';
        content.style.transform = 'translateY(10px)';
        
        // ตรวจสอบเงื่อนไขพิเศษสำหรับเมนู Branch
        if (section === 'master' && page === 'Branch') {
            // แสดงข้อความกำลังโหลด
            content.innerHTML = '<div class="loading">กำลังโหลด...</div>';
            
            // ใช้ fetch เพื่อโหลดไฟล์ Branch.html
            fetch('Branch.html')
                .then(response => {
                    if (!response.ok) {
                        throw new Error('การเชื่อมต่อเครือข่ายมีปัญหา ' + response.statusText);
                    }
                    return response.text();
                })
                .then(html => {
                    // แยกส่วนเนื้อหาจาก body ของ HTML ที่โหลดมา
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(html, 'text/html');
                    const bodyContent = doc.body.innerHTML;
                    
                    // นำเนื้อหาเฉพาะส่วน body มาแสดงผล
                    content.innerHTML = `
                        <h2>${section.charAt(0).toUpperCase() + section.slice(1)} > ${page}</h2>
                        <div class="content-box">
                            ${bodyContent}
                        </div>
                    `;
                    
                    // เพิ่มเอฟเฟกต์เนื้อหาปรากฏขึ้น
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                        isContentTransitioning = false;
                    }, 100);
                })
                .catch(error => {
                    console.error('เกิดข้อผิดพลาดในการโหลด Branch.html:', error);
                    content.innerHTML = `
                        <h2>เกิดข้อผิดพลาด</h2>
                        <div class="content-box">
                            <p>เกิดข้อผิดพลาดขณะโหลด Branch.html กรุณาลองใหม่อีกครั้ง</p>
                            <p>รายละเอียดข้อผิดพลาด: ${error.message}</p>
                        </div>
                    `;
                    
                    // คืนค่าการแสดงผล
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                    isContentTransitioning = false;
                });
        } else {
            // Display loading indicator after short delay
            setTimeout(() => {
                try {
                    // แสดงเนื้อหาตามเมนูที่เลือก
                    content.innerHTML = `
                        <h2>${section.charAt(0).toUpperCase() + section.slice(1)} > ${page}</h2>
                        <div class="content-box">
                            <p>Content for ${page} will be loaded from the database.</p>
                            <p>This page is ready for API integration.</p>
                        </div>
                    `;
                    
                    // Fade in content after data is loaded
                    setTimeout(() => {
                        content.style.opacity = '1';
                        content.style.transform = 'translateY(0)';
                        isContentTransitioning = false;
                    }, 100);
                } catch (err) {
                    console.error("Error loading content:", err);
                    content.innerHTML = `
                        <h2>Error</h2>
                        <div class="content-box">
                            <p>An error occurred while loading content. Please try again.</p>
                            <p>Error details: ${err.message}</p>
                        </div>
                    `;
                    
                    // Restore visibility
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                    isContentTransitioning = false;
                }
            }, 200);
        }
    }
});

// Add transition styles for content
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .content {
            transition: opacity 0.3s ease, transform 0.3s ease;
        }
        
        @keyframes fadeOut {
            from { opacity: 1; }
            to { opacity: 0; }
        }
    </style>
`);

// Add fade effect to page load
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

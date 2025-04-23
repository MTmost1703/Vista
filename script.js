// Toggle sidebar with burger menu
const burgerMenu = document.getElementById('burger-menu');
const sidebar = document.getElementById('sidebar');

burgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    sidebar.classList.toggle('active');
});

// Toggle submenu on menu item click
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', function() {
        const menuName = this.getAttribute('data-menu');
        const submenu = document.getElementById(`${menuName}-submenu`);
        
        // Toggle active class for this submenu
        submenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Close other submenus (optional)
        document.querySelectorAll('.submenu').forEach(menu => {
            if (menu.id !== `${menuName}-submenu`) {
                menu.classList.remove('active');
            }
        });
        
        document.querySelectorAll('.menu-item').forEach(menuItem => {
            if (menuItem !== this && menuItem.getAttribute('data-menu') !== menuName) {
                menuItem.classList.remove('active');
            }
        });
    });
});

// Handle submenu item click
document.querySelectorAll('.submenu-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent event bubbling to parent menu item
        
        const parentMenu = this.closest('.submenu').id.replace('-submenu', '');
        const itemName = this.textContent;
        console.log(`Selected: ${parentMenu} > ${itemName}`);
        
        // You can add functionality here to load content
        
        // For mobile, close the sidebar after selection
        if (window.innerWidth <= 768) {
            sidebar.classList.remove('active');
            burgerMenu.classList.remove('active');
        }
    });
});

// Show Master submenu by default
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('master-submenu').classList.add('active');
    document.querySelector('[data-menu="master"]').classList.add('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        !e.target.closest('.sidebar') && 
        !e.target.closest('.burger-menu') && 
        sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        burgerMenu.classList.remove('active');
    }
});
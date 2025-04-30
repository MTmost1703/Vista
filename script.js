document.addEventListener('DOMContentLoaded', function() {
    // Elements - global references
    const loginPopup = document.getElementById('login-popup');
    const overlay = document.getElementById('overlay');
    const dashboard = document.getElementById('dashboard');
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginLink = document.getElementById('login-link');
    const navButtons = document.getElementById('nav-buttons');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    const burgerMenuElement = document.getElementById('burger-menu');
    
    // อาเรย์ข้อมูลผู้ใช้งาน - เพิ่มผู้ใช้ใหม่ที่นี่
    const users = [
        { username: 'admin', password: 'admin123', isAdmin: true },
        { username: 'Tanapong@gmail.com', password: 'admin456', isAdmin: true }
    ];
    
    // ตรวจสอบและลบปุ่มปิดที่อาจหลงเหลืออยู่
    const removeCloseButtons = function() {
        // ลบปุ่มปิดที่อาจถูกสร้างด้วยคลาส popup-close
        const closeButtons = document.querySelectorAll('.popup-close');
        closeButtons.forEach(button => button.remove());
        
        // ลบปุ่มปิดที่อาจมีลักษณะคล้ายกัน
        const closeButtonsX = document.querySelectorAll('[class*="close"], [id*="close"]');
        closeButtonsX.forEach(button => {
            if (button.innerHTML.includes('&times;') || button.innerHTML.includes('×')) {
                button.remove();
            }
        });
    };
    
    // Function to get fresh references to username and password inputs
    function getLoginInputs() {
        return {
            username: document.getElementById('username'),
            password: document.getElementById('password'),
            loginForm: document.querySelector('.login-form')
        };
    }
    
    // Initial references
    let { username, password, loginForm } = getLoginInputs();

    // Function to show login popup
    function showLoginPopup() {
        overlay.style.display = 'block';
        loginPopup.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        
        // Add animation classes
        overlay.classList.add('animate-overlay');
        loginPopup.classList.add('animate-popup');
        
        // Refresh references after showing popup
        ({ username, password, loginForm } = getLoginInputs());
        
        // ลบปุ่มปิดที่อาจหลงเหลืออยู่
        removeCloseButtons();
        
        if (username) {
            setTimeout(() => {
                username.focus();
            }, 100);
        }
        
        // Call the new function to enhance login popup
        enhanceLoginPopup();
    }
    
    // Function to hide login popup
    function hideLoginPopup() {
        overlay.style.display = 'none';
        loginPopup.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore scrolling
        
        // Refresh references
        ({ username, password, loginForm } = getLoginInputs());
        
        // Clear form fields
        if (username) username.value = '';
        if (password) password.value = '';
        
        // Remove any error or success messages
        const messages = document.querySelectorAll('.error-message, .login-message');
        messages.forEach(msg => msg.remove());
    }
   
    // Function to show dashboard
    function showDashboard() {
        // Show navigation buttons
        navButtons.style.display = 'flex';
        
        // ตรวจสอบขนาดหน้าจอก่อนแสดงเมนูแฮมเบอร์เกอร์
        if (window.innerWidth <= 768 && burgerMenuElement) {
            burgerMenuElement.style.display = 'block';
        } else if (burgerMenuElement) {
            // ซ่อนเมนูแฮมเบอร์เกอร์สำหรับขนาดหน้าจอใหญ่กว่า
            burgerMenuElement.style.display = 'none';
        }
        
        // Hide login link
        if (loginLink) {
            loginLink.style.display = 'none';
        }
        
        // Show sidebar
        if (sidebar) {
            sidebar.style.display = 'block';
        }
        
        // Hide login popup
        hideLoginPopup();
    }
    // Function to load content - แก้ไขส่วนนี้เพื่อแก้ปัญหา Loading content...
    function loadContent(section, page) {
        if (!content) {
            console.error("Content element not found");
            return;
        }
       
        // Log the requested content for debugging
        console.log("Loading content for section:", section, "page:", page);
       
        // Display loading indicator
        content.innerHTML = '<div class="loading">Loading content...</div>';
       
        // ลดเวลาหน่วงเหลือแค่ 100ms เพื่อให้โหลดเร็วขึ้น (หรือลบทิ้งในการใช้งานจริง)
        setTimeout(() => {
            try {
                // ตรวจสอบหากเป็นหน้า Master > Branch
                if (section === 'master' && page === 'Branch') {
                    content.innerHTML = `
                        <h2>${section.charAt(0).toUpperCase() + section.slice(1)} > ${page}</h2>
                        <div class="content-box">
                            <div class="table-controls">
                                <div class="search-container">
                                    <input type="text" id="branch-search" placeholder="ค้นหาสาขา..." class="search-input">
                                    <button id="search-btn" class="search-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                                    </button>
                                </div>
                                
                                <div class="table-actions">
                                    <button id="refresh-btn" class="action-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 4v6h-6"></path><path d="M1 20v-6h6"></path><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10"></path><path d="M1 14l4.64 4.36A9 9 0 0 0 20.49 15"></path></svg>
                                        รีเฟรช
                                    </button>
                                    <button id="export-btn" class="action-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                                        ส่งออก Excel
                                    </button>
                                </div>
                            </div>
                            
                            <div class="table-container">
                                <table id="branch-table" class="data-table">
                                    <thead>
                                        <tr>
                                            <th data-sort="id2">ID (2)</th>
                                            <th data-sort="id3">ID (3)</th>
                                            <th data-sort="id4">ID (4)</th>
                                            <th data-sort="branchNameEN">Branch Name (EN)</th>
                                            <th data-sort="branchNameTH">Branch Name (TH)</th>
                                            <th data-sort="serverIPApp">ServerIP (APP)</th>
                                            <th data-sort="serverNameApp">Server Name (APP)</th>
                                            <th data-sort="serverIPDB">ServerIP (DB)</th>
                                            <th data-sort="serverNameDB">Server Name (DB)</th>
                                            <th data-sort="screen">Screen</th>
                                            <th data-sort="kiosk">Kiosk</th>
                                            <th data-sort="seat">Seat</th>
                                            <th data-sort="openDate">Open Date</th>
                                            <th data-sort="status">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <!-- ข้อมูลจะถูกเพิ่มด้วย JavaScript -->
                                    </tbody>
                                </table>
                            </div>
                            
                            <div class="pagination">
                                <button id="prev-page" class="page-btn" disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                                </button>
                                <span id="page-info">หน้า 1 จาก 1</span>
                                <button id="next-page" class="page-btn" disabled>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    `;
                    
                    // เรียกใช้งานฟังก์ชันตารางสาขาทันที
                    setTimeout(() => {
                        try {
                            initBranchTable();
                        } catch (err) {
                            console.error("Error initializing branch table:", err);
                            document.querySelector('#branch-table tbody').innerHTML = '<tr><td colspan="14" style="text-align: center; padding: 20px;">เกิดข้อผิดพลาดในการโหลดข้อมูล กรุณาลองใหม่อีกครั้ง</td></tr>';
                        }
                    }, 100);
                } else {
                    // สำหรับหน้าอื่นๆ แสดงเนื้อหาเริ่มต้น
                    content.innerHTML = `
                        <h2>${section.charAt(0).toUpperCase() + section.slice(1)} > ${page}</h2>
                        <div class="content-box">
                            <p>Content for ${page} will be displayed here.</p>
                        </div>
                    `;
                }
            } catch (err) {
                console.error("Error loading content:", err);
                content.innerHTML = `
                    <h2>Error</h2>
                    <div class="content-box">
                        <p>เกิดข้อผิดพลาดในการโหลดเนื้อหา กรุณาลองใหม่อีกครั้ง</p>
                    </div>
                `;
            }
        }, 100); // ลดเวลาหน่วงลงเหลือ 100ms
    }
    // ฟังก์ชันสำหรับจัดการตาราง Branch Data
    function initBranchTable() {
        console.log("Initializing branch table...");
        
        // ข้อมูลตารางสาขา - ดึงข้อมูลสาขาที่ได้อัปเดตแล้วตามตัวอย่าง
        const branchData = [
            {id2: "BK", id3: "BKE", id4: "3001", branchNameEN: "Bangkae", branchNameTH: "บางแค", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.49", serverNameDB: "bkap-vbrapp02", screen: 10, kiosk: 0, seat: 18806, openDate: "19940616", status: "Active"},
            {id2: "SC", id3: "SCS", id4: "3003", branchNameEN: "Seacon", branchNameTH: "ซีคอน", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.52", serverNameDB: "scsp-vbrapp02", screen: 12, kiosk: 0, seat: 20047, openDate: "19940907", status: "Active"},
            {id2: "PK", id3: "PKE", id4: "3008", branchNameEN: "Central Pinklao", branchNameTH: "เซ็นทรัลปิ่นเกล้า", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.32", serverNameDB: "pksp-vbrapp02", screen: 12, kiosk: 0, seat: 17925, openDate: "19941001", status: "Active"},
            {id2: "RS", id3: "RSE", id4: "3004", branchNameEN: "Future Rangsit", branchNameTH: "ฟิวเจอร์รังสิต", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.71", serverNameDB: "rssp-vbrapp02", screen: 10, kiosk: 0, seat: 15617, openDate: "19950603", status: "Active"},
            {id2: "PN", id3: "PIN", id4: "1003", branchNameEN: "Pinklao", branchNameTH: "ปิ่นเกล้า", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.80", serverNameDB: "pinp-vbrapp01", screen: 13, kiosk: 0, seat: 25756, openDate: "19951128", status: "Active"},
            {id2: "SK", id3: "SUK", id4: "1002", branchNameEN: "Sukhumvit", branchNameTH: "สุขุมวิท", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.87", serverNameDB: "sukp-vbrapp02", screen: 8, kiosk: 0, seat: 16487, openDate: "19971207", status: "Active"},
            {id2: "RY", id3: "RAT", id4: "1001", branchNameEN: "Ratchayothin", branchNameTH: "รัชโยธิน", serverIPApp: "10.24.32.156", serverNameApp: "ratp-vbrapp02", serverIPDB: "10.24.32.103", serverNameDB: "ratp-vbrdb02", screen: 15, kiosk: 0, seat: 48238, openDate: "19981126", status: "Active"},
            {id2: "KR", id3: "KRT", id4: "3011", branchNameEN: "Korat", branchNameTH: "โคราช", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.31", serverNameDB: "krtvb01", screen: 10, kiosk: 0, seat: 13530, openDate: "20000810", status: "Active"},
            {id2: "RT", id3: "RST", id4: "1004", branchNameEN: "Rangsit", branchNameTH: "รังสิต", serverIPApp: "10.24.32.50", serverNameApp: "rstp-vbrapp02", serverIPDB: "10.24.32.9", serverNameDB: "rstp-vbrdb02", screen: 16, kiosk: 0, seat: 30399, openDate: "20020308", status: "Active"},
            {id2: "RA", id3: "RM3", id4: "1005", branchNameEN: "Rama III", branchNameTH: "พระราม 3", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.183", serverNameDB: "rm3p-vbrapp02", screen: 9, kiosk: 0, seat: 14389, openDate: "20020501", status: "Active"},
            {id2: "BN", id3: "BNA", id4: "1006", branchNameEN: "Bangna", branchNameTH: "บางนา", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.116", serverNameDB: "bnap-vbrapp02", screen: 10, kiosk: 0, seat: 8962, openDate: "20020727", status: "Active"},
            {id2: "SN", id3: "SRG", id4: "1023", branchNameEN: "Samrong", branchNameTH: "สำโรง", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.219", serverNameDB: "srgp-vbrapp02", screen: 8, kiosk: 0, seat: 10709, openDate: "20020914", status: "Active"},
            {id2: "BP", id3: "BKP", id4: "1007", branchNameEN: "Bangkapi", branchNameTH: "บางกะปิ", serverIPApp: "10.24.33.64", serverNameApp: "bkpp-vbrapp02", serverIPDB: "10.24.33.251", serverNameDB: "bkpp-vbrdb02", screen: 10, kiosk: 0, seat: 9465, openDate: "20021002", status: "Active"},
            {id2: "RM", id3: "RM2", id4: "1010", branchNameEN: "Rama II", branchNameTH: "พระราม 2", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.122", serverNameDB: "rm2p-vbrapp02", screen: 9, kiosk: 0, seat: 12422, openDate: "20021005", status: "Active"},
            {id2: "NW", id3: "NSW", id4: "1011", branchNameEN: "NakornSawan", branchNameTH: "นครสวรรค์", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.200", serverNameDB: "nswp-vbrapp02", screen: 5, kiosk: 0, seat: 9791, openDate: "20030627", status: "Active"},
            {id2: "UD", id3: "UDN", id4: "1014", branchNameEN: "UdonThani", branchNameTH: "อุดรธานี", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.73", serverNameDB: "udnp-vbrapp02", screen: 8, kiosk: 0, seat: 12348, openDate: "20031219", status: "Active"},
            {id2: "CS", id3: "CCS", id4: "1013", branchNameEN: "Chachoengsao", branchNameTH: "ฉะเชิงเทรา", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.17", serverNameDB: "ccsp-vbrapp01", screen: 5, kiosk: 0, seat: 8586, openDate: "20040701", status: "Active"},
            {id2: "FI", id3: "FSI", id4: "1015", branchNameEN: "Fashion", branchNameTH: "แฟชั่น", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.77", serverNameDB: "fsip-vbrapp01", screen: 11, kiosk: 0, seat: 11293, openDate: "20050401", status: "Active"},
            {id2: "AY", id3: "AMY", id4: "3010", branchNameEN: "AomYai", branchNameTH: "อ้อมใหญ่", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.61", serverNameDB: "amyvb03", screen: 5, kiosk: 0, seat: 7815, openDate: "20050422", status: "Active"},
            {id2: "PS", id3: "PKS", id4: "1017", branchNameEN: "Petchkasem", branchNameTH: "เพชรเกษม", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.199", serverNameDB: "pksp-vbrapp01", screen: 6, kiosk: 0, seat: 7434, openDate: "20050929", status: "Active"},
            {id2: "PG", id3: "PRG", id4: "9001", branchNameEN: "Siam Paragon", branchNameTH: "สยามพารากอน", serverIPApp: "10.24.33.231", serverNameApp: "prgp-vbrapp01", serverIPDB: "10.24.32.208", serverNameDB: "prgp-vbrdb02", screen: 16, kiosk: 0, seat: 80047, openDate: "20060127", status: "Active"},
            {id2: "HH", id3: "HUH", id4: "1018", branchNameEN: "Huahin", branchNameTH: "หัวหิน", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.209", serverNameDB: "huhp-vbrapp01", screen: 4, kiosk: 0, seat: 9307, openDate: "20060218", status: "Active"},
            {id2: "SM", id3: "SMU", id4: "1019", branchNameEN: "Samui", branchNameTH: "สมุย", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.228", serverNameDB: "smuvb01", screen: 3, kiosk: 0, seat: 4490, openDate: "20060504", status: "Active"},
            {id2: "PL", id3: "PSL", id4: "1021", branchNameEN: "Phitsanulok", branchNameTH: "พิษณุโลก", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.57", serverNameDB: "pslvb02", screen: 4, kiosk: 0, seat: 4217, openDate: "20060914", status: "Active"},
            {id2: "EP", id3: "ESP", id4: "1022", branchNameEN: "Esplanade Ratchada", branchNameTH: "เอสพลานาด รัชดา", serverIPApp: "10.24.32.85", serverNameApp: "espp-vbrapp02", serverIPDB: "10.24.33.69", serverNameDB: "espp-vbrdb02", screen: 12, kiosk: 0, seat: 25825, openDate: "20061214", status: "Active"},
            {id2: "PT", id3: "PTY", id4: "1024", branchNameEN: "Pattaya", branchNameTH: "พัทยา", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.0", serverNameDB: "ptyvb01", screen: 8, kiosk: 0, seat: 6526, openDate: "20070809", status: "Active"},
            {id2: "CN", id3: "CHN", id4: "1025", branchNameEN: "Chonburi", branchNameTH: "ชลบุรี", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.194", serverNameDB: "chnvb01", screen: 4, kiosk: 0, seat: 5100, openDate: "20071008", status: "Active"},
            {id2: "KB", id3: "KBI", id4: "1026", branchNameEN: "Krabi", branchNameTH: "กระบี่", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.78", serverNameDB: "kbip-vbrapp01", screen: 4, kiosk: 0, seat: 6852, openDate: "20071205", status: "Active"},
            {id2: "SY", id3: "SLY", id4: "1027", branchNameEN: "Salaya", branchNameTH: "ศาลายา", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.250", serverNameDB: "slyp-vbrapp01", screen: 5, kiosk: 0, seat: 5760, openDate: "20080125", status: "Active"},
            {id2: "AT", id3: "AYA", id4: "1028", branchNameEN: "Ayutthaya", branchNameTH: "อยุธยา", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.77", serverNameDB: "ayavb01", screen: 4, kiosk: 0, seat: 10678, openDate: "20080228", status: "Active"},
            {id2: "PB", id3: "PCB", id4: "1029", branchNameEN: "Petchaboon", branchNameTH: "เพชรบูรณ์", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.99", serverNameDB: "pcbvb02", screen: 4, kiosk: 0, seat: 4530, openDate: "20080425", status: "Active"},
            {id2: "TB", id3: "TYB", id4: "1031", branchNameEN: "Big C Thanyaburi", branchNameTH: "บิ๊กซีธัญบุรี", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.27", serverNameDB: "tybp-vbrapp02", screen: 4, kiosk: 0, seat: 6107, openDate: "20080808", status: "Active"},
            {id2: "NL", id3: "NKL", id4: "1032", branchNameEN: "Lotus Navanakorn", branchNameTH: "โลตัสนวนคร", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.68", serverNameDB: "nklp-vbrapp02", screen: 4, kiosk: 0, seat: 8061, openDate: "20080911", status: "Active"},
            {id2: "BL", id3: "BPL", id4: "1033", branchNameEN: "Lotus Baanpong", branchNameTH: "โลตัสบ้านโป่ง", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.1", serverNameDB: "bplvb01", screen: 5, kiosk: 0, seat: 6335, openDate: "20080925", status: "Active"},
            {id2: "SL", id3: "SNR", id4: "1034", branchNameEN: "Lotus Srinakarin", branchNameTH: "โลตัสศรีนครินทร์", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.37", serverNameDB: "snrp-vbrapp02", screen: 5, kiosk: 0, seat: 7116, openDate: "20081128", status: "Active"},
            {id2: "AM", id3: "AMK", id4: "1035", branchNameEN: "Amatanakorn", branchNameTH: "อมตะนคร", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.33.36", serverNameDB: "amkp-vbrapp01", screen: 5, kiosk: 0, seat: 6515, openDate: "20091021", status: "Active"},
            {id2: "RB", id3: "NWK", id4: "1036", branchNameEN: "Ngamwongwan-khaesai", branchNameTH: "งามวงศ์วาน-แคราย", serverIPApp: "10.24.33.178", serverNameApp: "nwkp-vbrapp02", serverIPDB: "10.24.33.201", serverNameDB: "nwkp-vbrdb02", screen: 16, kiosk: 0, seat: 25402, openDate: "20091203", status: "Active"},
            {id2: "MC", id3: "MHC", id4: "1037", branchNameEN: "Mahachai", branchNameTH: "มหาชัย", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.5", serverNameDB: "mhcp-vbrapp01", screen: 5, kiosk: 0, seat: 8419, openDate: "20100401", status: "Active"}
        ];

        const tableBody = document.querySelector('#branch-table tbody');
        const searchInput = document.getElementById('branch-search');
        const searchBtn = document.getElementById('search-btn');
        const refreshBtn = document.getElementById('refresh-btn');
        const exportBtn = document.getElementById('export-btn');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');
        const tableHeaders = document.querySelectorAll('#branch-table th');
        
        // ตรวจสอบว่าพบองค์ประกอบที่จำเป็นหรือไม่
        if (!tableBody) {
            console.error("Cannot find table body element");
            return;
        }
        
        if (!searchInput || !searchBtn || !refreshBtn || !exportBtn || !prevPageBtn || !nextPageBtn || !pageInfo) {
            console.warn("Some table elements are missing, but will continue loading data");
        }
        
        // กำหนดค่าเริ่มต้น
        let currentPage = 1;
        const rowsPerPage = 40; // เพิ่มจำนวนแถวต่อหน้าเพื่อแสดงข้อมูลทั้งหมด
        let filteredData = [...branchData];
        let sortField = 'id2';
        let sortDirection = 'asc';
        
        // ฟังก์ชันสำหรับแสดงข้อมูลในตาราง
        function renderTable() {
            console.log("Rendering table with", filteredData.length, "branches");
            
            // คำนวณจำนวนหน้าทั้งหมด
            const totalPages = Math.ceil(filteredData.length / rowsPerPage);
            
            // รีเซ็ตตารางและเพิ่มข้อมูลใหม่
            tableBody.innerHTML = '';
            
            // คำนวณจำนวนแถวที่จะแสดง
            const startIndex = (currentPage - 1) * rowsPerPage;
            const endIndex = Math.min(startIndex + rowsPerPage, filteredData.length);
            
            // เรียงข้อมูล
            const sortedData = [...filteredData].sort((a, b) => {
                // แก้ไขการเรียงลำดับให้รองรับข้อมูลตัวเลข
                const valueA = a[sortField];
                const valueB = b[sortField];
                
                // ตรวจสอบหากเป็นตัวเลข
                if (!isNaN(valueA) && !isNaN(valueB)) {
                    if (sortDirection === 'asc') {
                        return Number(valueA) - Number(valueB);
                    } else {
                        return Number(valueB) - Number(valueA);
                    }
                } else {
                    // สำหรับข้อความ
                    if (sortDirection === 'asc') {
                        return valueA > valueB ? 1 : -1;
                    } else {
                        return valueA < valueB ? 1 : -1;
                    }
                }
            });
            
            // แสดงข้อมูล
            for (let i = startIndex; i < endIndex; i++) {
                const row = sortedData[i];
                const tr = document.createElement('tr');
                
                // แก้ไขโครงสร้างตารางให้เหมือนตัวอย่าง
                tr.innerHTML = `
                    <td>${row.id2}</td>
                    <td>${row.id3}</td>
                    <td>${row.id4}</td>
                    <td>${row.branchNameEN}</td>
                    <td>${row.branchNameTH}</td>
                    <td>${row.serverIPApp || ''}</td>
                    <td>${row.serverNameApp || ''}</td>
                    <td>${row.serverIPDB || ''}</td>
                    <td>${row.serverNameDB || ''}</td>
                    <td>${row.screen}</td>
                    <td>${row.kiosk}</td>
                    <td>${row.seat}</td>
                    <td>${formatDate(row.openDate)}</td>
                    <td class="status-${row.status.toLowerCase()}">${row.status}</td>
                `;
                
                tableBody.appendChild(tr);
            }
            
            // อัปเดตข้อมูลหน้า
            if (pageInfo) {
                pageInfo.textContent = `หน้า ${currentPage} จาก ${totalPages || 1}`;
            }
            
            // อัปเดตสถานะปุ่ม
            if (prevPageBtn) prevPageBtn.disabled = currentPage === 1;
            if (nextPageBtn) nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
            
            // อัปเดตไอคอนเรียงลำดับ
            if (tableHeaders) {
                tableHeaders.forEach(th => {
                    const field = th.getAttribute('data-sort');
                    th.classList.remove('sort-asc', 'sort-desc');
                    
                    if (field === sortField) {
                        th.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
                    }
                });
            }
            
            // แสดงข้อความเมื่อไม่พบข้อมูล
            if (filteredData.length === 0) {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = '<td colspan="14" style="text-align: center; padding: 20px;">ไม่พบข้อมูลที่ตรงกับการค้นหา</td>';
                tableBody.appendChild(noDataRow);
            }
        }
        // ฟังก์ชันสำหรับค้นหา
        function searchBranches(query) {
            console.log("Searching for:", query);
            query = query.toLowerCase().trim();
            
            if (!query) {
                filteredData = [...branchData];
            } else {
                filteredData = branchData.filter(branch => 
                    branch.id2.toLowerCase().includes(query) ||
                    branch.id3.toLowerCase().includes(query) ||
                    branch.id4.includes(query) ||
                    branch.branchNameEN.toLowerCase().includes(query) ||
                    branch.branchNameTH.toLowerCase().includes(query) ||
                    (branch.serverIPDB && branch.serverIPDB.includes(query)) ||
                    (branch.serverNameDB && branch.serverNameDB.toLowerCase().includes(query))
                );
            }
            
            // รีเซ็ตหน้าเป็นหน้าแรกเมื่อค้นหา
            currentPage = 1;
            renderTable();
        }
        
        // ฟังก์ชันจัดรูปแบบวันที่
        function formatDate(dateStr) {
            if (!dateStr) return '-';
            
            try {
                const year = dateStr.substring(0, 4);
                const month = dateStr.substring(4, 6);
                const day = dateStr.substring(6, 8);
                
                return `${day}/${month}/${year}`;
            } catch (err) {
                console.error("เกิดข้อผิดพลาดในการแปลงวันที่:", err);
                return dateStr;
            }
        }
        
        // Event Listener
        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                searchBranches(searchInput.value);
            });
        }
        
        if (searchInput) {
            searchInput.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') {
                    searchBranches(searchInput.value);
                }
                
                // เพิ่ม real-time search ถ้าไม่มีข้อความในช่องค้นหา
                if (searchInput.value === '') {
                    searchBranches('');
                }
            });
        }
        
        // Event Listener สำหรับรีเฟรช
        if (refreshBtn) {
            refreshBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                filteredData = [...branchData];
                currentPage = 1;
                sortField = 'id2';
                sortDirection = 'asc';
                renderTable();
            });
        }
        
        // Event Listener สำหรับเปลี่ยนหน้า
        if (prevPageBtn) {
            prevPageBtn.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    renderTable();
                }
            });
        }
        
        if (nextPageBtn) {
            nextPageBtn.addEventListener('click', () => {
                const totalPages = Math.ceil(filteredData.length / rowsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                    renderTable();
                }
            });
        }
        
        // Event Listener สำหรับเรียงลำดับ
        if (tableHeaders) {
            tableHeaders.forEach(th => {
                th.addEventListener('click', () => {
                    const field = th.getAttribute('data-sort');
                    
                    if (!field) return; // ป้องกันกรณีที่ไม่ได้กำหนด data-sort
                    
                    if (field === sortField) {
                        // สลับการเรียงลำดับถ้าคลิกคอลัมน์เดิม
                        sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
                    } else {
                        // เปลี่ยนคอลัมน์ที่ใช้เรียงลำดับและรีเซ็ตทิศทาง
                        sortField = field;
                        sortDirection = 'asc';
                    }
                    
                    renderTable();
                });
            });
        }
        
        // Event Listener สำหรับส่งออก Excel (CSV)
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                // สร้างข้อมูลสำหรับส่งออก
                let csv = 'ID (2),ID (3),ID (4),Branch Name (EN),Branch Name (TH),ServerIP (APP),Server Name (APP),ServerIP (DB),Server Name (DB),Screen,Kiosk,Seat,Open Date,Status\n';
                
                // ใช้ข้อมูลที่กรองและเรียงลำดับแล้ว
                const sortedData = [...filteredData].sort((a, b) => {
                    const valueA = a[sortField];
                    const valueB = b[sortField];
                    
                    if (!isNaN(valueA) && !isNaN(valueB)) {
                        if (sortDirection === 'asc') {
                            return Number(valueA) - Number(valueB);
                        } else {
                            return Number(valueB) - Number(valueA);
                        }
                    } else {
                        if (sortDirection === 'asc') {
                            return valueA > valueB ? 1 : -1;
                        } else {
                            return valueA < valueB ? 1 : -1;
                        }
                    }
                });
                
                sortedData.forEach(row => {
                    csv += `${row.id2},${row.id3},${row.id4},"${row.branchNameEN}","${row.branchNameTH}",${row.serverIPApp || ''},${row.serverNameApp || ''},${row.serverIPDB || ''},${row.serverNameDB || ''},${row.screen},${row.kiosk},${row.seat},${formatDate(row.openDate)},${row.status}\n`;
                });
                
                // สร้าง Blob และดาวน์โหลด
                const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                const link = document.createElement('a');
                const url = URL.createObjectURL(blob);
                
                // กำหนดชื่อไฟล์ให้มีวันที่ปัจจุบัน
                const today = new Date();
                const formattedDate = `${today.getDate()}${String(today.getMonth() + 1).padStart(2, '0')}${today.getFullYear()}`;
                const filename = `branch_data_${formattedDate}.csv`;
                
                link.setAttribute('href', url);
                link.setAttribute('download', filename);
                link.style.visibility = 'hidden';
                
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // แสดงข้อความแจ้งเตือนเมื่อส่งออกสำเร็จ
                alert(`ส่งออกข้อมูลสำเร็จ (${filteredData.length} รายการ)`);
            });
        }
        
        // แสดงข้อมูลเริ่มต้น
        renderTable();
    }
    // Handle logout
    function handleLogout(e) {
        if (e) e.preventDefault();
        
        console.log("Logging out...");
       
        // Clear session data
        sessionStorage.removeItem('loggedIn');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('isAdmin');
       
        // Hide menu and navigation elements
        navButtons.style.display = 'none';
        if (burgerMenuElement) burgerMenuElement.style.display = 'none';
        
        // Show login link
        if (loginLink) {
            loginLink.style.display = 'block';
        }
        
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
        
        // Force page reload to clear any lingering states
        window.location.reload();
    }

    // Login handler - ปรับปรุงให้รองรับอาเรย์ข้อมูลผู้ใช้
    function handleLogin(e) {
        if (e) e.preventDefault();
        
        // Refresh references
        ({ username, password, loginForm } = getLoginInputs());
       
        // Basic validation
        if (!username || !password || !username.value || !password.value) {
            alert('Please enter both username and password');
            return;
        }
        
        // Remove any existing error or success messages
        const existingMessages = document.querySelectorAll('.error-message, .login-message');
        existingMessages.forEach(msg => msg.remove());
        
        // Add loading effect to login button
        const currentLoginBtn = document.getElementById('login-btn');
        if (currentLoginBtn) {
            currentLoginBtn.innerHTML = `
                <span style="display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px; animation: spin 1s linear infinite;">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"></path>
                    </svg>
                    กำลังเข้าสู่ระบบ...
                </span>
            `;
        }
       
        console.log("Attempting login with:", username.value, "and password:", "***");
        
        // Check credentials - แก้ไขให้ตรวจสอบจากข้อมูลในอาเรย์ users
        setTimeout(() => {
            // ค้นหาผู้ใช้จากอาเรย์
            const foundUser = users.find(user => 
                user.username === username.value && user.password === password.value
            );
            
            if (foundUser) {
                // ผู้ใช้ถูกต้อง - จัดเก็บข้อมูลล็อกอิน
                sessionStorage.setItem('loggedIn', 'true');
                sessionStorage.setItem('username', foundUser.username);
                sessionStorage.setItem('isAdmin', foundUser.isAdmin ? 'true' : 'false');
               
                // แก้ไขส่วนแสดงชื่อผู้ใช้บนแถบเมนูทันที
                updateUsernameDisplay(foundUser.username);
               
                console.log("Login successful! User found:", foundUser.username);
                
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
                console.log("Login failed. Invalid credentials.");
                
                // Reset login button 
                if (currentLoginBtn) {
                    currentLoginBtn.innerHTML = `
                        <span style="display: flex; align-items: center; justify-content: center;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                                <polyline points="10 17 15 12 10 7"></polyline>
                                <line x1="15" y1="12" x2="3" y2="12"></line>
                            </svg>
                            เข้าสู่ระบบ
                        </span>
                    `;
                }
                
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
        }, 800); // Add delay for better UX
    }
    
    // Function to update username in navigation
    function updateUsernameDisplay(username) {
        // ปรับปรุงข้อความในส่วนนำทาง - แสดงชื่อผู้ใช้แทนคำว่า ADMIN
        const navButton = document.querySelector('.nav-button');
        if (navButton && username) {
            navButton.textContent = username.toUpperCase();
            navButton.title = username; // ให้แสดงชื่อเต็มเมื่อนำเมาส์ไปวาง
        }
    }
    
    // Initialize portal function
    function initializePortal() {
        // ลบปุ่มปิดที่อาจหลงเหลืออยู่
        removeCloseButtons();
      
        // Toggle sidebar with burger menu
        if (burgerMenuElement && sidebar) {
            burgerMenuElement.addEventListener('click', function() {
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
                    if (burgerMenuElement) burgerMenuElement.classList.remove('active');
                }
               
                // Load content
                loadContent(parentMenu, itemName);
            });
        });
    }
    
    // Function to enhance login popup
    function enhanceLoginPopup() {
        const loginForm = document.querySelector('.login-form');
        if (!loginForm) return;
        
        // Check if already enhanced
        if (loginForm.querySelector('.login-background-effect')) return;
        
        // 1. Add background effects
        const backgroundEffect1 = document.createElement('div');
        backgroundEffect1.className = 'login-background-effect';
        
        const backgroundEffect2 = document.createElement('div');
        backgroundEffect2.className = 'login-background-effect';
        
        loginForm.appendChild(backgroundEffect1);
        loginForm.appendChild(backgroundEffect2);
        
        // 2. Enhance login button
        const loginBtn = document.getElementById('login-btn');
        if (loginBtn) {
            loginBtn.innerHTML = `
                <span style="display: flex; align-items: center; justify-content: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 8px;">
                        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                        <polyline points="10 17 15 12 10 7"></polyline>
                        <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    เข้าสู่ระบบ
                </span>
            `;
        }
        
        // 3. Enhance login header
        const loginHeader = loginForm.querySelector('h2');
        if (loginHeader) {
            loginHeader.innerHTML = '<span style="font-size: 24px; font-weight: normal; opacity: 0.7; display: block;">MJC Portal V.2</span>';
        }
        
        // ตรวจสอบและลบปุ่มปิดที่อาจหลงเหลืออยู่
        removeCloseButtons();
        
        // 5. Enhanced form inputs with icons
        enhanceFormInputs();
    }
    
    // Function to enhance form inputs with icons
    function enhanceFormInputs() {
        const usernameField = document.getElementById('username');
        const passwordField = document.getElementById('password');
        
        if (usernameField && !usernameField.parentNode.classList.contains('input-icon-wrapper')) {
            // Create wrapper for username
            const usernameWrapper = document.createElement('div');
            usernameWrapper.className = 'input-icon-wrapper';
            
            // Get attributes
            const usernameAttributes = {
                id: usernameField.id,
                name: usernameField.name,
                placeholder: usernameField.placeholder,
                className: usernameField.className,
                value: usernameField.value
            };
            
            // Replace with wrapper
            usernameField.parentNode.replaceChild(usernameWrapper, usernameField);
            
            // Create new input
            const newUsername = document.createElement('input');
            newUsername.type = 'text';
            newUsername.id = usernameAttributes.id;
            newUsername.name = usernameAttributes.name;
            newUsername.placeholder = usernameAttributes.placeholder;
            newUsername.className = usernameAttributes.className;
            newUsername.value = usernameAttributes.value;
            
            // Create icon
            const icon = document.createElement('span');
            icon.className = 'input-icon';
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>';
            
            // Add to wrapper
            usernameWrapper.appendChild(newUsername);
            usernameWrapper.appendChild(icon);
        }
        
        if (passwordField && !passwordField.parentNode.classList.contains('input-icon-wrapper')) {
            // Create wrapper for password
            const passwordWrapper = document.createElement('div');
            passwordWrapper.className = 'input-icon-wrapper';
            
            // Get attributes
            const passwordAttributes = {
                id: passwordField.id,
                name: passwordField.name,
                placeholder: passwordField.placeholder,
                className: passwordField.className,
                value: passwordField.value
            };
            
            // Replace with wrapper
            passwordField.parentNode.replaceChild(passwordWrapper, passwordField);
            
            // Create new input
            const newPassword = document.createElement('input');
            newPassword.type = 'password';
            newPassword.id = passwordAttributes.id;
            newPassword.name = passwordAttributes.name;
            newPassword.placeholder = passwordAttributes.placeholder;
            newPassword.className = passwordAttributes.className;
            newPassword.value = passwordAttributes.value;
            
            // Create icon
            const icon = document.createElement('span');
            icon.className = 'input-icon';
            icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
            
            // Create toggle password button
            const togglePassword = document.createElement('span');
            togglePassword.className = 'toggle-password';
            togglePassword.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
            
            // Add toggle password functionality
            togglePassword.addEventListener('click', function() {
                if (newPassword.type === 'password') {
                    newPassword.type = 'text';
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>';
                } else {
                    newPassword.type = 'password';
                    this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>';
                }
            });
            
            // Add to wrapper
            passwordWrapper.appendChild(newPassword);
            passwordWrapper.appendChild(icon);
            passwordWrapper.appendChild(togglePassword);
        }
    }
    
    // Check if user is already logged in
    function checkLoginStatus() {
        const isLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
        const storedUsername = sessionStorage.getItem('username');
        const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
        
        console.log("Checking login status:", isLoggedIn ? "Logged in" : "Not logged in");
       
        if (isLoggedIn) {
            // แสดงชื่อผู้ใช้ในแถบเมนู
            updateUsernameDisplay(storedUsername);
           
            // Show dashboard elements
            navButtons.style.display = 'flex';
            
            // ตรวจสอบขนาดหน้าจอก่อนแสดงเมนูแฮมเบอร์เกอร์
            if (window.innerWidth <= 768 && burgerMenuElement) {
                burgerMenuElement.style.display = 'block';
            } else if (burgerMenuElement) {
                burgerMenuElement.style.display = 'none';
            }
            
            // Hide login link
            if (loginLink) {
                loginLink.style.display = 'none';
            }
            
            // Show sidebar if admin
            if (isAdmin && sidebar) {
                sidebar.style.display = 'block';
                
                // Show Master submenu by default when logged in
                const defaultMenu = document.querySelector('[data-menu="master"]');
                const defaultSubmenu = document.getElementById('master-submenu');
               
                if (defaultMenu && defaultSubmenu) {
                    defaultMenu.classList.add('active');
                    defaultSubmenu.classList.add('active');
                }
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
            if (burgerMenuElement) burgerMenuElement.style.display = 'none';
            
            // Show login link
            if (loginLink) {
                loginLink.style.display = 'block';
            }
            
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
        }
    }

    // Set up event listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin);
    }
    
    // Form submit event (for login)
    const loginFormElement = document.querySelector('.login-form');
    if (loginFormElement) {
        loginFormElement.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent form submission
            handleLogin(e);
        });
    }
    
    // Logout button click handler
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
    
    // Show login popup when clicking login link
    if (loginLink) {
        loginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showLoginPopup();
        });
    }
    
    // แสดงข้อความดีบั๊กเมื่อโหลดเสร็จ
    console.log("MJC Portal V.2 initialized successfully!");
    
    // Initialize portal and check login status
    initializePortal();
    checkLoginStatus();
});

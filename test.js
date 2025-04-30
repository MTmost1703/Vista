document.addEventListener('DOMContentLoaded', function() {
    // ข้อมูลตารางสาขา
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
        {id2: "BL", id3: "BPL", id4: "1033", branchNameEN: "Lotus Baanpong", branchNameTH: "โลตัสบ้านโป่ง", serverIPApp: "", serverNameApp: "", serverIPDB: "10.24.32.1", serverNameDB: "bplvb01", screen: 5, kiosk: 0, seat: 6335, openDate: "20080925", status: "Active"}
    ];

    // เรียกใช้ฟังก์ชัน initBranchTable เมื่อโหลดหน้า
    initBranchTable();

    // ฟังก์ชันสำหรับจัดการตาราง
    function initBranchTable() {
        const tableBody = document.querySelector('#branch-table tbody');
        const searchInput = document.getElementById('branch-search');
        const searchBtn = document.getElementById('search-btn');
        const refreshBtn = document.getElementById('refresh-btn');
        const exportBtn = document.getElementById('export-btn');
        const prevPageBtn = document.getElementById('prev-page');
        const nextPageBtn = document.getElementById('next-page');
        const pageInfo = document.getElementById('page-info');
        const tableHeaders = document.querySelectorAll('#branch-table th');
        
        // กำหนดค่าเริ่มต้น
        let currentPage = 1;
        const rowsPerPage = 10;
        let filteredData = [...branchData];
        let sortField = 'id2';
        let sortDirection = 'asc';
        
        // ฟังก์ชันสำหรับแสดงข้อมูลในตาราง
        function renderTable() {
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
                
                // แก้ไขโครงสร้างตารางให้ถูกต้อง - ลบคอลัมน์วันที่ที่ซ้ำซ้อน
                tr.innerHTML = `
                    <td>${row.id2}</td>
                    <td>${row.id3}</td>
                    <td>${row.id4}</td>
                    <td>${row.branchNameEN}</td>
                    <td>${row.branchNameTH}</td>
                    <td>${row.serverIPApp || '-'}</td>
                    <td>${row.serverNameApp || '-'}</td>
                    <td>${row.serverIPDB || '-'}</td>
                    <td>${row.serverNameDB || '-'}</td>
                    <td>${row.screen}</td>
                    <td>${row.kiosk}</td>
                    <td>${row.seat}</td>
                    <td>${formatDate(row.openDate)}</td>
                    <td>${row.status}</td>
                `;
                
                tableBody.appendChild(tr);
            }
            
            // อัปเดตข้อมูลหน้า
            pageInfo.textContent = `หน้า ${currentPage} จาก ${totalPages || 1}`;
            
            // อัปเดตสถานะปุ่ม
            prevPageBtn.disabled = currentPage === 1;
            nextPageBtn.disabled = currentPage === totalPages || totalPages === 0;
            
            // อัปเดตไอคอนเรียงลำดับ
            tableHeaders.forEach(th => {
                const field = th.getAttribute('data-sort');
                th.classList.remove('sort-asc', 'sort-desc');
                
                if (field === sortField) {
                    th.classList.add(sortDirection === 'asc' ? 'sort-asc' : 'sort-desc');
                }
            });
            
            // แสดงจำนวนข้อมูลที่ค้นพบ (เพิ่มเติม)
            const resultCount = document.createElement('div');
            resultCount.className = 'result-count';
            resultCount.textContent = `พบ ${filteredData.length} รายการ`;
            
            // แสดงข้อความเมื่อไม่พบข้อมูล
            if (filteredData.length === 0) {
                const noDataRow = document.createElement('tr');
                noDataRow.innerHTML = '<td colspan="14" style="text-align: center; padding: 20px;">ไม่พบข้อมูลที่ตรงกับการค้นหา</td>';
                tableBody.appendChild(noDataRow);
            }
        }
        
        // ฟังก์ชันสำหรับค้นหา
        function searchBranches(query) {
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
        
        // Event Listener สำหรับค้นหา
        searchBtn.addEventListener('click', () => {
            searchBranches(searchInput.value);
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                searchBranches(searchInput.value);
            }
            
            // เพิ่ม real-time search ถ้าไม่มีข้อความในช่องค้นหา
            if (searchInput.value === '') {
                searchBranches('');
            }
        });
        
        // Event Listener สำหรับรีเฟรช
        refreshBtn.addEventListener('click', () => {
            searchInput.value = '';
            filteredData = [...branchData];
            currentPage = 1;
            sortField = 'id2';
            sortDirection = 'asc';
            renderTable();
        });
        
        // Event Listener สำหรับเปลี่ยนหน้า
        prevPageBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderTable();
            }
        });
        
        nextPageBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(filteredData.length / rowsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderTable();
            }
        });
        
        // Event Listener สำหรับเรียงลำดับ
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
        
        // Event Listener สำหรับส่งออก Excel (CSV)
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
        
        // เพิ่ม Event Listener สำหรับ keydown เพื่อนำทางด้วยปุ่มลูกศร
        document.addEventListener('keydown', function(e) {
            // ปุ่มลูกศรซ้าย = หน้าก่อนหน้า
            if (e.key === 'ArrowLeft' && !prevPageBtn.disabled) {
                prevPageBtn.click();
            }
            
            // ปุ่มลูกศรขวา = หน้าถัดไป
            if (e.key === 'ArrowRight' && !nextPageBtn.disabled) {
                nextPageBtn.click();
            }
        });
        
        // แสดงข้อมูลเริ่มต้น
        renderTable();
    }
});
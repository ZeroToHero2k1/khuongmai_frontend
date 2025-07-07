import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';

import './App.css'; // Chứa các class CSS bổ sung như ms-80, ms-250, transition-all
import Footer from './navbar/Footer';

const App: React.FC = () => {
  // Trạng thái sidebar trên desktop: thu gọn hay không
  const [collapsed, setCollapsed] = useState(false);

  // Trạng thái sidebar trên mobile: có đang mở không
  const [visibleOnMobile, setVisibleOnMobile] = useState(false);

  // Toggle sidebar trên desktop (thu gọn/mở rộng)
  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  // Toggle sidebar trên mobile khi nhấn nút ☰
  const handleToggleMobileSidebar = () => {
    setVisibleOnMobile(!visibleOnMobile);
  };

  // Đóng sidebar khi click vào overlay trên mobile
  const handleCloseMobileSidebar = () => {
    setVisibleOnMobile(false);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar đầu trang */}
      <Navbar onMobileToggle={handleToggleMobileSidebar} />

      {/* Phần nội dung chính + Sidebar */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar bên trái */}
        <Sidebar
          collapsed={collapsed}
          visibleOnMobile={visibleOnMobile}
          onToggle={handleToggleSidebar}
          onCloseMobile={handleCloseMobileSidebar}
        />

        {/* Nội dung chính */}
        <main
          className={`flex-grow-1 p-4 transition-all ${
            collapsed ? 'ms-80' : 'ms-250'
          }`}
        >
          <h3>Chào mừng bạn đến hệ thống CRM</h3>
          <p>Chỗ này sẽ là chỗ mấy cái chart thống kê báo cáo doanh thu</p>
        </main>
      </div>

      {/* Footer cuối trang */}
      <Footer/>
    </div>
  );
};

export default App;
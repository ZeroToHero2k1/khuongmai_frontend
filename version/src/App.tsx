import React, { useState } from 'react';
import Sidebar from './sidebar/Sidebar';
import Navbar from './navbar/Navbar';

import './App.css'; // Chứa các class CSS bổ sung như ms-80, ms-250, transition-all
import Footer from './navbar/Footer';
import { Route, Routes } from 'react-router-dom';
import RevenueChart from './pages/RevenueChart';
import CustomerPage from './pages/CustomerPage';
import Employee from './pages/Employee';
import Order from './pages/Order';

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
          <Routes>
            <Route path='/' element={<RevenueChart/>}></Route>
            <Route path='/customers' element={<CustomerPage/>}></Route>
            <Route path='/employees' element={<Employee/>}></Route>
            <Route path='/orders' element={<Order/>}></Route>
          </Routes>


        </main>
      </div>

      {/* Footer cuối trang */}
      <Footer/>
    </div>
  );
};

export default App;
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import Footer from '../navbar/Footer';
import { Outlet, useNavigate } from 'react-router-dom';
import '../App.css';
import { getAccessToken, isHetHanToken } from '@/utils/auth';
import { Navigate } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [visibleOnMobile, setVisibleOnMobile] = useState(false);

  const handleToggleSidebar = () => setCollapsed(!collapsed);
  const handleToggleMobileSidebar = () => setVisibleOnMobile(!visibleOnMobile);
  const handleCloseMobileSidebar = () => setVisibleOnMobile(false);
  const navigator=useNavigate();
  const accessToken = getAccessToken();
  useEffect(()=>{
    const interval=setInterval(()=>{
      if (accessToken && isHetHanToken(accessToken)) {
        alert("Phiên đăng nhập của bạn đã hết hạn, vui lòng đăng nhập lại để tiếp tục");
        navigator("/login");
      }
    },1000)
    return ()=> clearInterval(interval);
  },[]);
  if (!accessToken) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar onMobileToggle={handleToggleMobileSidebar} />
      <div className="d-flex flex-grow-1">
        <Sidebar
          collapsed={collapsed}
          visibleOnMobile={visibleOnMobile}
          onToggle={handleToggleSidebar}
          onCloseMobile={handleCloseMobileSidebar}
        />
        <main
          className={`flex-grow-1 p-4 transition-all ${
            collapsed ? 'ms-80' : 'ms-250'
          }`}
        >
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
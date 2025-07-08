import React,{useState} from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';


// Định nghĩa Props truyền từ App
interface Props {
  collapsed: boolean;
  visibleOnMobile: boolean;
  onToggle: () => void;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<Props> = ({ collapsed, visibleOnMobile, onToggle }) => {
  // Trạng thái để mở/đóng phần "Cài đặt"
  const [settingOpen, setSettingOpen] = useState(false);
  const [stockOpen, setStockOpen] = useState(false);
  // Style cho sidebar để đổi chiều rộng khi thu gọn
  const sidebarStyle: React.CSSProperties = {
    width: collapsed ? 80 : 250,
    transition: 'width 0.3s',
  };

  return (
    <>
      {/* Overlay cho mobile (hiện khi sidebar mở trên màn hình nhỏ) */}
      {/* {visibleOnMobile && (
        <div className="sidebar-overlay d-md-none" onClick={onCloseMobile}></div>
      )} */}

      {/* Sidebar */}
      <div
        className={`sidebar bg-dark text-white p-2 vh-100 d-flex flex-column position-fixed ${
          visibleOnMobile ? 'd-block' : 'd-none d-md-flex'
        }`}
        style={sidebarStyle}
      >
        {/* Header: Tên hệ thống + nút thu gọn/mở rộng */}
        <div className="d-flex justify-content-between align-items-center mb-3">
            {!collapsed && (<span className="fw-bold">Thanh công cụ</span>)}
          
          <button className="ms-3 btn btn-sm btn-outline-light" onClick={onToggle}>
            {collapsed ? '☰' : '×'}
          </button>
        </div>

        {/* Danh sách menu cha */}
        <ul className="nav nav-pills flex-column">
          <li className="nav-item mb-2">
            {/* Dòng "Cài đặt" có thể click để mở submenu */}
            <div
              className="nav-link text-white d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => setStockOpen(!stockOpen)}
            >
              <i className="me-2">🏬</i>
              {!collapsed && (
                <div className="d-flex justify-content-between w-100">
                  <span>Quản lý kho hàng</span>
                  {/* Hiển thị icon xổ xuống hoặc sang ngang */}
                  <i className={`bi ${stockOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                </div>
              )}
            </div>

            {!collapsed && stockOpen && (
              <ul className="submenu list-unstyled ps-3 py-2 rounded">
                <li className="mt-2">
                  <a href="#" className="nav-link text-white p-0">Nhập kho</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="nav-link text-white p-0">Xuất kho</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="nav-link text-white p-0">Chuyển kho</a>
                </li>
              </ul>
            )}
          </li>
          {/* Mục 1 */}
          <li className="nav-item mb-2">
            <Link to="/customers" className="nav-link text-white">
              <i className="me-2">👤</i>
              {!collapsed && 'Quản lý khách hàng'}
            </Link>
          </li>

          {/* Mục 2 */}
          <li className="nav-item mb-2">
            <a href="#" className="nav-link text-white">
              <i className="me-2">📦</i>
              {!collapsed && 'Quản lý sản phẩm'}
            </a>
          </li>

          {/* Mục 3 */}
          <li className="nav-item mb-2">
            <Link to="/orders" className="nav-link text-white">
              <i className="me-2">📝</i>
              {!collapsed && 'Quản lý đơn hàng'}
            </Link>
          </li>

          {/* Mục 4 */}
          <li className="nav-item mb-2">
            <Link to="/employees" className="nav-link text-white">
              <i className="me-2">🧑‍💼</i>
              {!collapsed && 'Quản lý nhân viên'}
            </Link>
          </li>

          {/* Mục 5: Cài đặt (mục có submenu con) */}
          <li className="nav-item mb-2">
            {/* Dòng "Cài đặt" có thể click để mở submenu */}
            <div
              className="nav-link text-white d-flex align-items-center"
              style={{ cursor: 'pointer' }}
              onClick={() => setSettingOpen(!settingOpen)}
            >
              <i className="me-2">⚙️</i>
              {!collapsed && (
                <div className="d-flex justify-content-between w-100">
                  <span>Cài đặt</span>
                  {/* Hiển thị icon xổ xuống hoặc sang ngang */}
                  <i className={`bi ${settingOpen ? 'bi-chevron-down' : 'bi-chevron-right'}`}></i>
                </div>
              )}
            </div>

            {/* Các mục con của "Cài đặt" */}
            {!collapsed && settingOpen && (
              <ul className="submenu list-unstyled ps-3 py-2 rounded">
                <li className="mt-2">
                  <a href="#" className="nav-link text-white p-0">Cài đặt quyền truy cập</a>
                </li>
                <li className="mt-2">
                  <a href="#" className="nav-link text-white p-0">Cài đặt quyền tài khoản</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
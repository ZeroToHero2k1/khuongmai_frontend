import React from 'react';

interface Props {
  onMobileToggle: () => void;
}

const Navbar: React.FC<Props> = ({ onMobileToggle }) => {
  return (
    <nav className="navbar navbar-light bg-light px-4 d-flex justify-content-between shadow-sm">
      {/* Nút mở sidebar trên mobile */}
      <button className="btn btn-outline-secondary d-md-none" onClick={onMobileToggle}>
        ☰
      </button>

      {/* Tiêu đề */}
      <span className="navbar-brand mb-0 h6">Khương Mai</span>

      {/* Dropdown tài khoản */}
      <div className="dropdown">
        {/* Nút dropdown chính */}
        <a
          href="#"
          className="nav-link text-white dropdown-toggle d-flex align-items-center bg-dark rounded px-3 py-2"
          id="dropdownMyAccount"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle me-2"></i>
          <span>Admin</span>
        </a>

        {/* Danh sách menu con */}
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMyAccount">
          <li>
            <a className="dropdown-item" href="#">Thông tin của tôi</a>
          </li>
          <li>
            <a className="dropdown-item" href="#">Đăng xuất</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

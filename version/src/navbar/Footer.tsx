import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-white mt-auto">
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
        {/* Bên trái - thông tin bản quyền */}
        <span className="text-center text-md-start small">
          © {new Date().getFullYear()} Xưởng May Khương Mai. All rights reserved.
        </span>

        {/* Bên phải - liên kết */}
        <ul className="nav mt-2 mt-md-0">
          <li className="nav-item">
            <a href="#" className="nav-link text-white small px-2">Chính sách</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white small px-2">Liên hệ</a>
          </li>
          <li className="nav-item">
            <a href="#" className="nav-link text-white small px-2">Hỗ trợ</a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

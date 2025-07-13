import { getMyInfo, logOut } from '@/services/authService';
import { clearAccessToken, getAccessToken } from '@/utils/auth';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  onMobileToggle: () => void;
}

const Navbar: React.FC<Props> = ({ onMobileToggle }) => {
  const[username,setUserName]=useState<string>("");
  const navigator=useNavigate();
  const fetchMyInfo=async()=>{
    try{
      const data=await getMyInfo();
      setUserName(data.username);
    }
    catch{
      setUserName("Unknown");
    }
  }
  useEffect(()=>{
    fetchMyInfo();
  });


  const handleLogOut = async () => {
    const token = getAccessToken() ?? "";
    try{
      const message=await logOut(token);
      clearAccessToken();
      navigator("/login");
      alert(message);
    }catch(error:unknown){
      if(error instanceof Error){
        alert(error);
      }
      else{
        alert("Đăng xuất thất bại, vui lòng thử lại sau");
      }
    }
  }

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
          className="nav-link text-white dropdown-toggle d-flex align-items-center rounded px-3 py-2"
          id="dropdownMyAccount"
          role="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          style={{background: "linear-gradient(to bottom right,rgb(90, 176, 216),rgb(45, 73, 163))"}}
        >
          <i className="bi bi-person-circle me-2"></i>
          <span>{username}</span>
        </a>

        {/* Danh sách menu con */}
        <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMyAccount">
          <li>
            <a className="dropdown-item" href="#">Thông tin của tôi</a>
          </li>
          <li>
            <a className="dropdown-item" onClick={handleLogOut} href="#">Đăng xuất</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

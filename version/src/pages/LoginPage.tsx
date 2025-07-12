import { useState } from "react";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
// import your asset(s) correctly, for example:
import logo from "../assets/logo-khuongmai-seo-social-1200x630-1.jpg";

const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" })
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(form.username, form.password); // thêm await
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      }
      else {
        setError("Đăng nhập thất bại, vui lòng kiểm tra lại tài khoản hoặc mật khẩu");
      }
    }
  };


  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(to bottom right,rgb(90, 176, 216),rgb(45, 73, 163))",
      }}
    >
      <div
        className="p-4 rounded shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#fff",
        }}
      >
        <div className="text-center mb-4">
          <img
            src={logo} // đổi thành logo bạn cần
            alt="Logo"
            style={{ height: 60 }}
          />
          <h5 className="mt-2 fw-bold text-primary">Đăng nhập hệ thống</h5>
        </div>
        <form onSubmit={handleSubmit}>
          {error && <p className="alert alert-danger">{error}</p>}
          <div className="form-group mb-3">
            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Tên đăng nhập"
              required
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Mật khẩu"
              required
            />
          </div>
          <div className="form-check mb-3">
            <input className="form-check-input" type="checkbox" id="remember" />
            <label className="form-check-label" htmlFor="remember">
              Nhớ thông tin đăng nhập
            </label>
          </div>
          <button type="submit" className="btn btn-primary w-100">
            ĐĂNG NHẬP
          </button>
          <hr />
          <Link to="/sign" className="btn btn-success w-100">Tạo tài khoản mới</Link>
        </form>
      </div>
    </div>

  );

}

export default LoginPage
import { signUp } from "@/services/authService";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo-khuongmai-seo-social-1200x630-1.jpg";
import SuccessModal from "../components/SuccessModal";


const SignUpPage = () => {
    const [form, setForm] = useState({ name: "", phone: "", username: "", password: "", confirmPassword: "" })
    const [error, setError] = useState("");
    const navigator = useNavigate();

    const [showModal, setShowModal] = React.useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setError("Không trùng password, mời nhập lại");
            setForm(prev => ({ ...prev, confirmPassword: "" }));
            return;
        }
        try {
            await signUp(form.name, form.phone, form.username, form.password);
            setShowModal(true);

            setTimeout(() => {
                navigator("/");
            }, 3000)
        }
        catch (error: unknown) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError("Đã xảy ra lỗi, vui lòng thử lại.");
            }
        }
    }

    return (
        <>
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
                        maxWidth: "450px",
                        background: "#fff",
                    }}
                >
                    <div className="text-center mb-4">
                        <img
                            src={logo} // đổi thành logo bạn cần
                            alt="Logo"
                            style={{ height: 60 }}
                        />
                        <h5 className="mt-2 fw-bold text-primary">Tạo tài khoản mới</h5>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {error && <p className="alert alert-danger">{error}</p>}
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Họ và tên"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="phone"
                                name="phone"
                                className="form-control"
                                placeholder="Số điện thoại"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Tên đăng nhập"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <input
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Mật khẩu"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group mb-4">
                            <input
                                type="password"
                                name="confirmPassword"
                                className="form-control"
                                placeholder="Nhập lại mật khẩu"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100">
                            ĐĂNG KÝ
                        </button>
                        <div className="text-center mt-3">
                            <small>Đã có tài khoản? <a href="/login">Đăng nhập</a></small>
                        </div>
                    </form>
                </div>
            </div>
            <SuccessModal show={showModal} onClose={() => setShowModal(false)} />
        </>
    )



}

export default SignUpPage;
import { getMyInfo, updateMyInfo } from "@/services/authService";
import { useEffect, useState } from "react";
import type { Department, Employee } from "@/models";
import { searchByDepartmentName } from "@/services/departmentService";
import { debounce } from "lodash";
import { useNavigate } from "react-router-dom";

const MyProfilePage: React.FC = () => {
    const [departmentList, setDepartmentList] = useState<string[]>([]);
    const [showDepart, setShowDepart] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const navigate=useNavigate();
    const [form, setForm] = useState<Employee>({
        name: "",
        phone: "",
        departmentName: "",
        dateJoined: "",
        imageUrl: "",
        roleName:"",
    })
    async function getData() {
        const result = await getMyInfo();

        setForm({
            name: result.user.employee.name,
            phone: result.user.employee.phone,
            departmentName: result.departmentName,
            dateJoined: result.user.employee.dateJoined,
            roleName:result.roleName,
            imageUrl: result.user.employee.imageUrl
        })
    }

    const getDepartData = debounce(async (query: string) => {
        if (!query) {
            setDepartmentList([]);
            setShowDepart(false);
            return;
        } else {
            try {
                const res = await searchByDepartmentName(query);
                setDepartmentList(res.map((d: Department) => d.name))
                setShowDepart(true);
            } catch {
                alert("Lỗi tìm kiếm phòng ban");
            }
        }

    }, 300)


    useEffect(() => {
        getData();
    }, [])

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === "departmentName") {
            getDepartData(e.target.value);
        }
        if (e.target.name === "imageUrl") {
            const file = e.target.files?.[0];

            if (file) {
                setSelectedFile(file);
                const reader = new FileReader();
                reader.onload = () => {
                    if (typeof reader.result === "string") {
                        setForm({ ...form, imageUrl: reader.result })
                    }
                }
                reader.readAsDataURL(file);
            }
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); 
        try{
            const payload = {
                name: form.name,
                phone: form.phone,
                departmentName: form.departmentName || "",
            }
            await updateMyInfo(payload, selectedFile ?? undefined);
            alert("Cập nhật thành công");
            navigate("/myprofile")
        }catch(e:unknown){
            if(e instanceof Error){
                alert("Lỗi: " + e.message);
            }
            else{
                alert("Cập nhật thất bại");
            }
        }
    }

    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center">
            <div className="container my-4">
                <div className="row">
                    {/* ẢNH BÊN TRÁI */}
                    <div className="col-md-4 text-center">
                        <img
                            src={form.imageUrl || 'https://i.pinimg.com/1200x/8f/1c/a2/8f1ca2029e2efceebd22fa05cca423d7.jpg'}
                            alt="Avatar"
                            className="img-fluid rounded-circle mb-3"
                            style={{ width: 200, height: 200, objectFit: "cover" }}
                        />
                        <div className="mt-5">
                            <input
                                type="file"
                                name="imageUrl"
                                accept="image/*"
                                className="form-control"
                                onChange={handleChangeForm}
                            />
                        </div>
                        {/* <button className="btn btn-primary mt-2">Thay đổi hình ảnh</button> */}
                    </div>

                    {/* THÔNG TIN BÊN PHẢI */}
                    <div className="col-md-8">
                        <div className="mb-3">
                            <label className="form-label">Họ và tên</label>
                            <input
                                name="name"
                                className="form-control"
                                value={form.name}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Số điện thoại</label>
                            <input
                                name="phone"
                                className="form-control"
                                value={form.phone}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Trụ sở làm việc</label>
                            <input
                                name="departmentName"
                                className="form-control"
                                value={form.departmentName}
                                onChange={handleChangeForm}
                                onClick={() => {
                                    setForm({ ...form, departmentName: "" })
                                    if (departmentList.length > 0) setShowDepart(true);
                                }}
                                onBlur={() => {
                                    setTimeout(() => setShowDepart(false), 150)
                                }}
                                autoComplete="off"
                            />
                            {showDepart && departmentList.length > 0 && (
                                <ul className="dropdown-menu dropdown-menu-end list-group w-50 zindex-dropdown" style={{ zIndex: 1000 }}>
                                    {departmentList.map((s, i) => (
                                        <li className="dropdown-item" key={i} style={{ cursor: "pointer" }} onClick={() => {
                                            setForm({ ...form, departmentName: s })
                                            setShowDepart(false);
                                        }}>{s}</li>
                                    ))}
                                </ul>
                            )}
                            <ul></ul>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Ngày vào làm</label>
                            <input
                                className="form-control"
                                value={form.dateJoined}
                                disabled
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Chức vụ</label>
                            <input
                                className="form-control"
                                value={form.roleName}
                                disabled
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Cập nhật thông tin</button>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default MyProfilePage;
import { useEffect, useState } from "react";
import type { Employee } from "@/models";
import { showAllDepartment } from "@/services/departmentService";
import { useNavigate, useParams } from "react-router-dom";
import { getEmployeeById, updateEmployee } from "@/services/employeeService";
import type { Department } from "@/models";

const EmployeeEditPage: React.FC = () => {
    const navigator = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [departList, setDepartmentList] = useState<Department[]>([])
    const [form, setForm] = useState<Employee>({
        name: "",
        phone: "",
        departmentId: "",
        departmentName: "",
        dateJoined: "",
        status: undefined
    })
    // async function getData() {
    //     if (!id) {
    //         alert("Không tìm thấy ID nhân viên.");
    //         return;
    //     }
    //     try {
    //         const result = await getEmployeeById(id);
    //         setForm({
    //             name: result.name,
    //             phone: result.phone,
    //             departmentId: result.departmentId,
    //             departmentName: result.departmentName,
    //             dateJoined: result.dateJoined,
    //             status: result.status
    //         })
    //     } catch {
    //         alert("Lỗi tìm kiếm phòng ban");
    //     }
    // }

    // const getAllDepart = async () => {
    //     const allDepartments = await showAllDepartment();
    //     const filtered = allDepartments.filter((p: Department) => p.id !== form.departmentId);
    //     setDepartmentList(filtered);
    // };


    useEffect(() => {
        const fetchAll = async () => {
            try {
                if (!id) return;

                const result = await getEmployeeById(id);

                // cập nhật form
                setForm({
                    name: result.name,
                    phone: result.phone,
                    departmentId: result.departmentId,
                    departmentName: result.departmentName,
                    dateJoined: result.dateJoined,
                    status: result.status,
                });

                // lấy danh sách phòng ban & lọc
                const allDepartments = await showAllDepartment();
                setDepartmentList(allDepartments);
            } catch (err) {
                if (err instanceof Error)
                    alert("Lỗi lấy dữ liệu nhân viên " + err);
            }
        };
        fetchAll();

    }, [id])

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        if (e.target.name === "status" && e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
            setForm({ ...form, status: e.target.checked });
        } else {
            setForm({ ...form, [e.target.name]: e.target.value });
        }


    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            await updateEmployee(id ?? "", form.name, form.phone, form.departmentId ?? "", form.dateJoined ?? "", form.status)
            console.log(form.departmentId)
            alert("Cập nhật thành công")
            navigator("/employees")
        } catch (err) {
            if (err instanceof Error)
                alert("Lỗi lấy dữ liệu nhân viên " + err);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center">
            <div className="container my-4">
                <div className="row">


                    {/* THÔNG TIN BÊN PHẢI */}
                    <div className="col-md-12">
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
                            <label className="form-label">Ngày vào làm</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dateJoined"
                                value={form.dateJoined}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Phòng ban</label>
                            <select
                                name="departmentId"
                                className="form-select"
                                value={form.departmentId}
                                onChange={handleChangeForm}
                            >
                                <option value="" disabled hidden>-- Chọn phòng ban --</option>

                                {departList.map((d) => (
                                    <option key={d.id} value={d.id}>
                                        {d.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3 form-check">
                            <input
                                name="status"
                                type="checkbox"
                                className="form-check-input"
                                id="statusCheck"
                                checked={form.status}
                                onChange={handleChangeForm}
                            />
                            <label className="form-check-label" htmlFor="statusCheck">
                                Còn làm việc
                            </label>
                        </div>
                        <button type="submit" className="float-end btn btn-success">Cập nhật thông tin</button>

                    </div>
                </div>
            </div>
        </form>
    )
}

export default EmployeeEditPage
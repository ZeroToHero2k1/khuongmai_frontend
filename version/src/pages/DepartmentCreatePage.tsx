import type { Department } from "@/models"
import { createDepartment } from "@/services/departmentService"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const DepartmentCreatePage: React.FC = () => {
    const navigate=useNavigate();
    const [form, setForm] = useState<Department>({ name: "" })

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e: React.FormEvent) => {
        try {
            e.preventDefault();
            await createDepartment(form.name)
            alert("Tạo trụ sở thành công")
            navigate("/department")
            
        }catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tạo kho hàng")
            }
        }
    }
    return (
            <form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center">
                <div className="container my-4">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="mb-3">
                                <label className="form-label">Tên trụ sở</label>
                                <input
                                    name="name"
                                    className="form-control"
                                    value={form.name}
                                    onChange={handleChangeForm}
                                />
                            </div>
                            <button type="submit" className="float-end btn btn-success">Tạo</button>

                        </div>
                    </div>
                </div>
            </form>
        )
    }

    export default DepartmentCreatePage
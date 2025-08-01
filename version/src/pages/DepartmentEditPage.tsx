import type { Department } from "@/models"
import { findDepartmentById, updateDepartment } from "@/services/departmentService"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const DepartmentEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form, setForm] = useState<Department>({ name: "" })

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            if (id) {
                e.preventDefault();
                await updateDepartment(id, form.name)
                alert("Cập nhật trụ sở thành công")
                navigate("/department")
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tạo kho hàng")
            }
        }
    }
    const getData = async (id: string) => {
        try {
            const res = await findDepartmentById(id)
            setForm({ name: res.result.name })
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tạo kho hàng")
            }
        }
    }
    useEffect(() => {
        if (id) {
            getData(id)
        }
    }, [])
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

export default DepartmentEditPage
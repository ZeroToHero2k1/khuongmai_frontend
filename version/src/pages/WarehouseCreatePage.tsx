import type { Warehouse } from "@/models";
import { createWarehouse } from "@/services/warehouseService";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

const WarehouseCreatePage: React.FC = () => {
    const [form, setForm] = useState<Warehouse>({ name: "", location: "", managerName: "", phone: "" })
    const navigator=useNavigate();

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await createWarehouse(form.name, form.location ?? "", form.managerName ?? "", form.phone ?? "")
            alert("Tạo kho hàng thành công");
            navigator("/warehouse");
        } catch (err: unknown) {
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
                            <label className="form-label">Tên kho</label>
                            <input
                                name="name"
                                className="form-control"
                                value={form.name}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Địa chỉ</label>
                            <input
                                name="location"
                                className="form-control"
                                value={form.location}
                                onChange={handleChangeForm}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Tên người quản lý</label>
                            <input
                                name="managerName"
                                className="form-control"
                                value={form.managerName}
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


                        <button type="submit" className="float-end btn btn-success">Tạo</button>

                    </div>
                </div>
            </div>
        </form>
    );
}

export default WarehouseCreatePage
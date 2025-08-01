import type { Warehouse } from "@/models";
import {  getWarehouseById, updateWarehouse } from "@/services/warehouseService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const WarehouseEditPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<Warehouse>({ name: "", location: "", managerName: "", phone: "" })
    const navigator = useNavigate();

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        try {
            e.preventDefault()
            await updateWarehouse(id??"",form.name, form.location ?? "", form.managerName ?? "", form.phone ?? "")
            alert("Sửa kho hàng thành công");
            navigator("/warehouse");
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi cập nhật kho hàng")
            }
        }
    }
    const getData=async()=>{
        try {
            if (!id) return;
            const res=await getWarehouseById(id);
            setForm(res.result);
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tải dữ liệu kho hàng")
            }
        }
    }

    useEffect(() => {
        getData();
    }, [])

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

export default WarehouseEditPage
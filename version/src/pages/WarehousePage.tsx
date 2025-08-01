import PhanTrang from "@/components/PhanTrang";
import type { Warehouse } from "@/models";
import { deleteWarehouse, searchWarehouses } from "@/services/warehouseService";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const WarehousePage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<Warehouse>({ name: "", location: "", managerName: "", phone: "" });
    const [warehouseList, setWarehouseList] = useState<Warehouse[]>([]);
    const [pageInfo, setPageInfo] = useState({
        currentPage: 0,
        totalPages: 0,
        pageSize:0
    })

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const res = await searchWarehouses(form.name ?? "", form.managerName ?? "", form.phone ?? "", pageInfo.currentPage)
            setWarehouseList(res.content)
            setPageInfo({ currentPage: res.number, totalPages: res.totalPages,pageSize:res.size })
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tải giao diện")
            }
        }
    }

    const handlePage= async(page:number)=>{
        try {
            const res = await searchWarehouses(form.name ?? "", form.managerName ?? "", form.phone ?? "", page)
            setWarehouseList(res.content)
            setPageInfo({ currentPage: res.number, totalPages: res.totalPages ,pageSize:res.size})
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tải giao diện")
            }
        }
    }
    const handleDelete=async (id: string)=>{
        try{
            await deleteWarehouse(id)
            handlePage(0)
        }
        catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tải giao diện")
            }
        }
    }
    useEffect(()=>{
        handlePage(0);
    },[])
    return (
        <div className="container mt-4">
            {/* Tiêu đề và nút thêm */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Danh sách kho hàng</h2>
                <Link to="/warehouse/create" className="btn btn-primary">+ Thêm kho hàng</Link>
            </div>

            {/* Bộ lọc tìm kiếm */}
            <Form className="mb-3" onSubmit={handleSubmit}>
                <Row className="align-items-end">
                    <Col md={2}>
                        <Form.Label>Tên</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Tên kho" value={form.name} onChange={handleChangeForm} />
                    </Col>
                    <Col md={2}>
                        <Form.Label>Tên người quản lý</Form.Label>
                        <Form.Control name="managerName" type="text" placeholder="Tên quản lý" value={form.managerName} onChange={handleChangeForm} />
                    </Col>
                    <Col md={2}>
                        <Form.Label>Điện thoại</Form.Label>
                        <Form.Control name="phone" type="text" placeholder="SĐT" value={form.phone} onChange={handleChangeForm} />
                    </Col>
                    <Col md={2} className="text-center">
                        <Button type="submit" variant="success" className="w-100">
                            Tìm kiếm
                        </Button>
                    </Col>
                </Row>
            </Form>

            {/* Bảng danh sách */}
            <Table striped bordered hover responsive>
                <thead>
                    <tr className="text-center">
                        <th>STT</th>
                        <th>Tên kho</th>
                        <th>Tên quản lý</th>
                        <th>Địa chỉ</th>
                        <th>Số điện thoại</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {warehouseList.length > 0 ? (
                        warehouseList.map((warehouse,index) => (
                            <tr key={warehouse.id}>
                                <td className="text-center">{pageInfo.currentPage*pageInfo.pageSize+index+1}</td>
                                <td>{warehouse.name}</td>
                                <td>{warehouse.managerName}</td>
                                <td>{warehouse.location}</td>
                                <td>{warehouse.phone}</td>

                                <td className="text-center">
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => {
                                            navigate(`/warehouse/edit/${warehouse.id}`);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    { warehouse.existExportReceipts||warehouse.existImportReceipts?"":(<Button size="sm" variant="danger" onClick={() => warehouse.id && handleDelete(warehouse.id)}>Xóa</Button>)
                                    }


                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="text-center text-muted">Không có kho hàng nào</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Phân trang */}
            <PhanTrang currentPage={pageInfo.currentPage} totalPages={pageInfo.totalPages} onPageChange={handlePage} />
        </div>
    )
}

export default WarehousePage
import PhanTrang from "@/components/PhanTrang";
import type { Department } from "@/models";
import { deleteDepartment, searchByDepartmentName } from "@/services/departmentService";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";


const DepartmentPage: React.FC = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState<Department>({ name: "" })
    const [departmentList, setDepartmentList] = useState<Department[]>([])
    const [pageInfo, setPageInfo] = useState({ currentPage: 0, totalPages: 0, pageSize: 0 })

    const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const res = await searchByDepartmentName(form.name ?? "", pageInfo.currentPage)
            setDepartmentList(res.content)
            setPageInfo({ currentPage: res.number, totalPages: res.totalPages, pageSize: res.size })
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tải giao diện")
            }
        }
    }

    const handlePage=async(page: number)=>{
        try {
            const res = await searchByDepartmentName(form.name ?? "",page)
            setDepartmentList(res.content)
            setPageInfo({ currentPage: res.number, totalPages: res.totalPages, pageSize: res.size })
        } catch (err: unknown) {
            if (err instanceof Error) {
                alert("Lỗi " + err.message)
            }
            else {
                alert("Lỗi khi tải giao diện")
            }
        }
    }

    const handleDelete=async(id: string)=>{
        try {
            await deleteDepartment(id)
            alert("Xóa thành công trụ sở")
            handlePage(pageInfo.currentPage)
        }catch (err: unknown) {
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
                <h2>Danh sách trụ sở</h2>
                <Link to="/department/create" className="btn btn-primary">+ Thêm trụ sở</Link>
            </div>

            {/* Bộ lọc tìm kiếm */}
            <Form className="mb-3" onSubmit={handleSubmit}>
                <Row className="align-items-end">
                    <Col md={2}>
                        <Form.Label>Tên</Form.Label>
                        <Form.Control name="name" type="text" placeholder="Tên trụ sở" value={form.name} onChange={handleChangeForm} />
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
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {departmentList.length > 0 ? (
                        departmentList.map((department, index) => (
                            <tr key={department.id}>
                                <td className="text-center">{pageInfo.currentPage * pageInfo.pageSize + index + 1}</td>
                                <td>{department.name}</td>

                                <td className="text-center">
                                    <Button
                                        size="sm"
                                        variant="warning"
                                        className="me-2"
                                        onClick={() => {
                                            navigate(`/department/edit/${department.id}`);
                                        }}
                                    >
                                        Sửa
                                    </Button>
                                    <Button size="sm" variant="danger" onClick={() => department.id && handleDelete(department.id)}>Xóa</Button>



                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="text-center text-muted">Không có kho hàng nào</td>
                        </tr>
                    )}
                </tbody>
            </Table>

            {/* Phân trang */}
            <PhanTrang currentPage={pageInfo.currentPage} totalPages={pageInfo.totalPages} onPageChange={handlePage} />
        </div>
    )
}

export default DepartmentPage
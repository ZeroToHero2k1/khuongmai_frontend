import PhanTrang from "@/components/PhanTrang";
import type { Department, Employee } from "@/models";
import { showAllDepartment } from "@/services/departmentService";
import { deleteEmployee, getEmployees } from "@/services/employeeService";
import React, { useEffect, useState } from "react";
import { Button, Table, Form, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


const EmployeePage: React.FC = () => {
  const navigate = useNavigate();
  const [departList, setDepartmentList] = useState<Department[]>([])
  const [employeeList, setEmployeeList] = useState<Employee[]>([])
  const [pageInfo, setPageInfo] = useState({
    currentPage: 0,
    totalPages: 0,
    pageSize: 0
  })
  const [form, setForm] = useState<Employee>({
    name: "",
    phone: "",
    departmentId: "",
    dateJoined: "",
    status: undefined
  })

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }
  const getAllDepart = async () => {
    const res = await showAllDepartment();
    setDepartmentList(res)
  }
  useEffect(() => {
    getAllDepart()
    handlePage(0)
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await getEmployees(form.name, form.phone, form.departmentId ?? "", form.dateJoined ?? "", pageInfo.currentPage, form.status ?? null)
      setEmployeeList(res.content);
      setPageInfo({
        currentPage: res.number,
        totalPages: res.totalPages,
        pageSize: res.size, 
      })
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
  const handlePage = async (page: number) => {
    try {
      const res = await getEmployees(form.name, form.phone, form.departmentId ?? "", form.dateJoined ?? "", page, form.status ?? null)
      setEmployeeList(res.content);
      setPageInfo({
        currentPage: res.number,
        totalPages: res.totalPages,
        pageSize: res.size,
      })
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
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteEmployee(id);
      handlePage(pageInfo.currentPage)
      alert(res);
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
  return (
    <div className="container mt-4">
      {/* Tiêu đề và nút thêm */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Danh sách nhân viên</h2>
        {/* <Button variant="primary">+ Thêm nhân viên</Button> */}
      </div>

      {/* Bộ lọc tìm kiếm */}
      <Form className="mb-3" onSubmit={handleSubmit}>
        <Row className="align-items-end">
          <Col md={2}>
            <Form.Label>Tên</Form.Label>
            <Form.Control name="name" type="text" placeholder="Tên" value={form.name} onChange={handleChangeForm} />
          </Col>
          <Col md={2}>
            <Form.Label>Điện thoại</Form.Label>
            <Form.Control name="phone" type="text" placeholder="SĐT" value={form.phone} onChange={handleChangeForm} />
          </Col>
          <Col md={2}>
            <Form.Label>Phòng ban</Form.Label>
            <Form.Select name="departmentId" onChange={handleChangeForm}>
              <option value="">--Chọn phòng ban--</option>
              {departList && departList.map((department) => (
                <option key={department.id} value={department.id}>{department.name}</option>
              ))
              }
            </Form.Select>
          </Col>
          <Col md={2}>
            <Form.Label>Ngày vào</Form.Label>
            <Form.Control type="date" name="dateJoined" value={form.dateJoined} onChange={handleChangeForm} />
          </Col>
          <Col md={2}>
            <Form.Label>Trạng thái</Form.Label>
            <Form.Select name="status" onChange={handleChangeForm}>
              <option value="">Tất cả</option>
              <option value="true">Đang làm</option>
              <option value="false">Đã nghỉ</option>
            </Form.Select>
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
            <th>Tên</th>
            <th>Điện thoại</th>
            <th>Phòng ban</th>
            <th>Ngày vào</th>
            <th>Trạng thái</th>
            <th>Ảnh</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {employeeList.length > 0 ? (
            employeeList.map((employee,index) => (
              <tr key={employee.id}>
                <td className="text-center">{pageInfo.currentPage * pageInfo.pageSize + index + 1}</td>
                <td>{employee.name}</td>
                <td>{employee.phone}</td>
                <td>{employee.departmentName}</td>
                <td className="text-center">{employee.dateJoined}</td>
                <td>{employee.status ? "Đang làm" : "Đã nghỉ"}</td>
                <td className="text-center">
                  <img src={employee.imageUrl} alt="Ảnh nhân viên" width={60} height={60} />
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-2"
                    onClick={() => {
                      console.log("Đi tới:", `/employees/edit/${employee.id}`);
                      navigate(`/employees/edit/${employee.id}`);
                    }}
                  >
                    Sửa
                  </Button>

                  {!employee.status ? "" :
                    (<Button size="sm" variant="danger" onClick={() => employee.id && handleDelete(employee.id)}>Cho nghỉ</Button>)}

                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-muted">Không có nhân viên nào</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Phân trang */}
      <PhanTrang currentPage={pageInfo.currentPage} totalPages={pageInfo.totalPages} onPageChange={handlePage} />
    </div>
  )
}

export default EmployeePage
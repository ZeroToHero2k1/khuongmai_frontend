
import { Container, Nav, Navbar } from 'react-bootstrap';
import './App.css'

function App() {

  return (
    <div className="d-flex" style={{ height: '100vh' }}>
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
        <h4 className="mb-4">CRM System</h4>
        <Nav className="flex-column">
          <Nav.Link href="#" className="text-white">📁 Quản lý khách hàng</Nav.Link>
          <Nav.Link href="#" className="text-white">📦 Quản lý sản phẩm</Nav.Link>
          <Nav.Link href="#" className="text-white">🧾 Quản lý đơn hàng</Nav.Link>
          <Nav.Link href="#" className="text-white">👨‍💼 Quản lý nhân viên</Nav.Link>
          <Nav.Link href="#" className="text-white">⚙️ Cài đặt</Nav.Link>
        </Nav>
      </div>

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Navbar */}
        <Navbar bg="light" expand="lg" className="px-4">
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
          <div className="ms-auto">
            <span className="me-3">👤 Admin</span>
          </div>
        </Navbar>

        {/* Content */}
        <Container fluid className="p-4" style={{ overflowY: 'auto' }}>
          <h2>Chào mừng bạn đến hệ thống CRM</h2>
          <p>Chọn chức năng từ menu bên trái để bắt đầu.</p>
        </Container>
      </div>
    </div>
  );
}

export default App

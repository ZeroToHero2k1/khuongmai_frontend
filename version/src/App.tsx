import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RevenueChart from "./pages/RevenueChart";
import CustomerPage from "./pages/CustomerPage";
import EmployeePage from "./pages/EmployeePage";
import OrderPage from "./pages/OrderPage";
import MainLayout from "./layout/MainLayout";
import SignUpPage from "./pages/SignUpPage";
import MyProfilePage from "./pages/MyProfilePage";
import EmployeeEditPage from "./pages/EmployeeEditPage";
import WarehousePage from "./pages/WarehousePage";
import WarehouseCreatePage from "./pages/WarehouseCreatePage";
import WarehouseEditPage from "./pages/WarehousEditPage";
import DepartmentPage from "./pages/DepartmentPage";
import DepartmentCreatePage from "./pages/DepartmentCreatePage";
import DepartmentEditPage from "./pages/DepartmentEditPage";

const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignUpPage />} />

      <Route path="/" element={<MainLayout />}>
        <Route index element={<RevenueChart />} />
        <Route path="myprofile" element={<MyProfilePage/>}/>
        <Route path="customers" element={<CustomerPage />} />
        <Route path="employees" element={<EmployeePage />} />
        <Route path="orders" element={<OrderPage />} />
        <Route path="employees/edit/:id" element={<EmployeeEditPage/>}/>
        <Route path="warehouse" element={<WarehousePage/>}></Route>
        <Route path="warehouse/create" element={<WarehouseCreatePage/>}></Route>
        <Route path="warehouse/edit/:id" element={<WarehouseEditPage/>}></Route>
        <Route path="department" element={<DepartmentPage/>}></Route>
        <Route path="department/create" element={<DepartmentCreatePage/>}></Route>
        <Route path="department/edit/:id" element={<DepartmentEditPage/>}></Route>
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
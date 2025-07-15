import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RevenueChart from "./pages/RevenueChart";
import CustomerPage from "./pages/CustomerPage";
import EmployeePage from "./pages/EmployeePage";
import OrderPage from "./pages/OrderPage";
import MainLayout from "./layout/MainLayout";
import SignUpPage from "./pages/SignUpPage";
import MyProfilePage from "./pages/MyProfilePage";

const App = () => {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/sign" element={<SignUpPage />} />

      {/* Bỏ token check ở đây */}
      <Route path="/" element={<MainLayout />}>
        <Route index element={<RevenueChart />} />
        <Route path="myprofile" element={<MyProfilePage/>}/>
        <Route path="customers" element={<CustomerPage />} />
        <Route path="employees" element={<EmployeePage />} />
        <Route path="orders" element={<OrderPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default App;
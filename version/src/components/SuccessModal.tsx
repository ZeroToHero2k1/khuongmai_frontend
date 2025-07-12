import React, { useEffect, useState } from "react";
import { Modal} from "react-bootstrap";

interface SuccessModalProps {
  show: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ show, onClose }) => {
  const[number,setNumber]=useState<number>(3);
  useEffect(() => {
  if (!show) return;
  if (show) setNumber(3);

  const interval = setInterval(() => {
    setNumber(prev => {
      if (prev <= 1) {
        clearInterval(interval);
        return 0;
      }
      return prev - 1;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [show]);

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="text-success">🎉 Đăng ký thành công!</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p className="mb-3">Chúc mừng bạn đã tạo tài khoản thành công.</p>
        <img
          src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
          alt="success"
          style={{ width: "80px", marginBottom: "16px" }}
        />

      </Modal.Body>
      {/* <Modal.Footer>
        <Button variant="success" onClick={onClose}>
          Đăng nhập ngay
        </Button>
      </Modal.Footer> */}
      <Modal.Footer>
        <p>Tự động chuyển vào Trang Chủ trong {number} giây</p>
      </Modal.Footer>
    </Modal>
  );
};

export default SuccessModal;
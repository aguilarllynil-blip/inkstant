import React, { useState } from "react";
import { motion } from "framer-motion";

// 🛑 For now, replace UI components with basic HTML
// Later you can set up shadcn/ui if you want
function Button({ children, ...props }) {
  return (
    <button
      {...props}
      style={{
        padding: "6px 12px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        background: "#f4f4f4",
        cursor: "pointer",
      }}
    >
      {children}
    </button>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: "6px",
        border: "1px solid #ccc",
        borderRadius: "6px",
        width: "100%",
      }}
    />
  );
}

// Mock data
const initialOrders = [];

const paymentDetails = {
  Gcash: "0917-123-4567",
  Paymaya: "0918-234-5678",
  Paypal: "paypal.me/printgo",
  GoTyme: "Account No: 1234-5678-9012",
};

const printShops = ["Shop A", "Shop B", "Shop C"];

export default function App() {
  const [orders, setOrders] = useState(initialOrders);
  const [fileName, setFileName] = useState("");
  const [location, setLocation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [deliveryTime, setDeliveryTime] = useState("");
  const [shop, setShop] = useState(printShops[0]);

  const placeOrder = () => {
    if (!fileName || !location || !deliveryDate || !deliveryTime || !shop) return;
    const newOrder = {
      id: orders.length + 1,
      fileName,
      location,
      deliveryDate,
      deliveryTime,
      shop,
      status: "Pending",
    };
    setOrders([...orders, newOrder]);
    setFileName("");
    setLocation("");
    setDeliveryDate("");
    setDeliveryTime("");
    setShop(printShops[0]);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ fontSize: "28px", fontWeight: "bold", textAlign: "center" }}
      >
        INKSTANT – Student Printing Reservation
      </motion.h1>

      <h2>Place a Reservation</h2>
      <Input
        type="file"
        onChange={(e) => setFileName(e.target.files[0]?.name || "")}
      />
      <Input
        placeholder="Enter delivery location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        type="date"
        value={deliveryDate}
        onChange={(e) => setDeliveryDate(e.target.value)}
      />
      <Input
        type="time"
        value={deliveryTime}
        onChange={(e) => setDeliveryTime(e.target.value)}
      />
      <select value={shop} onChange={(e) => setShop(e.target.value)}>
        {printShops.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>
      <Button onClick={placeOrder}>Confirm Reservation</Button>

      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p>No reservations yet.</p>
      ) : (
        <ul>
          {orders.map((o) => (
            <li key={o.id}>
              <strong>{o.fileName}</strong> – {o.status} – {o.shop} <br />
              Delivery: {o.deliveryDate} at {o.deliveryTime}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

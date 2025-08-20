import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { useAuth } from "../auth";
import OrderStatusBar from "../components/OrderStatusBar"; // ✅ CORRECT PLACE

const OrderHistory = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const q = query(collection(db, "orders"), where("userId", "==", user.uid));
      const snapshot = await getDocs(q);
      const orderList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setOrders(orderList);
    };

    fetchOrders();
  }, [user]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders.map(order => (
        <div key={order.id} className="bg-white p-4 shadow rounded-xl mb-3">
          <p><strong>Order ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> <span className="text-green-600">{order.status}</span></p>
          
          {/* ✅ Add status bar below the status */}
          <OrderStatusBar status={order.status} />
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;

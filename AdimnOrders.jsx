import { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    const snapshot = await getDocs(collection(db, "orders"));
    const orderList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setOrders(orderList);
  };

  const updateStatus = async (orderId, newStatus) => {
    await updateDoc(doc(db, "orders", orderId), { status: newStatus });
    fetchOrders(); // Refresh after update
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Admin Order Panel</h2>
      {orders.map(order => (
        <div key={order.id} className="bg-gray-100 p-4 rounded-xl mb-4">
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Status:</strong> {order.status}</p>
          <div className="flex gap-2 mt-2">
            <button onClick={() => updateStatus(order.id, "Preparing")} className="bg-blue-500 text-white px-2 py-1 rounded">Preparing</button>
            <button onClick={() => updateStatus(order.id, "Out for Delivery")} className="bg-yellow-500 text-white px-2 py-1 rounded">Out for Delivery</button>
            <button onClick={() => updateStatus(order.id, "Delivered")} className="bg-green-500 text-white px-2 py-1 rounded">Delivered</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;

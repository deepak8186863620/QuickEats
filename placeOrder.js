// e.g., placeOrder.js or inside your CartCheckout component
import { db } from './firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const placeOrder = async (orderData) => {
  await addDoc(collection(db, "orders"), {
    ...orderData,
    status: "Preparing",  // NEW: initial status
    createdAt: serverTimestamp(),
    userId: user.uid
  });
};

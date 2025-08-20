const OrderStatusBar = ({ status }) => {
  const steps = ["Preparing", "Out for Delivery", "Delivered"];
  const currentIndex = steps.indexOf(status);

  return (
    <div className="flex gap-4 mt-2">
      {steps.map((step, index) => (
        <div
          key={step}
          className={`text-sm px-2 py-1 rounded ${
            index <= currentIndex ? "text-white bg-green-600" : "text-gray-400 border"
          }`}
        >
          {step}
        </div>
      ))}
    </div>
  );
};

export default OrderStatusBar;

import { useState } from "react";
import { useSelector } from "react-redux";

function Checkout({ dialog, closeCheckout }) {
  const [formData, setFormData] = useState({
    customer: {
      email: "",
      name: "",
      street: "",
      "postal-code": "",
      city: "",
    },
    items: [],
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const cartItems = useSelector((state) => state.cart);

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      customer: {
        ...prev.customer,
        [name]: value,
      },
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const { customer } = formData;

    // Email validation
    if (!customer.email || !customer.email.includes("@")) {
      newErrors.email = "Please enter a valid email address";
    }

    // Name validation
    if (!customer.name || customer.name.trim() === "") {
      newErrors.name = "Name is required";
    }

    // Street validation
    if (!customer.street || customer.street.trim() === "") {
      newErrors.street = "Street address is required";
    }

    // Postal code validation
    if (!customer["postal-code"] || customer["postal-code"].trim() === "") {
      newErrors["postal-code"] = "Postal code is required";
    }

    // City validation
    if (!customer.city || customer.city.trim() === "") {
      newErrors.city = "City is required";
    }

    // Items validation
    if (!cartItems || cartItems.length === 0) {
      newErrors.items = "Your cart is empty";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Simulate API call
      const orderData = {
        ...formData,
        items: cartItems,
      };
      fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data);
          console.log("Order submitted:", orderData);
          setSubmitStatus("success");

          // Reset form after successful submission
          setFormData({
            customer: {
              email: "",
              name: "",
              street: "",
              "postal-code": "",
              city: "",
            },
            items: [],
          });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } catch (error) {
      console.error("Order submission failed:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      customer: {
        email: "",
        name: "",
        street: "",
        "postal-code": "",
        city: "",
      },
      items: [],
    });
    setErrors({});
    setSubmitStatus(null);
  };
  return (
    <dialog ref={dialog} onClose={closeCheckout} className="modal">
      <form onSubmit={handleSubmit}>
        <h2 style={{ marginBottom: "1.5rem", color: "#1f1a09" }}>
          Shipping Information
        </h2>

        {/* Email and Name Row */}
        <div className="control-row">
          <div className="control" style={{ flex: 1 }}>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.customer.email}
              onChange={handleInputChange}
              style={{
                borderColor: errors.email ? "#dc3545" : "#ccc",
              }}
              disabled={isSubmitting}
            />
            {errors.email && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.email}
              </span>
            )}
          </div>

          <div className="control" style={{ flex: 1 }}>
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.customer.name}
              onChange={handleInputChange}
              style={{
                borderColor: errors.name ? "#dc3545" : "#ccc",
              }}
              disabled={isSubmitting}
            />
            {errors.name && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.name}
              </span>
            )}
          </div>
        </div>

        {/* Street Address */}
        <div className="control">
          <label htmlFor="street">Street Address</label>
          <input
            type="text"
            id="street"
            name="street"
            value={formData.customer.street}
            onChange={handleInputChange}
            style={{
              borderColor: errors.street ? "#dc3545" : "#ccc",
            }}
            disabled={isSubmitting}
          />
          {errors.street && (
            <span
              style={{
                color: "#dc3545",
                fontSize: "0.875rem",
                marginTop: "0.25rem",
              }}
            >
              {errors.street}
            </span>
          )}
        </div>

        {/* Postal Code and City Row */}
        <div className="control-row">
          <div className="control" style={{ flex: 1 }}>
            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              id="postal-code"
              name="postal-code"
              value={formData.customer["postal-code"]}
              onChange={handleInputChange}
              style={{
                borderColor: errors["postal-code"] ? "#dc3545" : "#ccc",
              }}
              disabled={isSubmitting}
            />
            {errors["postal-code"] && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors["postal-code"]}
              </span>
            )}
          </div>

          <div className="control" style={{ flex: 1 }}>
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              name="city"
              value={formData.customer.city}
              onChange={handleInputChange}
              style={{
                borderColor: errors.city ? "#dc3545" : "#ccc",
              }}
              disabled={isSubmitting}
            />
            {errors.city && (
              <span
                style={{
                  color: "#dc3545",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {errors.city}
              </span>
            )}
          </div>
        </div>

        {/* Submit Status Messages */}
        {submitStatus === "success" && (
          <div
            style={{
              backgroundColor: "#d4edda",
              color: "#155724",
              padding: "1rem",
              borderRadius: "4px",
              margin: "1rem 0",
              border: "1px solid #c3e6cb",
            }}
          >
            Order submitted successfully! Thank you for your purchase.
          </div>
        )}

        {submitStatus === "error" && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "4px",
              margin: "1rem 0",
              border: "1px solid #f5c6cb",
            }}
          >
            There was an error submitting your order. Please try again.
          </div>
        )}

        {errors.items && (
          <div
            style={{
              backgroundColor: "#f8d7da",
              color: "#721c24",
              padding: "1rem",
              borderRadius: "4px",
              margin: "1rem 0",
              border: "1px solid #f5c6cb",
            }}
          >
            {errors.items}
          </div>
        )}

        {/* Action Buttons */}
        <div className="control-row" style={{ marginTop: "2rem" }}>
          <button
            type="submit"
            className="button"
            disabled={isSubmitting || cartItems.length === 0}
            style={{
              opacity: isSubmitting || cartItems.length === 0 ? 0.6 : 1,
              cursor:
                isSubmitting || cartItems.length === 0
                  ? "not-allowed"
                  : "pointer",
            }}
          >
            {isSubmitting
              ? "Processing Order..."
              : `Place Order ($${totalAmount.toFixed(2)})`}
          </button>

          <button
            type="button"
            className="text-button"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            Clear Form
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default Checkout;

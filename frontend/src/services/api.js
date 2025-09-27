const API_URL = "http://localhost:5000/api";

export const getMedicines = async (search = "") => {
  const url = search ? `${API_URL}/medicines?search=${encodeURIComponent(search)}` : `${API_URL}/medicines`;
  const res = await fetch(url);
  return res.json();
};

export const placeOrder = async (order) => {
  const res = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  return res.json();
};

export const getOrders = async () => {
  const res = await fetch(`${API_URL}/orders`);
  return res.json();
};

export const getOrderById = async (id) => {
  const res = await fetch(`${API_URL}/orders/${id}`);
  return res.json();
};

export const getPathologyTests = async (search = "") => {
  const url = search ? `${API_URL}/tests/pathology?search=${encodeURIComponent(search)}` : `${API_URL}/tests/pathology`;
  const res = await fetch(url);
  return res.json();
};

export const bookPathology = async (booking) => {
  const res = await fetch(`${API_URL}/bookings/pathology`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.json();
};

export const getRadiologyTests = async (search = "") => {
  const url = search ? `${API_URL}/tests/radiology?search=${encodeURIComponent(search)}` : `${API_URL}/tests/radiology`;
  const res = await fetch(url);
  return res.json();
};

export const bookRadiology = async (booking) => {
  const res = await fetch(`${API_URL}/bookings/radiology`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.json();
};

export const getBookings = async () => {
  const res = await fetch(`${API_URL}/bookings`);
  return res.json();
};

export const deleteBooking = async (id) => {
  const res = await fetch(`${API_URL}/bookings/${id}`, {
    method: "DELETE",
  });
  return res.json();
};

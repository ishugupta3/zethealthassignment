const API_URL = "http://localhost:5000/api";

export const getMedicines = async () => {
  const res = await fetch(`${API_URL}/medicines`);
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

export const getPathologyTests = async () => {
  const res = await fetch(`${API_URL}/tests/pathology`);
  return res.json();
};

export const bookPathology = async (booking) => {
  const res = await fetch(`${API_URL}/tests/pathology/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.json();
};

export const getRadiologyTests = async () => {
  const res = await fetch(`${API_URL}/tests/radiology`);
  return res.json();
};

export const bookRadiology = async (booking) => {
  const res = await fetch(`${API_URL}/tests/radiology/book`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  return res.json();
};

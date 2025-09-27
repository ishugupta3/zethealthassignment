# TODO: Add Name and Address to Order Placement and Store in Bookings

## Information Gathered
- Cart.jsx has placeOrder that sends medicines and totalPrice to backend.
- Order model has medicines, totalPrice, orderDate.
- Booking model has name, phone, slot, testType, testId, bookingDate.
- Bookings.jsx displays bookings for tests.
- To fulfill "naam aur address puche aur un sab data ko my booking me store karaye", need to prompt for name, phone, address in cart, save in order, and display orders in Bookings page.

## Plan
- [x] Modify backend/models/order.js to include name, phone, address fields.
- [x] Modify backend/controllers/orderController.js to accept name, phone, address in placeOrder, and add getOrders function.
- [x] Modify backend/routes/orderRoutes.js to add GET /orders route.
- [x] Modify frontend/src/services/api.js to add getOrders function.
- [x] Modify frontend/src/pages/Cart.jsx to add form for name, phone, address, and pass to placeOrder.
- [x] Modify frontend/src/pages/Bookings.jsx to fetch and display orders alongside bookings.

## Dependent Files to Edit
- backend/models/order.js
- backend/controllers/orderController.js
- backend/routes/orderRoutes.js
- frontend/src/services/api.js
- frontend/src/pages/Cart.jsx
- frontend/src/pages/Bookings.jsx

## Followup Steps
- Start backend and frontend servers.
- Test: Add to cart, go to cart, fill form, place order, check Bookings page shows the order.

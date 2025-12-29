# Zaheen Kintwear – Backend (Express JS + MongoDB)

This is the **backend** part of the Zaheen Kintwear Full-Stack Assessment Project for **Goinnovior Limited**.  
It provides REST API endpoints for **products**, **cart**, and connects to **MongoDB Atlas** for CMS.

---

## 🚀 Live API
🔗 Backend: https://zaheenkintwear-server.vercel.app

---

## 📂 Tech Stack
- Node.js
- Express.js
- MongoDB Atlas
- dotenv (environment variables)
- CORS

---

## 📡 API Endpoints

### Products
- `GET /products` → Fetch all products
- `POST /products` → Add new product (CMS)

### Cart
- `POST /cart` → Add product to cart
- `GET /cart` → Get all cart items
- Supports quantity increment for same product

All endpoints are fully **dynamic**, used by frontend.

---

## 📁 Project Structure

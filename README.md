# CrowdEase_CrowdFunding_Platform 🌍💖

A full-stack donation platform built to empower communities by facilitating contributions to causes, tracking fund usage, and enabling transparency through an admin dashboard. Built using the **MERN stack**, with real-time UI features and support for theme switching and donation refund management.

---

## 🚀 Features

### 🌐 General Users (Donors)
- Browse and view all donation causes
- Donate to causes securely
- Receive confirmation on successful donations
- View thank-you page after donating

### 🛡️ Admins
- Log in via secure admin route
- Add, edit, and delete donation causes
- Track and manage received donations
- Mark causes as successful/failed based on donation goals
- Reverse or refund **unutilized funds** if a project fails

### 💡 UI/UX Features
- Responsive design (mobile + desktop)
- Light/dark mode toggle (localStorage-based)
- Tooltip-enhanced buttons for better accessibility
- Real-time notifications via `sonner` and `toaster`
- Themed with Material UI + custom styles

---
### Demo Credentials
  Username: admin
  Password: admin123
---

## 🧑‍💻 Tech Stack

| Layer      | Technology                         |
|------------|------------------------------------|
| Frontend   | React.js, Material UI, Lucide Icons|
| Backend    | Node.js, Express.js                |
| Database   | MongoDB (Mongoose ODM)             |
| Routing    | React Router                       |
| State      | React Context API                  |
| API Calls  | Axios                              |
| Theme      | Custom Context + Tailwind Classes  |
| Others     | React Query, Toast Notifications   |

---

## 🧱 Project Structure

├── client/
│ ├── components/
│ │ ├── Navbar.jsx
│ │ ├── ThemeProvider.jsx
│ │ └── ...
│ ├── pages/
│ │ ├── Home.jsx
│ │ ├── Donate.jsx
│ │ ├── AdminDashboard.jsx
│ │ └── ThankYou.jsx
│ ├── contexts/
│ │ └── AuthContext.jsx
│ └── App.jsx
├── server/
│ ├── controllers/
│ │ └── donationController.js
│ ├── models/
│ │ └── Donation.js
│ ├── routes/
│ │ └── donationRoutes.js
│ ├── utils/
│ │ └── refundHandler.js
│ └── server.js

yaml
Copy code

---

## 🔧 Setup Instructions

### Prerequisites

- Node.js >= 18.x
- MongoDB (local or Atlas)
-  npm
- M-Pesa sandbox keys (if used for payment)

### 1. Clone the Repository

```bash
git clone https://github.com/SagwaM/CrowdEase_CrowdFunding_Platform
cd communityfund
2. Setup Server
bash
Copy code
cd server
npm install
node server.js
Set up your environment variables in server/.env:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/communityfund
3. Setup Client
bash
Copy code
cd client
npm install
npm run dev
The frontend should be running on: http://localhost:5173

🔁 Refund Feature (Admin)
Admins can:

View all failed causes (where collected amount < target)

View associated donations for those causes

Trigger a "Refund" action to reverse donations

Refund logic updates the donation status (refunded: true)

Optional: Refund via M-Pesa API (if integrated)

Note: This system assumes refunds are either manual (with status tracking) or integrated via M-Pesa API.

🧪 Testing
Frontend tested manually via all routes

Backend endpoints tested using Postman

Test M-Pesa flows using sandbox credentials

🛠️ Future Improvements
Real payment gateway support (M-Pesa, Stripe)

Email notifications on donation + refund

Admin analytics dashboard

Role-based access control

🤝 Contributing
Fork the repository

Create your feature branch (git checkout -b feature/refund)

Commit your changes (git commit -m 'Add refund logic')

Push to the branch (git push origin feature/refund)

Open a Pull Request

## 🔗 Links
- **GitHub Repository**: [https://github.com/SagwaM/CrowdEase_CrowdFunding_Platform](https://github.com/SagwaM/CrowdEase_CrowdFunding_Platform)
- **Live Demo**: [https://crowdease.com](https://crowd-ease-crowd-funding-platform.vercel.app/)

📄 License
MIT License. See LICENSE file for details.

🙌 Acknowledgements
Material UI

Lucide Icons

React Query

<<<<<<< HEAD
M-Pesa API Docs
=======
M-Pesa API Docs
>>>>>>> 8f2c9179a7e684a7d01e8bf76931b278ff6c921b

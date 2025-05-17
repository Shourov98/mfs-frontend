Absolutely! Here's a professional and comprehensive `README.md` for your frontend project:



# Digital Wallet Frontend

This is the frontend client for a digital wallet web application built with **Next.js**, **Redux Toolkit**, and **Tailwind CSS**. It supports three types of users: **User**, **Agent**, and **Admin**, each with a custom dashboard and role-based functionalities like money transfer, cash-in/out, transaction history, and user management.


## 🧱 Tech Stack

- **Next.js 14** (App Router, Client Components)
- **Redux Toolkit** (Global state management)
- **Axios** (API communication)
- **Zod** (Schema validation)
- **Sonner** (Toast notifications)
- **Shadcn UI** (Reusable UI components with Tailwind)
- **Tailwind CSS** (Utility-first styling)
- **ESLint + Prettier** (Linting and formatting)

---

## 📂 Project Structure

```

frontend/
├── api/                   # Axios-based API calls
│   ├── authApi.js
│   ├── transactionApi.js
│   ├── agentApi.js
│   └── adminApi.js
├── app/                   # Next.js app router pages
│   ├── dashboard/
│   ├── login/
│   ├── register/
│   └── layout.js
├── components/            # Reusable UI and feature components
│   ├── auth/
│   ├── dashboard/
│   ├── modals/
│   ├── profile/
│   ├── shared/
│   ├── top/
│   └── ui/
├── lib/                   # Redux slices and store setup
│   ├── authSlice.js
│   ├── transactionSlice.js
│   ├── adminSlice.js
│   └── store.js
├── public/                # Static assets
├── utils/                 # Helpers and schemas
│   ├── toast.js
│   └── zodSchemas.js
├── .env.local             # API base URL
└── README.md

````

---

## 🔄 Data Flow

1. **User Registration/Login:**
   - Auth form → Redux thunk → `authApi.js` → Backend
   - On success: store `user` and `token` in Redux

2. **Authenticated Requests:**
   - Components access the token via Redux
   - Thunks dispatch actions for balance, transactions, admin tasks

3. **Modals & Dashboards:**
   - Role-specific dashboards render modals for Send Money, Cash In/Out
   - Admin tabs fetch user/agent request lists lazily via Redux thunks

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/digital-wallet-frontend.git
cd digital-wallet-frontend
````

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root and add your backend URL:

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### 4. Run the development server

```bash
npm run dev
```

Now open [http://localhost:3000](http://localhost:3000) to see the app in your browser.

---

## 🧪 Features Covered

* ✅ User & Agent registration/login
* ✅ Role-based dashboard routing
* ✅ Send Money, Cash In, Cash Out modals
* ✅ View transaction history
* ✅ View balance securely
* ✅ Admin approval workflows
* ✅ Block/unblock users
* ✅ Modular, scalable architecture

---

## 📌 Notes

* The backend should be running on the same machine or configured via `NEXT_PUBLIC_API_BASE_URL`.
* Admin actions (approve/reject/unblock) require valid tokens.
* Use Redux DevTools for debugging the store.

---

## 🤝 Contributing

Feel free to fork the repo, open issues, or create PRs. Let’s improve this project together!

---

## 📄 License

This project is licensed under the MIT License.

```

---

Let me know if you want a `README.md` version for the backend too!
```

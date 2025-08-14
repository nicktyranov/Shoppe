# 🛒 Shoppe

**Shoppe** is a modern e-commerce web application built with **Next.js**, **TypeScript**, and **React**.  
It provides a smooth shopping experience with a cart, favorites, checkout process, and responsive UI.  
The project includes **unit & integration tests** to ensure stability and maintainability.

---

## 🚀 Live Demo

🔗 **shoppe-gamma.vercel.app**

## 📷 🖼 Screenshots & UI Preview

### 1. Main Page

![Main Page](https://github.com/user-attachments/assets/0c428d86-a526-4646-9762-de87d8abcfec)

### 2. Main Page (continue)

![Main Page (continue)](https://github.com/user-attachments/assets/aad9d958-e408-4b45-8cb4-edba2643a2ec)

### 3. Product Catalog

![Product Catalog](https://github.com/user-attachments/assets/770278f8-56a7-42cf-bf9e-b9779a04fec0)

### 4. Product Catalog: Card

![Product Catalog: Card](https://github.com/user-attachments/assets/bbd194d5-e0d9-400b-b2d9-9167e8cee819)

### 5. Product page

![Product Info](https://github.com/user-attachments/assets/74e5052f-78ca-4a9b-b0d8-3ae8f2e3c109)

### 6. Страница товара (вариант 2)

![Product Info (continue)](https://github.com/user-attachments/assets/14bc2acb-9497-4677-bc8c-e04d24fa1b37)

### 7. Cart

![Cart](https://github.com/user-attachments/assets/1b142e3a-bb5c-4be3-8c98-c0ae32f7e55a)

### 8. Favorites

![Favorites](https://github.com/user-attachments/assets/ce6f020a-5b84-426f-9063-47d0c4b44334)

### 9. Login Page

![Login Page](https://github.com/user-attachments/assets/ba8ac030-f0e0-43a1-acaa-984dd79e6574)

---

## ✨ Features

-  🛍 **Product Catalog** — browse available products
-  🛒 **Shopping Cart** — add, remove, update quantities
-  ❤️ **Favorites** — save items for later
-  📦 **Order Checkout** — shipping form & order summary
-  ✅ **Form Validation** — with real-time feedback
-  📱 **Responsive Design** — works on desktop & mobile
-  🧪 **Unit & Integration Tests** — powered by Jest & RTL

---

## 🛠 Tech Stack

-  **Next.js** — SSR, SSG, and API routes
-  **React 18 + Hooks** — UI rendering and interactivity
-  **TypeScript** — strict typing and scalability
-  **Context API** — global state management
-  **Jest + React Testing Library** — test automation
-  **ESLint + Prettier** — linting and code formatting
-  **CSS Modules / TailwindCSS** (adjust based on your project)

---

## 📂 Project Structure

```

components/       # Reusable UI components
pages/            # Next.js routes
context/          # Global state management
hooks/            # Custom React hooks
helpers/          # Utility functions
**tests**/        # Unit & integration tests
public/           # Static assets

```

---

## ⚙️ Installation & Running Locally

````bash
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shoppe.git
   cd shoppe
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Create `.env.local`**

   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   ```

4. **Run development server**

   ```bash
   npm run dev
   ```

5. **Open in browser**

   ```
   http://localhost:3000
   ```
````

---

## 🧪 Testing

Stack: **Jest** + **React Testing Library**.

-  Unit & integration tests for components, hooks and context
-  Coverage reports available

Run all tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:cov
```

Current coverage: **\~76%**

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT License

```

```

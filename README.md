# 🛒 Shoppe

**Shoppe** is a modern e-commerce web application built with **Next.js**, **TypeScript**, and **React**.  
It provides a smooth shopping experience with a cart, favorites, checkout process, and responsive UI.  
The project includes **unit & integration tests** to ensure stability and maintainability.

---

## 🚀 Live Demo

🔗 **[View Live on Vercel](shoppe-gamma.vercel.app) **

![Shoppe Screenshot](docs/screenshot.png)
SOON...

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

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/shoppe.git
   cd shoppe
   ```

````

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

---

## 🧪 Testing

Run all tests:

```bash
npm run test
```

Run tests with coverage:

```bash
npm run test:cov
```

Current coverage: **\~40%**
Goal: **70%+** in the next releases.

---

## 📌 Roadmap

* [ ] Improve test coverage to 70%+
* [ ] Update `README.md` with screenshots and usage examples

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
````

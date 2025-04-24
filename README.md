# Magic Headless WP — Headless WordPress + WooCommerce with Cloudflare Pages

This project demonstrates how to build a modern, high-performance e-commerce website using WordPress and WooCommerce as a headless CMS/backend, with a React frontend deployed on Cloudflare Pages. It showcases the power of combining traditional WordPress content management with modern JAMstack architecture.

## 🚀 Features

- **Headless WordPress Integration**: Utilizes WordPress as a headless CMS
- **WooCommerce Support**: Full e-commerce capabilities powered by WooCommerce
- **Modern Frontend**: Built with React 18 and TypeScript
- **Performance-First**: Server-side rendering and edge computing via Cloudflare Pages
- **Responsive Design**: Mobile-friendly UI built with Tailwind CSS
- **Shopping Cart**: Client-side cart management with context API
- **Theme Support**: Dark/light mode theming capability

## 🛠️ Tech Stack

- **Frontend**:
  - React 18 with TypeScript
  - Vite (Build tool)
  - Tailwind CSS (Styling)
  - Context API (State Management)

- **Backend/CMS**:
  - WordPress (Headless)
  - WooCommerce (E-commerce)

- **Infrastructure**:
  - Cloudflare Pages (Hosting)
  - Cloudflare Functions (Serverless Backend)

## 📦 Project Structure

```
├── src/
│   ├── components/     # Reusable UI components
│   ├── contexts/       # React Context providers
│   ├── hooks/         # Custom React hooks
│   ├── pages/         # Page components
│   ├── services/      # API service layer
│   ├── types/         # TypeScript definitions
│   └── utils/         # Utility functions
├── functions/         # Cloudflare Functions
└── public/           # Static assets
```

## 🚦 Getting Started

1. **Prerequisites**
   - Node.js 16 or higher
   - A WordPress site with WooCommerce installed
   - Cloudflare account

2. **Environment Setup**
   Create a `.env` file with your configuration:
   ```env
   WORDPRESS_URL=your-wordpress-site.com
   WOOCOMMERCE_KEY=your-consumer-key
   WOOCOMMERCE_SECRET=your-consumer-secret
   ```

3. **Installation**
   ```bash
   # Clone the repository
   git clone [repository-url]

   # Install dependencies
   npm install

   # Start development server
   npm run dev
   ```

4. **Development**
   ```bash
   # Run development server
   npm run dev

   # Build for production
   npm run build

   # Preview production build
   npm run preview
   ```

## 🌐 Deployment

This project is designed to be deployed on Cloudflare Pages. The deployment process is automated through GitHub integration:

1. Push your changes to GitHub
2. Cloudflare Pages automatically builds and deploys your site
3. Cloudflare Functions are automatically deployed as serverless functions

## 🔑 Key Benefits

- **Performance**: Lightning-fast page loads with edge computing
- **Scalability**: Serverless architecture that scales automatically
- **Security**: Protected by Cloudflare's security features
- **Cost-Effective**: Pay-as-you-go pricing for Functions
- **Developer Experience**: Modern development workflow with hot reloading

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- WordPress and WooCommerce communities
- Cloudflare for their excellent hosting and edge computing platform
- All open-source contributors whose libraries make this possible

## ❓ Support

For questions and support, please open an issue in the GitHub repository.

---

⭐ If you find this project helpful, please consider giving it a star!
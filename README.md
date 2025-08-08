# Smart Markdown Pro

![Status](https://img.shields.io/badge/status-live%20&%20active-green)
[![Vercel Deployment](https://img.shields.io/badge/deploy-Vercel-black?logo=vercel)](https://smart-markdown-pro.vercel.app)
[![GitHub Repo](https://img.shields.io/badge/repo-GitHub-blue?logo=github)](https://github.com/Abubakr-Alsheikh/smart-markdown-pro)

**Smart Markdown Pro** is a modern, intelligent, and highly customizable web-based markdown editor designed for developers, writers, and content creators. It features a real-time, side-by-side preview, AI-powered text formatting, and a suite of powerful export options, all while running entirely in your browser with no account needed.

This project was built from the ground up to provide a focused, distraction-free writing environment that combines powerful functionality with a polished, intuitive user experience.

---

## ✨ Core Features

The application is now fully-featured and production-ready.

* ✍️ **Dual-Pane Live Editor:** A resizable editor and preview pane with real-time updates as you type. Panes are independently scrollable and can be collapsed for a focused view.
* 🤖 **AI-Powered Formatting:** A one-click "Format with AI" button that instantly converts messy, unstructured text into clean, well-formatted GitHub-Flavored Markdown.
* 📂 **Local File Management:** All your documents are automatically saved to your browser's local storage. You can create, rename, open, and delete multiple documents without ever leaving the app.
* 🎨 **Advanced Preview Customization:**
  * **Dark & Light Modes:** Choose your preferred theme, with support for system preference.
  * **Custom Fonts:** Use any font from Google Fonts by simply pasting the link. Previously used fonts are saved for one-click access.
  * **Font Size Control:** Adjust the base font size of the preview pane for optimal readability.
  * **RTL Support:** Toggle Right-to-Left text direction for languages like Arabic or Hebrew.
* 🚀 **Comprehensive Markdown Support:** Enjoy full GitHub-Flavored Markdown (GFM) support, including tables, task lists, and beautiful syntax highlighting for code blocks.
* 📤 **Multiple Export Options:**
  * Download as a Markdown (`.md`) file.
  * Download as a high-fidelity PDF file.
  * Copy the rendered content as HTML.
* 🔒 **Local-First and Private:** No accounts, no sign-ups, no cloud servers. All your work stays securely in your browser.
* 📱 **Responsive Design:** A clean, usable interface that works beautifully on desktop and mobile devices.
* 🔍 **SEO Optimized:** Properly configured with metadata for excellent visibility on search engines and social media.

---

## 🛠️ Tech Stack

This project is built with a modern, performant, and type-safe stack:

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS (v4)
* **Component Library:** Shadcn/ui
* **State Management:** Zustand
* **API & Data Fetching:** SWR / Next.js API Routes
* **PDF Generation:** Puppeteer (via `@sparticuz/chromium` for serverless deployment)
* **Deployment:** Vercel

---

## 🚀 Future Vision & Roadmap (Phase 3)

While the current application is a powerful tool, there is a clear path for future growth. The following "nice-to-have" features are planned for future development, contingent on user demand and feedback.

#### 1. **User Accounts & Cloud Sync**

* **Goal:** Allow users to access and edit their documents across multiple devices.
* **Implementation:**
  * Integrate user authentication (e.g., NextAuth.js).
  * Set up a database (e.g., PostgreSQL with Prisma, or a BaaS like Supabase/Firebase).
  * Create a full CRUD API for syncing documents to the cloud.
  * Refactor data fetching from local storage to use SWR with the new cloud API.

#### 2. **Advanced AI Actions**

* **Goal:** Expand the AI's role beyond simple formatting.
* **Implementation:**
  * Add a dropdown menu of AI actions next to the "Format" button.
  * Implement new backend prompts for actions like "Improve Writing," "Fix Grammar & Spelling," "Summarize Text," or "Translate."

#### 3. **Custom CSS & Themes**

* **Goal:** Give power users ultimate control over the preview's appearance.
* **Implementation:**
  * Add a "Custom CSS" tab in the settings modal with a code editor.
  * Allow users to save their entire customization setup (font, size, colors, custom CSS) as a "Theme" that they can name and switch between.

#### 4. **Presentation Mode**

* **Goal:** Turn markdown documents into simple, elegant presentations.
* **Implementation:**
  * Integrate a presentation library like Reveal.js.
  * Add a "Present" button that interprets markdown separators (e.g., `---`) as slide breaks and launches a full-screen presentation view.

---

## 🔧 Getting Started & Contributing

Instructions for setting up the project locally.

```bash
# 1. Clone the repository
# Make sure to replace with your actual repository URL
git clone https://github.com/Abubakr-Alsheikh/smart-markdown-pro.git

# 2. Navigate into the project directory
cd smart-markdown-pro

# 3. Install dependencies
npm install

# 4. Set up environment variables
# Copy the example file and add your secret keys
cp .env.example .env.local

# 5. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Abubakr-Alsheikh/smart-markdown-pro/issues).

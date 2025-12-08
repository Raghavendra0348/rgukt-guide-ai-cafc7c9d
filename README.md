# Welcome to RGUKT Guide AI (Medha AI)

A modern, AI-powered campus assistant for RGUKT with complaint management system.

## 🚀 Quick Start

**⚠️ IMPORTANT: Database Setup Required First!**

Before running the app, you must set up the database:

1. **Run SQL Setup** (5 minutes)
   - Open `RUN_THIS_IN_SUPABASE.sql`
   - Copy entire content
   - Go to [Supabase SQL Editor](https://app.supabase.com)
   - Paste and run the script

2. **Create Admin User**
   - Sign up in the app
   - Run this SQL (replace email):
   ```sql
   INSERT INTO public.user_roles (user_id, email, role)
   SELECT id, email, 'admin'
   FROM auth.users
   WHERE email = 'your-email@example.com';
   ```

3. **Done!** Refresh and start using the app

📖 **Need help?** See [`ONE_PAGE_QUICK_FIX.md`](./ONE_PAGE_QUICK_FIX.md)

## ✨ Features

### 🤖 AI Chatbot
- Multi-language support (English, Hindi, Telugu)
- Text, pictorial, and flowchart responses
- Image analysis capability
- RGUKT website link suggestions
- Streaming responses for better UX

### 📝 Complaint Management System
- **Student Features**:
  - Submit complaints with categories (Academic, Hostel, Fees, etc.)
  - Upload attachments (PDF, JPG, PNG up to 10MB)
  - Track complaint status in real-time
  - View admin responses
  - Priority levels (Low, Medium, High, Urgent)

- **Admin Features**:
  - Dashboard with statistics
  - Manage all complaints
  - Update status and add responses
  - Search and filter functionality
  - View complaint details and attachments

### 🎨 Modern UI
- Dark theme with purple (#8439c5) color palette
- Flip cards with marker sliding animation
- Responsive design
- Clean and professional interface

## 📚 Documentation

### 🎯 **Start Here:**
- 📘 [`MASTER_SETUP_GUIDE.md`](./MASTER_SETUP_GUIDE.md) - **Complete guide (RECOMMENDED!)**
- 🗺️ [`SYSTEM_FLOW_DIAGRAMS.md`](./SYSTEM_FLOW_DIAGRAMS.md) - Visual system overview

### 🔧 **Setup & Configuration:**
- ⚡ [`QUICK_START.md`](./QUICK_START.md) - Quick start guide
- 📖 [`SETUP_INSTRUCTIONS.md`](./SETUP_INSTRUCTIONS.md) - Detailed setup guide
- 📋 [`SETUP_CHECKLIST.md`](./SETUP_CHECKLIST.md) - Complete testing checklist

### 🐛 **Troubleshooting:**
- 🎯 [`FIX_POLICY_ERROR.md`](./FIX_POLICY_ERROR.md) - Fix "policy already exists" error
- 🔧 [`FIX_USER_ROLES_ERROR.md`](./FIX_USER_ROLES_ERROR.md) - Fix "user_roles" error
- 🎯 [`ONE_PAGE_QUICK_FIX.md`](./ONE_PAGE_QUICK_FIX.md) - Quick fixes for common errors
- �️ [`WHITE_SCREEN_FIXED.md`](./WHITE_SCREEN_FIXED.md) - Fix white screen issues

### 🗃️ **SQL Scripts:**
- ✅ [`SUPABASE_SETUP_COMPLETE.sql`](./SUPABASE_SETUP_COMPLETE.sql) - One-time complete setup
- 🔄 [`SAFE_STORAGE_BUCKET_SETUP.sql`](./SAFE_STORAGE_BUCKET_SETUP.sql) - Safe storage policy fix
- 🆕 [`FRESH_SETUP_COMPLAINTS.sql`](./FRESH_SETUP_COMPLAINTS.sql) - Reset everything (nuclear option)
- ✔️ [`VERIFY_SETUP.sql`](./VERIFY_SETUP.sql) - Verify your setup
- 💾 [`SUPABASE_TEST_QUERIES.sql`](./SUPABASE_TEST_QUERIES.sql) - Helpful test queries

### 📘 **Feature Documentation:**
- � [`COMPLAINTS_SYSTEM_GUIDE.md`](./COMPLAINTS_SYSTEM_GUIDE.md) - Complaints feature docs

## Project info

**URL**: https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Configure your Gemini API key
# Add your Gemini API key to .env file:
# VITE_GEMINI_API_KEY="your-gemini-api-key-here"
# Get your key from: https://makersuite.google.com/app/apikey

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## 🤖 Gemini API Setup

This project uses Google Gemini AI for the chatbot. To set it up:

1. **Get your Gemini API key**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. **Add to .env file**: Open `.env` and add:
   ```
   VITE_GEMINI_API_KEY="your-actual-api-key-here"
   ```
3. **Test the connection** (optional):
   ```sh
   node test-gemini.js
   ```
4. **Start the app**: `npm run dev`

For detailed setup instructions, see [GEMINI_SETUP.md](./GEMINI_SETUP.md)

```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/REPLACE_WITH_PROJECT_ID) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)

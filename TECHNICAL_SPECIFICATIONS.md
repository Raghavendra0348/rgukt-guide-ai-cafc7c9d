# 🔧 Technical Specifications - Medha AI

## Table of Contents
1. [System Requirements](#system-requirements)
2. [Technology Stack Details](#technology-stack-details)
3. [API Integration](#api-integration)
4. [Database Schema](#database-schema)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Styling System](#styling-system)
8. [Build Configuration](#build-configuration)

---

## System Requirements

### Development Environment
```
Operating System: Windows, macOS, or Linux
Node.js: >= 16.0.0
Bun: >= 1.0.0 (optional, but recommended)
npm: >= 8.0.0
Git: Latest version
Code Editor: VS Code (recommended)
```

### Browser Requirements
```
Chrome: >= 90
Firefox: >= 88
Safari: >= 14
Edge: >= 90
Mobile Safari: >= 14
Chrome Mobile: >= 90
```

---

## Technology Stack Details

### 1. React 18.3.1
**Why React?**
- Component-based architecture
- Virtual DOM for performance
- Large ecosystem and community
- Excellent TypeScript support
- Concurrent rendering features

**Key Features Used:**
- Functional components
- Hooks (useState, useEffect, useRef, useCallback, useMemo)
- Context API for global state
- Suspense for code splitting
- Error boundaries

### 2. TypeScript 5.6.2
**Configuration:**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  }
}
```

### 3. Vite 5.4.2
**Configuration:**
```typescript
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser'
  }
})
```

**Why Vite?**
- Lightning-fast HMR (Hot Module Replacement)
- Native ES modules
- Optimized build with Rollup
- Out-of-the-box TypeScript support
- Built-in dev server

### 4. Tailwind CSS 3.4.1
**Configuration:**
```typescript
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8439c5",
        secondary: "#7c3aed",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in",
        "slide-up": "slideUp 0.5s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### 5. React Router DOM 6.26.2
**Route Configuration:**
```typescript
<Routes>
  <Route path="/" element={<Index />} />
  <Route path="/student-auth" element={<StudentAuth />} />
  <Route path="/admin-auth" element={<AdminAuth />} />
  <Route path="/chat" element={<Chat />} />
  <Route path="/complaints" element={<Complaints />} />
  <Route path="/admin" element={<Admin />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/about" element={<AboutUs />} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes>
```

---

## API Integration

### Google Gemini AI

**Model:** `gemini-2.5-flash`

**Configuration:**
```typescript
const model = ai.getGenerativeModel({
  model: "gemini-2.5-flash",
  systemInstruction: SYSTEM_PROMPT,
  generationConfig: {
    maxOutputTokens: 512,
    temperature: 0.5,
    topP: 0.85,
    topK: 30,
  }
});
```

**System Prompt:**
```
You are Medha AI, the intelligent multilingual assistant for RGUKT RK Valley Campus.

LANGUAGE SUPPORT:
• Respond in the language the user asks in: English, Hindi (हिंदी), or Telugu (తెలుగు)
• Detect the language from user input and respond accordingly

RESPONSE FORMAT:
1. Keep responses CONCISE (3-5 sentences or bullet points)
2. Use bullet points (•) for lists
3. Use ** for bold text
4. Create Mermaid flowcharts for processes
5. Include RGUKT website links when relevant

KNOWLEDGE AREAS:
• Academics, Examinations, Fees, Hostel, Library, Campus facilities
```

**API Functions:**
```typescript
// Stream chat responses
export async function streamChat({
  messages,
  onDelta,
  onDone,
  onError,
}: {
  messages: Message[];
  onDelta: (deltaText: string) => void;
  onDone: () => void;
  onError: (error: string) => void;
})

// Error Handling
try {
  // API call
} catch (error) {
  if (error?.message?.includes("API key")) {
    onError("API key error...");
  } else if (error?.message?.includes("quota")) {
    onError("API quota exceeded...");
  }
}
```

---

## Database Schema (Mock)

### Users Table
```typescript
interface MockUser {
  id: string;              // UUID
  email: string;           // Unique email
  password: string;        // Plain text (for mock only)
  full_name: string;       // User's full name
  role: 'admin' | 'student';
  created_at: string;      // ISO date string
}
```

### Complaints Table
```typescript
interface MockComplaint {
  id: string;              // UUID
  user_id: string;         // Foreign key to users
  category: string;        // Complaint category
  title: string;           // Complaint title
  description: string;     // Detailed description
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  attachment_url?: string; // File URL
  attachment_data?: string; // Base64 encoded file
  attachment_name?: string; // Original filename
  admin_response?: string; // Admin's response
  resolved_at?: string;    // ISO date string
  created_at: string;      // ISO date string
  updated_at: string;      // ISO date string
}
```

### Sessions Table
```typescript
interface MockSession {
  user_id: string;
  email: string;
  expires_at: string;      // ISO date string
}
```

**Storage:** Browser localStorage
```typescript
// Keys
STORAGE_KEYS = {
  USERS: 'mock_users',
  COMPLAINTS: 'mock_complaints',
  SESSION: 'mock_session',
  CURRENT_USER: 'mock_current_user'
}
```

---

## Component Architecture

### Component Hierarchy

```
App
├── AuthProvider (Context)
├── BrowserRouter
│   ├── Navbar
│   │   ├── Logo
│   │   ├── NavLinks
│   │   └── UserMenu (DropdownMenu)
│   │
│   ├── Routes
│   │   ├── Index (Home)
│   │   │   ├── Hero Section
│   │   │   ├── Features Grid
│   │   │   ├── How It Works
│   │   │   ├── FAQ (Accordion)
│   │   │   └── CTA Section
│   │   │
│   │   ├── Chat
│   │   │   ├── ChatMessage (multiple)
│   │   │   │   ├── MarkdownRenderer
│   │   │   │   ├── CodeBlock
│   │   │   │   └── MermaidDiagram
│   │   │   ├── ChatInput
│   │   │   │   ├── Textarea
│   │   │   │   ├── VoiceButton
│   │   │   │   ├── ImageUpload
│   │   │   │   └── SendButton
│   │   │   └── RobotPanel
│   │   │
│   │   ├── Complaints
│   │   │   ├── ComplaintForm (Dialog)
│   │   │   │   ├── Input fields
│   │   │   │   ├── Select (category, priority)
│   │   │   │   ├── Textarea
│   │   │   │   └── FileUpload
│   │   │   └── ComplaintsList
│   │   │       └── ComplaintCard (multiple)
│   │   │
│   │   ├── Dashboard
│   │   │   ├── Stats Cards
│   │   │   ├── Recent Activities
│   │   │   └── Quick Actions
│   │   │
│   │   ├── Admin
│   │   │   └── AdminComplaintsManager
│   │   │       ├── SearchBar
│   │   │       ├── FilterDropdown
│   │   │       ├── ComplaintsTable
│   │   │       └── UpdateDialog
│   │   │
│   │   ├── AdminAuth
│   │   │   ├── LoginForm
│   │   │   └── FeatureShowcase
│   │   │
│   │   ├── StudentAuth
│   │   │   ├── LoginForm
│   │   │   ├── SignupForm
│   │   │   └── FeatureShowcase
│   │   │
│   │   └── AboutUs
│   │       ├── Hero
│   │       ├── Academic Article
│   │       ├── Blog Posts Grid
│   │       ├── Mission Cards
│   │       ├── Features Grid
│   │       ├── Team Values
│   │       └── Contact CTA
│   │
│   └── Footer
│       ├── Logo & Description
│       ├── Links Grid
│       └── Copyright
```

### Component Design Patterns

1. **Container/Presentational Pattern**
```typescript
// Container (Smart Component)
function ComplaintsPage() {
  const [complaints, setComplaints] = useState([]);
  // Logic here
  return <ComplaintsList complaints={complaints} />;
}

// Presentational (Dumb Component)
function ComplaintsList({ complaints }) {
  return complaints.map(c => <ComplaintCard key={c.id} {...c} />);
}
```

2. **Compound Components**
```typescript
<Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
    </DialogHeader>
  </DialogContent>
</Dialog>
```

3. **Render Props (when needed)**
```typescript
<DataFetcher render={(data) => <Display data={data} />} />
```

---

## State Management

### 1. Local State (useState)
```typescript
const [isOpen, setIsOpen] = useState(false);
const [messages, setMessages] = useState<Message[]>([]);
```

### 2. Global State (Context API)
```typescript
// AuthContext
interface AuthContextType {
  user: MockUser | null;
  session: MockSession | null;
  loading: boolean;
  role: AppRole | null;
  isAdmin: boolean;
  signUp: (email, password, fullName) => Promise<{error}>;
  signIn: (email, password) => Promise<{error}>;
  signOut: () => Promise<void>;
}

// Usage
const { user, isAdmin, signOut } = useAuth();
```

### 3. Server State (React Query)
```typescript
const { data, isLoading, error } = useQuery({
  queryKey: ['complaints'],
  queryFn: getAllComplaints,
});
```

### 4. Form State (React Hook Form)
```typescript
const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: {
    email: "",
    password: "",
  },
});
```

---

## Styling System

### Tailwind Utility Classes
```typescript
// Example component styling
<div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
  <div className="container mx-auto px-4 py-6 max-w-4xl">
    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all">
      Click Me
    </Button>
  </div>
</div>
```

### Custom Animations
```css
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from { 
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulseGlow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(132, 57, 197, 0.3);
  }
  50% {
    box-shadow: 0 0 40px rgba(132, 57, 197, 0.6);
  }
}
```

### Responsive Design
```typescript
// Mobile First
<div className="w-full md:w-1/2 lg:w-1/3">
  // Breakpoints:
  // sm: 640px
  // md: 768px
  // lg: 1024px
  // xl: 1280px
  // 2xl: 1536px
</div>
```

---

## Build Configuration

### Vite Config
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from "path"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: true,
    open: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu'],
        },
      },
    },
  },
})
```

### Build Output Structure
```
dist/
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── index-[hash].css     # Styles
│   ├── react-vendor-[hash].js
│   └── ui-vendor-[hash].js
├── index.html
└── ... (other static assets)
```

### Build Sizes (Approximate)
```
Main bundle: ~150KB (gzipped)
React vendor: ~130KB (gzipped)
UI vendor: ~80KB (gzipped)
CSS: ~40KB (gzipped)
Total: ~400KB (gzipped)
```

---

## Performance Metrics

### Lighthouse Scores (Target)
```
Performance: 90+
Accessibility: 95+
Best Practices: 95+
SEO: 90+
```

### Core Web Vitals
```
LCP (Largest Contentful Paint): < 2.5s
FID (First Input Delay): < 100ms
CLS (Cumulative Layout Shift): < 0.1
```

---

## Development Workflow

### 1. Start Development
```bash
bun run dev
# or
npm run dev
```

### 2. Code Linting
```bash
npm run lint
```

### 3. Type Checking
```bash
tsc --noEmit
```

### 4. Build for Production
```bash
npm run build
```

### 5. Preview Production Build
```bash
npm run preview
```

---

## Deployment Configuration

### Vercel
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Netlify
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Environment Variables (Production)
```
VITE_GEMINI_API_KEY=<production-api-key>
```

---

## Security Best Practices

1. **Environment Variables**
   - Never commit `.env` file
   - Use different keys for dev/prod
   - Rotate API keys regularly

2. **Input Sanitization**
   - Zod validation on all forms
   - XSS prevention with React's built-in escaping
   - File upload validation

3. **Authentication**
   - Secure password storage (when backend added)
   - Session expiration
   - HTTPS only in production

4. **API Security**
   - Rate limiting (when backend added)
   - API key restrictions
   - CORS configuration

---

## Troubleshooting

### Common Issues

1. **Module not found errors**
```bash
rm -rf node_modules bun.lockb
bun install
```

2. **TypeScript errors**
```bash
npm run type-check
```

3. **Build fails**
```bash
rm -rf dist
npm run build
```

4. **API key issues**
- Check `.env` file
- Verify API key is valid
- Check console for error messages

---

## Version History

- **v1.0.0** (December 2025) - Initial release
  - Core features implemented
  - AI chat integration
  - Complaints system
  - Admin dashboard
  - Authentication system

---

**Document Version:** 1.0  
**Last Updated:** December 9, 2025  
**Maintained By:** RGUKT Development Team

# Dashboard Complaints Debugging Guide

## Issue: Complaints Not Showing in Dashboard

### Step-by-Step Debugging:

#### 1. Open Browser Console
- Press **F12** (Chrome/Firefox) or **Ctrl+Shift+I**
- Go to **Console** tab

#### 2. Check These Logs:

**When you login and go to Dashboard, you should see:**
```
🔍 Dashboard: User detected, loading complaints...
🔄 Dashboard: Loading complaints...
👤 Current user: {email, id, role...}
📋 Fetching all complaints for public view...
✅ Found X total complaints (public view)
✅ Dashboard: Received complaints: X
📋 Complaints data: [array of complaints]
```

**If you see errors:**
```
❌ Dashboard: Error loading complaints: ...
❌ Error fetching all complaints: ...
⚠️ Dashboard: No user detected
```

#### 3. Check LocalStorage:

**In Console, run:**
```javascript
// Check if complaints exist
JSON.parse(localStorage.getItem('mock_complaints'))

// Should return array with at least 2 complaints
// If null or empty, run:
localStorage.clear()
// Then refresh page
```

#### 4. Manual Test:

**In Console, manually load complaints:**
```javascript
// Import and test
import { getAllComplaintsPublic } from './lib/complaints-api';
const complaints = await getAllComplaintsPublic();
console.log('Complaints:', complaints);
```

#### 5. Check Authentication:

**In Console:**
```javascript
// Check current user
JSON.parse(localStorage.getItem('mock_current_user'))
// Should return user object with id, email, role

// If null, you're not logged in!
```

### Common Issues & Solutions:

#### Issue 1: Not Logged In
**Symptoms:**
- See message: "⚠️ Dashboard: No user detected"
- Complaints section doesn't show

**Solution:**
1. Login as student: `student@rgukt.ac.in` / `student123`
2. Or admin: `admin@rgukt.ac.in` / `admin123`
3. Go back to Dashboard

---

#### Issue 2: Empty LocalStorage
**Symptoms:**
- Console shows: "✅ Dashboard: Received complaints: 0"
- Empty array returned

**Solution:**
```javascript
// Clear and reinitialize
localStorage.clear();
// Refresh page - app will auto-initialize with 2 default complaints
```

---

#### Issue 3: User is Admin
**Symptoms:**
- Stats show but no complaints section at all
- This is EXPECTED behavior!

**Explanation:**
Admins don't see the complaints section by design. Only students see all complaints.

**Solution:**
- If you want to see complaints, login as student instead
- Admin only sees statistics cards

---

#### Issue 4: Filters Hiding Everything
**Symptoms:**
- Console shows complaints loaded
- But displays "No complaints match your filters"

**Solution:**
- Reset all filters to "All"
- Check filter dropdowns at top of complaints section

---

### Manual Complaint Addition:

If you want to add a complaint manually for testing:

```javascript
// In Console:
const newComplaint = {
  id: `complaint-${Date.now()}`,
  user_id: 'student-001',
  category: 'infrastructure',
  title: 'Test Complaint',
  description: 'This is a test complaint',
  status: 'open',
  priority: 'medium',
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString()
};

const complaints = JSON.parse(localStorage.getItem('mock_complaints')) || [];
complaints.push(newComplaint);
localStorage.setItem('mock_complaints', JSON.stringify(complaints));

// Refresh Dashboard
location.reload();
```

---

### Quick Fix Checklist:

✅ **Step 1:** Clear localStorage
```javascript
localStorage.clear();
```

✅ **Step 2:** Refresh page (F5)

✅ **Step 3:** Login as **student** (not admin!)
- Email: `student@rgukt.ac.in`
- Password: `student123`

✅ **Step 4:** Navigate to Dashboard (`/`)

✅ **Step 5:** Check console for logs

✅ **Step 6:** Scroll down past stats to see complaints section

✅ **Step 7:** If still empty, submit a new complaint:
- Go to Complaints page (`/complaints`)
- Fill form and submit
- Return to Dashboard

---

### Expected Result:

**For Students:**
- See 4 stat cards (Total Complaints, Active Issues, Resolved, Active Users)
- See "All Campus Complaints" section
- See 3 filter dropdowns (Status, Category, Priority)
- See list of complaints with:
  - ID badge
  - Status badge (colored)
  - Priority badge
  - Title and description
  - Submission date
  - Images (if any)
  - Admin responses (if any)

**For Admin:**
- See 4 stat cards only
- NO complaints section (hidden by design)

---

### Still Not Working?

**Take a screenshot of:**
1. Browser console with all logs
2. Dashboard page showing the issue
3. LocalStorage contents:
   - `mock_complaints`
   - `mock_current_user`

**Share these for further debugging!**

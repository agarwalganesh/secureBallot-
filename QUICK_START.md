# 🎓 secureBallot - Quick Start Guide

## Welcome! 👋

Your voting system is now **fully enhanced** with an interactive tutorial and help system. Here's how to get started:

---

## 🚀 Getting Started (2 Ways)

### Option 1: Run the Application
1. **Double-click** `run.bat` in the secureBallot folder
2. Your browser will automatically open `index.html`
3. You'll see the help banner at the top

### Option 2: Open Directly
1. Navigate to: `c:\Users\ganes\OneDrive\Pictures\Documents\Desktop\secureBallot`
2. Right-click `index.html` → Open with → Your browser

---

## 📚 Three Ways to Learn

### 1. **Load Demo Data** (Fastest Way to Get Started)
- Click the **"📦 Demo Data"** button on the homepage
- Automatically loads 3 sample candidates and 3 sample voters
- Lets you immediately test voting, 2FA, receipts, and audits
- **Use email:** `john@example.com`, `jane@example.com`, or `mike@example.com`

### 2. **Start Tutorial** (Step-by-Step Guide)
- Click the **"🎓 Tutorial"** button
- 9-step interactive walkthrough:
  - Step 1: Register Candidates
  - Step 2: Register Voters
  - Step 3: Configure Election
  - Step 4: Vote with 2FA
  - Step 5: Verify Your Vote
  - Step 6: View Results
  - Step 7: Bulk Manage Voters
  - Step 8: Admin Audit
  - Step 9: Complete!

### 3. **Feature Guide** (Visual Overview)
- Click the **"❓ Guide"** button
- Visual ASCII guide showing all features and quick tips
- Helpful for understanding capabilities at a glance

---

## 🗺️ Quick Navigation

Use the **sidebar menu** (click ☰ button on left) to quickly jump to any feature:

### 🎯 **Voter Features**
- 👥 **Register as Voter** - Create voter account
- 🔐 **Vote (with 2FA)** - Cast vote securely with email OTP
- 🎫 **Verify Receipt** - Check vote receipt after voting
- 📊 **View Results** - See live election results

### ⚙️ **Admin Features**
- 🎯 **Register Candidates** - Add candidates to election
- ⚙️ **Election Settings** - Configure election parameters
- 📥 **Bulk Voters** - Import/export voters via CSV
- 📊 **Audit Dashboard** - View 2FA logs & voting receipts

---

## 🔐 Key Features (5 Enterprise-Level Features)

### 1. **2FA - Two-Factor Authentication**
- Email-based OTP (One-Time Password)
- 5-minute expiry, 3-attempt limit
- Complete audit logging of all attempts
- **Security Benefit:** Ensures only authorized voters can vote

### 2. **Vote Verification**
- Unique receipt ID for each vote
- Voter can verify their vote was counted
- Anonymous ledger (vote not tied to voter identity)
- Tamper-evident receipts with hash verification
- **Security Benefit:** End-to-end verifiability

### 3. **Election Settings**
- Configurable election name
- Start/end time settings
- Ballot type selection (single-choice, multi-choice, ranked-choice)
- Quorum requirements
- Abstain option
- **Benefit:** Flexible election customization

### 4. **Audit Dashboard**
- 2FA login attempt logs
- Voting receipts ledger
- CSV export capability
- Date/time tracking
- **Security Benefit:** Complete transparency & compliance

### 5. **Bulk Voter Management**
- Import voters from CSV
- Validation: age (≥18), email format, no duplicates
- Export voters as CSV
- Import history tracking
- **Benefit:** Easy bulk operations for large elections

---

## 📋 Demo Data Quick Test

After loading demo data, here's a quick test flow:

1. **Go to "Vote (with 2FA)"**
   - Email: `john@example.com`
   - Click "Send OTP"
   - Enter OTP (shown on screen)
   - Select candidate
   - Click "Cast Vote"
   - **Get Receipt ID** (save this!)

2. **Go to "Verify Receipt"**
   - Paste Receipt ID
   - Click "Verify Receipt"
   - See anonymous vote in ledger ✓

3. **Go to "View Results"**
   - See vote counts
   - Check turnout

4. **Go to "Audit Dashboard"**
   - View 2FA audit log
   - View voting receipts
   - Export as CSV

---

## 💾 Data Storage

- **All data stored locally** in browser's localStorage
- No internet/cloud connection required
- No central server needed
- Data persists even if you close the browser
- **Clear Data** button available if needed (⚠️ irreversible)

---

## 📁 Project Structure

```
secureBallot/
├── index.html              # Main application (contains all 9 pages)
├── css/
│   └── style.css           # Styling
├── js/
│   ├── voter.js            # Navigation & page routing
│   ├── voting.js           # Voter management & registration
│   ├── candidate.js        # Candidate management
│   ├── results.js          # Results display
│   ├── twofa.js            # 2FA OTP system ⭐
│   ├── receipt.js          # Vote receipt generation ⭐
│   ├── settings.js         # Election configuration ⭐
│   ├── verifiable.js       # Vote verifiability ⭐
│   ├── bulk-voter.js       # Bulk voter import/export ⭐
│   ├── voting-enhanced.js  # 2FA voting integration ⭐
│   ├── import.js           # CSV/JSON import
│   └── tutorial.js         # Tutorial & help system 🎓
├── README.md               # Full documentation
├── QUICK_START.md          # This file
└── run.bat                 # Quick launcher

⭐ = New security/enterprise features
🎓 = New tutorial/help system
```

---

## 🎯 Recommended First Steps

1. **Open the app** (click run.bat or open index.html)
2. **Load Demo Data** - See how everything works with sample data
3. **Run Tutorial** - Learn each feature step-by-step
4. **Try Voting** - Test 2FA, receipts, and verification
5. **Check Audit** - See security logs and transparency
6. **Read README.md** - Deep dive into features and customization

---

## 🆘 Getting Help

- **Info Icons (ℹ️)** - Appear throughout the app for field-specific help
- **Feature Guide** - Visual overview of all features
- **Tutorial** - Interactive 9-step walkthrough
- **README.md** - Comprehensive documentation

---

## 🔧 Admin Tips

- **Default Admin** - No login required, anyone can access admin features
- **CSV Format** - For bulk voters: `name,email,voterId,age`
- **Backup** - Use "Export Election Config" to backup settings
- **Import** - Use "Import Election Config" to restore settings

---

## 🚨 Important Notes

⚠️ **Security Warning**: This is a **demo/educational system**:
- Uses XOR encryption (demo only, not production-ready)
- All data in browser localStorage (client-side only)
- For production, use proper encryption (TLS, bcrypt) and backend server
- Add proper authentication and authorization

✅ **Good for**:
- Learning about voting systems
- Election administration software demo
- Educational purposes
- Local testing and development

❌ **Not for**:
- Real elections (security considerations needed)
- High-security voting (add backend, proper crypto)
- Production use without security audit

---

## 📞 Questions or Issues?

1. Check the **Feature Guide** (❓ button)
2. Run through the **Tutorial** (🎓 button)
3. Load **Demo Data** (📦 button) to see examples
4. Read **README.md** for detailed documentation
5. Review the code comments in `/js` files

---

## 🎉 You're All Set!

Your voting system is ready to use with:
✅ Secure 2FA voting
✅ Vote verification & receipts
✅ Election configuration
✅ Audit trail & compliance
✅ Bulk voter management
✅ Interactive tutorial & help
✅ Demo data for testing

**Start by clicking one of these buttons on the homepage:**
- 🔐 Vote Securely (with 2FA)
- 📦 Load Demo Data
- 🎓 Start Tutorial

Enjoy! 🗳️✨

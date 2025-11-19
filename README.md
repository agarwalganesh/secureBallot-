# 🗳️ secureBallot - Advanced Voting System

A modern, secure, and transparent voting platform with enterprise-grade security features including 2FA, end-to-end vote verifiability, audit trails, and administrative controls.

## ✨ Core Features

### Voting System
✅ **Candidate Registration** - Register candidates with party details and symbols
✅ **Voter Registration** - Secure voter registration with age verification and timestamps  
✅ **Vote Casting** - One-voter-one-vote system with authentication
✅ **Live Results** - Real-time election results with statistics and turnout

### 🔐 Advanced Security Features

#### 1. Two-Factor Authentication (2FA)
- Email-based OTP (One-Time Password) verification
- 5-minute OTP expiry with automatic cleanup
- Maximum 3 failed attempts per OTP
- Complete audit logging of all 2FA attempts
- Demo mode: OTP displayed on screen

**How to Use:**
1. Navigate to "🔐 Cast Vote (Secure)"
2. Enter your registered email
3. Click "Send OTP"
4. Enter the 6-digit OTP
5. Click "Verify & Continue" to proceed to voting

#### 2. End-to-End Vote Verifiability
- Encrypted vote tokens for every cast vote
- Merkle-proof structure for public verification
- Non-identifiable receipt IDs (voter privacy maintained)
- Voters can verify their vote is counted without revealing identity
- Receipt verification page with tamper detection

#### 3. Voting Receipts & Audit
- Unique receipt ID for each vote
- Tamper-evident receipt system
- Admin can view all receipts without voter identity mapping
- Export receipts as CSV for compliance
- Anonymous voting receipt ledger

#### 4. Election Settings / Admin Panel
Configure elections without code:
- Set election name, start time, end time
- Choose ballot type: Single-Choice, Multi-Choice, Ranked-Choice
- Set quorum percentage
- Enable/disable voter detail editing
- Configure max selections per voter
- Allow/disallow abstain option
- Export/import election configuration as JSON

#### 5. Bulk Voter Management
- **CSV Import**: Upload voter lists with validation
- **Duplicate Detection**: Automatic duplicate prevention
- **Data Validation**: Email format, age verification (≥18)
- **Import History**: View all import attempts and results
- **CSV Export**: Download all voters with status and timestamps
- **Sample CSV**: Download template for bulk imports

---

## 🚀 Quick Start Guide

### Step 1: Open the Application
```
Open index.html in a modern web browser
```

### Step 2: Register Candidates
```
1. Click "🎯 Register as Candidate"
2. Fill in candidate details (name, party, symbol, bio)
3. Click "Register Candidate"
```

### Step 3: Register Voters (Two Methods)

**Method A: Manual Registration**
```
1. Click "👥 Register as Voter"
2. Fill in voter details (name, email, age, voter ID)
3. Click "Register as Voter"
```

**Method B: Bulk Import**
```
1. Click "📥 Bulk Voter Management"
2. Download sample CSV
3. Fill with voter data (name, email, voterId, age)
4. Upload CSV file
5. System validates and imports
```

### Step 4: Configure Election (Admin)
```
1. Click "⚙️ Admin Panel"
2. Set election parameters (name, time window, ballot type, etc.)
3. Click "Save Settings"
4. Optionally export configuration as JSON
```

### Step 5: Cast Votes (Voter)
```
1. Click "🔐 Cast Vote (Secure)"
2. Enter your registered email
3. Click "Send OTP"
4. Enter the 6-digit OTP (shown in demo)
5. Click "Verify & Continue"
6. Select your preferred candidate
7. Click "Cast Vote"
8. Receive and save Receipt ID
```

### Step 6: Verify Your Vote
```
1. Click "🎫 Verify Receipt"
2. Enter your Receipt ID
3. Confirm your vote is counted
```

### Step 7: View Results
```
1. Click "📊 View Results"
2. See live results with percentages
3. View voter turnout statistics
```

### Step 8: Admin Audit
```
1. Click "📊 Admin Audit Dashboard"
2. View 2FA audit log (all login attempts)
3. View voting receipts ledger (anonymous)
4. Export audit data as CSV
```

---

## 📊 Feature Details

### 2FA (Two-Factor Authentication)

**Component**: `js/twofa.js`

**Functions:**
- `sendOTP(email)` - Generate and send OTP
- `validateOTP(email, otp)` - Validate entered OTP
- `logTwoFAAttempt()` - Log all attempts for audit
- `display2FAAuditLog()` - Show admin audit log

**Audit Log Includes:**
- Timestamp
- Email address
- Event type (OTP_SENT, OTP_VALIDATE_SUCCESS, OTP_EXPIRED, OTP_LOCKED)
- Success/failure status
- Error details

### Vote Verification

**Component**: `js/receipt.js`

**Functions:**
- `generateVotingReceipt()` - Create receipt after vote
- `displayVotingReceiptToVoter()` - Show receipt modal
- `verifyVotingReceipt()` - Verify receipt by ID
- `displayVotingReceiptsAdmin()` - Admin receipt view

**Receipt Ledger:**
- Anonymous (no voter names)
- Shows receipt ID, candidate, timestamp
- Exportable as CSV

### Election Settings

**Component**: `js/settings.js`

**Configurable Parameters:**
- `electionName` - Election title
- `startTime` / `endTime` - Voting window
- `ballotType` - single-choice, multi-choice, ranked-choice
- `quorumPercentage` - Minimum participation %
- `allowVoterEditDetails` - Boolean for editing
- `maxCandidateSelections` - Max choices per voter
- `allowAbstain` - Abstain option

**Functions:**
- `saveElectionSettings()` - Save configuration
- `exportElectionConfig()` - Export as JSON
- `importElectionConfig()` - Import from JSON
- `isElectionActive()` - Check voting window

### Bulk Voter Management

**Component**: `js/bulk-voter.js`

**Functions:**
- `importVotersFromCSV()` - Import and validate
- `exportVotersAsCSV()` - Download voters
- `downloadSampleVoterCSV()` - Get CSV template
- `validateVoterCSV()` - Pre-import validation
- `displayVoterImportLog()` - Show import history

**Validation Rules:**
- Email must contain @
- Age must be ≥ 18
- Voter ID must be unique
- All fields required

**Import Report Shows:**
- Number imported
- Duplicate count
- Invalid records
- Error details per row

---

## 🗂️ File Structure

```
secureBallot/
├── index.html                # All pages (550+ lines)
├── css/
│   └── style.css            # Responsive styling
├── js/
│   ├── voter.js             # Navigation & pages
│   ├── candidate.js         # Candidate CRUD
│   ├── voting.js            # Voter CRUD with timestamps
│   ├── results.js           # Vote results display
│   ├── import.js            # File import (JSON/CSV)
│   ├── twofa.js             # 2FA OTP system (145 lines)
│   ├── verifiable.js        # Vote tokens & Merkle proofs
│   ├── settings.js          # Election configuration (190 lines)
│   ├── receipt.js           # Voting receipts (160 lines)
│   ├── bulk-voter.js        # CSV import/export (220 lines)
│   └── voting-enhanced.js   # 2FA + voting integration
├── assets/
│   └── images/             # Logo/images
└── README.md               # Documentation
```

---

## 💾 Data Storage

All data stored in browser `localStorage`:
- `candidates` - Array of candidates with votes
- `voters` - Array of voters with status
- `votingReceipts` - Array of vote receipts
- `electionSettings` - Election configuration
- `twoFAAuditLog` - 2FA attempt log
- `voterImportLog` - Import history

**Export Data:**
- Election config as JSON
- Voters as CSV
- Receipts as CSV
- Audit logs as CSV

---

## 🔒 Security Notes

### Current Implementation
- OTP: 5-minute expiry, 3-attempt limit
- Receipt IDs: Hash-based (not cryptographically secure)
- Vote Encryption: XOR-based (demo only)
- All data: Client-side only

### For Production
1. Replace XOR encryption with `libsodium.js` or `TweetNaCl.js`
2. Use proper PBKDF2 for hashing
3. Add backend database
4. Implement blockchain audit trail
5. Use secure server-side OTP delivery
6. Add HTTPS/TLS for all communication

---

## 📝 CSV Import Format

**Sample voter.csv:**
```
name,email,voterId,age
Alice Johnson,alice@example.com,VID-001,28
Bob Smith,bob@example.com,VID-002,35
Carol White,carol@example.com,VID-003,42
```

**Column Requirements:**
- `name`: Full name (string)
- `email`: Valid email with @ (format)
- `voterId`: Unique voter identifier (no duplicates allowed)
- `age`: Numeric age ≥ 18

---

## 🧪 Testing Scenarios

### Scenario 1: Complete Election
```
1. Register 3 candidates
2. Import 10 voters via CSV
3. Configure election settings
4. Have 7 voters cast votes (with 2FA)
5. View results and receipts
```

### Scenario 2: 2FA Testing
```
1. Send OTP (see in demo alert)
2. Enter wrong OTP (3 times) - locked
3. Request new OTP - works
4. Enter correct OTP - votes proceed
```

### Scenario 3: Audit & Compliance
```
1. Cast several votes
2. Go to "Admin Audit Dashboard"
3. Export 2FA logs
4. Export voting receipts
5. Export voter list
```

---

## 🔧 Customization

### Change OTP Duration
Edit `js/twofa.js` line ~15:
```javascript
const expiresAt = Date.now() + 5 * 60 * 1000; // Change 5 to desired minutes
```

### Change Max OTP Attempts
Edit `js/twofa.js` line ~43:
```javascript
if (record.attempts >= 3) { // Change 3 to desired limit
```

### Add Custom Ballot Types
Edit `js/settings.js` form in `index.html` to add options.

---

## 📱 Browser Compatibility

| Browser | Support |
|---------|---------|
| Chrome/Edge | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| IE 11 | ⚠️ Limited |

---

## 🎯 Next Steps / Enhancements

- [ ] Mobile app (React Native / Flutter)
- [ ] Blockchain integration for immutable audit trail
- [ ] Multi-language support
- [ ] Database backend (MongoDB / PostgreSQL)
- [ ] Email service integration for real OTP
- [ ] QR code receipts
- [ ] Live voting animation
- [ ] Admin dashboard analytics
- [ ] Dark mode theme

---

**Made with ❤️ for secure, transparent, democratic voting.**

Goal:
Enhance the secureBallot voting system by implementing robust security, transparency, and flexibility features.

🔐 1. Implement Two-Factor Authentication (2FA)

Add an optional 2FA layer for voters during login or before vote submission.
Requirements:

Support email-based OTP (one-time password).

OTP expires in 2–5 minutes.

Voter cannot proceed without successful OTP validation.

Log all 2FA attempts for security auditing.

🔍 2. Add End-to-End Verifiability

Ensure voters can verify their vote is counted without revealing vote identity.
Requirements:

Generate an encrypted vote token for each cast vote.

Store hashes or Merkle-proof structure for public verifiable logs.

Provide a verification page where voters can check their token.

Maintain ballot secrecy (no mapping to voter identity).

⚙️ 3. Election Settings / Configurable Parameters UI

Create a configuration panel for the administrator.
Admin should be able to set:

Election start and end time

Voting window duration

Candidate list

Ballot type (single-choice, multi-choice, ranked-choice)

Optional quorum percentage

Allow/disable editing voter details

Also provide a simple JSON export/import for election configuration.

🎫 4. Voting Receipt + Audit UI

After vote submission, provide a secure digital receipt.
Requirements:

Generate a unique, non-identifiable receipt ID (cryptographic hash).

Voter can later enter the receipt ID in an "Audit Page" to confirm inclusion.

Admin can see a list of receipts without knowing who cast them.

Receipts should be tamper-evident.

📥📤 5. Import / Export Voter List

Add bulk management of voter registration data.
Requirements:

Allow admin to import CSV containing (name, email, voterID, age).

Validate data before importing.

Allow secure export of the full voter list as CSV.

Indicate duplicate or invalid voter entries.

🎯 Expected Output

Implement these features in modular form:

Clean UI components

Secure backend logic

Clear comments and documentation

Non-blocking error handling

Maintain compatibility with existing secureBallot structure

Use best practices for cryptography, privacy, and UX
secureBallot/
├── index.html              (Main HTML file with all pages)
├── css/
│   └── style.css          (All styling and responsive design)
├── js/
│   ├── voter.js           (Voter registration logic)
│   ├── candidate.js       (Candidate registration logic)
│   ├── voting.js          (Voting functionality)
│   └── results.js         (Results display and statistics)
├── assets/
│   └── images/            (For future images/logos)
├── run.bat                (Quick launch script)
└── README.md              (This file)
```

## 🚀 How to Run

### Method 1: Using Batch File (Easiest)
1. Navigate to the secureBallot folder
2. Double-click `run.bat`
3. Website opens automatically in your browser

### Method 2: Manual
1. Double-click `index.html`
2. Website opens in your default browser

### Method 3: Using Web Server
```powershell
# Navigate to folder
cd "c:\Users\ganes\OneDrive\Pictures\Documents\Desktop\New folder (2)\secureBallot"

# Using Python (if installed)
python -m http.server 8000

# Then open browser and go to: http://localhost:8000
```

## 📝 How to Use

### 1. Register Candidates
- Click "Register as Candidate"
- Enter candidate name, party, symbol, and biography
- Click "Register Candidate"
- View all registered candidates below

### 2. Register Voters
- Click "Register as Voter"
- Enter voter details (name, email, age, voter ID)
- Click "Register as Voter"
- View all registered voters below

### 3. Cast Your Vote
- Click "Cast Your Vote"
- Enter your Voter ID
- Select your preferred candidate
- Click "Cast Vote"
- ✅ Your vote is recorded!

### 4. View Results
- Click "View Results"
- See live results with vote counts and percentages
- View voting statistics and turnout
- See rankings (🥇 Gold, 🥈 Silver, 🥉 Bronze)

## 💾 Data Storage

All data is stored locally in your browser using **localStorage**:
- Candidates data
- Voters data
- Vote counts

**Note**: Data persists until you clear browser cache or use developer tools.

## 🎨 Design Features

- 🎯 Modern, clean interface
- 📱 Fully responsive design (works on mobile & desktop)
- 🎨 Beautiful gradient backgrounds
- ⚡ Smooth animations and transitions
- 🔐 Secure voter authentication (Voter ID based)
- 📊 Real-time results display

## 🔒 Security Features

✅ Voter ID validation - Only registered voters can vote
✅ One vote per voter - Prevents multiple voting
✅ Data validation - All form fields are validated
✅ Real-time statistics - Track voter turnout

## 🌐 Browser Compatibility

- ✅ Chrome/Edge
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

## 📊 Sample Data

To test the website:
1. Register 2-3 candidates with different parties
2. Register 5-10 voters with different voter IDs
3. Cast votes for different candidates
4. View the results

## ⚙️ Customization

### Change Colors
Edit `css/style.css` and modify the `:root` variables:
```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #7c3aed;
    --success-color: #10b981;
    ...
}
```

### Add Your Logo
1. Place image in `assets/images/`
2. Edit `index.html` header to add logo

### Modify Styling
Edit `css/style.css` to customize fonts, sizes, colors, and layout

## 📱 Tips

- Use meaningful voter IDs (e.g., VID-00001, VID-00002)
- Register candidates before allowing voting
- Check results page for live statistics
- Data persists in browser - no server needed!

## 🐛 Troubleshooting

**Issue: Website not opening**
- Solution: Double-click `index.html` manually

**Issue: Data not saving**
- Solution: Check if localStorage is enabled in browser

**Issue: Styling looks broken**
- Solution: Clear browser cache (Ctrl+Shift+Delete) and refresh

## 📞 Support

For issues or improvements, you can:
- Clear browser storage and restart
- Check browser console for errors (F12)
- Verify all files are in correct folders

## 📄 License

Free to use and modify for your voting needs!

---

**Created:** November 19, 2025
**Version:** 1.0
**Status:** Ready to Use ✅

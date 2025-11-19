# secureBallot - Voting System Website

A modern, secure, and user-friendly voting platform for fair and transparent elections.

## 🌟 Features

✅ **Homepage** - Welcome page with navigation to all sections
✅ **Candidate Registration** - Register candidates with party info and biography
✅ **Voter Registration** - Register voters with validation
✅ **Cast Your Vote** - Secure voting interface with candidate selection
✅ **Results Page** - Live results with statistics and voting turnout

## 📁 Project Structure

```
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

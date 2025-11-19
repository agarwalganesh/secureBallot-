// ========== Demo & Tutorial Mode ==========
// Provides guided walkthroughs and sample data for learning

let demoMode = false;

// Load sample/demo data
function loadDemoData() {
    if (confirm('🎯 Load Demo Data?\n\nThis will add sample candidates, voters, and settings.\n\nContinue?')) {
        // Sample candidates
        const sampleCandidates = [
            {
                id: Date.now() + 1,
                name: 'Alice Johnson',
                party: 'Democratic Party',
                symbol: 'Donkey',
                bio: 'Experienced politician with 10 years in public service',
                votes: 0
            },
            {
                id: Date.now() + 2,
                name: 'Bob Smith',
                party: 'Republican Party',
                symbol: 'Elephant',
                bio: 'Business leader focused on economic growth',
                votes: 0
            },
            {
                id: Date.now() + 3,
                name: 'Carol White',
                party: 'Green Party',
                symbol: 'Leaf',
                bio: 'Environmental advocate and sustainability expert',
                votes: 0
            }
        ];

        // Sample voters
        const sampleVoters = [
            {
                id: Date.now() + 101,
                name: 'John Doe',
                email: 'john@example.com',
                age: 28,
                voterId: 'DEMO-001',
                hasVoted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: Date.now() + 102,
                name: 'Jane Smith',
                email: 'jane@example.com',
                age: 35,
                voterId: 'DEMO-002',
                hasVoted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            },
            {
                id: Date.now() + 103,
                name: 'Mike Johnson',
                email: 'mike@example.com',
                age: 42,
                voterId: 'DEMO-003',
                hasVoted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }
        ];

        // Save to localStorage
        localStorage.setItem('candidates', JSON.stringify(sampleCandidates));
        localStorage.setItem('voters', JSON.stringify(sampleVoters));

        // Update global vars
        window.candidates = sampleCandidates;
        window.voters = sampleVoters;

        // Update homepage
        updateHomepageStats && updateHomepageStats();
        displayCandidates && displayCandidates();
        displayVoters && displayVoters();

        showAlert && showAlert(
            `✅ Demo Data Loaded!\n\n3 Candidates added (Alice, Bob, Carol)\n3 Voters added (John, Jane, Mike)\n\nYou can now test voting, 2FA, receipts, and audits!\n\nTry: Go to "🔐 Cast Vote (Secure)" → Use email "john@example.com"`,
            'success'
        );

        demoMode = true;
    }
}

// Clear all data
function clearAllData() {
    if (confirm('⚠️ Clear All Data?\n\nThis will delete all candidates, voters, votes, receipts, and settings.\n\nThis cannot be undone. Continue?')) {
        const confirmAgain = prompt('Type "YES" to confirm clearing all data:');
        if (confirmAgain === 'YES') {
            localStorage.clear();
            window.candidates = [];
            window.voters = [];
            location.reload();
            showAlert && showAlert('✅ All data cleared. Page reloading...', 'success');
        }
    }
}

// Interactive tutorial
function startTutorial() {
    const tutorialSteps = [
        {
            title: '👋 Welcome to secureBallot!',
            message: 'This tutorial will walk you through all features step-by-step.',
            action: 'Next'
        },
        {
            title: '🎯 Step 1: Register Candidates',
            message: 'Candidates are the people running for election.\n\nGo to "Candidate Registration" and fill in:\n- Full Name\n- Party Name\n- Party Symbol (e.g., Lion, Tiger)\n- Biography\n\nThen click "Register Candidate"',
            action: 'Go to Candidates',
            callback: () => navigateTo && navigateTo('candidateReg')
        },
        {
            title: '👥 Step 2: Register Voters',
            message: 'Voters are the people who can vote.\n\nGo to "Voter Registration" and fill in:\n- Full Name\n- Email (will be used for 2FA)\n- Age (must be ≥18)\n- Voter ID (unique identifier)\n\nThen click "Register as Voter"',
            action: 'Go to Voters',
            callback: () => navigateTo && navigateTo('voterReg')
        },
        {
            title: '⚙️ Step 3: Configure Election',
            message: 'Set up your election parameters.\n\nGo to "Admin Panel" and:\n- Set election name\n- Set start/end times (optional)\n- Choose ballot type\n- Set other options\n- Click "Save Settings"',
            action: 'Go to Settings',
            callback: () => navigateTo && navigateTo('adminSettings')
        },
        {
            title: '🔐 Step 4: Vote with 2FA',
            message: 'Voters can now vote securely!\n\nGo to "🔐 Cast Vote (Secure)":\n1. Enter email of registered voter\n2. Click "Send OTP"\n3. Enter the OTP (shown on screen)\n4. Select a candidate\n5. Click "Cast Vote"\n\nYou\'ll receive a Receipt ID to verify later!',
            action: 'Go to Vote',
            callback: () => navigateTo && navigateTo('votingSecure')
        },
        {
            title: '🎫 Step 5: Verify Your Vote',
            message: 'Voters can verify their vote was counted.\n\nGo to "🎫 Verify Receipt":\n1. Enter your Receipt ID (from vote)\n2. Click "Verify Receipt"\n3. Confirm your vote is in the ledger\n\nYour privacy is protected - receipt doesn\'t show your identity!',
            action: 'Go to Verify',
            callback: () => navigateTo && navigateTo('verifyReceipt')
        },
        {
            title: '📊 Step 6: View Results',
            message: 'See live election results!\n\nGo to "📊 View Results":\n- See vote counts for each candidate\n- View vote percentages\n- Check voter turnout\n- See candidate rankings',
            action: 'Go to Results',
            callback: () => navigateTo && navigateTo('results')
        },
        {
            title: '📥 Step 7: Bulk Manage Voters',
            message: 'Import multiple voters at once!\n\nGo to "📥 Bulk Voter Management":\n1. Download sample CSV\n2. Fill with voter data\n3. Upload CSV\n4. System validates & imports\n5. View import history\n\nAlso export voters as CSV!',
            action: 'Go to Bulk Manage',
            callback: () => navigateTo && navigateTo('voterBulkManage')
        },
        {
            title: '📊 Step 8: Admin Audit',
            message: 'Monitor security events!\n\nGo to "📊 Admin Audit Dashboard":\n- View 2FA audit log (login attempts)\n- View voting receipts ledger (anonymous)\n- Export audit data as CSV\n- Monitor security\n\nComplete transparency & security!',
            action: 'Go to Audit',
            callback: () => navigateTo && navigateTo('adminAudit')
        },
        {
            title: '🎉 Tutorial Complete!',
            message: 'You now know all the features of secureBallot!\n\nKey Takeaways:\n✅ Register candidates & voters\n✅ Configure elections\n✅ Vote securely with 2FA\n✅ Verify votes anonymously\n✅ View results in real-time\n✅ Manage voters in bulk\n✅ Audit for compliance\n\nStart by loading demo data or registering your own!',
            action: 'Load Demo Data',
            callback: () => loadDemoData()
        }
    ];

    let currentStep = 0;

    function showStep(stepIndex) {
        currentStep = stepIndex;
        const step = tutorialSteps[stepIndex];

        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
        `;

        const dialog = document.createElement('div');
        dialog.style.cssText = `
            background: white;
            padding: 28px 36px;
            border-radius: 12px;
            max-width: 540px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            text-align: center;
            color: #1f2937;
        `;

        const title = document.createElement('h2');
        title.style.marginTop = '0';
        title.textContent = step.title;

        const msg = document.createElement('p');
        msg.style.whiteSpace = 'pre-wrap';
        msg.style.lineHeight = '1.6';
        msg.style.color = '#4b5563';
        msg.style.margin = '18px 0';
        msg.textContent = step.message;

        const buttons = document.createElement('div');
        buttons.style.cssText = 'display:flex; gap:10px; justify-content:center; margin-top:18px; flex-wrap:wrap;';

        // Back button
        if (stepIndex > 0) {
            const backBtn = document.createElement('button');
            backBtn.textContent = '← Back';
            backBtn.style.cssText = 'background:#e5e7eb; color:#1f2937; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:bold;';
            backBtn.addEventListener('click', () => {
                overlay.remove();
                showStep(stepIndex - 1);
            });
            buttons.appendChild(backBtn);
        }

        // Skip button
        const skipBtn = document.createElement('button');
        skipBtn.textContent = 'Skip';
        skipBtn.style.cssText = 'background:#ef4444; color:white; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:bold;';
        skipBtn.addEventListener('click', () => overlay.remove());
        buttons.appendChild(skipBtn);

        // Action button (primary)
        const actionBtn = document.createElement('button');
        actionBtn.textContent = step.action || 'Action';
        actionBtn.style.cssText = 'background:#3b82f6; color:white; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:bold;';
        actionBtn.addEventListener('click', () => {
            try {
                if (typeof step.callback === 'function') step.callback();
            } catch (e) {
                console.error('Tutorial action callback error:', e);
            }
            overlay.remove();
        });
        buttons.appendChild(actionBtn);

        // Next button
        if (stepIndex < tutorialSteps.length - 1) {
            const nextBtn = document.createElement('button');
            nextBtn.textContent = 'Next →';
            nextBtn.style.cssText = 'background:#10b981; color:white; border:none; padding:10px 18px; border-radius:6px; cursor:pointer; font-weight:bold;';
            nextBtn.addEventListener('click', () => {
                overlay.remove();
                showStep(stepIndex + 1);
            });
            buttons.appendChild(nextBtn);
        }

        const footer = document.createElement('p');
        footer.style.cssText = 'font-size:0.85em; color:#9ca3af; margin-top:16px; margin-bottom:0;';
        footer.textContent = `Step ${stepIndex + 1} of ${tutorialSteps.length}`;

        dialog.appendChild(title);
        dialog.appendChild(msg);
        dialog.appendChild(buttons);
        dialog.appendChild(footer);

        overlay.appendChild(dialog);
        document.body.appendChild(overlay);
    }

    showStep(currentStep);
}

// Help system with tooltips
function showHelp(topic) {
    const helpTopics = {
        '2fa': 'Two-Factor Authentication (2FA) adds an extra security layer. Voters receive an email OTP (One-Time Password) before voting. This ensures only authorized voters can cast votes. OTP expires in 5 minutes.',
        'receipt': 'Vote Receipt is a unique ID you receive after voting. You can use it later to verify that your vote was counted in the election ledger. Your receipt doesn\'t reveal your identity - your privacy is protected!',
        'audit': 'Audit logs track all security events: login attempts, voting receipts, etc. Admins can view and export these logs for compliance and transparency. All data is anonymous.',
        'quorum': 'Quorum is the minimum percentage of voters that must participate for election to be valid. Set to 0% for no minimum requirement.',
        'ballot-type': 'Ballot Type determines voting rules: Single-Choice (pick 1), Multi-Choice (pick multiple), Ranked-Choice (prioritize candidates).',
        'csv-import': 'CSV Import lets you bulk-add voters from a spreadsheet. File format: name, email, voterId, age. System validates age (≥18), email format, and prevents duplicates.'
    };

    const message = helpTopics[topic] || 'Help topic not found.';
    showAlert && showAlert(`ℹ️ Help\n\n${message}`, 'info');
}

// Feature guide overlay
function showFeatureGuide() {
    const features = `
🗳️ SECUREBALL OT - FEATURE GUIDE

🎯 VOTER FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Register as Voter - Provide name, email, age, voter ID
• Vote Securely - Use 2FA (OTP) for secure voting
• Verify Receipt - Check your vote receipt after voting
• View Results - See live election results anytime

⚙️ ADMIN FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Register Candidates - Add candidates with party details
• Admin Panel - Configure election settings & timing
• Bulk Voter Management - Import/export voters via CSV
• Admin Audit Dashboard - View 2FA logs & voting receipts

🔐 SECURITY FEATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• 2FA OTP - Email-based one-time password verification
• Vote Receipts - Encrypted, verifiable vote tokens
• Audit Logging - Complete security event tracking
• Ballot Secrecy - Votes anonymous, verified privately

💡 QUICK TIPS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. Start with "Load Demo Data" to see examples
2. Go through "Tutorial" for step-by-step guidance
3. Read tooltips (ℹ️ icons) for detailed help
4. All data stored locally - no cloud/internet needed
5. Export election config to backup/share setup
    `;

    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 30px;
        border-radius: 10px;
        max-width: 600px;
        max-height: 80vh;
        overflow-y: auto;
        z-index: 2000;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
    `;

    modal.innerHTML = `
        <button onclick="this.parentElement.remove()" style="
            position: absolute;
            top: 10px;
            right: 15px;
            background: none;
            border: none;
            font-size: 1.5em;
            cursor: pointer;
            color: #999;
        ">✕</button>
        <pre style="
            white-space: pre-wrap;
            word-wrap: break-word;
            font-family: monospace;
            font-size: 0.9em;
            color: #333;
            line-height: 1.6;
        ">${features}</pre>
        <button onclick="this.parentElement.remove()" style="
            width: 100%;
            background: #3b82f6;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            margin-top: 15px;
        ">Close</button>
    `;

    document.body.appendChild(modal);

    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        z-index: 1999;
    `;
    overlay.onclick = () => {
        modal.remove();
        overlay.remove();
    };
    document.body.appendChild(overlay);
}

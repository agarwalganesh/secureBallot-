// ========== 2FA (Two-Factor Authentication) Module ==========
// Supports email-based OTP for voters before vote submission
// OTP expires in 5 minutes, with audit logging

let otpStore = JSON.parse(localStorage.getItem('otpStore')) || {};
let twoFAAuditLog = JSON.parse(localStorage.getItem('twoFAAuditLog')) || [];

// Generate a random 6-digit OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP to voter (simulated - in production use email service)
function sendOTP(voterEmail) {
    // Basic validation
    if (!voterEmail || typeof voterEmail !== 'string') {
        showAlert && showAlert('❌ Please enter a valid email address.', 'error');
        return null;
    }

    // Ensure email belongs to a registered voter (demo behavior)
    const registered = (window.voters || []).some(v => v.email === voterEmail);
    if (!registered) {
        showAlert && showAlert('❌ Email not found. Please register as a voter first.', 'error');
        logTwoFAAttempt(voterEmail, 'OTP_SEND_FAIL', false, 'Email not registered');
        return null;
    }

    const otp = generateOTP();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    otpStore[voterEmail] = {
        otp: otp,
        expiresAt: expiresAt,
        attempts: 0,
        sentAt: new Date().toISOString()
    };

    localStorage.setItem('otpStore', JSON.stringify(otpStore));

    // Log OTP send attempt
    logTwoFAAttempt(voterEmail, 'OTP_SENT', true);

    // Simulated display (in production, send via email)
    const message = `📧 OTP sent to ${voterEmail}!\n\n(Demo: Your OTP is ${otp})\n\nOTP expires in 5 minutes.`;
    showAlert && showAlert(message, 'info');

    return otp; // Return for demo/testing purposes
}

// Validate OTP
function validateOTP(voterEmail, inputOTP) {
    const record = otpStore[voterEmail];

    if (!record) {
        logTwoFAAttempt(voterEmail, 'OTP_VALIDATE_FAIL', false, 'No OTP found');
        return { valid: false, message: '❌ No OTP sent. Request a new one.' };
    }

    if (Date.now() > record.expiresAt) {
        logTwoFAAttempt(voterEmail, 'OTP_EXPIRED', false, 'OTP expired');
        delete otpStore[voterEmail];
        localStorage.setItem('otpStore', JSON.stringify(otpStore));
        return { valid: false, message: '❌ OTP expired. Request a new one.' };
    }

    if (record.attempts >= 3) {
        logTwoFAAttempt(voterEmail, 'OTP_LOCKED', false, 'Too many attempts');
        return { valid: false, message: '❌ Too many failed attempts. Request a new OTP.' };
    }

    if (record.otp !== inputOTP) {
        record.attempts++;
        localStorage.setItem('otpStore', JSON.stringify(otpStore));
        logTwoFAAttempt(voterEmail, 'OTP_VALIDATE_FAIL', false, `Wrong OTP (attempt ${record.attempts}/3)`);
        return { valid: false, message: `❌ Incorrect OTP. Attempt ${record.attempts}/3.` };
    }

    // OTP is valid
    logTwoFAAttempt(voterEmail, 'OTP_VALIDATE_SUCCESS', true);
    delete otpStore[voterEmail];
    localStorage.setItem('otpStore', JSON.stringify(otpStore));

    return { valid: true, message: '✅ OTP verified successfully!' };
}

// Log 2FA attempts for audit
function logTwoFAAttempt(voterEmail, eventType, success, details = '') {
    const logEntry = {
        timestamp: new Date().toISOString(),
        voterEmail: voterEmail,
        eventType: eventType,
        success: success,
        details: details
    };
    twoFAAuditLog.push(logEntry);
    localStorage.setItem('twoFAAuditLog', JSON.stringify(twoFAAuditLog));
}

// View 2FA audit log (admin only)
function display2FAAuditLog() {
    const container = document.getElementById('twoFAAuditContainer');
    if (!container) return;

    if (twoFAAuditLog.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No 2FA audit log entries yet.</p>';
        return;
    }

    let html = '<h3>🔐 2FA Audit Log</h3>';
    html += '<table style="width:100%; border-collapse:collapse; font-size:0.9em;">';
    html += '<tr style="border-bottom:2px solid #ddd;"><th style="text-align:left;padding:8px;">Timestamp</th><th style="text-align:left;padding:8px;">Email</th><th style="text-align:left;padding:8px;">Event</th><th style="text-align:left;padding:8px;">Status</th><th style="text-align:left;padding:8px;">Details</th></tr>';

    twoFAAuditLog.slice().reverse().forEach(log => {
        const status = log.success ? '✅ Success' : '❌ Failed';
        const statusColor = log.success ? '#10b981' : '#ef4444';
        html += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px;">${new Date(log.timestamp).toLocaleString()}</td>
                <td style="padding:8px;">${log.voterEmail}</td>
                <td style="padding:8px;">${log.eventType}</td>
                <td style="padding:8px; color:${statusColor}; font-weight:bold;">${status}</td>
                <td style="padding:8px;">${log.details}</td>
            </tr>
        `;
    });

    html += '</table>';
    container.innerHTML = html;
}

// Clear 2FA audit log (admin)
function clear2FAAuditLog() {
    if (confirm('Clear all 2FA audit log entries?')) {
        twoFAAuditLog = [];
        localStorage.setItem('twoFAAuditLog', JSON.stringify(twoFAAuditLog));
        showAlert && showAlert('✅ 2FA audit log cleared.', 'success');
        display2FAAuditLog();
    }
}

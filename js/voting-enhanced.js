// ========== Enhanced Voting with 2FA Integration ==========
// Integrates 2FA verification with the vote casting flow

let voterOTPValidation = {}; // Track which voters passed 2FA

function validateAndContinueVoting() {
    const email = document.getElementById('twoFAEmail').value;
    const otp = document.getElementById('otpInput').value;

    if (!email || !otp) {
        showAlert && showAlert('❌ Please enter both email and OTP.', 'error');
        return;
    }

    const result = validateOTP(email, otp);

    if (!result.valid) {
        showAlert && showAlert(result.message, 'error');
        return;
    }

    // Mark this email as OTP-validated
    voterOTPValidation[email] = {
        validated: true,
        timestamp: Date.now(),
        expiresAt: Date.now() + 15 * 60 * 1000 // 15-minute window to cast vote
    };

    showAlert && showAlert(result.message, 'success');

    // Navigate to voting page after successful 2FA
    setTimeout(() => {
        navigateTo('voting');
        document.getElementById('votingVoterId').focus();
    }, 2000);
}

// Attach enhanced voting behavior (wrap original castVote to enforce 2FA)
function attachEnhancedCastVote() {
    if (typeof window.castVote !== 'function') {
        // If original castVote not yet defined, try again shortly
        setTimeout(attachEnhancedCastVote, 150);
        return;
    }

    const original = window.castVote;

    window.castVote = function(event) {
        try {
            event.preventDefault();
        } catch (e) {
            // If event is not provided, continue
        }

        const voterIdEl = document.getElementById('votingVoterId');
        const voterId = voterIdEl ? voterIdEl.value : null;
        const voter = (window.voters || []).find(v => v.voterId === voterId);

        if (!voter) {
            showAlert && showAlert('❌ Invalid Voter ID! Please register first.', 'error');
            return;
        }

        // Check if 2FA was passed for this voter's email
        const validation = voterOTPValidation[voter.email];
        if (!validation || !validation.validated || Date.now() > validation.expiresAt) {
            showAlert && showAlert('❌ Please complete 2FA verification first. Go to "Secure Voting (2FA)" page.', 'error');
            navigateTo('votingSecure');
            return;
        }

        // If 2FA passed, call the original castVote (which handles selection and marking)
        try {
            original.call(window, event);
        } catch (err) {
            console.error('Error calling original castVote:', err);
            showAlert && showAlert('❌ An error occurred while casting your vote. See console for details.', 'error');
        }

        // Cleanup validation after successful attempt
        delete voterOTPValidation[voter.email];
    };
}

// Start the attach process when scripts are ready
attachEnhancedCastVote();

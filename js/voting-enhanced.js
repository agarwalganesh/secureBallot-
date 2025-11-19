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

// Enhanced castVote with 2FA check
const originalCastVote = window.castVote;

window.castVote = function(event) {
    event.preventDefault();

    const voterId = document.getElementById('votingVoterId').value;
    const voter = voters.find(v => v.voterId === voterId);

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

    // Call original castVote logic
    const selectedCandidateId = parseInt(document.querySelector('input[name="selectedCandidate"]:checked').value);
    const candidate = candidates.find(c => c.id === selectedCandidateId);

    if (!candidate) {
        showAlert && showAlert('❌ Please select a candidate.', 'error');
        return;
    }

    if (voter.hasVoted) {
        showAlert && showAlert('❌ You have already voted!', 'error');
        return;
    }

    // Cast vote
    candidate.votes++;
    localStorage.setItem('candidates', JSON.stringify(candidates));

    voter.hasVoted = true;
    localStorage.setItem('voters', JSON.stringify(voters));

    // Generate receipt
    const receipt = generateVotingReceipt(voter.voterId, candidate.name);

    // Show receipt to voter
    displayVotingReceiptToVoter(receipt);

    // Log and cleanup
    delete voterOTPValidation[voter.email];

    showAlert && showAlert(`✅ Your vote for ${candidate.name} has been recorded successfully!`, 'success');
    document.getElementById('votingForm').reset();
    displayCandidatesForVoting();
    updateHomepageStats && updateHomepageStats();
};

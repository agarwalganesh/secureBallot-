// Navigation function
function navigateTo(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    // Refresh data based on page
    if (pageId === 'candidateReg') {
        displayCandidates();
    } else if (pageId === 'voterReg') {
        // keep voter registration page focused on the form only
        // Also refresh the registered voters preview so admins/users can see current list
        displayVoters && displayVoters();
    } else if (pageId === 'manageUsers') {
        displayVoters();
    } else if (pageId === 'voting') {
        displayCandidatesForVoting();
    } else if (pageId === 'votingSecure') {
        // 2FA page - load settings if needed
    } else if (pageId === 'verifyReceipt') {
        // Receipt verification page
    } else if (pageId === 'adminSettings') {
        loadSettingsForm && loadSettingsForm();
    } else if (pageId === 'voterBulkManage') {
        displayVoterImportLog && displayVoterImportLog();
    } else if (pageId === 'adminAudit') {
        display2FAAuditLog && display2FAAuditLog();
        displayVotingReceiptsAdmin && displayVotingReceiptsAdmin();
    } else if (pageId === 'results') {
        displayResults();
    } else if (pageId === 'homepage') {
        updateHomepageStats();
    }
}

// Update homepage statistics
function updateHomepageStats() {
    const candidates = JSON.parse(localStorage.getItem('candidates')) || [];
    const voters = JSON.parse(localStorage.getItem('voters')) || [];
    const totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);

    document.getElementById('stat-candidates').textContent = candidates.length;
    document.getElementById('stat-voters').textContent = voters.length;
    document.getElementById('stat-votes').textContent = totalVotes;
}

// Show alert message
function showAlert(message, type = 'success') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    const container = document.querySelector('.container');
    container.insertBefore(alertDiv, container.firstChild);
    
    setTimeout(() => alertDiv.remove(), 4000);
}

// Scroll to section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Initialize - Show homepage on load
window.addEventListener('load', () => {
    navigateTo('homepage');
    updateHomepageStats();
});

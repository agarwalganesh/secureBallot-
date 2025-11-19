// ========== Election Settings / Configuration Module ==========
// Admin panel to configure election parameters and ballot types

let electionSettings = JSON.parse(localStorage.getItem('electionSettings')) || {
    electionName: 'General Election 2025',
    startTime: '',
    endTime: '',
    ballotType: 'single-choice', // single-choice, multi-choice, ranked-choice
    quorumPercentage: 0,
    allowVoterEditDetails: true,
    maxCandidateSelections: 1,
    allowAbstain: false,
    isActive: false
};

// Save election settings
function saveElectionSettings(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('electionName')?.value || electionSettings.electionName;
    const startTime = document.getElementById('electionStartTime')?.value || '';
    const endTime = document.getElementById('electionEndTime')?.value || '';
    const ballotType = document.getElementById('ballotType')?.value || 'single-choice';
    const quorum = parseInt(document.getElementById('quorumPercentage')?.value || 0);
    const allowEdit = document.getElementById('allowVoterEdit')?.checked ?? true;
    const maxSelections = parseInt(document.getElementById('maxCandidateSelections')?.value || 1);
    const allowAbstain = document.getElementById('allowAbstain')?.checked ?? false;

    electionSettings = {
        electionName: name,
        startTime: startTime,
        endTime: endTime,
        ballotType: ballotType,
        quorumPercentage: quorum,
        allowVoterEditDetails: allowEdit,
        maxCandidateSelections: maxSelections,
        allowAbstain: allowAbstain,
        isActive: electionSettings.isActive,
        lastModified: new Date().toISOString()
    };

    localStorage.setItem('electionSettings', JSON.stringify(electionSettings));
    showAlert && showAlert('✅ Election settings saved successfully.', 'success');
    displayElectionSettings();
}

// Display current election settings
function displayElectionSettings() {
    const container = document.getElementById('electionSettingsDisplay');
    if (!container) return;

    let html = '<h3>⚙️ Current Election Settings</h3>';
    html += `<p><strong>Name:</strong> ${electionSettings.electionName}</p>`;
    html += `<p><strong>Start Time:</strong> ${electionSettings.startTime || '—'}</p>`;
    html += `<p><strong>End Time:</strong> ${electionSettings.endTime || '—'}</p>`;
    html += `<p><strong>Ballot Type:</strong> ${electionSettings.ballotType.replace('-', ' ').toUpperCase()}</p>`;
    html += `<p><strong>Quorum Required:</strong> ${electionSettings.quorumPercentage}%</p>`;
    html += `<p><strong>Allow Voter Edit:</strong> ${electionSettings.allowVoterEditDetails ? '✅ Yes' : '❌ No'}</p>`;
    html += `<p><strong>Max Selections:</strong> ${electionSettings.maxCandidateSelections}</p>`;
    html += `<p><strong>Allow Abstain:</strong> ${electionSettings.allowAbstain ? '✅ Yes' : '❌ No'}</p>`;
    if (electionSettings.lastModified) {
        html += `<p style="font-size:0.9em; color:#666;"><strong>Last Modified:</strong> ${new Date(electionSettings.lastModified).toLocaleString()}</p>`;
    }

    container.innerHTML = html;
}

// Load settings form for editing
function loadSettingsForm() {
    if (document.getElementById('electionName')) {
        document.getElementById('electionName').value = electionSettings.electionName;
    }
    if (document.getElementById('electionStartTime')) {
        document.getElementById('electionStartTime').value = electionSettings.startTime || '';
    }
    if (document.getElementById('electionEndTime')) {
        document.getElementById('electionEndTime').value = electionSettings.endTime || '';
    }
    if (document.getElementById('ballotType')) {
        document.getElementById('ballotType').value = electionSettings.ballotType;
    }
    if (document.getElementById('quorumPercentage')) {
        document.getElementById('quorumPercentage').value = electionSettings.quorumPercentage;
    }
    if (document.getElementById('allowVoterEdit')) {
        document.getElementById('allowVoterEdit').checked = electionSettings.allowVoterEditDetails;
    }
    if (document.getElementById('maxCandidateSelections')) {
        document.getElementById('maxCandidateSelections').value = electionSettings.maxCandidateSelections;
    }
    if (document.getElementById('allowAbstain')) {
        document.getElementById('allowAbstain').checked = electionSettings.allowAbstain;
    }

    displayElectionSettings();
}

// Export election configuration as JSON
function exportElectionConfig() {
    const config = {
        settings: electionSettings,
        candidates: JSON.parse(localStorage.getItem('candidates')) || [],
        voters: JSON.parse(localStorage.getItem('voters')) || [],
        exportTime: new Date().toISOString()
    };

    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `election-config-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert && showAlert('✅ Election configuration exported as JSON.', 'success');
}

// Import election configuration from JSON
function importElectionConfig(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const config = JSON.parse(event.target.result);

            if (config.settings) {
                electionSettings = config.settings;
                localStorage.setItem('electionSettings', JSON.stringify(electionSettings));
            }

            if (config.candidates) {
                localStorage.setItem('candidates', JSON.stringify(config.candidates));
            }

            if (config.voters) {
                localStorage.setItem('voters', JSON.stringify(config.voters));
            }

            showAlert && showAlert('✅ Election configuration imported successfully.', 'success');
            loadSettingsForm();
            displayCandidates && displayCandidates();
            displayVoters && displayVoters();

        } catch (err) {
            showAlert && showAlert('❌ Error importing configuration: ' + err.message, 'error');
        }
    };
    reader.readAsText(file);
}

// Check if election is within time window
function isElectionActive() {
    if (!electionSettings.startTime || !electionSettings.endTime) {
        return true; // No time restriction
    }

    const now = new Date();
    const start = new Date(electionSettings.startTime);
    const end = new Date(electionSettings.endTime);

    return now >= start && now <= end;
}

// Initialize settings form on page load
window.addEventListener('load', () => {
    if (document.getElementById('electionName')) {
        loadSettingsForm();
    }
});

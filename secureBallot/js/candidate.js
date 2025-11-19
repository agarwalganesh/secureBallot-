// Candidate Management
let candidates = JSON.parse(localStorage.getItem('candidates')) || [];

function registerCandidate(event) {
    event.preventDefault();

    const candidate = {
        id: Date.now(),
        name: document.getElementById('candidateName').value,
        party: document.getElementById('candidateParty').value,
        symbol: document.getElementById('candidateSymbol').value,
        bio: document.getElementById('candidateBio').value,
        votes: 0
    };

    candidates.push(candidate);
    localStorage.setItem('candidates', JSON.stringify(candidates));

    showAlert(`✅ ${candidate.name} registered successfully as a candidate!`, 'success');
    document.getElementById('candidateForm').reset();
    displayCandidates();
    updateHomepageStats();
}

function displayCandidates() {
    const candidateList = document.getElementById('candidateList');
    
    if (candidates.length === 0) {
        candidateList.innerHTML = '<p style="text-align: center; color: #999;">No candidates registered yet.</p>';
        return;
    }

    let html = '<h3>📋 Registered Candidates</h3>';
    candidates.forEach(candidate => {
        html += `
            <div class="candidate-item">
                <h4>🏛️ ${candidate.name}</h4>
                <p><strong>Party:</strong> ${candidate.party}</p>
                <p><strong>Symbol:</strong> ${candidate.symbol}</p>
                <p><strong>Bio:</strong> ${candidate.bio}</p>
                <p style="color: #10b981; font-weight: bold;">Votes: ${candidate.votes}</p>
                <button class="btn btn-primary" style="margin-top: 10px; font-size: 0.85em; padding: 8px 16px;" onclick="deleteCandidate(${candidate.id})">Delete</button>
            </div>
        `;
    });

    candidateList.innerHTML = html;
}

function deleteCandidate(id) {
    if (confirm('Are you sure you want to delete this candidate?')) {
        candidates = candidates.filter(c => c.id !== id);
        localStorage.setItem('candidates', JSON.stringify(candidates));
        showAlert('✅ Candidate deleted successfully', 'success');
        displayCandidates();
        updateHomepageStats();
    }
}

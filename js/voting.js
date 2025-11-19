// Voter Management
let voters = JSON.parse(localStorage.getItem('voters')) || [];

function registerVoter(event) {
    event.preventDefault();

    const voterId = document.getElementById('voterId').value;
    
    // Check if voter ID already exists
    if (voters.some(v => v.voterId === voterId)) {
        showAlert('❌ This Voter ID is already registered!', 'error');
        return;
    }

    const voter = {
        id: Date.now(),
        name: document.getElementById('voterName').value,
        email: document.getElementById('voterEmail').value,
        age: document.getElementById('voterAge').value,
        voterId: voterId,
        hasVoted: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };

    voters.push(voter);
    localStorage.setItem('voters', JSON.stringify(voters));

    showAlert(`✅ ${voter.name} registered successfully as a voter!`, 'success');
    document.getElementById('voterForm').reset();
    displayVoters();
    updateHomepageStats();
}

function displayVoters() {
    const voterList = document.getElementById('manageVoterList');
    
    if (voters.length === 0) {
        voterList.innerHTML = '<p style="text-align: center; color: #999;">No voters registered yet.</p>';
        return;
    }

    let html = '<h3>👥 Registered Voters</h3>';
    voters.forEach(voter => {
        const status = voter.hasVoted ? '✅ Voted' : '⏳ Not Voted';
        const statusColor = voter.hasVoted ? '#10b981' : '#f59e0b';
        const created = voter.createdAt ? new Date(voter.createdAt).toLocaleString() : '—';
        const updated = voter.updatedAt ? new Date(voter.updatedAt).toLocaleString() : '—';

        html += `
            <div class="voter-item">
                <h4>${voter.name}</h4>
                <p><strong>Email:</strong> ${voter.email}</p>
                <p><strong>Age:</strong> ${voter.age}</p>
                <p><strong>Voter ID:</strong> ${voter.voterId}</p>
                <p style="color: ${statusColor}; font-weight: bold;">${status}</p>
                <p style="font-size:0.9em; color:#666;"><strong>Registered:</strong> ${created} &nbsp; | &nbsp; <strong>Last Updated:</strong> ${updated}</p>
                <div style="margin-top:10px;">
                    <button class="btn btn-secondary" style="margin-right:8px;" onclick="editVoter(${voter.id})">Edit</button>
                    <button class="btn btn-primary" style="font-size: 0.85em; padding: 8px 16px;" onclick="deleteVoter(${voter.id})">Delete</button>
                </div>
            </div>
        `;
    });

    voterList.innerHTML = html;
}

function deleteVoter(id) {
    if (confirm('Are you sure you want to delete this voter?')) {
        voters = voters.filter(v => v.id !== id);
        localStorage.setItem('voters', JSON.stringify(voters));
        showAlert('✅ Voter deleted successfully', 'success');
        displayVoters();
        updateHomepageStats();
    }
}

function editVoter(id) {
    const voter = voters.find(v => v.id === id);
    if (!voter) return showAlert && showAlert('❌ Voter not found.', 'error');

    const newName = prompt('Full Name:', voter.name) || voter.name;
    const newEmail = prompt('Email:', voter.email) || voter.email;
    const newAge = prompt('Age:', voter.age) || voter.age;
    const newVoterId = prompt('Voter ID:', voter.voterId) || voter.voterId;

    // Basic duplicate check for voterId
    if (newVoterId !== voter.voterId && voters.some(v => v.voterId === newVoterId)) {
        return showAlert('❌ Another voter with that Voter ID already exists.', 'error');
    }

    voter.name = newName;
    voter.email = newEmail;
    voter.age = newAge;
    voter.voterId = newVoterId;
    voter.updatedAt = new Date().toISOString();

    localStorage.setItem('voters', JSON.stringify(voters));
    showAlert('✅ Voter details updated successfully', 'success');
    displayVoters();
    updateHomepageStats();
}

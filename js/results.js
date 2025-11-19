// Results and Voting Logic
function displayCandidatesForVoting() {
    const candidateOptions = document.getElementById('candidateOptions');
    
    if (candidates.length === 0) {
        candidateOptions.innerHTML = '<p style="text-align: center; color: #999;">No candidates available for voting.</p>';
        return;
    }

    let html = '';
    candidates.forEach(candidate => {
        html += `
            <div class="candidate-option">
                <label>
                    <input type="radio" name="selectedCandidate" value="${candidate.id}" required>
                    <div class="candidate-info">
                        <div class="candidate-name">${candidate.name}</div>
                        <div class="candidate-party">${candidate.party}</div>
                        <div style="font-size: 0.9em; margin-top: 5px;">⭐ ${candidate.symbol}</div>
                    </div>
                </label>
            </div>
        `;
    });

    candidateOptions.innerHTML = html;
}

function castVote(event) {
    event.preventDefault();

    const voterId = document.getElementById('votingVoterId').value;
    const selectedCandidateId = parseInt(document.querySelector('input[name="selectedCandidate"]:checked').value);

    // Find voter
    const voter = voters.find(v => v.voterId === voterId);
    
    if (!voter) {
        showAlert('❌ Invalid Voter ID! Please register first.', 'error');
        return;
    }

    if (voter.hasVoted) {
        showAlert('❌ You have already voted!', 'error');
        return;
    }

    // Find candidate and increment votes
    const candidate = candidates.find(c => c.id === selectedCandidateId);
    if (candidate) {
        candidate.votes++;
        localStorage.setItem('candidates', JSON.stringify(candidates));

        // Mark voter as voted
        voter.hasVoted = true;
        localStorage.setItem('voters', JSON.stringify(voters));

        showAlert(`✅ Your vote for ${candidate.name} has been recorded successfully!`, 'success');
        document.getElementById('votingForm').reset();
        displayCandidatesForVoting();
        updateHomepageStats();
    }
}

function displayResults() {
    const resultsContainer = document.getElementById('resultsContainer');
    const totalVotesDiv = document.getElementById('totalVotes');

    if (candidates.length === 0) {
        resultsContainer.innerHTML = '<p style="text-align: center; color: #999;">No candidates available.</p>';
        return;
    }

    // Sort candidates by votes (descending)
    const sortedCandidates = [...candidates].sort((a, b) => b.votes - a.votes);
    
    let totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    let resultsHtml = '<h3>📊 Live Voting Results</h3>';

    sortedCandidates.forEach((candidate, index) => {
        const percentage = totalVotes > 0 ? (candidate.votes / totalVotes * 100).toFixed(1) : 0;
        const medal = index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉';

        resultsHtml += `
            <div class="result-item">
                <div class="result-info">
                    <h4>${medal} ${candidate.name}</h4>
                    <p>Party: <strong>${candidate.party}</strong> | Symbol: <strong>${candidate.symbol}</strong></p>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${percentage}%;">
                            ${percentage}%
                        </div>
                    </div>
                </div>
                <div class="result-votes">${candidate.votes}</div>
            </div>
        `;
    });

    // Count votes cast vs registered voters
    const votesCast = voters.filter(v => v.hasVoted).length;
    const totalRegisteredVoters = voters.length;

    resultsContainer.innerHTML = resultsHtml;
    totalVotesDiv.innerHTML = `
        <h3>📈 Voting Statistics</h3>
        <p>Total Votes Cast: <strong>${totalVotes}</strong></p>
        <p>Voters Participated: <strong>${votesCast} / ${totalRegisteredVoters}</strong></p>
        <p>Voter Turnout: <strong>${totalRegisteredVoters > 0 ? (votesCast / totalRegisteredVoters * 100).toFixed(2) : 0}%</strong></p>
    `;
}

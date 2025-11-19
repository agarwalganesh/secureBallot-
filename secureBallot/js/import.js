// Import data from JSON or CSV file and merge into localStorage
document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('importFileInput');
    if (input) input.addEventListener('change', handleImportFile);
});

function handleImportFile(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(evt) {
        const text = evt.target.result;
        // Try JSON first
        try {
            const data = JSON.parse(text);
            importFromJSON(data);
            return;
        } catch (err) {
            // Not JSON, try CSV
        }

        // Try CSV parsing (simple): expecting headers for voters or candidates
        importFromCSV(text, file.name);
    };
    reader.readAsText(file);
}

function importFromJSON(data) {
    let importedCandidates = 0;
    let importedVoters = 0;

    // Ensure global arrays exist and are synced with localStorage
    window.candidates = window.candidates || JSON.parse(localStorage.getItem('candidates')) || [];
    window.voters = window.voters || JSON.parse(localStorage.getItem('voters')) || [];

    if (Array.isArray(data.candidates)) {
        data.candidates.forEach(c => {
            // basic duplicate check: name+party
            const exists = window.candidates.some(existing => existing.name === c.name && existing.party === c.party);
            if (!exists) {
                const candidate = {
                    id: c.id || Date.now() + Math.floor(Math.random() * 1000),
                    name: c.name || 'Unknown',
                    party: c.party || '',
                    symbol: c.symbol || '',
                    bio: c.bio || '',
                    votes: Number(c.votes) || 0
                };
                window.candidates.push(candidate);
                importedCandidates++;
            }
        });
        localStorage.setItem('candidates', JSON.stringify(window.candidates));
    }

    if (Array.isArray(data.voters)) {
        data.voters.forEach(v => {
            const exists = window.voters.some(existing => existing.voterId === v.voterId);
            if (!exists) {
                const voter = {
                    id: v.id || Date.now() + Math.floor(Math.random() * 1000),
                    name: v.name || '',
                    email: v.email || '',
                    age: v.age || '',
                    voterId: v.voterId || (`VID-${Date.now()}`),
                    hasVoted: !!v.hasVoted
                };
                window.voters.push(voter);
                importedVoters++;
            }
        });
        localStorage.setItem('voters', JSON.stringify(window.voters));
    }

    displayCandidates && displayCandidates();
    displayVoters && displayVoters();
    updateHomepageStats && updateHomepageStats();
    showAlert && showAlert(`✅ Imported ${importedCandidates} candidates and ${importedVoters} voters.`, 'success');
}

function importFromCSV(text, filename = '') {
    // Split into lines and detect header
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
    if (lines.length === 0) {
        showAlert && showAlert('❌ Empty file or invalid CSV.', 'error');
        return;
    }

    const header = lines[0].split(/,|;|\t/).map(h => h.trim().toLowerCase());

    // Heuristic: if header contains 'voterid' or 'email' -> voters; else if contains 'party' or 'symbol' -> candidates
    const isVoter = header.includes('voterid') || header.includes('email') || header.includes('age');
    const isCandidate = header.includes('party') || header.includes('symbol') || header.includes('bio');

    if (!isVoter && !isCandidate) {
        // attempt to parse as JSON fallback
        try {
            const data = JSON.parse(text);
            importFromJSON(data);
            return;
        } catch (err) {
            showAlert && showAlert('❌ Could not determine CSV type. Use JSON format or include headers.', 'error');
            return;
        }
    }

    // Parse CSV rows
    const rows = lines.slice(1).map(line => line.split(/,|;|\t/).map(cell => cell.trim()));

    window.candidates = window.candidates || JSON.parse(localStorage.getItem('candidates')) || [];
    window.voters = window.voters || JSON.parse(localStorage.getItem('voters')) || [];

    let imported = 0;

    if (isCandidate) {
        rows.forEach(cols => {
            const obj = {};
            header.forEach((h, i) => obj[h] = cols[i] || '');
            const exists = window.candidates.some(c => c.name === obj.name && c.party === obj.party);
            if (!exists) {
                const candidate = {
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    name: obj.name || 'Unknown',
                    party: obj.party || '',
                    symbol: obj.symbol || '',
                    bio: obj.bio || '',
                    votes: Number(obj.votes) || 0
                };
                window.candidates.push(candidate);
                imported++;
            }
        });
        localStorage.setItem('candidates', JSON.stringify(window.candidates));
    }

    if (isVoter) {
        rows.forEach(cols => {
            const obj = {};
            header.forEach((h, i) => obj[h] = cols[i] || '');
            const exists = window.voters.some(v => v.voterId === (obj.voterid || obj.voterId));
            if (!exists) {
                const voter = {
                    id: Date.now() + Math.floor(Math.random() * 1000),
                    name: obj.name || '',
                    email: obj.email || '',
                    age: obj.age || '',
                    voterId: obj.voterid || obj.voterId || (`VID-${Date.now()}`),
                    hasVoted: (obj.hasvoted || obj.hasVoted || '').toLowerCase() === 'true'
                };
                window.voters.push(voter);
                imported++;
            }
        });
        localStorage.setItem('voters', JSON.stringify(window.voters));
    }

    displayCandidates && displayCandidates();
    displayVoters && displayVoters();
    updateHomepageStats && updateHomepageStats();
    showAlert && showAlert(`✅ Imported ${imported} records from ${filename}.`, 'success');
}

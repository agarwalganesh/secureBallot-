// ========== Voter Import/Export Module ==========
// Bulk management of voter registration data with validation

let voterImportLog = JSON.parse(localStorage.getItem('voterImportLog')) || [];

// Import voters from CSV
function importVotersFromCSV(file) {
    const reader = new FileReader();
    reader.onload = function(event) {
        const text = event.target.result;
        const lines = text.split(/\r?\n/).map(l => l.trim()).filter(Boolean);

        if (lines.length < 2) {
            showAlert && showAlert('❌ CSV must have headers and at least one row.', 'error');
            return;
        }

        // Parse headers
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
        const nameIdx = headers.indexOf('name');
        const emailIdx = headers.indexOf('email');
        const voterIdIdx = headers.indexOf('voterid');
        const ageIdx = headers.indexOf('age');

        if (nameIdx === -1 || emailIdx === -1 || voterIdIdx === -1 || ageIdx === -1) {
            showAlert && showAlert('❌ CSV must include columns: name, email, voterId, age', 'error');
            return;
        }

        const currentVoters = JSON.parse(localStorage.getItem('voters')) || [];
        let imported = 0;
        let duplicates = 0;
        let invalid = 0;
        const errors = [];

        // Parse data rows
        for (let i = 1; i < lines.length; i++) {
            const cols = lines[i].split(',').map(c => c.trim());
            const name = cols[nameIdx] || '';
            const email = cols[emailIdx] || '';
            const voterId = cols[voterIdIdx] || '';
            const age = cols[ageIdx] || '';

            // Validation
            if (!name || !email || !voterId || !age) {
                invalid++;
                errors.push(`Row ${i + 1}: Missing required fields`);
                continue;
            }

            if (!email.includes('@')) {
                invalid++;
                errors.push(`Row ${i + 1}: Invalid email format`);
                continue;
            }

            const ageNum = parseInt(age);
            if (isNaN(ageNum) || ageNum < 18) {
                invalid++;
                errors.push(`Row ${i + 1}: Age must be >= 18`);
                continue;
            }

            // Check for duplicate voterId
            if (currentVoters.some(v => v.voterId === voterId)) {
                duplicates++;
                errors.push(`Row ${i + 1}: Voter ID "${voterId}" already exists`);
                continue;
            }

            // Add voter
            const voter = {
                id: Date.now() + Math.random(),
                name: name,
                email: email,
                age: ageNum,
                voterId: voterId,
                hasVoted: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            currentVoters.push(voter);
            imported++;
        }

        // Save
        localStorage.setItem('voters', JSON.stringify(currentVoters));

        // Log import
        const logEntry = {
            timestamp: new Date().toISOString(),
            filename: file.name,
            imported: imported,
            duplicates: duplicates,
            invalid: invalid,
            errors: errors
        };
        voterImportLog.push(logEntry);
        localStorage.setItem('voterImportLog', JSON.stringify(voterImportLog));

        // Update global voters if available
        if (typeof window.voters !== 'undefined') {
            window.voters = currentVoters;
        }

        // Show summary
        let message = `✅ Import completed!\n\nImported: ${imported}\nDuplicates: ${duplicates}\nInvalid: ${invalid}`;
        if (errors.length > 0 && errors.length <= 5) {
            message += '\n\nErrors:\n' + errors.slice(0, 5).join('\n');
        }

        showAlert && showAlert(message, imported > 0 ? 'success' : 'warning');
        displayVoters && displayVoters();
        updateHomepageStats && updateHomepageStats();
    };

    reader.readAsText(file);
}

// Export voters as CSV
function exportVotersAsCSV() {
    const voters = JSON.parse(localStorage.getItem('voters')) || [];

    if (voters.length === 0) {
        showAlert && showAlert('❌ No voters to export.', 'error');
        return;
    }

    let csv = 'name,email,voterId,age,hasVoted,createdAt\n';
    voters.forEach(voter => {
        const votedStatus = voter.hasVoted ? 'Yes' : 'No';
        const created = voter.createdAt ? new Date(voter.createdAt).toLocaleDateString() : '';
        csv += `"${voter.name}","${voter.email}","${voter.voterId}",${voter.age},${votedStatus},"${created}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voters-export-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert && showAlert('✅ Voters exported as CSV.', 'success');
}

// Display voter import log
function displayVoterImportLog() {
    const container = document.getElementById('voterImportLogContainer');
    if (!container) return;

    if (voterImportLog.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No import history yet.</p>';
        return;
    }

    let html = '<h3>📥 Voter Import History</h3>';
    html += '<table style="width:100%; border-collapse:collapse; font-size:0.85em;">';
    html += '<tr style="border-bottom:2px solid #ddd;"><th style="text-align:left;padding:8px;">Timestamp</th><th style="text-align:left;padding:8px;">File</th><th style="text-align:left;padding:8px;">Imported</th><th style="text-align:left;padding:8px;">Duplicates</th><th style="text-align:left;padding:8px;">Invalid</th></tr>';

    voterImportLog.slice().reverse().forEach(log => {
        html += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px;">${new Date(log.timestamp).toLocaleString()}</td>
                <td style="padding:8px;">${log.filename}</td>
                <td style="padding:8px; color: #10b981; font-weight: bold;">${log.imported}</td>
                <td style="padding:8px; color: #f59e0b; font-weight: bold;">${log.duplicates}</td>
                <td style="padding:8px; color: #ef4444; font-weight: bold;">${log.invalid}</td>
            </tr>
        `;
    });

    html += '</table>';
    container.innerHTML = html;
}

// Sample CSV generator for download
function downloadSampleVoterCSV() {
    const sample = `name,email,voterId,age
John Doe,john@example.com,VID-001,25
Jane Smith,jane@example.com,VID-002,30
Bob Johnson,bob@example.com,VID-003,28`;

    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample-voters.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert && showAlert('✅ Sample CSV downloaded.', 'success');
}

// Validate CSV before import
function validateVoterCSV(file) {
    if (!file.name.endsWith('.csv')) {
        showAlert && showAlert('❌ File must be a CSV file.', 'error');
        return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
        showAlert && showAlert('❌ File size exceeds 5MB limit.', 'error');
        return;
    }

    importVotersFromCSV(file);
}

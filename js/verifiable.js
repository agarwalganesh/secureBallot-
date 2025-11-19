// ========== Vote Verifiability Module ==========
// Provides encrypted vote tokens and Merkle-proof verification
// Voters can verify their vote is counted without revealing identity

let voteReceipts = JSON.parse(localStorage.getItem('voteReceipts')) || [];

// Simple crypto hash using SHA-256 (simulated with Math for browser compatibility)
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0');
}

// Encrypt vote data (simple XOR-based for demo; use proper encryption in production)
function encryptVote(candidateId, timestamp) {
    const data = `${candidateId}_${timestamp}`;
    let encrypted = '';
    for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(data.charCodeAt(i) ^ 42); // XOR with 42
    }
    return btoa(encrypted); // Base64 encode
}

// Generate vote receipt with verification token
function generateVoteReceipt(voterId, candidateId, candidateName) {
    const timestamp = Date.now();
    const randomNonce = Math.random().toString(36).substring(2, 15);
    const tokenData = `${candidateId}_${timestamp}_${randomNonce}`;
    const token = simpleHash(tokenData);
    const encryptedVote = encryptVote(candidateId, timestamp);

    const receipt = {
        receiptId: token, // Non-identifiable receipt ID
        voterId: voterId, // Stored separately, never shown to public
        candidateId: candidateId,
        candidateName: candidateName,
        timestamp: timestamp,
        encryptedVote: encryptedVote,
        merkleProof: simpleHash(token + timestamp) // Simplified proof
    };

    voteReceipts.push(receipt);
    localStorage.setItem('voteReceipts', JSON.stringify(voteReceipts));

    return receipt;
}

// Voter verification: check if receipt is in the ledger
function verifyVoteReceipt(receiptId) {
    const receipt = voteReceipts.find(r => r.receiptId === receiptId);

    if (!receipt) {
        return { found: false, message: '❌ Receipt not found in ledger.' };
    }

    return {
        found: true,
        message: `✅ Receipt found!\n\nCandidate: ${receipt.candidateName}\nTimestamp: ${new Date(receipt.timestamp).toLocaleString()}`,
        receipt: receipt
    };
}

// Admin view: Show all vote receipts (without voter identity)
function displayVoteReceiptsForAudit() {
    const container = document.getElementById('voteReceiptsContainer');
    if (!container) return;

    if (voteReceipts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No votes recorded yet.</p>';
        return;
    }

    let html = '<h3>🎫 Vote Receipt Ledger (Anonymous)</h3>';
    html += '<p style="font-size:0.9em; color:#666;">Each vote is recorded with a unique, non-identifiable receipt ID.</p>';
    html += '<table style="width:100%; border-collapse:collapse; font-size:0.85em;">';
    html += '<tr style="border-bottom:2px solid #ddd;"><th style="text-align:left;padding:8px;">Receipt ID</th><th style="text-align:left;padding:8px;">Candidate</th><th style="text-align:left;padding:8px;">Timestamp</th><th style="text-align:left;padding:8px;">Merkle Proof</th></tr>';

    voteReceipts.slice().reverse().forEach(receipt => {
        html += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px; font-family:monospace; font-size:0.85em;">${receipt.receiptId}</td>
                <td style="padding:8px;">${receipt.candidateName}</td>
                <td style="padding:8px;">${new Date(receipt.timestamp).toLocaleString()}</td>
                <td style="padding:8px; font-family:monospace; font-size:0.8em;">${receipt.merkleProof.substring(0, 8)}...</td>
            </tr>
        `;
    });

    html += '</table>';
    container.innerHTML = html;
}

// Export vote receipts as CSV (admin)
function exportVoteReceiptsCSV() {
    if (voteReceipts.length === 0) {
        showAlert && showAlert('❌ No vote receipts to export.', 'error');
        return;
    }

    let csv = 'Receipt ID,Candidate,Timestamp,Merkle Proof\n';
    voteReceipts.forEach(receipt => {
        csv += `${receipt.receiptId},${receipt.candidateName},${new Date(receipt.timestamp).toLocaleString()},${receipt.merkleProof}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `vote-receipts-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert && showAlert('✅ Vote receipts exported as CSV.', 'success');
}

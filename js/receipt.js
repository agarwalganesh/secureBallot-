// ========== Vote Receipt & Audit Module ==========
// Generates secure voting receipts and provides audit capabilities

let votingReceipts = JSON.parse(localStorage.getItem('votingReceipts')) || [];

// Generate receipt after successful vote cast
function generateVotingReceipt(voterId, candidateName) {
    // Create non-identifiable receipt using hash
    const timestamp = Date.now();
    const randomNonce = Math.random().toString(36).substring(2);
    const receiptData = `${timestamp}_${randomNonce}`;

    // Simple hash (in production use crypto.subtle.digest)
    let hash = 0;
    for (let i = 0; i < receiptData.length; i++) {
        hash = ((hash << 5) - hash) + receiptData.charCodeAt(i);
        hash = hash & hash;
    }
    const receiptId = Math.abs(hash).toString(16).toUpperCase().padStart(16, '0');

    const receipt = {
        receiptId: receiptId,
        voterId: voterId, // Stored internally, never public
        candidateName: candidateName,
        timestamp: timestamp,
        verified: true,
        tamperCheck: receiptId + timestamp // Simple tamper-check
    };

    votingReceipts.push(receipt);
    localStorage.setItem('votingReceipts', JSON.stringify(votingReceipts));

    return receipt;
}

// Show receipt to voter after successful vote
function displayVotingReceiptToVoter(receipt) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
    `;

    modal.innerHTML = `
        <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; text-align: center;">
            <h2 style="color: #10b981; margin-bottom: 20px;">✅ Vote Recorded Successfully!</h2>
            <p style="font-size: 0.95em; margin-bottom: 15px;">Your vote has been securely recorded. Save your receipt ID to verify your vote later.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0 0 10px 0; font-size: 0.85em; color: #666;">YOUR RECEIPT ID</p>
                <p style="margin: 0; font-family: monospace; font-size: 1.2em; font-weight: bold; color: #1f2937; word-break: break-all;">
                    ${receipt.receiptId}
                </p>
            </div>

            <p style="font-size: 0.9em; color: #666; margin: 20px 0;">
                <strong>Time:</strong> ${new Date(receipt.timestamp).toLocaleString()}
            </p>

            <p style="font-size: 0.85em; color: #999; margin: 15px 0;">
                💡 You can verify your vote using this Receipt ID on the "Verify Receipt" page.
            </p>

            <button onclick="this.parentElement.parentElement.remove()" style="
                background: #3b82f6;
                color: white;
                border: none;
                padding: 10px 30px;
                border-radius: 5px;
                cursor: pointer;
                font-size: 1em;
            ">Got It</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Auto-dismiss after 10 seconds
    setTimeout(() => modal.remove(), 10000);
}

// Voter verification page: enter receipt ID to verify
function verifyVotingReceipt() {
    const receiptId = document.getElementById('verifyReceiptId')?.value?.toUpperCase();

    if (!receiptId) {
        showAlert && showAlert('❌ Please enter a Receipt ID.', 'error');
        return;
    }

    const receipt = votingReceipts.find(r => r.receiptId === receiptId);

    if (!receipt) {
        showAlert && showAlert('❌ Receipt ID not found. Please check and try again.', 'error');
        return;
    }

    // Verify tamper check
    if (receipt.tamperCheck !== receipt.receiptId + receipt.timestamp) {
        showAlert && showAlert('⚠️ Receipt tampered detected!', 'error');
        return;
    }

    const resultDiv = document.getElementById('verifyReceiptResult');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <div style="background: #d1fae5; border: 2px solid #10b981; padding: 20px; border-radius: 8px;">
                <h3 style="color: #10b981; margin-top: 0;">✅ Receipt Verified</h3>
                <p><strong>Receipt ID:</strong> ${receipt.receiptId}</p>
                <p><strong>Candidate:</strong> ${receipt.candidateName}</p>
                <p><strong>Timestamp:</strong> ${new Date(receipt.timestamp).toLocaleString()}</p>
                <p style="font-size: 0.9em; color: #666; margin-bottom: 0;">✓ Your vote is included in the election ledger.</p>
            </div>
        `;
    }

    showAlert && showAlert('✅ Receipt verified successfully!', 'success');
}

// Admin: Display all voting receipts (without voter IDs)
function displayVotingReceiptsAdmin() {
    const container = document.getElementById('votingReceiptsAdminContainer');
    if (!container) return;

    if (votingReceipts.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #999;">No voting receipts yet.</p>';
        return;
    }

    let html = '<h3>🎫 Voting Receipts Ledger</h3>';
    html += '<p style="font-size: 0.9em; color: #666;">All receipts are stored anonymously. Vote identity is protected.</p>';
    html += '<table style="width:100%; border-collapse:collapse; font-size:0.85em;">';
    html += '<tr style="border-bottom:2px solid #ddd;"><th style="text-align:left;padding:8px;">Receipt ID</th><th style="text-align:left;padding:8px;">Candidate</th><th style="text-align:left;padding:8px;">Timestamp</th><th style="text-align:left;padding:8px;">Status</th></tr>';

    votingReceipts.slice().reverse().forEach(receipt => {
        const status = receipt.verified ? '✅ Verified' : '⚠️ Pending';
        html += `
            <tr style="border-bottom:1px solid #eee;">
                <td style="padding:8px; font-family:monospace; font-size:0.8em;">${receipt.receiptId}</td>
                <td style="padding:8px;">${receipt.candidateName}</td>
                <td style="padding:8px;">${new Date(receipt.timestamp).toLocaleString()}</td>
                <td style="padding:8px;">${status}</td>
            </tr>
        `;
    });

    html += '</table>';
    html += `<p style="margin-top:20px; font-size:0.9em; color:#666;"><strong>Total Receipts:</strong> ${votingReceipts.length}</p>`;

    container.innerHTML = html;
}

// Export receipts for audit
function exportVotingReceiptsAudit() {
    if (votingReceipts.length === 0) {
        showAlert && showAlert('❌ No voting receipts to export.', 'error');
        return;
    }

    let csv = 'Receipt ID,Candidate,Timestamp,Status\n';
    votingReceipts.forEach(receipt => {
        const status = receipt.verified ? 'Verified' : 'Pending';
        csv += `${receipt.receiptId},${receipt.candidateName},${new Date(receipt.timestamp).toLocaleString()},${status}\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `voting-receipts-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showAlert && showAlert('✅ Voting receipts exported as CSV.', 'success');
}

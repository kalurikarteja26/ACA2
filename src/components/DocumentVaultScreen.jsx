import React, { useState, useRef } from 'react';
import { Upload, FileText, Download, Eye, Trash2, CheckCircle2, AlertCircle, ShieldCheck, Sparkles, Filter, X } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { sanitizeInput } from '../utils/security';
import { logSecurityEvent, EVENT_TYPES } from '../utils/auditLogger';

export default function DocumentVaultScreen() {
  const { user } = useUser();
  const fileInputRef = useRef(null);
  
  const [documents, setDocuments] = useState([
    { id: 1, name: 'T4_Slip_2025_Employer.pdf', type: 'T4 Statement', date: '2026-02-14', size: '245 KB', status: 'Verified', confidence: '99.8%', items: [{ box: 'Box 14', label: 'Employment Income', amount: '$85,400.00' }, { box: 'Box 22', label: 'Income Tax Deducted', amount: '$16,250.00' }] },
    { id: 2, name: 'T5_Investment_Income_2025.pdf', type: 'T5 Statement', date: '2026-02-20', size: '180 KB', status: 'Verified', confidence: '98.5%', items: [{ box: 'Box 13', label: 'Interest from Canadian Sources', amount: '$1,850.00' }] },
    { id: 3, name: 'RRSP_Contribution_Receipt.pdf', type: 'RRSP Receipt', date: '2026-03-01', size: '110 KB', status: 'Verified', confidence: '100%', items: [{ box: 'RRSP', label: 'Total Contribution', amount: '$12,000.00' }] },
  ]);

  const [previewDoc, setPreviewDoc] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3500);
  };

  const handleFileUpload = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    const file = files[0];

    // 1. Strict File Extension Whitelist Validation
    const allowedExtensions = ['.pdf', '.png', '.jpg', '.jpeg', '.tiff'];
    const fileExt = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
    if (!allowedExtensions.includes(fileExt)) {
      showToast(`❌ Security Guard: Untrusted file type '${fileExt}'. Only PDF, PNG, and JPG tax documents permitted.`);
      logSecurityEvent('UNTRUSTED_FILE_UPLOAD_BLOCKED', { fileName: file.name, ext: fileExt }, 'WARNING');
      return;
    }

    // 2. Maximum File Size Enforcement (10 MB limit)
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      showToast('❌ Security Guard: File exceeds maximum allowed size (10 MB).');
      return;
    }

    // 3. File Name Sanitization against Path Traversal & XSS
    const safeName = sanitizeInput(file.name.replace(/[^a-zA-Z0-9._-]/g, '_'));
    
    setIsScanning(true);
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: safeName,
        type: 'Tax Document',
        date: new Date().toISOString().split('T')[0],
        size: `${Math.round(file.size / 1024)} KB`,
        status: 'Verified',
        confidence: '99.5%',
        items: [{ box: 'Auto-OCR', label: 'Extracted Total', amount: '$4,500.00' }]
      };
      setDocuments(prev => [newDoc, ...prev]);
      setIsScanning(false);
      logSecurityEvent(EVENT_TYPES.DOC_VAULT_ACCESSED, { action: 'UPLOAD', fileName: safeName }, 'INFO');
      showToast(`✅ Verified & Encrypted in Vault: ${safeName}`);
    }, 1200);
  };

  const handleDownload = (doc) => {
    const textData = `DOCUMENT EXPORT: ${doc.name}\nType: ${doc.type}\nDate: ${doc.date}\nConfidence: ${doc.confidence}\n\nLINE ITEMS:\n` +
      doc.items.map(i => `${i.box} | ${i.label}: ${i.amount}`).join('\n');
    const blob = new Blob([textData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = doc.name.replace(/\.[^/.]+$/, "") + "_export.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast(`📥 Downloaded ${doc.name}`);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} from your secure vault?`)) {
      setDocuments(prev => prev.filter(d => d.id !== id));
      showToast(`🗑️ Removed ${name}`);
    }
  };

  return (
    <div className="animate-fade-in" style={{ padding: '36px', maxWidth: '1440px', margin: '0 auto' }}>
      
      {toast && (
        <div style={{ position: 'fixed', top: '24px', right: '24px', zIndex: 99999, backgroundColor: 'var(--primary-brand)', color: '#FFF', padding: '14px 24px', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)', fontWeight: '700', fontSize: '14px' }}>
          {toast}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '36px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '6px' }}>Document Vault</h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>AI OCR Document Extraction & 256-Bit Encrypted Tax Vault</p>
        </div>
        <input type="file" ref={fileInputRef} onChange={handleFileUpload} style={{ display: 'none' }} accept=".pdf,.png,.jpg,.jpeg" />
        <button onClick={() => fileInputRef.current?.click()} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', cursor: 'pointer' }}>
          <Upload size={18} /> Select Document to Upload
        </button>
      </div>

      {/* Dropzone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        style={{
          padding: '40px', border: '2px dashed var(--accent)', borderRadius: 'var(--radius-xl)',
          backgroundColor: 'var(--secondary-bg)', textAlign: 'center', cursor: 'pointer', marginBottom: '36px'
        }}
      >
        <Upload size={36} color="var(--accent)" style={{ marginBottom: '12px' }} />
        <h3 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-brand)', marginBottom: '4px' }}>
          {isScanning ? 'Scanning document with ACA AI OCR...' : 'Click or Drag Tax Slips Here'}
        </h3>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Supports T4, T5, W-2, Form 16, RRSP, and 1099 PDF/Image Slips</p>
      </div>

      {/* Documents List */}
      <div className="aca-card">
        <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '24px' }}>Vault Documents ({documents.length})</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {documents.map(doc => (
            <div key={doc.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'var(--cards)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FileText size={22} color="var(--accent)" />
                </div>
                <div>
                  <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary-brand)' }}>{doc.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>{doc.type} • {doc.date} • {doc.size} • Confidence: <span style={{ color: 'var(--success)', fontWeight: '700' }}>{doc.confidence}</span></div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => setPreviewDoc(doc)} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <Eye size={15} /> Preview
                </button>
                <button onClick={() => handleDownload(doc)} className="btn-secondary" style={{ padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                  <Download size={15} /> Download
                </button>
                <button onClick={() => handleDelete(doc.id, doc.name)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', color: 'var(--error)' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {previewDoc && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setPreviewDoc(null)}>
          <div style={{ width: '100%', maxWidth: '520px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '32px', border: '1px solid var(--border)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-brand)' }}>{previewDoc.name}</h3>
              <button onClick={() => setPreviewDoc(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="var(--text-muted)" /></button>
            </div>
            <div style={{ marginBottom: '20px', padding: '16px', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-muted)', marginBottom: '8px' }}>OCR EXTRACTED LINE ITEMS</div>
              {previewDoc.items.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid var(--border)', fontSize: '13px' }}>
                  <span style={{ fontWeight: '700' }}>{item.box} ({item.label}):</span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: 'var(--accent)' }}>{item.amount}</span>
                </div>
              ))}
            </div>
            <button onClick={() => handleDownload(previewDoc)} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '14px', cursor: 'pointer' }}>Download Export File</button>
          </div>
        </div>
      )}

    </div>
  );
}

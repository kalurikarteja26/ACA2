import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, MessageSquare, X, Send, Bot, ShieldCheck, ArrowRight, HelpCircle, FileText, CheckCircle2, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import { sanitizeInput } from '../utils/security';
import { aiAssistantLimiter } from '../utils/rateLimiter';

export default function TaxAiFloatingAssistant({ onOpenFiling }) {
  const { user } = useUser();
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const chatRef = useRef(null);

  const activeCountry = user.country || 'Canada';

  const [messages, setMessages] = useState(() => [
    {
      sender: 'ai',
      text: `Hello ${user.fullName || 'Taxpayer'}! I am your ACA Tax AI Assistant for ${activeCountry}. How can I assist with your tax return today?`
    }
  ]);

  const [input, setInput] = useState('');

  // Auto-scroll chat to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  // Click Outside Listener: Close Chatbot Window when clicking empty space
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (chatRef.current && !chatRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // Dynamic Suggestion Chips based on Country
  const getSuggestionChips = () => {
    return [
      { label: '📄 Required Documents', query: 'What documents are required to file my tax return?' },
      { label: '🚀 How to File Step-by-Step', query: 'How do I file my tax return on this platform?' },
      { label: '💰 Maximize Refund & Write-offs', query: 'How can I maximize my legal write-offs and tax deductions?' },
      { label: '⏰ Filing Deadlines', query: 'What is the official tax filing deadline?' },
    ];
  };

  // Smart Intent & Document Response Engine
  const generateAiReply = (query) => {
    const q = query.toLowerCase();
    const c = activeCountry;

    // 1. Documents Required Intent
    if (q.includes('document') || q.includes('required') || q.includes('slips') || q.includes('need to file') || q.includes('paperwork')) {
      if (c === 'Canada') {
        return `📋 **Required Documents for Canada (CRA T1 Return):**\n\n1️⃣ **T4 / T4A Slips**: Employment & Income Statements.\n2️⃣ **RRSP Contribution Receipts**: For tax deduction claims.\n3️⃣ **Notice of Assessment (NOA)**: From last year's return.\n4️⃣ **T5 / T3 Slips**: Investment & Interest income (if applicable).\n5️⃣ **Valid ID & SIN**: Social Insurance Number.\n\n💡 *Tip: You can upload T4 PDFs directly into the Document Vault for 99.8% automated OCR extraction!*`;
      } else if (c === 'USA') {
        return `📋 **Required Documents for USA (IRS Form 1040):**\n\n1️⃣ **Form W-2**: Wage and Tax Statement from employer.\n2️⃣ **Form 1099 (MISC / NEC / INT / B)**: Freelance, dividend, or interest income.\n3️⃣ **Form 1098**: Mortgage interest or Student Loan Statements.\n4️⃣ **SSN or ITIN**: Social Security Number.\n5️⃣ **Valid Government Photo ID**: Driver's License or Passport.\n\n💡 *Tip: Upload your W-2 or 1099 to the Vault to auto-populate Form 1040 lines!*`;
      } else {
        return `📋 **Required Documents for India (ITR-1 / ITR-2):**\n\n1️⃣ **Form 16 (Part A & Part B)**: Salary TDS Certificate from employer.\n2️⃣ **Form 26AS / AIS (Annual Information Statement)**: Tax credits & transactions.\n3️⃣ **PAN Card & Aadhaar Card**: Mandatory tax identifiers.\n4️⃣ **Section 80C / 80D Investment Proofs**: PPF, ELSS, Life/Health Insurance.\n5️⃣ **Bank Account Statements & Interest Certs**: SB & FD interest income.\n\n💡 *Tip: Upload your Form 16 PDF to auto-fill all ITR income sections!*`;
      }
    }

    // 2. How to File Step-by-Step Intent
    if (q.includes('how can i file') || q.includes('how do i file') || q.includes('step') || q.includes('process') || q.includes('start return')) {
      return `🚀 **Easy 4-Step Filing Process:**\n\n1️⃣ **Upload Documents**: Go to 'Document Vault' and drag-and-drop your slips (${c === 'Canada' ? 'T4' : c === 'USA' ? 'W-2' : 'Form 16'}).\n2️⃣ **Review AI OCR**: Check extracted income, tax withheld, and personal details.\n3️⃣ **Optimize Deductions**: Complete the Tax Wizard to claim max write-offs.\n4️⃣ **E-File Directly**: Submit directly to government servers (${c === 'Canada' ? 'CRA NETFILE' : c === 'USA' ? 'IRS MeF' : 'Income Tax India API'})!`;
    }

    // 3. Deductions & Refund Maximize Intent
    if (q.includes('refund') || q.includes('deduction') || q.includes('write-off') || q.includes('save tax') || q.includes('maximize')) {
      if (c === 'Canada') {
        return `💰 **Top Canadian Tax Deductions to Claim:**\n• **RRSP Contributions**: Deducts directly from taxable income.\n• **Home Office Expenses**: Flat rate or detailed method.\n• **Medical Expenses**: Eligible out-of-pocket healthcare costs.\n• **First-Time Home Buyer Amount**: $10,000 non-refundable tax credit.`;
      } else if (c === 'USA') {
        return `💰 **Top USA Tax Write-offs & Credits:**\n• **401(k) & IRA Contributions**: Reduces Adjusted Gross Income (AGI).\n• **Standard vs Itemized Deduction**: $14,600 (Single) / $29,200 (Married).\n• **Child Tax Credit (CTC)**: Up to $2,000 per eligible child.\n• **Student Loan Interest**: Deduct up to $2,500 above-the-line.`;
      } else {
        return `💰 **Top Indian Income Tax Exemptions & Deductions:**\n• **Section 80C**: Up to ₹1.5 Lakhs (PPF, ELSS, EPF, LIC).\n• **Section 80D**: Up to ₹25,000/₹50,000 for Health Insurance.\n• **HRA (House Rent Allowance)**: Tax exemption under Old Regime.\n• **Standard Deduction**: ₹50,000 flat deduction for salaried individuals.`;
      }
    }

    // 4. Deadlines Intent
    if (q.includes('deadline') || q.includes('due date') || q.includes('when to file') || q.includes('last date')) {
      if (c === 'Canada') {
        return `⏰ **Canada CRA Tax Deadlines:**\n• **Individual Return**: April 30\n• **Self-Employed Return**: June 15 (Taxes owed due April 30)`;
      } else if (c === 'USA') {
        return `⏰ **USA IRS Tax Deadlines:**\n• **Individual Form 1040**: April 15\n• **Extension Deadline (Form 4868)**: October 15`;
      } else {
        return `⏰ **India ITD Income Tax Deadlines:**\n• **Non-Audit Individuals**: July 31\n• **Audit Cases (Businesses/CA audit)**: October 31`;
      }
    }

    // Default Fallback Response
    return `I am trained on official tax laws for **${c}**. I can help you with:\n• 📄 Required documents (${c === 'Canada' ? 'T4/RRSP' : c === 'USA' ? 'W-2/1099' : 'Form 16/AIS'})\n• 🚀 Step-by-step e-filing instructions\n• 💰 Tax deduction & write-off rules\n• ⏰ Government deadlines\n\nWould you like to launch the **Tax Filing Wizard** or upload a slip?`;
  };

  const processUserQuery = (queryText) => {
    if (!queryText || !queryText.trim()) return;

    // 1. Strict Input Sanitization against XSS & script injection
    const sanitized = sanitizeInput(queryText);
    if (!sanitized) return;

    // 2. Rate Limiting Check (Max 15 requests per minute)
    const rateStatus = aiAssistantLimiter.attempt(user.email || 'user_ai');
    if (!rateStatus.allowed) {
      setMessages(prev => [
        ...prev,
        { sender: 'user', text: sanitized },
        { sender: 'ai', text: `🛡️ **Rate Limit Guard**: ${rateStatus.message} Please wait ${rateStatus.retryAfterSeconds}s before submitting another question.` }
      ]);
      setInput('');
      return;
    }

    setMessages(prev => [...prev, { sender: 'user', text: sanitized }]);
    setInput('');

    setTimeout(() => {
      const aiReply = generateAiReply(sanitized);
      setMessages(prev => [...prev, { sender: 'ai', text: aiReply }]);
    }, 400);
  };

  const handleSend = (e) => {
    e.preventDefault();
    processUserQuery(input);
  };

  return (
    <div ref={chatRef} style={{ position: 'fixed', bottom: '24px', right: '24px', zIndex: 9999 }}>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 20px',
            borderRadius: '999px', backgroundColor: 'var(--accent)', color: '#FFF',
            border: 'none', cursor: 'pointer', boxShadow: 'var(--shadow-lg)', fontWeight: '800', fontSize: '14px'
          }}
        >
          <Sparkles size={20} /> ACA Tax AI Assistant
        </button>
      ) : (
        <div style={{
          width: '400px', height: '540px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)', display: 'flex', flexDirection: 'column', overflow: 'hidden'
        }}>
          {/* Header */}
          <div style={{ padding: '16px 20px', backgroundColor: 'var(--secondary-bg)', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: '10px', backgroundColor: 'var(--primary-brand)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="var(--accent)" />
              </div>
              <div>
                <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--primary-brand)' }}>ACA Tax AI Assistant</div>
                <div style={{ fontSize: '11px', color: 'var(--success)', fontWeight: '700' }}>● Active • {activeCountry} Tax Code</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={18} /></button>
          </div>

          {/* Messages Container */}
          <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {messages.map((m, idx) => (
              <div key={idx} style={{ alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '88%' }}>
                <div style={{
                  padding: '12px 16px', borderRadius: '14px', fontSize: '13px', lineHeight: '1.6', whiteSpace: 'pre-line',
                  backgroundColor: m.sender === 'user' ? 'var(--accent)' : 'var(--secondary-bg)',
                  color: m.sender === 'user' ? '#FFF' : 'var(--text-primary)',
                  border: m.sender === 'user' ? 'none' : '1px solid var(--border)'
                }}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Interactive Suggestion Chips */}
          <div style={{ padding: '8px 12px', backgroundColor: 'var(--cards)', borderTop: '1px solid var(--border)', overflowX: 'auto', display: 'flex', gap: '8px' }}>
            {getSuggestionChips().map((chip, idx) => (
              <button
                key={idx}
                onClick={() => processUserQuery(chip.query)}
                style={{
                  padding: '6px 12px', borderRadius: '999px', border: '1px solid var(--border)',
                  backgroundColor: 'var(--secondary-bg)', color: 'var(--primary-brand)', fontSize: '11px',
                  fontWeight: '700', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.15s ease'
                }}
                className="hover-bg-accent"
              >
                {chip.label}
              </button>
            ))}
          </div>

          {/* Action Trigger Banner */}
          <div style={{ padding: '8px 16px', backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Ready to file your return?</span>
            <button
              onClick={() => { setIsOpen(false); onOpenFiling(); }}
              style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: '800', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              Launch Filing Wizard <ArrowRight size={14} />
            </button>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSend} style={{ padding: '12px', display: 'flex', gap: '8px', borderTop: '1px solid var(--border)' }}>
            <input
              type="text"
              placeholder={`Ask about ${activeCountry} tax forms, documents, deadlines...`}
              value={input}
              onChange={e => setInput(e.target.value)}
              style={{
                flex: 1, padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border)',
                backgroundColor: 'var(--secondary-bg)', color: 'var(--text-primary)', fontSize: '13px', outline: 'none'
              }}
            />
            <button type="submit" style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: 'var(--accent)', color: '#FFF', border: 'none', cursor: 'pointer' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

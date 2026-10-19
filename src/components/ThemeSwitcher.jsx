import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, Monitor, ChevronDown } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeSwitcher({ compact = false }) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const options = [
    { id: 'light', label: 'Light', icon: Sun },
    { id: 'dark', label: 'Dark', icon: Moon },
    { id: 'system', label: 'System', icon: Monitor },
  ];

  const current = options.find(o => o.id === theme) || options[2];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: compact ? '6px' : '8px',
          padding: compact ? '7px 10px' : '8px 14px',
          backgroundColor: 'var(--cards)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', color: 'var(--primary-brand)',
          fontSize: '13px', fontWeight: '600', cursor: 'pointer',
          boxShadow: 'var(--shadow-subtle)', transition: 'all 0.2s ease'
        }}
      >
        <CurrentIcon size={16} color="var(--accent)" />
        {!compact && <span>{current.label}</span>}
        <ChevronDown size={14} color="var(--text-muted)" />
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, marginTop: '6px',
          width: '140px', backgroundColor: 'var(--cards)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden', zIndex: 1000
        }}>
          {options.map(opt => {
            const Icon = opt.icon;
            const isSelected = theme === opt.id;
            return (
              <div
                key={opt.id}
                onClick={() => { setTheme(opt.id); setIsOpen(false); }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '10px 14px', cursor: 'pointer', fontSize: '13px',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? 'var(--primary-brand)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--secondary-bg)' : 'transparent',
                  transition: 'background 0.15s ease'
                }}
              >
                <Icon size={16} color={isSelected ? 'var(--accent)' : 'var(--text-muted)'} />
                <span>{opt.label}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

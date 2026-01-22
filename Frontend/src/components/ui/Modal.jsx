import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './Button';

export function Modal({ isOpen, onClose, title, children, footer }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEscape);
    }
    
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose} 
        aria-hidden="true" 
      />
      
      <div 
        className="relative w-full max-w-md transform overflow-hidden rounded-xl bg-white dark:bg-slate-900 text-left shadow-2xl transition-all animate-in fade-in zoom-in-95 duration-200 border border-slate-200 dark:border-slate-800"
        role="dialog" 
        aria-modal="true"
      >
        <div className="flex items-center justify-between border-b border-gray-100 dark:border-slate-800 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-full p-1 text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-500 dark:hover:text-slate-300 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="px-6 py-6">
          {children}
        </div>

        {footer && (
          <div className="flex justify-end gap-3 bg-gray-50/50 px-6 py-4 border-t border-gray-100">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

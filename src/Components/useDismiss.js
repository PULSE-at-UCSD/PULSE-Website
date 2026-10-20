import { useEffect } from 'react'

// Calls onClose(e) on a click outside ref's element or on Escape, while isOpen
export default function useDismiss(ref, isOpen, onClose) {
    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose(e);
        }
        function handleEscape(e) {
            if (e.key === 'Escape') onClose(e);
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [ref, isOpen, onClose]);
}

import { useEffect } from 'react'

// Calls onClose on a click outside ref's element or on Escape, while isOpen
export default function useDismiss(ref, isOpen, onClose) {
    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        function handleEscape(e) {
            if (e.key === 'Escape') onClose();
        }

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [ref, isOpen, onClose]);
}

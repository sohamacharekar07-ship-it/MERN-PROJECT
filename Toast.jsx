import { useEffect } from "react";

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onClose, 4000);
    return () => clearTimeout(t);
  }, [toast, onClose]);

  if (!toast) return null;

  return (
    <div className={`toast toast-${toast.type}`} role="status" aria-live="polite">
      <span>{toast.text}</span>
      <button onClick={onClose} aria-label="Dismiss message">×</button>
    </div>
  );
}

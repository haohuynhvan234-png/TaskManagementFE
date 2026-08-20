import { AlertTriangle, X } from "lucide-react";

function ConfirmDialog({ open, title, message, confirmLabel, onConfirm, onCancel, busy }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#151a2d]/45 p-4 backdrop-blur-sm"
      onClick={busy ? undefined : onCancel}
    >
      <section
        aria-modal="true"
        className="w-full max-w-md overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="flex items-center justify-between border-b border-[#ecebf3] px-6 py-4">
          <h2 className="text-lg font-bold text-[#25283c]">{title}</h2>
          <button
            aria-label="Cancel"
            className="rounded-full p-2 text-[#55576b] hover:bg-[#f1f0f8]"
            disabled={busy}
            onClick={onCancel}
            type="button"
          >
            <X size={17} />
          </button>
        </header>
        <div className="flex items-start gap-3 p-6 text-sm text-[#494c5e]">
          <AlertTriangle className="mt-0.5 shrink-0 text-[#c53a43]" size={18} />
          <span>{message}</span>
        </div>
        <footer className="flex items-center justify-end gap-3 border-t border-[#ecebf3] px-6 py-4">
          <button
            className="text-xs font-semibold text-[#55576b] hover:text-[#272a3e]"
            disabled={busy}
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            className="rounded-lg bg-[#d3444e] px-4 py-2.5 text-xs font-semibold text-white shadow-sm disabled:opacity-60"
            disabled={busy}
            onClick={onConfirm}
            type="button"
          >
            {busy ? "Deleting..." : confirmLabel}
          </button>
        </footer>
      </section>
    </div>
  );
}

export default ConfirmDialog;
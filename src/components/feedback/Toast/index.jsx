import { CheckCircle2, X } from "lucide-react";

function Toast({ message, onClose }) {
  if (!message) return null;

  return (
    <div
      aria-live="polite"
      className="fixed right-4 top-4 z-50 flex max-w-sm items-center gap-3 rounded-lg border border-[#bfe8d5] bg-white px-4 py-3 text-sm text-[#236b51] shadow-lg"
      role="status"
    >
      <CheckCircle2 className="shrink-0 text-[#2d9a70]" size={18} />
      <span className="flex-1">{message}</span>
      <button
        aria-label="Close notification"
        className="shrink-0 rounded-md p-1 text-[#6f7f78] hover:bg-[#eef8f3]"
        onClick={onClose}
        type="button"
      >
        <X size={15} />
      </button>
    </div>
  );
}

export default Toast;

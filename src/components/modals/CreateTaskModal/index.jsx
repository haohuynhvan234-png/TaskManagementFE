import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  ChevronDown,
  CirclePlus,
  X,
} from "lucide-react";
import { PRIORITY_OPTIONS } from "../../../lib/taskConstants";
import {
  isDueDateAfterCreation,
  nextDayInputValue,
} from "../../../lib/dateFormat";

const EMPTY_FORM = {
  title: "",
  description: "",
  priority: "medium",
  dueDate: "",
};

function CreateTaskModal({ onClose, onCreate }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!isDueDateAfterCreation(form.dueDate)) {
      errors.dueDate = "Due date must be after the creation date";
    }
    return errors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validate();
    setFieldErrors(errors);
    setServerErrors([]);
    if (Object.keys(errors).length > 0) return;

    const payload = { title: form.title.trim() };
    if (form.description.trim()) payload.description = form.description.trim();
    payload.priority = form.priority;
    if (form.dueDate) payload.dueDate = new Date(form.dueDate).toISOString();

    setSubmitting(true);
    try {
      await onCreate(payload);
    } catch (error) {
      setServerErrors(
        error?.details?.length > 0 ? error.details : [error?.message],
      );
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#151a2d]/25 p-4 backdrop-blur-sm"
      onClick={submitting ? undefined : onClose}
    >
      <section
        aria-modal="true"
        className="w-full max-w-2xl overflow-hidden rounded-xl bg-[#fbfaff] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="flex items-center justify-between border-b border-[#e7e5f0] bg-[#f4f3ff] px-6 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-full bg-[#4b3ee5] text-white">
              <CirclePlus size={20} />
            </span>
            <div>
              <h2 className="text-lg font-bold">Create New Task</h2>
              <p className="text-[10px] uppercase tracking-wider text-[#686a7d]">
                Define the next flow
              </p>
            </div>
          </div>
          <button
            aria-label="Close modal"
            className="rounded-full p-2 text-[#55576b] transition hover:bg-white hover:text-[#25283c]"
            disabled={submitting}
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </header>
        <form
          className="space-y-5 p-6 sm:p-7"
          id="create-task-form"
          onSubmit={handleSubmit}
        >
          <Field label="Task Title" required error={fieldErrors.title}>
            <input
              className="field"
              onChange={(event) => update("title", event.target.value)}
              placeholder="e.g., Update documentation"
              value={form.title}
            />
          </Field>
          <Field label="Description (Optional)">
            <textarea
              className="field resize-none"
              onChange={(event) => update("description", event.target.value)}
              placeholder="Describe the task details..."
              rows="4"
              value={form.description}
            />
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Priority">
              <div className="relative">
                <select
                  className="field appearance-none"
                  onChange={(event) => update("priority", event.target.value)}
                  value={form.priority}
                >
                  {PRIORITY_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#51536a]"
                  size={15}
                />
              </div>
            </Field>
            <Field label="Due Date" error={fieldErrors.dueDate}>
              <div className="relative">
                <input
                  className="field pr-10"
                  onChange={(event) => update("dueDate", event.target.value)}
                  min={nextDayInputValue()}
                  type="date"
                  value={form.dueDate}
                />
                <CalendarDays
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#51536a]"
                  size={15}
                />
              </div>
            </Field>
          </div>

          {serverErrors.length > 0 && (
            <div className="rounded-lg border border-[#ffd6d6] bg-[#fff2f2] px-4 py-3 text-xs text-[#7a3b42]">
              <p className="font-semibold">Could not create the task:</p>
              <ul className="mt-1 list-disc pl-4">
                {serverErrors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )}
        </form>
        <footer className="flex items-center justify-end gap-4 bg-[#eef0ff] px-6 py-4 sm:px-7">
          <button
            className="text-xs font-semibold text-[#55576b] hover:text-[#272a3e]"
            disabled={submitting}
            onClick={onClose}
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex items-center gap-2 rounded-lg bg-[#3426ce] px-4 py-2.5 text-xs font-semibold text-white shadow-sm disabled:opacity-60"
            disabled={submitting}
            onClick={() =>
              document.getElementById("create-task-form")?.requestSubmit()
            }
            type="button"
          >
            {submitting ? "Creating..." : "Create Task"}{" "}
            <ArrowRight size={14} />
          </button>
        </footer>
      </section>
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <label className="block space-y-2 text-[11px] font-semibold text-[#25283c]">
      {label} {required && <span className="text-[#d3444e]">*</span>}
      {children}
      {error && <span className="block text-[#c53a43]">⚠ {error}</span>}
    </label>
  );
}

export default CreateTaskModal;

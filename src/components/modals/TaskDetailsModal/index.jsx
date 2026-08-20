import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  History,
  Trash2,
  X,
} from "lucide-react";
import {
  NEXT_STATUS,
  PRIORITY_OPTIONS,
  statusLabel,
  statusStyles,
} from "../../../lib/taskConstants";
import {
  formatDateTime,
  isDueDateAfterCreation,
  nextDayInputValue,
  toDateInputValue,
} from "../../../lib/dateFormat";

function TaskDetailsModal({
  task,
  onClose,
  onSave,
  onAdvanceStatus,
  onRequestDelete,
}) {
  const [form, setForm] = useState({});
  const [fieldErrors, setFieldErrors] = useState({});
  const [serverErrors, setServerErrors] = useState([]);
  const [saveMessage, setSaveMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [advancing, setAdvancing] = useState(false);

  useEffect(() => {
    setForm({
      title: task.title ?? "",
      description: task.description ?? "",
      priority: task.priority ?? "medium",
      dueDate: toDateInputValue(task.dueDate),
    });
    setServerErrors([]);
    setSaveMessage("");
  }, [task]);

  if (!task) return null;

  const nextStatus = NEXT_STATUS[task.status];
  const update = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSave = async (event) => {
    event.preventDefault();
    const errors = {};
    if (!form.title.trim()) errors.title = "Title is required";
    if (!isDueDateAfterCreation(form.dueDate, task.createdAt)) {
      errors.dueDate = "Due date must be after the creation date";
    }
    setFieldErrors(errors);
    setServerErrors([]);
    setSaveMessage("");
    if (Object.keys(errors).length > 0) return;

    const payload = {};
    const title = form.title.trim();
    const description = form.description.trim();
    const originalDueDate = toDateInputValue(task.dueDate);

    if (title !== (task.title ?? "")) payload.title = title;
    if (description !== (task.description ?? "")) {
      payload.description = description;
    }
    if (form.priority !== task.priority) payload.priority = form.priority;
    if (form.dueDate !== originalDueDate) {
      payload.dueDate = form.dueDate
        ? new Date(form.dueDate).toISOString()
        : null;
    }

    if (Object.keys(payload).length === 0) {
      setSaveMessage("No changes detected. Update a field before saving.");
      return;
    }

    setSaving(true);
    try {
      await onSave(task._id, payload);
    } catch (error) {
      setServerErrors(
        error?.details?.length > 0 ? error.details : [error?.message],
      );
    } finally {
      setSaving(false);
    }
  };

  const handleAdvance = async () => {
    if (!nextStatus) return;
    setAdvancing(true);
    setServerErrors([]);
    try {
      await onAdvanceStatus(task, nextStatus);
    } catch (error) {
      setServerErrors(
        error?.details?.length > 0 ? error.details : [error?.message],
      );
    } finally {
      setAdvancing(false);
    }
  };
  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-[#151a2d]/30 p-4 backdrop-blur-sm"
      onClick={saving || advancing ? undefined : onClose}
    >
      <section
        aria-modal="true"
        className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-[#fbfaff] shadow-2xl"
        onClick={(event) => event.stopPropagation()}
        role="dialog"
      >
        <header className="flex items-center justify-between border-b border-[#e7e5f0] px-5 py-4">
          <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#55576b]">
            <ClipboardList className="text-[#4b3ee5]" size={16} /> Edit task
            details
          </div>
          <button
            aria-label="Close modal"
            className="rounded-full p-2 text-[#55576b] hover:bg-[#f0effa]"
            disabled={saving || advancing}
            onClick={onClose}
            type="button"
          >
            <X size={18} />
          </button>
        </header>
        <form
          className="flex-1 space-y-6 overflow-y-auto p-5 sm:p-7"
          id="task-details-form"
          onSubmit={handleSave}
        >
          {fieldErrors.title && (
            <p className="text-xs text-[#c53a43]">⚠ {fieldErrors.title}</p>
          )}
          <input
            className="w-full border-b-2 border-[#d8d3ff] bg-transparent pb-2 text-2xl font-bold outline-none focus:border-[#4b3ee5] sm:text-3xl"
            onChange={(event) => update("title", event.target.value)}
            value={form.title ?? ""}
          />
          {serverErrors.length > 0 && (
            <div className="rounded-lg border border-[#ffd6d6] bg-[#fff2f2] px-4 py-3 text-xs text-[#7a3b42]">
              <ul className="list-disc space-y-1">
                {serverErrors.map((message) => (
                  <li key={message}>{message}</li>
                ))}
              </ul>
            </div>
          )}
          {saveMessage && (
            <div className="rounded-lg border border-[#c9c4ff] bg-[#f0efff] px-4 py-3 text-xs font-medium text-[#4b3ee5]">
              {saveMessage}
            </div>
          )}
          <div className="grid gap-7 md:grid-cols-[1fr_200px]">
            <div>
              <label className="mb-3 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-[#4b3ee5]">
                <ClipboardList size={14} /> Description
              </label>
              <textarea
                className="min-h-44 w-full resize-none rounded-xl border border-[#e7e5f0] bg-white p-4 text-sm leading-relaxed outline-none focus:border-[#4b3ee5]"
                onChange={(event) => update("description", event.target.value)}
                value={form.description ?? ""}
              />
            </div>
            <aside className="space-y-4 rounded-xl bg-[#f0f1ff] p-4">
              <Field
                label="Status"
                value={statusLabel(task.status)}
                style={statusStyles[task.status]}
              />
              {nextStatus ? (
                <button
                  className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#b9b0ff] bg-[#e1ddff] py-2 text-[11px] font-bold text-[#4b3ee5] disabled:opacity-60"
                  disabled={advancing || saving}
                  onClick={handleAdvance}
                  type="button"
                >
                  <ArrowRight size={13} />
                  {advancing
                    ? "Moving..."
                    : `Move to ${statusLabel(nextStatus)}`}
                </button>
              ) : (
                <span className="block rounded-lg bg-[#ccf5e5] py-2 text-center text-[11px] font-bold text-[#2d8b6c]">
                  Completed
                </span>
              )}
              <SelectField
                label="Priority"
                onChange={(value) => update("priority", value)}
                options={PRIORITY_OPTIONS}
                value={form.priority ?? "medium"}
              />
              <label className="block space-y-2 text-[11px] font-semibold text-[#55576b]">
                Due Date
                <div className="relative">
                  <input
                    className="w-full rounded-lg border-0 bg-white px-3 py-2 text-xs outline-none"
                    onChange={(event) => update("dueDate", event.target.value)}
                    min={nextDayInputValue(task.createdAt)}
                    type="date"
                    value={form.dueDate ?? ""}
                  />
                  <CalendarDays
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                    size={14}
                  />
                </div>
                {fieldErrors.dueDate && (
                  <span className="block text-[#c53a43]">
                    ⚠ {fieldErrors.dueDate}
                  </span>
                )}
              </label>
            </aside>
          </div>
          <div className="max-w-50 rounded-xl bg-[#f0f1ff] p-4 text-[10px] text-[#55576b]">
            <div className="mb-3 flex items-center gap-2 border-b border-[#dfe0ef] pb-2 font-semibold uppercase tracking-wider">
              <History size={13} /> Task activity
            </div>
            <p>Created &nbsp; {formatDateTime(task.createdAt)}</p>
            <p className="mt-2">
              Updated &nbsp; {formatDateTime(task.updatedAt)}
            </p>
          </div>
        </form>
        <footer className="flex items-center justify-between border-t border-[#e7e5f0] bg-[#eef0ff] px-5 py-4 sm:px-7">
          <button
            className="flex items-center gap-2 text-xs font-semibold text-[#d3444e]"
            disabled={saving || advancing}
            onClick={() => onRequestDelete(task)}
            type="button"
          >
            <Trash2 size={14} /> Delete
          </button>
          <div className="flex items-center gap-4">
            <button
              className="text-xs font-semibold text-[#55576b]"
              disabled={saving || advancing}
              onClick={onClose}
              type="button"
            >
              Cancel
            </button>
            <button
              className="flex items-center gap-2 rounded-lg bg-[#3426ce] px-4 py-2.5 text-xs font-semibold text-white disabled:opacity-60"
              disabled={saving || advancing}
              form="task-details-form"
              type="submit"
            >
              <CheckCircle2 size={14} />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}

function Field({ label, value, style }) {
  return (
    <label className="block space-y-2 text-[11px] font-semibold text-[#55576b]">
      {label}
      <span
        className={`inline-flex items-center rounded-full px-2 py-1 text-[11px] font-medium ${style}`}
      >
        {value}
      </span>
    </label>
  );
}

function SelectField({ label, value, onChange, options }) {
  return (
    <label className="block space-y-2 text-[11px] font-semibold text-[#55576b]">
      {label}
      <select
        className="w-full appearance-none rounded-lg border-0 bg-white px-3 py-2 text-xs text-[#303249] outline-none"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

export default TaskDetailsModal;

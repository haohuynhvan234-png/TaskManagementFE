import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Flag,
  MoreHorizontal,
  Pencil,
  RefreshCw,
  Trash2,
} from "lucide-react";
import {
  NEXT_STATUS,
  priorityLabel,
  priorityStyles,
  statusLabel,
  statusStyles,
} from "../../../lib/taskConstants";
import { formatDate, isOverdue } from "../../../lib/dateFormat";

const LIMIT_OPTIONS = [5];

function TaskTable({
  tasks,
  pagination,
  loading,
  error,
  onRetry,
  onOpenTask,
  onAdvanceStatus,
  onRequestDelete,
  onPageChange,
  onLimitChange,
}) {
  const hasData = tasks.length > 0;
  const from = hasData ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const to = hasData
    ? Math.min(pagination.page * pagination.limit, pagination.total)
    : 0;
  const hasPrev = pagination.page > 1;
  const hasNext = pagination.page < pagination.totalPages;

  return (
    <div className="overflow-hidden rounded-xl border border-[#e6e5ef] bg-white shadow-[0_8px_30px_rgba(38,37,76,0.04)]">
      <div className="hidden grid-cols-[minmax(220px,1fr)_108px_108px_110px_104px] gap-4 border-b border-[#ecebf3] bg-[#fdfcff] px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-[#636579] md:grid">
        <span>Task name</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Due date</span>
        <span>Actions</span>
      </div>

      <div>
        {error ? (
          <ErrorState
            message={error.message}
            details={error.details}
            onRetry={onRetry}
          />
        ) : !hasData && loading ? (
          <SkeletonRows />
        ) : !hasData ? (
          <EmptyState />
        ) : (
          tasks.map((task) => {
            const nextStatus = NEXT_STATUS[task.status];
            const overdue = isOverdue(task.dueDate, task.status);
            return (
              <TaskRow
                key={task._id}
                task={task}
                nextStatus={nextStatus}
                overdue={overdue}
                onOpenTask={onOpenTask}
                onAdvanceStatus={onAdvanceStatus}
                onRequestDelete={onRequestDelete}
              />
            );
          })
        )}
      </div>
      {hasData && (
        <div className="flex flex-col justify-between gap-3 bg-[#fdfcff] px-5 py-4 text-xs text-[#66687a] sm:flex-row sm:items-center">
          <label className="flex items-center gap-2 text-[#66687a]">
            Rows per page:
            <select
              aria-label="Rows per page"
              className="rounded-lg border border-[#e7e6f2] bg-white px-2 py-1.5 font-semibold text-[#303249] outline-none"
              onChange={(event) => onLimitChange(Number(event.target.value))}
              value={pagination.limit}
            >
              {LIMIT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <span className="flex items-center gap-3">
            {pagination.total === 0
              ? "0 results"
              : `${from}–${to} of ${pagination.total}`}
            <button
              aria-label="Previous page"
              className={hasPrev ? "text-[#4e5065]" : "text-[#bbbccc]"}
              disabled={!hasPrev}
              onClick={() => onPageChange(pagination.page - 1)}
              type="button"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="Next page"
              className={hasNext ? "text-[#4e5065]" : "text-[#bbbccc]"}
              disabled={!hasNext}
              onClick={() => onPageChange(pagination.page + 1)}
              type="button"
            >
              <ChevronRight size={16} />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

function TaskRow({
  task,
  nextStatus,
  overdue,
  onOpenTask,
  onAdvanceStatus,
  onRequestDelete,
}) {
  const rowClass = task.status === "done" ? "opacity-70" : "";
  return (
    <div
      className={`group grid w-full cursor-pointer grid-cols-[1fr_1fr] gap-3 border-b border-[#efedf5] px-5 py-4 transition hover:bg-[#faf9ff] md:grid-cols-[minmax(220px,1fr)_108px_108px_110px_104px] md:items-center md:gap-4 ${rowClass}`}
      onClick={() => onOpenTask(task)}
      role="button"
      tabIndex={0}
    >
      <div className="min-w-0">
        <p
          className={`block truncate text-sm font-medium ${task.status === "done" ? "line-through" : ""}`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="mt-1 block truncate text-xs text-[#67697c]">
            {task.description}
          </p>
        )}
        <div className="mt-2 flex flex-wrap gap-2 md:hidden">
          <Badge
            className={statusStyles[task.status]}
            label={statusLabel(task.status)}
          />
          <Badge
            className={priorityStyles[task.priority]}
            icon
            label={priorityLabel(task.priority)}
          />
        </div>
      </div>
      <div className="hidden md:block">
        <Badge
          className={statusStyles[task.status]}
          label={statusLabel(task.status)}
        />
      </div>
      <div className="hidden md:block">
        <Badge
          className={priorityStyles[task.priority]}
          icon
          label={priorityLabel(task.priority)}
        />
      </div>
      <div
        className={`hidden text-xs md:block ${overdue ? "text-[#c53a43]" : "text-[#66687a]"}`}
      >
        {formatDate(task.dueDate)}
        {overdue && " · Overdue"}
      </div>
      <div className="flex items-center justify-end gap-1 md:flex">
        {nextStatus && (
          <button
            aria-label={`Move to ${nextStatus}`}
            className="rounded-lg p-2 text-[#4b3ee5] hover:bg-[#eef0ff]"
            onClick={(event) => {
              event.stopPropagation();
              onAdvanceStatus(task, nextStatus);
            }}
            title={`Move to ${statusLabel(nextStatus)}`}
            type="button"
          >
            <ArrowRight size={16} />
          </button>
        )}
        <button
          aria-label="Edit task"
          className="rounded-lg p-2 text-[#51536a] hover:bg-[#f0effa]"
          onClick={(event) => {
            event.stopPropagation();
            onOpenTask(task);
          }}
          title="Edit task"
          type="button"
        >
          <Pencil size={15} />
        </button>
        <button
          aria-label="Delete task"
          className="rounded-lg p-2 text-[#d3444e] hover:bg-[#ffecec]"
          onClick={(event) => {
            event.stopPropagation();
            onRequestDelete(task);
          }}
          title="Delete task"
          type="button"
        >
          <Trash2 size={15} />
        </button>
        <button
          aria-label="Open task"
          className="rounded-lg p-2 text-[#77798b] md:hidden"
          onClick={(event) => {
            event.stopPropagation();
            onOpenTask(task);
          }}
          title="Open task"
          type="button"
        >
          <MoreHorizontal size={18} />
        </button>
      </div>
    </div>
  );
}

function Badge({ label, icon, className }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-medium ${className}`}
    >
      {icon && <Flag size={11} />}
      {label}
    </span>
  );
}
function ErrorState({ message, details, onRetry }) {
  return (
    <div className="px-6 py-10 text-center">
      <p className="text-sm font-semibold text-[#c53a43]">{message}</p>
      {details?.length > 0 && (
        <ul className="mt-2 list-disc space-y-1 text-xs text-[#7a3b42]">
          {details.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      <button
        className="mt-4 inline-flex items-center gap-2 rounded-lg border border-[#dfe1ec] px-4 py-2 text-xs font-semibold text-[#303249] hover:bg-[#f0f1f8]"
        onClick={onRetry}
        type="button"
      >
        <RefreshCw size={14} /> Retry
      </button>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="px-6 py-14 text-center">
      <p className="text-sm font-medium text-[#303249]">No tasks found</p>
      <p className="mt-1 text-xs text-[#67697c]">
        Try changing filters, or create a new task to get started.
      </p>
    </div>
  );
}

function SkeletonRows() {
  return (
    <div className="space-y-2 px-5 py-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <div key={index} className="h-14 animate-pulse rounded-lg bg-[#f0f1f8]">
          <div className="mx-4 my-3 flex items-center gap-3">
            <div className="h-4 w-1/3 rounded bg-[#e2e3ef]" />
            <div className="h-4 w-16 rounded bg-[#e2e3ef]" />
            <div className="h-4 w-14 rounded bg-[#e2e3ef]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskTable;

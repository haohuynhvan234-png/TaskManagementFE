import {
  ArrowDown,
  ArrowUpDown,
  List,
  SlidersHorizontal,
  Table2,
  X,
} from "lucide-react";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../lib/taskConstants";

function DashboardHeader({
  filters,
  sort,
  total,
  onFilterChange,
  onSortChange,
  onClearFilters,
}) {
  const safeFilters = filters ?? { status: "", priority: "" };
  const safeSort = sort ?? { sortBy: "createdAt", order: "desc" };
  const hasActiveFilters = Boolean(safeFilters.status || safeFilters.priority);
  const hasActiveSort =
    safeSort.sortBy !== "createdAt" || safeSort.order !== "desc";

  return (
    <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#4b3ee5]">
          Workspace overview
        </p>
        <h1 className="text-3xl font-bold tracking-tight text-[#151a2d] sm:text-4xl">
          Active Tasks
        </h1>
        <p className="mt-2 text-sm text-[#62647a]">
          {total} task{total === 1 ? "" : "s"} in your workspace.
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <FieldSelect
          ariaLabel="Filter by status"
          onChange={(value) => onFilterChange("status", value)}
          options={[
            { value: "", label: "All status" },
            ...STATUS_OPTIONS.map((item) => ({
              value: item.value,
              label: item.label,
            })),
          ]}
          value={safeFilters.status}
        />
        <FieldSelect
          ariaLabel="Filter by priority"
          onChange={(value) => onFilterChange("priority", value)}
          options={[
            { value: "", label: "All priority" },
            ...PRIORITY_OPTIONS.map((item) => ({
              value: item.value,
              label: item.label,
            })),
          ]}
          value={safeFilters.priority}
        />
        <FieldSelect
          ariaLabel="Sort by"
          onChange={(value) => onSortChange(value, safeSort.order)}
          options={[
            { value: "createdAt", label: "Sort: Created" },
            { value: "dueDate", label: "Sort: Due date" },
          ]}
          value={safeSort.sortBy}
        />
        <button
          aria-label="Toggle sort direction"
          className="flex items-center gap-1 rounded-lg bg-[#eaebff] px-3 py-2 text-xs font-semibold text-[#303249] hover:bg-[#dfe2ff]"
          onClick={() =>
            onSortChange(
              safeSort.sortBy,
              safeSort.order === "desc" ? "asc" : "desc",
            )
          }
          title={
            safeSort.order === "desc"
              ? "Currently newest first — click for oldest first"
              : "Currently oldest first — click for newest first"
          }
          type="button"
        >
          <ArrowUpDown size={13} />
          {safeSort.order === "desc" ? "Newest" : "Oldest"}
        </button>
        {(hasActiveFilters || hasActiveSort) && (
          <button
            aria-label="Clear filters"
            className="flex items-center gap-1 rounded-lg border border-[#dfe1ec] px-3 py-2 text-xs font-semibold text-[#c53a43] hover:bg-[#ffecec]"
            onClick={onClearFilters}
            type="button"
          >
            <X size={13} /> Clear
          </button>
        )}
        <div className="mx-1 hidden h-6 w-px bg-[#d6d5e2] sm:block" />
        <div className="flex overflow-hidden rounded-lg bg-[#eaebff]">
          <button
            className="bg-[#4b3ee5] p-2.5 text-white"
            title="List view"
            type="button"
          >
            <List size={16} />
          </button>
          <button
            className="p-2.5 text-[#51536a]"
            title="Table view"
            type="button"
          >
            <Table2 size={16} />
          </button>
        </div>
        <button
          className="rounded-lg p-2.5 text-[#51536a] hover:bg-[#eaebff]"
          title="More filters"
          type="button"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  );
}

function FieldSelect({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative">
      <select
        aria-label={ariaLabel}
        className="appearance-none rounded-lg border border-[#e7e6f2] bg-[#f7f7ff] py-2 pl-3 pr-7 text-xs font-semibold text-[#303249] outline-none focus:ring-2 focus:ring-[#4b3ee5]/20"
        onChange={(event) => onChange(event.target.value)}
        value={value}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ArrowDown
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[#51536a]"
        size={13}
      />
    </div>
  );
}

export default DashboardHeader;

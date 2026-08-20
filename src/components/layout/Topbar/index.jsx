import { Bell, HelpCircle, Plus, Search } from "lucide-react";

function Topbar({ onCreateTask, search, onSearchChange, total }) {
  return (
    <header className="sticky top-0 z-10 flex h-[62px] items-center gap-4 border-b border-[#ecebf4] bg-[#fcfbff]/95 px-4 backdrop-blur sm:px-6 lg:px-10">
      <div className="relative max-w-md flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-[#34364d]"
          size={16}
        />
        <input
          className="h-9 w-full rounded-lg border-0 bg-[#f1f1ff] pl-9 pr-3 text-xs outline-none placeholder:text-[#8a8ca0] focus:ring-2 focus:ring-[#4b3ee5]/20"
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search tasks..."
          value={search}
        />
      </div>
      <button
        className="flex h-9 items-center gap-2 rounded-lg bg-[#3426ce] px-4 text-xs font-semibold text-white shadow-sm transition hover:bg-[#2b20b4]"
        onClick={onCreateTask}
        type="button"
      >
        <Plus size={15} /> New Task
      </button>
      <div className="hidden items-center gap-4 border-l border-[#d8d7e4] pl-4 sm:flex">
        <span className="text-[11px] font-medium text-[#51536a]">{total} tasks</span>
        <button
          aria-label="Notifications"
          className="text-[#51536a] hover:text-[#3426ce]"
          type="button"
        >
          <Bell size={17} />
        </button>
        <button
          aria-label="Help"
          className="text-[#51536a] hover:text-[#3426ce]"
          type="button"
        >
          <HelpCircle size={17} />
        </button>
      </div>
    </header>
  );
}

export default Topbar;

import { Grid2X2, Send } from "lucide-react";

const navigation = [{ label: "Dashboard", icon: Grid2X2, active: true }];

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-56 border-r border-[#e7e6f2] bg-[#f1f2ff] lg:flex lg:flex-col">
      <div className="flex items-center gap-3 px-6 py-7">
        <span className="grid size-7 place-items-center bg-white text-[#4b3ee5] shadow-sm">
          <Send size={15} strokeWidth={2.5} />
        </span>
        <span className="text-base font-bold tracking-tight">TaskFlow</span>
      </div>
      <nav className="space-y-2 px-3">
        {navigation.map(({ label, icon: Icon, active }) => (
          <button
            className={`flex w-full items-center gap-3 rounded-lg px-4 py-2.5 text-left text-sm transition ${active ? "bg-[#4b3ee5] font-semibold text-white shadow-sm" : "text-[#51536a] hover:bg-white hover:text-[#22253a]"}`}
            key={label}
            type="button"
          >
            <Icon size={17} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;

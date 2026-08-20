import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

function AppShell({ children, onCreateTask, search, onSearchChange, total }) {
  return (
    <div className="min-h-screen bg-[#f9f8ff] text-[#151a2d]">
      <Sidebar />
      <div className="lg:pl-56">
        <Topbar
          onCreateTask={onCreateTask}
          onSearchChange={onSearchChange}
          search={search}
          total={total}
        />
        <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-10">{children}</main>
      </div>
    </div>
  );
}

export default AppShell;

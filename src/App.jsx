import { useEffect, useState } from "react";
import AppShell from "./components/layout/AppShell";
import Dashboard from "./pages/Dashboard";
import CreateTaskModal from "./components/modals/CreateTaskModal";
import TaskDetailsModal from "./components/modals/TaskDetailsModal";
import ConfirmDialog from "./components/modals/ConfirmDialog";
import Toast from "./components/feedback/Toast";
import { useTaskList } from "./hooks/useTaskList";
import { taskService } from "./services/taskService";

function App() {
  const list = useTaskList();
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [mutating, setMutating] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!toastMessage) return undefined;
    const timer = setTimeout(() => setToastMessage(""), 3500);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  const openCreateModal = () => setCreateModalOpen(true);
  const closeCreateModal = () => setCreateModalOpen(false);

  const openTask = (task) => setSelectedTask(task);
  const closeTask = () => setSelectedTask(null);

  const handleCreate = async (payload) => {
    await taskService.createTask(payload);
    setCreateModalOpen(false);
    await list.refresh();
    setToastMessage("Task created successfully.");
  };

  const handleSave = async (id, payload) => {
    const { data } = await taskService.updateTask(id, payload);
    await list.refresh();
    setSelectedTask(null);
    setToastMessage("Task updated successfully.");
    return data;
  };

  const handleAdvanceStatus = async (task, nextStatus) => {
    if (!nextStatus) return;
    const { data } = await taskService.updateTaskStatus(task._id, nextStatus);
    if (selectedTask?._id === task._id) setSelectedTask(data);
    await list.refresh();
    setToastMessage("Task status updated successfully.");
  };

  const handleDelete = async () => {
    const id = pendingDelete?._id;
    if (!id) return;
    setMutating(true);
    try {
      await taskService.deleteTask(id);
      if (selectedTask?._id === id) setSelectedTask(null);
      setPendingDelete(null);
      const isLastOnPage = list.tasks.length === 1 && list.pagination.page > 1;
      if (isLastOnPage) list.changePage(list.pagination.page - 1);
      else await list.refresh();
      setToastMessage("Task deleted successfully.");
    } finally {
      setMutating(false);
    }
  };

  return (
    <AppShell
      onCreateTask={openCreateModal}
      search={list.search}
      onSearchChange={list.updateSearch}
      total={list.pagination.total}
    >
      <Dashboard
        tasks={list.tasks}
        pagination={list.pagination}
        loading={list.loading}
        error={list.error}
        filters={list.filters}
        sort={list.sort}
        onFilterChange={list.updateFilter}
        onSortChange={list.updateSort}
        onClearFilters={list.clearFilters}
        onRetry={list.refresh}
        onOpenTask={openTask}
        onAdvanceStatus={handleAdvanceStatus}
        onRequestDelete={setPendingDelete}
        onPageChange={list.changePage}
        onLimitChange={list.changeLimit}
      />
      {isCreateModalOpen && (
        <CreateTaskModal onClose={closeCreateModal} onCreate={handleCreate} />
      )}
      {selectedTask && (
        <TaskDetailsModal
          task={selectedTask}
          onClose={closeTask}
          onSave={handleSave}
          onAdvanceStatus={handleAdvanceStatus}
          onRequestDelete={setPendingDelete}
        />
      )}
      <ConfirmDialog
        open={pendingDelete !== null}
        title="Delete task"
        message={`Are you sure you want to delete "${pendingDelete?.title ?? ""}"? This cannot be undone.`}
        confirmLabel="Delete"
        busy={mutating}
        onConfirm={handleDelete}
        onCancel={() => setPendingDelete(null)}
      />
      <Toast message={toastMessage} onClose={() => setToastMessage("")} />
    </AppShell>
  );
}

export default App;

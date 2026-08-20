import DashboardHeader from "../../components/dashboard/DashboardHeader";
import TaskTable from "../../components/dashboard/TaskTable";

function Dashboard(props) {
  return (
    <section className="relative mx-auto max-w-[1120px]">
      <DashboardHeader
        filters={props.filters}
        sort={props.sort}
        total={props.pagination.total}
        onFilterChange={props.onFilterChange}
        onSortChange={props.onSortChange}
        onClearFilters={props.onClearFilters}
      />
      <TaskTable
        tasks={props.tasks}
        pagination={props.pagination}
        loading={props.loading}
        error={props.error}
        onRetry={props.onRetry}
        onOpenTask={props.onOpenTask}
        onAdvanceStatus={props.onAdvanceStatus}
        onRequestDelete={props.onRequestDelete}
        onPageChange={props.onPageChange}
        onLimitChange={props.onLimitChange}
      />
    </section>
  );
}

export default Dashboard;

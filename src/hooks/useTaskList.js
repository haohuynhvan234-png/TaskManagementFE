import { useCallback, useEffect, useState } from "react";
import { taskService } from "../services/taskService";

const DEFAULT_LIMIT = 5;

/**
 * Hook quản toàn bộ state của danh sách task: lọc, search (debounce),
 * sắp xếp, phân trang, loading và lỗi — đờng bằng API thật `/api/tasks`.
 */
export function useTaskList() {
  const [tasks, setTasks] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: DEFAULT_LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [sort, setSort] = useState({ sortBy: "createdAt", order: "desc" });
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debounce tìm kiếm (400ms) để trán trán request per keystroke
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(search), 400);
    return () => clearTimeout(timer);
  }, [search]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {
        page,
        limit,
        sortBy: sort.sortBy,
        order: sort.order,
      };
      if (filters.status) params.status = filters.status;
      if (filters.priority) params.priority = filters.priority;
      if (debouncedSearch.trim()) params.search = debouncedSearch.trim();

      const { data, pagination: resultPagination } =
        await taskService.listTasks(params);
      setTasks(data);
      setPagination(resultPagination);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [
    page,
    limit,
    sort.sortBy,
    sort.order,
    filters.status,
    filters.priority,
    debouncedSearch,
  ]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  /** Reload danh sách (sau mutate) */
  const refresh = useCallback(async () => {
    await fetchTasks();
  }, [fetchTasks]);

  /** Cập nhật lọc (status / priority) và reset trang 1 */
  const updateFilter = useCallback((key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  }, []);

  const updateSearch = useCallback((value) => {
    setSearch(value);
    setPage(1);
  }, []);

  const updateSort = useCallback((sortBy, order) => {
    setSort((prev) => ({
      sortBy: sortBy ?? prev.sortBy,
      order: order ?? prev.order,
    }));
    setPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({ status: "", priority: "" });
    setSort({ sortBy: "createdAt", order: "desc" });
    setSearch("");
    setPage(1);
  }, []);

  const changePage = useCallback((nextPage) => setPage(nextPage), []);
  const changeLimit = useCallback((nextLimit) => {
    setLimit(nextLimit);
    setPage(1);
  }, []);

  return {
    // data
    tasks,
    pagination,
    loading,
    error,
    // filters / search / sort state
    filters,
    search,
    sort,
    // actions
    refresh,
    updateFilter,
    updateSearch,
    updateSort,
    clearFilters,
    changePage,
    changeLimit,
  };
}

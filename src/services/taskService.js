const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://taskmanagement-production-6abf.up.railway.app";
const TASKS_ENDPOINT = `${API_BASE_URL}/api/tasks`;

/** Lỗi chuẩn từ API: { success: false, message, details, statusCode } */
export class ApiError extends Error {
  constructor(message, details = [], statusCode) {
    super(message);
    this.name = "ApiError";
    this.details = details;
    this.statusCode = statusCode;
  }
}

async function request(path = "", options = {}) {
  let response;
  try {
    response = await fetch(`${TASKS_ENDPOINT}${path}`, {
      // Chỉ set Content-Type khi có body để tránh preflight không cần thiết
      headers: options.body ? { "Content-Type": "application/json" } : {},
      ...options,
    });
  } catch {
    throw new ApiError(
      "Cannot reach the API server. Please try again later.",
      [],
      0,
    );
  }

  let body = null;
  try {
    body = await response.json();
  } catch {
    body = null;
  }

  if (!response.ok) {
    throw new ApiError(
      body?.message || `Request failed with status ${response.status}`,
      body?.details || [],
      body?.statusCode ?? response.status,
    );
  }

  return body;
}

export const taskService = {
  /** GET /api/tasks — params: { status, priority, search, page, limit, sortBy, order } */
  async listTasks(params = {}) {
    const query = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        query.set(key, value);
      }
    });
    const qs = query.toString();
    return request(qs ? `?${qs}` : "");
  },

  /** GET /api/tasks/:id */
  async getTask(id) {
    return request(`/${id}`);
  },

  /** POST /api/tasks — payload: { title (required), description?, priority?, dueDate? } */
  async createTask(payload) {
    return request("", { method: "POST", body: JSON.stringify(payload) });
  },

  /** PUT /api/tasks/:id — partial update */
  async updateTask(id, payload) {
    return request(`/${id}`, { method: "PUT", body: JSON.stringify(payload) });
  },

  /** PATCH /api/tasks/:id/status — chỉ cho phép tiến thuận 1 bước */
  async updateTaskStatus(id, status) {
    return request(`/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
  },

  /** DELETE /api/tasks/:id */
  async deleteTask(id) {
    return request(`/${id}`, { method: "DELETE" });
  },
};

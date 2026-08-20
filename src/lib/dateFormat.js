/** Định dạng ngày ngắn gọn: "16 Aug 2026" */
export function formatDate(value) {
  if (!value) return "No due date";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

/** Định dạng giờ đầy đủ: "16 Aug 2026, 08:10" */
export function formatDateTime(value) {
  if (!value) return "—";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Chuyển ISO date sang giá trị input[type=date] (YYYY-MM-DD) */
export function toDateInputValue(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (n) => String(n).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Giá trị ngày hiện tại cho input[type=date], theo múi giờ local. */
export function todayInputValue() {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

/** Ngày nhỏ nhất hợp lệ khi hạn nộp phải sau ngày tạo. */
export function nextDayInputValue(value) {
  const date = value ? new Date(value) : new Date();
  if (Number.isNaN(date.getTime())) return "";
  date.setDate(date.getDate() + 1);
  return toDateInputValue(date);
}

/** Hạn nộp phải sau ngày tạo, không chấp nhận cùng ngày. */
export function isDueDateAfterCreation(dueDate, createdAt) {
  if (!dueDate) return true;
  const creationDate = createdAt
    ? toDateInputValue(createdAt)
    : todayInputValue();
  return Boolean(creationDate) && dueDate > creationDate;
}

/** Task quá hạn khi dueDate trước hôm nay và chưa hoàn thành */
export function isOverdue(dueDate, status) {
  if (!dueDate || status === "done") return false;
  const due = new Date(dueDate);
  const now = new Date();
  const startOfToday = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  return due < startOfToday;
}

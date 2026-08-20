export const STATUS_OPTIONS = [
  { value: "todo", label: "Todo" },
  { value: "doing", label: "Doing" },
  { value: "done", label: "Done" },
];

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

/** Thứ tự hợp lệ của status — server chỉ cho tiến thuận 1 bước */
export const STATUS_ORDER = ["todo", "doing", "done"];

/** Trạng thái kế tiếp; null nghĩa là không thể advance thêm */
export const NEXT_STATUS = {
  todo: "doing",
  doing: "done",
  done: null,
};

export const statusLabel = (value) =>
  STATUS_OPTIONS.find((item) => item.value === value)?.label ?? value;

export const priorityLabel = (value) =>
  PRIORITY_OPTIONS.find((item) => item.value === value)?.label ?? value;

export const statusStyles = {
  todo: "bg-[#e5e9fb] text-[#5b6078]",
  doing: "bg-[#dcd7ff] text-[#5948d7]",
  done: "bg-[#ccf5e5] text-[#2d8b6c]",
};

export const priorityStyles = {
  high: "bg-[#ffe5e5] text-[#c53a43]",
  medium: "bg-[#f5e5ce] text-[#a9783a]",
  low: "bg-[#e5e8fa] text-[#737891]",
};

export const PRIORITY_TONE = {
  high: "high",
  medium: "medium",
  low: "low",
};
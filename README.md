# TaskFlow · Task Management (Frontend)

Giao diện React (Vite) cho **Task Management API** (`TaskManagementAPI`). Ứng dụng hiển thị, tạo, sửa, đổi trạng thái và xóa task thông qua API REST tại `http://localhost:3001`.

## Công nghệ

- React 19 + Vite 8
- Tailwind CSS v4 (Shadcn/`base-nova` style)
- lucide-react icons
- Kết nối API bằng `fetch` (service layer trong `src/services/taskService.js`)

## Chạy

```bash
npm install
npm run dev      # mở http://localhost:3000
```

API backend phải chạy tại `http://localhost:3001` (xem dự án `TaskManagementAPI`).

### Cấu hình Base URL

Mặc định FE gọi `http://localhost:3001`. Muốn đổi, tạo file `.env` từ `.env.example`:

```env
VITE_API_BASE_URL=http://localhost:3001
```

## Scripts

| Lệnh            | Mô tả            |
| --------------- | ---------------- |
| `npm run dev`   | Dev server       |
| `npm run build` | Build production |
| `npm run lint`  | Oxlint           |
| `npm run preview` | Preview build |

## Tính năng (kết nối API thật)

- Danh sách task với **server-side**: lọc theo `status`/`priority`, tìm kiếm (`search`, debounce), sắp xếp (`sortBy`/`order`), phân trang (`page`/`limit`).
- Tạo task (POST `/api/tasks`) — validate `title` bắt buộc, hiển thị lỗi từ `details`.
- Sửa task (PUT `/api/tasks/:id`) từ modal chi tiết.
- Đổi trạng thái (PATCH `/api/tasks/:id/status`) — **chỉ cho phép tiến thuận** `todo → doing → done`; nút advance chỉ hiển thị khi còn bước kế tiếp.
- Xóa task (DELETE `/api/tasks/:id`) — có dialog xác nhận.
- Trạng thái loading (skeleton), lỗi kèm nút Retry, empty state.

Tài liệu chi tiết API: `docs/API_DOCUMENTATION.md` trong dự án `TaskManagementAPI`.

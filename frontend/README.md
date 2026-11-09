# AI Image Repository – Frontend & Search Engineer (Module 4)

> **Dự án:** AI Image Repository – Distributed AI Image Generation System  
> **Module phụ trách:** Module số 4 – Frontend & Search Engineer  
> **Phong cách hình ảnh:** Minh họa màu nước bách khoa toàn thư (Watercolor Encyclopedia)  
> **Quy ước tên file ảnh:** `[prompt] [member_id].[worker_id].jpg` (ví dụ: `black dog 2.1.jpg`)

---

## 1. GIỚI THIỆU MODULE FRONTEND

Module 4 là giao diện người dùng trung tâm của hệ thống AI Image Repository, chịu trách nhiệm:
- **Tìm kiếm hình ảnh:** Tìm kiếm tức thì trong kho lưu trữ theo từ khóa tiếng Anh (`GET /api/images/search?q=...`).
- **Điều phối sinh ảnh AI (Distributed AI Generation):** Khi người dùng tìm một hình ảnh chưa tồn tại trong kho, Frontend kích hoạt luồng yêu cầu sinh ảnh đến Backend FastAPI (`POST /api/generation/request`), nhận về `task_id` và theo dõi tiến trình qua cơ chế Polling thời gian thực (`pending` ➔ `processing` ➔ `completed` / `failed`).
- **Kho lưu trữ hình ảnh (Image Gallery):** Hiển thị hình ảnh dạng lưới đáp ứng (Responsive Grid: 2 cột Mobile, 3–4 cột Tablet, 5–6 cột Desktop), phân trang tối đa 50 ảnh/trang, sắp xếp theo ảnh mới nhất, phân tích định danh Worker và xem modal chi tiết ảnh chất lượng cao.
- **Giám sát cụm máy trạm (AI Worker Dashboard):** Theo dõi trạng thái hoạt động của các máy trạm AI Worker (`Online`, `Busy`, `Offline`), xem tên máy tính, GPU, heartbeat và tác vụ đang xử lý.
- **Thống kê sản lượng (Worker Statistics):** Hiển thị các chỉ số tổng quan và biểu đồ cột trực quan về sản lượng ảnh do từng Worker tạo ra.

---

## 2. CÔNG NGHỆ SỬ DỤNG

- **ReactJS 19** (JSX, Functional Components, Custom Hooks)
- **Vite 8** (Build tool hiệu năng cao, HMR tức thì)
- **Tailwind CSS 3.4** (Thiết kế Modern AI Dashboard, Clean UI, Light Theme)
- **React Router DOM 7** (Điều hướng SPA đa trang: Home, Gallery, Workers, Statistics)
- **Axios** (REST client với interceptor xử lý lỗi và cấu hình tập trung)
- **Lucide React** (Bộ biểu tượng hiện đại, đồng bộ)
- **Docker & Nginx Alpine** (Multi-stage build cho môi trường Production)

---

## 3. CẤU TRÚC THƯ MỤC

```text
frontend/
├── public/
│   ├── favicon.svg
│   └── logo.svg                 # Logo biểu tượng hệ thống
├── src/
│   ├── assets/                  # Hình ảnh tĩnh và tài nguyên đồ họa
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.jsx       # Header, navigation, chỉ báo System Status
│   │   │   └── Footer.jsx       # Footer, thông tin quy ước tên file ảnh
│   │   ├── gallery/
│   │   │   ├── ImageCard.jsx    # Card hiển thị ảnh, tên file, Worker ID
│   │   │   ├── ImageGallery.jsx # Grid Gallery responsive, skeleton, empty state
│   │   │   ├── ImageModal.jsx   # Modal xem chi tiết ảnh, copy tên, tải ảnh
│   │   │   └── Pagination.jsx   # Phân trang tối đa 50 ảnh/trang
│   │   ├── search/
│   │   │   ├── SearchBar.jsx    # Ô tìm kiếm lớn, nút xóa, nút search
│   │   │   └── SearchSuggestions.jsx # Chip từ khóa gợi ý
│   │   ├── generation/
│   │   │   └── GenerationStatus.jsx  # Card theo dõi tiến trình sinh ảnh AI
│   │   ├── workers/
│   │   │   ├── WorkerCard.jsx   # Card thông tin máy trạm Worker
│   │   │   └── WorkerList.jsx   # Danh sách Worker kèm bộ lọc trạng thái
│   │   └── statistics/
│   │       └── WorkerStats.jsx  # Thống kê & biểu đồ cột theo Worker
│   ├── pages/
│   │   ├── Home.jsx             # Trang chủ: Hero + Search + AI Status + Gallery
│   │   ├── Gallery.jsx          # Trang Gallery chuyên dụng có phân trang
│   │   ├── Workers.jsx          # Trang Dashboard quản lý Worker
│   │   └── Statistics.jsx       # Trang Thống kê chi tiết và biểu đồ
│   ├── services/
│   │   ├── api.js               # Service gọi Backend API tập trung & Mock switcher
│   │   └── mockData.js          # In-memory mock store phục vụ phát triển độc lập
│   ├── hooks/
│   │   ├── useImages.js         # Custom hook quản lý kho ảnh, tìm kiếm, phân trang
│   │   └── useGenerationTask.js # Custom hook quản lý Polling tác vụ tạo ảnh
│   ├── utils/
│   │   └── formatDate.js        # Helper định dạng ngày giờ và parse filename
│   ├── App.jsx                  # Root App với cấu hình định tuyến (Routes)
│   ├── main.jsx                 # Entrypoint khởi tạo ReactDOM
│   └── index.css                # Cấu hình Tailwind CSS và typography
├── .env                         # Biến môi trường cục bộ
├── .env.example                 # Mẫu cấu hình biến môi trường
├── Dockerfile                   # Multi-stage Docker build
├── nginx.conf                   # Cấu hình Nginx phục vụ SPA và cache asset
├── .dockerignore
├── package.json
└── README.md
```

---

## 4. YÊU CẦU MÔI TRƯỜNG

- **Node.js:** Phiên bản `>= 18.0.0` (Khuyên dùng LTS v20.x hoặc v22.x)
- **npm:** Phiên bản `>= 9.x`
- **Docker & Docker Compose** (Tùy chọn, nếu chạy bằng container)

---

## 5. CÁCH CÀI ĐẶT

Mở terminal tại thư mục chứa source code:

```bash
# Di chuyển vào thư mục frontend (nếu đang ở thư mục gốc)
cd frontend

# Cài đặt các thư viện phụ thuộc
npm install
```

---

## 6. CÁCH CHẠY Ở CHẾ ĐỘ DEVELOPMENT

Khởi động máy chủ phát triển Vite với Hot Module Replacement (HMR):

```bash
npm run dev
```

Mở trình duyệt tại địa chỉ: **`http://localhost:5173`**

---

## 7. CẤU HÌNH BACKEND API

Frontend không hardcode địa chỉ Backend mà sử dụng biến môi trường chuẩn của Vite (`VITE_*`).

Sao chép file mẫu `.env.example` thành `.env`:

```bash
cp .env.example .env
```

Nội dung file `.env`:

```env
# Địa chỉ gốc của Backend FastAPI (Mặc định: http://localhost:8000)
VITE_API_BASE_URL=http://localhost:8000

# Bật hoặc tắt Mock Data
VITE_USE_MOCK=false

# Thời gian chu kỳ Polling kiểm tra trạng thái tác vụ (ms)
VITE_POLL_INTERVAL_MS=2500
```

---

## 8. CÁCH BẬT / TẮT MOCK MODE

Dự án tích hợp sẵn hệ thống Mock Data nội bộ (`src/services/mockData.js`) cho phép Frontend chạy độc lập và đầy đủ tính năng ngay cả khi Backend FastAPI chưa sẵn sàng.

- **Bật Mock Mode (Mặc định trong môi trường phát triển ban đầu):**
  ```env
  VITE_USE_MOCK=true
  ```
  Khi bật, Header hiển thị huy hiệu vàng `Mock Data Mode`. Mọi thao tác tìm kiếm, sinh ảnh AI mới (với độ trễ mô phỏng 6 giây), thêm ảnh vào kho và cập nhật Worker đều hoạt động trơn tru.

- **Tắt Mock Mode (Kết nối trực tiếp Backend FastAPI thật):**
  ```env
  VITE_USE_MOCK=false
  ```
  Khi tắt, Header hiển thị huy hiệu xanh `Live API Mode`. Axios sẽ thực hiện gọi API trực tiếp đến `VITE_API_BASE_URL`.

---

## 9. CÁCH BUILD PRODUCTION

Để tạo bản build tối ưu hóa cho môi trường Production:

```bash
npm run build
```

Các file tĩnh sau khi tối ưu và nén gzip sẽ nằm trong thư mục `dist/`.

Để kiểm tra thử bản build trên local:

```bash
npm run preview
```

---

## 10. CÁCH CHẠY DOCKER

Dự án cung cấp `Dockerfile` multi-stage:
1. **Stage 1 (Builder):** Sử dụng `node:22-alpine` để cài đặt thư viện và build mã nguồn.
2. **Stage 2 (Runner):** Sử dụng `nginx:alpine` siêu nhẹ, cấu hình sẵn định tuyến SPA fallback về `index.html`.

### Build Docker Image

```bash
docker build -t ai-image-repository-frontend .
```

*Nếu muốn truyền địa chỉ Backend thật khi build:*
```bash
docker build \
  --build-arg VITE_API_BASE_URL=http://your-backend-api.com \
  --build-arg VITE_USE_MOCK=false \
  -t ai-image-repository-frontend .
```

### Chạy Docker Container

```bash
docker run -d -p 8080:80 --name ai-repo-frontend ai-image-repository-frontend
```

Truy cập ứng dụng tại: **`http://localhost:8080`**

---

## 11. DANH SÁCH API CẦN BACKEND CUNG CẤP

Dưới đây là hợp đồng giao tiếp API (API Contract) giữa Frontend và Backend FastAPI:

### 1. Lấy danh sách ảnh phân trang
- **Endpoint:** `GET /api/images`
- **Query Params:**
  - `page` (int, default: 1)
  - `limit` (int, default: 50)
  - `sort` (string: `newest` | `oldest`, default: `newest`)
- **Response (200 OK):**
  ```json
  {
    "page": 1,
    "limit": 50,
    "total": 120,
    "total_pages": 3,
    "images": [
      {
        "image_id": "uuid-string",
        "image_name": "black dog 2.1.jpg",
        "image_url": "https://storage.domain.com/images/black_dog_2.1.jpg",
        "worker_id": "2.1",
        "member_id": 2,
        "created_at": "2026-11-09T07:15:00Z"
      }
    ]
  }
  ```

### 2. Tìm kiếm ảnh
- **Endpoint:** `GET /api/images/search`
- **Query Params:**
  - `q` (string, e.g. `black dog`)
- **Response (200 OK):**
  ```json
  {
    "query": "black dog",
    "total": 1,
    "images": [
      {
        "image_id": "uuid-string",
        "image_name": "black dog 2.1.jpg",
        "image_url": "https://storage.domain.com/images/black_dog_2.1.jpg",
        "worker_id": "2.1",
        "member_id": 2,
        "created_at": "2026-11-09T07:15:00Z"
      }
    ]
  }
  ```

### 3. Thống kê sản lượng hình ảnh
- **Endpoint:** `GET /api/images/stats`
- **Response (200 OK):**
  ```json
  {
    "total_images": 120,
    "total_workers": 6,
    "active_workers": 5,
    "workers": [
      {
        "worker_id": "2.1",
        "member_id": 2,
        "machine_name": "workstation-alienware-m18",
        "status": "online",
        "total_images": 54
      }
    ]
  }
  ```

### 4. Danh sách AI Worker
- **Endpoint:** `GET /api/workers`
- **Response (200 OK):**
  ```json
  [
    {
      "worker_id": "2.1",
      "member_id": 2,
      "machine_name": "workstation-alienware-m18",
      "status": "online",
      "total_images": 54,
      "current_task": "Idle (Standby)",
      "last_heartbeat": "2026-11-09T07:35:10Z"
    }
  ]
  ```

### 5. Yêu cầu tạo ảnh mới
- **Endpoint:** `POST /api/generation/request`
- **Request Body:**
  ```json
  {
    "prompt": "purple elephant"
  }
  ```
- **Response (202 Accepted / 200 OK):**
  ```json
  {
    "task_id": "task-uuid-8f92",
    "status": "pending",
    "assigned_worker": "2.1"
  }
  ```

### 6. Kiểm tra trạng thái tác vụ sinh ảnh (Polling)
- **Endpoint:** `GET /api/generation/{task_id}`
- **Response khi đang xử lý:**
  ```json
  {
    "task_id": "task-uuid-8f92",
    "status": "processing",
    "assigned_worker": "2.1"
  }
  ```
- **Response khi hoàn thành:**
  ```json
  {
    "task_id": "task-uuid-8f92",
    "status": "completed",
    "assigned_worker": "2.1",
    "images": [
      {
        "image_id": "new-img-uuid",
        "image_name": "purple elephant 2.1.jpg",
        "image_url": "https://storage.domain.com/images/purple_elephant_2.1.jpg",
        "worker_id": "2.1",
        "member_id": 2,
        "created_at": "2026-11-09T07:40:00Z"
      }
    ]
  }
  ```
- **Response khi thất bại:**
  ```json
  {
    "task_id": "task-uuid-8f92",
    "status": "failed",
    "error": "CUDA out of memory error on Worker node 2.1"
  }
  ```

### 7. Trạng thái sức khỏe hệ sinh thái (Health check)
- **Endpoint:** `GET /api/health`
- **Response (200 OK):**
  ```json
  {
    "status": "operational",
    "timestamp": "2026-11-09T07:40:00Z"
  }
  ```

# AI Image Repository – Distributed AI Image Generation System

Dự án nhóm: **Hệ thống lưu trữ, tìm kiếm và phân phối sinh hình ảnh AI tự động trên cụm máy trạm phân tán.**

## Module 4: Frontend & Search Engineer

Toàn bộ mã nguồn giao diện người dùng được tổ chức tại thư mục [`frontend/`](./frontend).

### Khởi động nhanh (Quick Start)

```bash
# 1. Cài đặt phụ thuộc
cd frontend
npm install

# 2. Chạy môi trường phát triển
npm run dev
```

Hoặc chạy trực tiếp từ thư mục gốc:
```bash
npm install --prefix frontend
npm run dev
```

Truy cập: `http://localhost:5173`

Xem tài liệu chi tiết, hướng dẫn cấu hình API FastAPI, Mock Mode và Docker tại:
👉 [**frontend/README.md**](./frontend/README.md)

### Build và push Docker bằng GitHub Actions

Workflow [`.github/workflows/docker-publish.yml`](./.github/workflows/docker-publish.yml)
build context từ `frontend/` và push image lên Docker Hub. Trước khi chạy, thêm hai
repository secrets trong GitHub:

- `DOCKERHUB_USERNAME`: tên tài khoản Docker Hub, ví dụ `herius`
- `DOCKERHUB_TOKEN`: Docker Hub access token, không dùng mật khẩu tài khoản

Workflow tự chạy khi push vào `main`. Có thể chạy thủ công tại tab **Actions** và
chọn tag, API URL, cùng chế độ mock. Image mặc định là:

```text
herius/pictureai:tagname
```

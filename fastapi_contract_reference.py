"""
AI Image Repository - FastAPI Backend Contract Reference
Dành cho thành viên phụ trách Backend tham khảo để kết nối với Module 4 Frontend.
Chạy thử: uvicorn fastapi_contract_reference:app --reload --port 8000
"""

from fastapi import FastAPI, Query, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import uuid
import time
from datetime import datetime

app = FastAPI(title="AI Image Repository API", version="1.0.0")

# Bắt buộc bật CORS để Frontend kết nối từ localhost:5173 hoặc container
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ----------------- IN-MEMORY DATABASE MẪU -----------------
IMAGES_DB = [
    {
        "image_id": "img-001",
        "image_name": "black dog 2.1.jpg",
        "image_url": "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
        "worker_id": "2.1",
        "member_id": 2,
        "created_at": "2026-11-09T07:15:00Z"
    },
    {
        "image_id": "img-002",
        "image_name": "red fox 1.1.jpg",
        "image_url": "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80",
        "worker_id": "1.1",
        "member_id": 1,
        "created_at": "2026-11-09T06:50:00Z"
    },
    {
        "image_id": "img-003",
        "image_name": "blue whale 3.1.jpg",
        "image_url": "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80",
        "worker_id": "3.1",
        "member_id": 3,
        "created_at": "2026-11-09T06:22:00Z"
    }
]

WORKERS_DB = [
    {
        "worker_id": "1.1",
        "member_id": 1,
        "machine_name": "rig-alpha-rtx4090",
        "status": "online",
        "total_images": 48,
        "current_task": "Idle",
        "last_heartbeat": "2026-11-09T07:35:10Z"
    },
    {
        "worker_id": "1.2",
        "member_id": 1,
        "machine_name": "rig-beta-rtx3080ti",
        "status": "busy",
        "total_images": 39,
        "current_task": "Generating watercolor diffuse",
        "last_heartbeat": "2026-11-09T07:35:15Z"
    },
    {
        "worker_id": "2.1",
        "member_id": 2,
        "machine_name": "workstation-alienware-m18",
        "status": "online",
        "total_images": 54,
        "current_task": "Idle",
        "last_heartbeat": "2026-11-09T07:35:12Z"
    }
]

TASKS_DB = {}

# ----------------- SCHEMAS -----------------
class GenerationRequest(BaseModel):
    prompt: str

# ----------------- API ENDPOINTS -----------------

@app.get("/api/health")
def health_check():
    """Kiểm tra sức khỏe hệ thống Backend"""
    return {"status": "operational", "timestamp": datetime.utcnow().isoformat()}

@app.get("/api/images")
def get_images(page: int = 1, limit: int = 50, sort: str = "newest"):
    """1. Lấy danh sách ảnh phân trang (mặc định mới nhất trước)"""
    sorted_images = sorted(
        IMAGES_DB,
        key=lambda x: x["created_at"],
        reverse=(sort != "oldest")
    )
    total = len(sorted_images)
    start = (page - 1) * limit
    end = start + limit
    paginated = sorted_images[start:end]
    total_pages = (total + limit - 1) // limit if total > 0 else 1

    return {
        "page": page,
        "limit": limit,
        "total": total,
        "total_pages": total_pages,
        "images": paginated
    }

@app.get("/api/images/search")
def search_images(q: str = Query(..., description="Từ khóa tìm kiếm tiếng Anh")):
    """2. Tìm kiếm ảnh theo từ khóa"""
    q_clean = q.strip().lower()
    results = [img for img in IMAGES_DB if q_clean in img["image_name"].lower()]
    return {
        "query": q,
        "total": len(results),
        "images": results
    }

@app.get("/api/images/stats")
def get_stats():
    """3. Thống kê sản lượng hình ảnh theo Worker"""
    total_images = len(IMAGES_DB)
    total_workers = len(WORKERS_DB)
    active_workers = len([w for w in WORKERS_DB if w["status"] in ["online", "busy"]])

    worker_stats = []
    for w in WORKERS_DB:
        count = len([img for img in IMAGES_DB if img["worker_id"] == w["worker_id"]])
        worker_stats.append({
            "worker_id": w["worker_id"],
            "member_id": w["member_id"],
            "machine_name": w["machine_name"],
            "status": w["status"],
            "total_images": count or w["total_images"]
        })

    return {
        "total_images": total_images,
        "total_workers": total_workers,
        "active_workers": active_workers,
        "workers": worker_stats
    }

@app.get("/api/workers")
def get_workers():
    """4. Danh sách AI Worker đang kết nối cụm phân tán"""
    return WORKERS_DB

def simulate_worker_processing(task_id: str, prompt: str):
    """Mô phỏng Worker nhận tác vụ và sinh ảnh sau vài giây"""
    time.sleep(2)
    if task_id in TASKS_DB:
        TASKS_DB[task_id]["status"] = "processing"
    
    time.sleep(4)
    if task_id in TASKS_DB:
        assigned_worker = TASKS_DB[task_id]["assigned_worker"]
        member_id = int(assigned_worker.split(".")[0])
        safe_name = "".join(c for c in prompt if c.isalnum() or c in " _-").strip().lower()
        filename = f"{safe_name} {assigned_worker}.jpg"

        new_image = {
            "image_id": str(uuid.uuid4()),
            "image_name": filename,
            "image_url": "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
            "worker_id": assigned_worker,
            "member_id": member_id,
            "created_at": datetime.utcnow().isoformat()
        }
        IMAGES_DB.insert(0, new_image)
        TASKS_DB[task_id]["status"] = "completed"
        TASKS_DB[task_id]["images"] = [new_image]

@app.post("/api/generation/request")
def request_generation(req: GenerationRequest, background_tasks: BackgroundTasks):
    """5. Yêu cầu tạo ảnh mới khi tìm kiếm không có"""
    task_id = "task-" + str(uuid.uuid4())[:8]
    assigned_worker = "2.1"
    
    TASKS_DB[task_id] = {
        "task_id": task_id,
        "prompt": req.prompt,
        "status": "pending",
        "assigned_worker": assigned_worker,
        "images": []
    }

    background_tasks.add_task(simulate_worker_processing, task_id, req.prompt)

    return {
        "task_id": task_id,
        "status": "pending",
        "assigned_worker": assigned_worker
    }

@app.get("/api/generation/{task_id}")
def check_generation(task_id: str):
    """6. Kiểm tra trạng thái tác vụ sinh ảnh (Polling/SSE)"""
    if task_id not in TASKS_DB:
        raise HTTPException(status_code=404, detail="Task not found")
    return TASKS_DB[task_id]

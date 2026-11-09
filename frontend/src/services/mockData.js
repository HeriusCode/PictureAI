// In-memory mock data store for development & testing when Backend FastAPI is not active

const INITIAL_IMAGES = [
  {
    image_id: "img-001",
    image_name: "black dog 2.1.jpg",
    image_url: "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.1",
    member_id: 2,
    created_at: "2026-11-09T07:15:00Z"
  },
  {
    image_id: "img-002",
    image_name: "red fox 1.1.jpg",
    image_url: "https://images.unsplash.com/photo-1516934024742-b461fba47600?auto=format&fit=crop&w=800&q=80",
    worker_id: "1.1",
    member_id: 1,
    created_at: "2026-11-09T06:50:00Z"
  },
  {
    image_id: "img-003",
    image_name: "blue whale 3.1.jpg",
    image_url: "https://images.unsplash.com/photo-1568430462989-44163eb1752f?auto=format&fit=crop&w=800&q=80",
    worker_id: "3.1",
    member_id: 3,
    created_at: "2026-11-09T06:22:00Z"
  },
  {
    image_id: "img-004",
    image_name: "golden eagle 2.2.jpg",
    image_url: "https://images.unsplash.com/photo-1611689342806-0863700ce8e4?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.2",
    member_id: 2,
    created_at: "2026-11-09T05:40:00Z"
  },
  {
    image_id: "img-005",
    image_name: "white swan 1.2.jpg",
    image_url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    worker_id: "1.2",
    member_id: 1,
    created_at: "2026-11-09T05:15:00Z"
  },
  {
    image_id: "img-006",
    image_name: "spotted owl 3.2.jpg",
    image_url: "https://images.unsplash.com/photo-1543549790-8b5f4a028cfb?auto=format&fit=crop&w=800&q=80",
    worker_id: "3.2",
    member_id: 3,
    created_at: "2026-11-09T04:30:00Z"
  },
  {
    image_id: "img-007",
    image_name: "mountain pine 1.1.jpg",
    image_url: "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=800&q=80",
    worker_id: "1.1",
    member_id: 1,
    created_at: "2026-11-09T03:55:00Z"
  },
  {
    image_id: "img-008",
    image_name: "monarch butterfly 2.1.jpg",
    image_url: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.1",
    member_id: 2,
    created_at: "2026-11-09T03:10:00Z"
  },
  {
    image_id: "img-009",
    image_name: "botanical rose 3.1.jpg",
    image_url: "https://images.unsplash.com/photo-1518709779341-56cf4535e94b?auto=format&fit=crop&w=800&q=80",
    worker_id: "3.1",
    member_id: 3,
    created_at: "2026-11-09T02:45:00Z"
  },
  {
    image_id: "img-010",
    image_name: "honey bee 1.2.jpg",
    image_url: "https://images.unsplash.com/photo-1559827291-72ee739d0d9a?auto=format&fit=crop&w=800&q=80",
    worker_id: "1.2",
    member_id: 1,
    created_at: "2026-11-09T02:00:00Z"
  },
  {
    image_id: "img-011",
    image_name: "green tree frog 2.1.jpg",
    image_url: "https://images.unsplash.com/photo-1579380656108-328662a22695?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.1",
    member_id: 2,
    created_at: "2026-11-08T23:30:00Z"
  },
  {
    image_id: "img-012",
    image_name: "arctic wolf 2.2.jpg",
    image_url: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef6?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.2",
    member_id: 2,
    created_at: "2026-11-08T22:15:00Z"
  },
  {
    image_id: "img-013",
    image_name: "ocean lighthouse 3.2.jpg",
    image_url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
    worker_id: "3.2",
    member_id: 3,
    created_at: "2026-11-08T20:50:00Z"
  },
  {
    image_id: "img-014",
    image_name: "autumn maple 1.1.jpg",
    image_url: "https://images.unsplash.com/photo-1507290439931-a861b5a38200?auto=format&fit=crop&w=800&q=80",
    worker_id: "1.1",
    member_id: 1,
    created_at: "2026-11-08T19:20:00Z"
  },
  {
    image_id: "img-015",
    image_name: "coral reef fish 3.1.jpg",
    image_url: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
    worker_id: "3.1",
    member_id: 3,
    created_at: "2026-11-08T18:05:00Z"
  },
  {
    image_id: "img-016",
    image_name: "blue car 1.2.jpg",
    image_url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    worker_id: "1.2",
    member_id: 1,
    created_at: "2026-11-08T16:40:00Z"
  },
  {
    image_id: "img-017",
    image_name: "red hat 2.1.jpg",
    image_url: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.1",
    member_id: 2,
    created_at: "2026-11-08T15:10:00Z"
  },
  {
    image_id: "img-018",
    image_name: "vintage locomotive 2.2.jpg",
    image_url: "https://images.unsplash.com/photo-1515263487990-61b07816b324?auto=format&fit=crop&w=800&q=80",
    worker_id: "2.2",
    member_id: 2,
    created_at: "2026-11-08T14:00:00Z"
  }
];

const INITIAL_WORKERS = [
  {
    worker_id: "1.1",
    member_id: 1,
    machine_name: "rig-alpha-rtx4090",
    status: "online",
    total_images: 48,
    current_task: "Idle (Awaiting Task)",
    last_heartbeat: new Date(Date.now() - 15000).toISOString()
  },
  {
    worker_id: "1.2",
    member_id: 1,
    machine_name: "rig-beta-rtx3080ti",
    status: "busy",
    total_images: 39,
    current_task: "Rendering: watercolor encyclopedia diffuse",
    last_heartbeat: new Date(Date.now() - 8000).toISOString()
  },
  {
    worker_id: "2.1",
    member_id: 2,
    machine_name: "workstation-alienware-m18",
    status: "online",
    total_images: 54,
    current_task: "Idle (Standby)",
    last_heartbeat: new Date(Date.now() - 5000).toISOString()
  },
  {
    worker_id: "2.2",
    member_id: 2,
    machine_name: "station-legion-pro-rtx4080",
    status: "online",
    total_images: 37,
    current_task: "Idle (Standby)",
    last_heartbeat: new Date(Date.now() - 25000).toISOString()
  },
  {
    worker_id: "3.1",
    member_id: 3,
    machine_name: "mac-studio-m2-ultra-64gb",
    status: "online",
    total_images: 42,
    current_task: "Idle (Listening to queue)",
    last_heartbeat: new Date(Date.now() - 12000).toISOString()
  },
  {
    worker_id: "3.2",
    member_id: 3,
    machine_name: "local-a100-80gb-worker",
    status: "offline",
    total_images: 28,
    current_task: "Offline (Network Disconnected)",
    last_heartbeat: new Date(Date.now() - 1800000).toISOString()
  }
];

class MockRepository {
  constructor() {
    this.images = [...INITIAL_IMAGES];
    this.workers = [...INITIAL_WORKERS];
    this.tasks = new Map();
  }

  // Get paginated images
  getImages(page = 1, limit = 50, sort = 'newest') {
    const sorted = [...this.images].sort((a, b) => {
      if (sort === 'oldest') {
        return new Date(a.created_at) - new Date(b.created_at);
      }
      return new Date(b.created_at) - new Date(a.created_at);
    });

    const total = sorted.length;
    const total_pages = Math.ceil(total / limit) || 1;
    const startIndex = (page - 1) * limit;
    const paginatedImages = sorted.slice(startIndex, startIndex + limit);

    return {
      page: Number(page),
      limit: Number(limit),
      total,
      total_pages,
      images: paginatedImages
    };
  }

  // Search images by prompt/name
  searchImages(query) {
    if (!query || !query.trim()) {
      return this.getImages(1, 50).images;
    }

    const cleanQ = query.trim().toLowerCase();
    return this.images.filter((img) => {
      const name = img.image_name.toLowerCase();
      return name.includes(cleanQ);
    });
  }

  // Get statistics
  getStats() {
    const totalImages = this.images.length;
    const totalWorkers = this.workers.length;
    const activeWorkers = this.workers.filter(w => w.status === 'online' || w.status === 'busy').length;

    // Aggregate counts by worker_id from this.images
    const workerCounts = {};
    this.workers.forEach(w => {
      workerCounts[w.worker_id] = 0;
    });

    this.images.forEach(img => {
      if (workerCounts[img.worker_id] !== undefined) {
        workerCounts[img.worker_id]++;
      } else {
        workerCounts[img.worker_id] = 1;
      }
    });

    const workerStats = this.workers.map(w => ({
      worker_id: w.worker_id,
      member_id: w.member_id,
      machine_name: w.machine_name,
      status: w.status,
      total_images: workerCounts[w.worker_id] || w.total_images
    }));

    return {
      total_images: totalImages,
      total_workers: totalWorkers,
      active_workers: activeWorkers,
      workers: workerStats
    };
  }

  // Get all workers
  getWorkers() {
    return [...this.workers];
  }

  // Request new AI image generation
  createTask(prompt) {
    const taskId = 'task-' + Math.random().toString(36).substring(2, 9);
    
    // Pick an available online worker
    const onlineWorkers = this.workers.filter(w => w.status === 'online');
    const assignedWorker = onlineWorkers.length > 0 
      ? onlineWorkers[Math.floor(Math.random() * onlineWorkers.length)]
      : this.workers[0];

    const taskRecord = {
      task_id: taskId,
      prompt: prompt.trim(),
      status: 'pending',
      assigned_worker: assignedWorker.worker_id,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      images: []
    };

    this.tasks.set(taskId, taskRecord);

    // Simulate lifecycle asynchronously:
    // 1. Pending (0-2s)
    // 2. Processing (2-6s)
    // 3. Completed (after ~6s)
    setTimeout(() => {
      const t = this.tasks.get(taskId);
      if (t) {
        t.status = 'processing';
        t.updated_at = new Date().toISOString();
      }
    }, 2000);

    setTimeout(() => {
      const t = this.tasks.get(taskId);
      if (t) {
        // If user typed "test-error" or "simulate-fail", fail the task
        if (t.prompt.toLowerCase().includes('fail') || t.prompt.toLowerCase().includes('error')) {
          t.status = 'failed';
          t.error = 'AI Worker out of GPU VRAM or pipeline encountered a CUDA error.';
          t.updated_at = new Date().toISOString();
          return;
        }

        // Generate watercolor style image record
        const safePrompt = t.prompt.replace(/[^a-zA-Z0-9 ]/g, '').toLowerCase() || 'watercolor creation';
        const filename = `${safePrompt} ${assignedWorker.worker_id}.jpg`;
        
        // Dynamic placeholder/stock imagery reflecting nature & watercolor aesthetics
        const watercolorPalettes = [
          'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?auto=format&fit=crop&w=800&q=80'
        ];
        const chosenUrl = watercolorPalettes[Math.floor(Math.random() * watercolorPalettes.length)];

        const newImage = {
          image_id: 'img-' + Date.now().toString(36),
          image_name: filename,
          image_url: chosenUrl,
          worker_id: assignedWorker.worker_id,
          member_id: assignedWorker.member_id,
          created_at: new Date().toISOString()
        };

        // Prepend to top of images repository so newest shows first
        this.images.unshift(newImage);

        // Update worker image count
        assignedWorker.total_images += 1;

        t.status = 'completed';
        t.images = [newImage];
        t.updated_at = new Date().toISOString();
      }
    }, 6500);

    return {
      task_id: taskId,
      status: 'pending'
    };
  }

  // Check task status
  getTask(taskId) {
    const task = this.tasks.get(taskId);
    if (!task) {
      return {
        task_id: taskId,
        status: 'failed',
        error: 'Task ID not found in generation pipeline'
      };
    }
    return {
      task_id: task.task_id,
      prompt: task.prompt,
      status: task.status,
      assigned_worker: task.assigned_worker,
      images: task.images,
      error: task.error,
      updated_at: task.updated_at
    };
  }
}

export const mockRepo = new MockRepository();

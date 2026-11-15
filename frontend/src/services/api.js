import axios from 'axios';
import { mockRepo } from './mockData';
import {
  normalizeImage,
  normalizeImagePage,
  normalizeSearch,
  normalizeTask,
  normalizeWorker,
  normalizeStatistics
} from './apiAdapter';

// Environment configurations
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
// In development, USE_MOCK is true by default unless VITE_USE_MOCK is explicitly 'false'
export const IS_MOCK_MODE = import.meta.env.VITE_USE_MOCK !== 'false';

// Centralized Axios client for Backend FastAPI integration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Response interceptor for consistent error normalization
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const customError = {
      message: error.response?.data?.message || error.response?.data?.detail || error.message || 'Lỗi kết nối tới Backend API',
      status: error.response?.status,
      data: error.response?.data
    };
    return Promise.reject(customError);
  }
);

// Simulated network latency for mock mode (300-500ms)
const simulateDelay = (ms = 350) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * 1. Lấy danh sách ảnh phân trang
 * GET /api/v1/images?page=1&page_size=50&sort=newest
 */
export async function fetchImages({ page = 1, limit = 50, sort = 'newest' } = {}) {
  if (IS_MOCK_MODE) {
    await simulateDelay(250);
    return mockRepo.getImages(page, limit, sort);
  }

  const response = await apiClient.get('/api/v1/images', {
    params: { page, page_size: limit, sort }
  });
  return normalizeImagePage(response, API_BASE_URL, limit);
}

/**
 * 2. Tìm kiếm ảnh theo từ khóa tiếng Anh
 * GET /api/v1/images/search?q=black%20dog
 */
export async function searchImages(query) {
  if (IS_MOCK_MODE) {
    await simulateDelay(300);
    const results = mockRepo.searchImages(query);
    return {
      query,
      total: results.length,
      images: results,
      found: results.length > 0,
      task_id: null
    };
  }

  const response = await apiClient.get('/api/v1/images/search', {
    params: { q: query }
  });
  return normalizeSearch(response, API_BASE_URL);
}

/**
 * 3. Lấy thông tin thống kê kho ảnh và Worker
 * GET /api/v1/statistics
 */
export async function fetchImageStats() {
  if (IS_MOCK_MODE) {
    await simulateDelay(200);
    return mockRepo.getStats();
  }

  return normalizeStatistics(await apiClient.get('/api/v1/statistics'));
}

/**
 * 4. Lấy danh sách Worker phân tán
 * GET /api/v1/workers
 */
export async function fetchWorkers() {
  if (IS_MOCK_MODE) {
    await simulateDelay(250);
    return mockRepo.getWorkers();
  }

  const response = await apiClient.get('/api/v1/workers');
  return (Array.isArray(response) ? response : response.items ?? response.workers ?? [])
    .map(normalizeWorker);
}

/**
 * 5. Gửi yêu cầu tạo ảnh mới khi không tìm thấy
 * POST /api/v1/tasks
 * Body: { prompt: "purple elephant" }
 */
export async function requestGeneration(prompt) {
  if (!prompt || !prompt.trim()) {
    throw new Error('Vui lòng nhập prompt hợp lệ để tạo ảnh');
  }

  if (IS_MOCK_MODE) {
    await simulateDelay(300);
    return mockRepo.createTask(prompt);
  }

  const response = await apiClient.post('/api/v1/tasks', {
    prompt: prompt.trim()
  });
  const task = normalizeTask(response, API_BASE_URL);
  if (!task.task_id) throw new Error('Backend không trả về ID tác vụ');
  return task;
}

/**
 * 6. Kiểm tra trạng thái tác vụ tạo ảnh (Polling)
 * GET /api/v1/tasks/{task_id}
 */
export async function checkGenerationStatus(taskId) {
  if (!taskId) throw new Error('Missing taskId');

  if (IS_MOCK_MODE) {
    await simulateDelay(150);
    return mockRepo.getTask(taskId);
  }

  return normalizeTask(
    await apiClient.get(`/api/v1/tasks/${encodeURIComponent(taskId)}`),
    API_BASE_URL
  );
}

export async function fetchImageById(imageId) {
  if (!imageId) throw new Error('Missing imageId');
  if (IS_MOCK_MODE) {
    return mockRepo.images.find(image => image.image_id === imageId) ?? null;
  }
  return normalizeImage(
    await apiClient.get(`/api/v1/images/${encodeURIComponent(imageId)}`),
    API_BASE_URL
  );
}

/**
 * 7. Kiểm tra trạng thái hệ sinh thái (Health check)
 * GET /health hoặc kiểm tra kết nối
 */
export async function checkSystemHealth() {
  if (IS_MOCK_MODE) {
    return {
      status: 'operational',
      mode: 'mock',
      backend_connected: false,
      timestamp: new Date().toISOString()
    };
  }

  try {
    const res = await apiClient.get('/health');
    return {
      status: res.status || 'healthy',
      mode: 'live',
      backend_connected: true,
      timestamp: new Date().toISOString()
    };
  } catch {
    return {
      status: 'degraded',
      mode: 'live',
      backend_connected: false,
      timestamp: new Date().toISOString()
    };
  }
}

export default {
  fetchImages,
  searchImages,
  fetchImageStats,
  fetchWorkers,
  requestGeneration,
  checkGenerationStatus,
  fetchImageById,
  checkSystemHealth,
  IS_MOCK_MODE,
  API_BASE_URL
};

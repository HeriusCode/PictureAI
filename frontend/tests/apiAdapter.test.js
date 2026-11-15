import test from 'node:test';
import assert from 'node:assert/strict';
import {
  normalizeImagePage,
  normalizeSearch,
  normalizeTask,
  normalizeWorker,
  normalizeStatistics
} from '../src/services/apiAdapter.js';

const baseUrl = 'http://100.74.215.64:8000';

test('maps paginated backend images and resolves relative file URLs', () => {
  const page = normalizeImagePage({
    total: 3,
    items: [{ id: 7, filename: 'red fox.jpg', file_url: '/files/7' }]
  }, baseUrl, 2);

  assert.equal(page.total_pages, 2);
  assert.deepEqual(page.images[0], {
    id: 7,
    filename: 'red fox.jpg',
    file_url: '/files/7',
    image_id: 7,
    image_name: 'red fox.jpg',
    image_url: 'http://100.74.215.64:8000/files/7',
    worker_id: null
  });
});

test('keeps the task ID returned when search starts generation', () => {
  const search = normalizeSearch({ found: false, results: [], task_id: 42 }, baseUrl);
  assert.deepEqual(search, { images: [], total: 0, found: false, task_id: 42 });
});

test('maps task completion and backend failure fields', () => {
  const task = normalizeTask({
    id: 42,
    status: 'completed',
    assigned_worker_id: 5,
    result_image_id: 7,
    error_message: null
  }, baseUrl);
  assert.equal(task.task_id, 42);
  assert.equal(task.assigned_worker, 5);
  assert.equal(task.result_image_id, 7);
  assert.deepEqual(task.images, []);
  assert.equal(normalizeTask({ id: 9, error_message: 'GPU error' }, baseUrl).error, 'GPU error');
});

test('maps worker and statistics fields used by the dashboard', () => {
  assert.equal(normalizeWorker({ id: 5, total_tasks_completed: 8 }).worker_id, '5');
  assert.equal(normalizeWorker({ id: 5, total_tasks_completed: 8 }).total_tasks_completed, 8);
  const stats = normalizeStatistics({
    total_images: 4,
    total_workers: 1,
    active_workers: 1,
    worker_stats: [{ id: 5, total_images: 4 }]
  });
  assert.equal(stats.workers[0].worker_id, '5');
  assert.equal(stats.workers[0].total_images, 4);
});

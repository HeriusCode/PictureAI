// Convert the backend's v1 response fields to the shape used by the UI.
export function normalizeImage(image, baseUrl) {
  const fileUrl = image.file_url ?? image.image_url ?? '';
  return {
    ...image,
    image_id: image.id ?? image.image_id,
    image_name: image.filename ?? image.image_name ?? '',
    image_url: fileUrl ? new URL(fileUrl, `${baseUrl.replace(/\/$/, '')}/`).href : '',
    worker_id: image.worker_id == null ? null : String(image.worker_id)
  };
}

export function normalizeImagePage(response, baseUrl, pageSize) {
  const images = (response.items ?? response.images ?? []).map(image => normalizeImage(image, baseUrl));
  const total = response.total ?? images.length;
  return {
    images,
    total,
    total_pages: response.total_pages ?? response.pages ?? Math.max(1, Math.ceil(total / pageSize))
  };
}

export function normalizeSearch(response, baseUrl) {
  const images = (response.results ?? response.images ?? []).map(image => normalizeImage(image, baseUrl));
  return {
    images,
    total: response.total ?? images.length,
    found: response.found ?? images.length > 0,
    task_id: response.task_id ?? null
  };
}

export function normalizeTask(response, baseUrl) {
  return {
    ...response,
    task_id: response.id ?? response.task_id,
    assigned_worker: response.assigned_worker_id ?? response.assigned_worker ?? null,
    result_image_id: response.result_image_id ?? null,
    error: response.error_message ?? response.error ?? null,
    images: (response.images ?? []).map(image => normalizeImage(image, baseUrl))
  };
}

export function normalizeWorker(worker) {
  return {
    ...worker,
    worker_id: String(worker.id ?? worker.worker_id ?? ''),
    total_tasks_completed: worker.total_tasks_completed ?? worker.total_images ?? 0
  };
}

export function normalizeStatistics(response) {
  return {
    ...response,
    workers: (response.worker_stats ?? response.workers ?? []).map(worker => ({
      ...worker,
      worker_id: String(worker.id ?? worker.worker_id ?? ''),
      total_images: worker.total_images ?? worker.images_generated ?? 0
    }))
  };
}

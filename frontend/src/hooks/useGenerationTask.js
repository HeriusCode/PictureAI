import { useState, useEffect, useRef, useCallback } from 'react';
import { requestGeneration, checkGenerationStatus, fetchImageById } from '../services/api';

const DEFAULT_POLL_INTERVAL = 2500;

/**
 * Custom hook to manage the lifecycle of an AI generation task
 * Supports asynchronous Polling with automatic cleanup and status transitions
 */
export function useGenerationTask({ onSuccess, onError } = {}) {
  const [task, setTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollTimerRef = useRef(null);
  const initialTimerRef = useRef(null);
  const isPollingRef = useRef(false);
  const activeTaskIdRef = useRef(null);
  const pollInFlightRef = useRef(false);

  // Clear any existing poll timer
  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    if (initialTimerRef.current) {
      clearTimeout(initialTimerRef.current);
      initialTimerRef.current = null;
    }
    isPollingRef.current = false;
    activeTaskIdRef.current = null;
  }, []);

  // Poll function to check backend status
  const pollStatus = useCallback(async (taskId) => {
    if (!taskId || !isPollingRef.current || activeTaskIdRef.current !== taskId || pollInFlightRef.current) return;
    pollInFlightRef.current = true;

    try {
      const result = await checkGenerationStatus(taskId);
      if (!isPollingRef.current || activeTaskIdRef.current !== taskId) return;

      let images = result.images || [];
      if (result.status === 'completed' && images.length === 0 && result.result_image_id) {
        try {
          const image = await fetchImageById(result.result_image_id);
          if (image) images = [image];
        } catch (err) {
          console.error('Failed to load generated image:', err);
        }
      }
      if (!isPollingRef.current || activeTaskIdRef.current !== taskId) return;
      setTask((prev) => ({
        ...prev,
        ...result,
        images,
        lastChecked: new Date().toISOString()
      }));

      if (result.status === 'completed') {
        stopPolling();
        if (onSuccess) {
          onSuccess(images);
        }
      } else if (result.status === 'failed') {
        stopPolling();
        if (onError) {
          onError(result.error || 'Quá trình tạo ảnh thất bại tại AI Worker.');
        }
      }
    } catch (err) {
      console.error('Error polling generation status:', err);
      // We don't immediately fail on a single network blip, continue polling unless consecutive failures
    } finally {
      pollInFlightRef.current = false;
    }
  }, [stopPolling, onSuccess, onError]);

  // Start polling loop
  const startPolling = useCallback((taskId) => {
    stopPolling();
    isPollingRef.current = true;
    activeTaskIdRef.current = taskId;

    // Check once immediately after 1.5 seconds
    initialTimerRef.current = setTimeout(() => {
      pollStatus(taskId);
    }, 1500);

    // Then start regular interval
    pollTimerRef.current = setInterval(() => {
      pollStatus(taskId);
    }, DEFAULT_POLL_INTERVAL);

  }, [stopPolling, pollStatus]);

  // Search can create a task before the user presses the Generate button.
  const trackTask = useCallback((taskId, prompt) => {
    if (!taskId || activeTaskIdRef.current === taskId) return;
    setTask({ task_id: taskId, prompt, status: 'pending', images: [] });
    startPolling(taskId);
  }, [startPolling]);

  // Initiate generation request
  const startGeneration = useCallback(async (prompt) => {
    if (!prompt || !prompt.trim()) return;

    setIsSubmitting(true);
    stopPolling();

    try {
      const response = await requestGeneration(prompt.trim());
      
      const initialTaskState = {
        ...response,
        prompt: prompt.trim(),
        status: response.status || 'pending',
        assigned_worker: response.assigned_worker || null,
        started_at: new Date().toISOString(),
        images: []
      };

      setTask(initialTaskState);
      startPolling(response.task_id);
      return response;
    } catch (err) {
      const failedState = {
        task_id: null,
        prompt: prompt.trim(),
        status: 'failed',
        error: err.message || 'Không thể gửi yêu cầu tạo ảnh tới Backend.'
      };
      setTask(failedState);
      if (onError) {
        onError(failedState.error);
      }
      throw err;
    } finally {
      setIsSubmitting(false);
    }
  }, [stopPolling, startPolling, onError]);

  // Reset task state
  const resetTask = useCallback(() => {
    stopPolling();
    setTask(null);
  }, [stopPolling]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopPolling();
    };
  }, [stopPolling]);

  return {
    task,
    isSubmitting,
    startGeneration,
    trackTask,
    resetTask,
    retryTask: () => {
      if (task?.prompt) {
        startGeneration(task.prompt);
      }
    }
  };
}

export default useGenerationTask;

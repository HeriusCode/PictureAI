import { useState, useEffect, useRef, useCallback } from 'react';
import { requestGeneration, checkGenerationStatus } from '../services/api';

const DEFAULT_POLL_INTERVAL = 2500;

/**
 * Custom hook to manage the lifecycle of an AI generation task
 * Supports asynchronous Polling with automatic cleanup and status transitions
 */
export function useGenerationTask({ onSuccess, onError } = {}) {
  const [task, setTask] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const pollTimerRef = useRef(null);
  const isPollingRef = useRef(false);

  // Clear any existing poll timer
  const stopPolling = useCallback(() => {
    if (pollTimerRef.current) {
      clearInterval(pollTimerRef.current);
      pollTimerRef.current = null;
    }
    isPollingRef.current = false;
  }, []);

  // Poll function to check backend status
  const pollStatus = useCallback(async (taskId) => {
    if (!taskId || !isPollingRef.current) return;

    try {
      const result = await checkGenerationStatus(taskId);
      
      setTask((prev) => ({
        ...prev,
        ...result,
        lastChecked: new Date().toISOString()
      }));

      if (result.status === 'completed') {
        stopPolling();
        if (onSuccess) {
          onSuccess(result.images || []);
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
    }
  }, [stopPolling, onSuccess, onError]);

  // Start polling loop
  const startPolling = useCallback((taskId) => {
    stopPolling();
    isPollingRef.current = true;

    // Check once immediately after 1.5 seconds
    const initialTimer = setTimeout(() => {
      pollStatus(taskId);
    }, 1500);

    // Then start regular interval
    pollTimerRef.current = setInterval(() => {
      pollStatus(taskId);
    }, DEFAULT_POLL_INTERVAL);

    return () => clearTimeout(initialTimer);
  }, [stopPolling, pollStatus]);

  // Initiate generation request
  const startGeneration = useCallback(async (prompt) => {
    if (!prompt || !prompt.trim()) return;

    setIsSubmitting(true);
    stopPolling();

    try {
      const response = await requestGeneration(prompt.trim());
      
      const initialTaskState = {
        task_id: response.task_id,
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
    resetTask,
    retryTask: () => {
      if (task?.prompt) {
        startGeneration(task.prompt);
      }
    }
  };
}

export default useGenerationTask;

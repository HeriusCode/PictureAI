/**
 * Format ISO date string to localized Vietnamese date & time string
 * Example: 2026-11-02T10:30:00 -> 02/11/2026 10:30
 */
export function formatDate(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);
  } catch {
    return dateString;
  }
}

/**
 * Format relative time (e.g. "Vừa xong", "5 phút trước", "2 giờ trước")
 */
export function formatRelativeTime(dateString) {
  if (!dateString) return 'N/A';
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    if (diffMs < 0) return 'Vừa xong';

    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 60) return `${diffSec} giây trước`;

    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin} phút trước`;

    const diffHour = Math.floor(diffMin / 60);
    if (diffHour < 24) return `${diffHour} giờ trước`;

    const diffDay = Math.floor(diffHour / 24);
    if (diffDay < 30) return `${diffDay} ngày trước`;

    return formatDate(dateString);
  } catch {
    return dateString;
  }
}

/**
 * Parses image filename convention: "<prompt> <member_id>.<worker_id>.jpg"
 * Example: "black dog 2.1.jpg" -> { title: "black dog", memberId: 2, workerId: "2.1" }
 */
export function parseImageFilename(filename) {
  if (!filename) {
    return { title: 'Untitled Image', memberId: null, workerId: null, extension: 'jpg' };
  }
  
  const extMatch = filename.match(/\.([a-zA-Z0-9]+)$/);
  const extension = extMatch ? extMatch[1] : 'jpg';
  const nameWithoutExt = filename.replace(/\.[^/.]+$/, '');

  // Match pattern: "<name> <member>.<worker>"
  const match = nameWithoutExt.match(/^(.*?)\s+(\d+)\.(\d+)$/);
  if (match) {
    return {
      title: match[1].trim(),
      memberId: parseInt(match[2], 10),
      workerId: `${match[2]}.${match[3]}`,
      subWorkerId: match[3],
      extension
    };
  }

  // Fallback if not matching strict convention
  return {
    title: nameWithoutExt,
    memberId: null,
    workerId: null,
    subWorkerId: null,
    extension
  };
}

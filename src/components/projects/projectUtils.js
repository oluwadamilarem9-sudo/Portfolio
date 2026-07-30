const BASE = ''

export function resolveImageUrl(src) {
  if (!src) return ''
  return src.startsWith('http') ? src : `${BASE}/${src.replace(/^\//, '')}`
}

export const STATUS_STYLES = {
  Completed: 'project-status-completed',
  'In Progress': 'project-status-progress',
  Live: 'project-status-live',
}

export const FILTER_TABS = ['All', 'Frontend', 'Full Stack', 'UI/UX', 'API']

export function getProjectImages(project) {
  if (project.screenshots?.length) return project.screenshots
  if (project.image) return [project.image]
  return []
}

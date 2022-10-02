export function preventSelect() {
  document.body.style.userSelect = 'none';
  clearSelection();
}

export function allowSelect() {
  document.body.style.userSelect = '';
  clearSelection();
}

export function clearSelection() {
  window.getSelection().removeAllRanges();
}

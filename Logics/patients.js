const tabs = document.querySelectorAll('.tab-btn');
const panes = document.querySelectorAll('.tab-pane');
let current = 0;
function switchTab(idx, btn) {
  tabs.forEach(t => t.classList.remove('active'));
  panes.forEach(p => p.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById('pane-' + idx).classList.add('active');
  current = idx;
}
function shiftTab(dir) {
  let next = (current + dir + tabs.length) % tabs.length;
  switchTab(next, tabs[next]);
}
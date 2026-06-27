/* ═══════════════════════════════════════════════════
   CALENDAR STATE
═══════════════════════════════════════════════════ */
const today = new Date();
let calYear  = today.getFullYear();
let calMonth = today.getMonth(); // 0-indexed
let selectedDate = null;
 
function pad(n){ return String(n).padStart(2,'0'); }
 
function toggleCalendar(e){
  e.stopPropagation();
  closeTimePicker();
  const popup = document.getElementById('calPopup');
  const isOpen = popup.classList.contains('open');
  closeAllPickers();
  if(!isOpen){
    popup.classList.add('open');
    document.getElementById('fdate').classList.add('error-border'); // orange border when open
    renderCalendar();
  }
}
 
function renderCalendar(){
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  document.getElementById('calMonthYear').textContent = `${months[calMonth]} ${calYear}`;
 
  const grid = document.getElementById('calDays');
  grid.innerHTML = '';
 
  const firstDay = new Date(calYear, calMonth, 1).getDay();
  const daysInMonth = new Date(calYear, calMonth+1, 0).getDate();
  const daysInPrev  = new Date(calYear, calMonth, 0).getDate();
 
  // prev month filler
  for(let i = firstDay-1; i >= 0; i--){
    const d = document.createElement('div');
    d.className = 'cal-day other-month';
    d.textContent = daysInPrev - i;
    grid.appendChild(d);
  }
 
  // current month days
  for(let d = 1; d <= daysInMonth; d++){
    const el = document.createElement('div');
    el.className = 'cal-day';
    el.textContent = d;
 
    const thisDate = new Date(calYear, calMonth, d);
    if(thisDate < new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      el.classList.add('disabled');
    if(d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear())
      el.classList.add('today');
    if(selectedDate && selectedDate.getDate()===d &&
       selectedDate.getMonth()===calMonth && selectedDate.getFullYear()===calYear)
      el.classList.add('selected');
 
    el.addEventListener('click', ()=>{
      selectedDate = new Date(calYear, calMonth, d);
      document.getElementById('fdate').value =
        `${pad(d)}/${pad(calMonth+1)}/${calYear}`;
      document.getElementById('fdate').classList.remove('error-border');
      closeCalendar();
    });
    grid.appendChild(el);
  }
 
  // next month filler
  const total = firstDay + daysInMonth;
  const remaining = total % 7 === 0 ? 0 : 7 - (total % 7);
  for(let d = 1; d <= remaining; d++){
    const el = document.createElement('div');
    el.className = 'cal-day other-month';
    el.textContent = d;
    grid.appendChild(el);
  }
}
 
function changeMonth(dir){
  calMonth += dir;
  if(calMonth < 0){ calMonth = 11; calYear--; }
  if(calMonth > 11){ calMonth = 0; calYear++; }
  renderCalendar();
}
 
function closeCalendar(){
  document.getElementById('calPopup').classList.remove('open');
}
 
/* ═══════════════════════════════════════════════════
   TIME PICKER STATE
═══════════════════════════════════════════════════ */
let tHour = 12, tMin = 0, tAMPM = 'AM';
 
function toggleTimePicker(e){
  e.stopPropagation();
  closeCalendar();
  const popup = document.getElementById('timePopup');
  const isOpen = popup.classList.contains('open');
  closeAllPickers();
  if(!isOpen){
    popup.classList.add('open');
    document.getElementById('ftime').classList.add('error-border');
    renderTime();
  }
}
 
function renderTime(){
  document.getElementById('tHour').textContent = pad(tHour);
  document.getElementById('tMin').textContent  = pad(tMin);
  document.getElementById('ftime').value = `${pad(tHour)}:${pad(tMin)} ${tAMPM}`;
}
 
function changeHour(dir){
  tHour += dir;
  if(tHour > 12) tHour = 1;
  if(tHour < 1)  tHour = 12;
  renderTime();
}
function changeMin(dir){
  tMin += dir * 5;
  if(tMin >= 60) tMin = 0;
  if(tMin < 0)   tMin = 55;
  renderTime();
}
function setAMPM(v){
  tAMPM = v;
  document.getElementById('btnAM').classList.toggle('active', v==='AM');
  document.getElementById('btnPM').classList.toggle('active', v==='PM');
  renderTime();
}
 
function closeTimePicker(){
  document.getElementById('timePopup').classList.remove('open');
}
 
/* ═══════════════════════════════════════════════════
   CLOSE ALL on outside click
═══════════════════════════════════════════════════ */
function closeAllPickers(){
  closeCalendar();
  closeTimePicker();
  // Remove open-state border
  document.getElementById('fdate').classList.remove('error-border');
  document.getElementById('ftime').classList.remove('error-border');
}
 
document.addEventListener('click', e=>{
  const inCal  = document.getElementById('dateWrap').contains(e.target);
  const inTime = document.getElementById('timeWrap').contains(e.target);
  if(!inCal && !inTime) closeAllPickers();
});
 
/* ═══════════════════════════════════════════════════
   PHONE FIELD – error state logic
═══════════════════════════════════════════════════ */
const phoneInput = document.getElementById('fphone');
const phoneWrap  = document.getElementById('phoneWrap');
 
// Show error by default (matches screenshot)
phoneWrap.classList.add('has-error');
 
phoneInput.addEventListener('input', ()=>{
  const val = phoneInput.value.trim();
  // simple validation: 10+ digits
  const digits = val.replace(/\D/g,'');
  if(digits.length >= 10){
    phoneWrap.classList.remove('has-error');
    phoneInput.classList.remove('error-border');
  } else {
    phoneWrap.classList.add('has-error');
    phoneInput.classList.add('error-border');
  }
});
 
/* ═══════════════════════════════════════════════════
   FORM VALIDATION + SUBMIT
═══════════════════════════════════════════════════ */
function submitForm(){
  let valid = true;
  const name  = document.getElementById('fname').value.trim();
  const phone = document.getElementById('fphone').value.trim();
  const email = document.getElementById('femail').value.trim();
  const date  = document.getElementById('fdate').value.trim();
  const time  = document.getElementById('ftime').value.trim();
 
  // Name
  const nameInput = document.getElementById('fname');
  if(!name){
    nameInput.classList.add('error-border');
    valid = false;
  } else { nameInput.classList.remove('error-border'); }
 
  // Phone
  const digits = phone.replace(/\D/g,'');
  if(digits.length < 10){
    phoneWrap.classList.add('has-error');
    phoneInput.classList.add('error-border');
    valid = false;
  } else {
    phoneWrap.classList.remove('has-error');
    phoneInput.classList.remove('error-border');
  }
 
  // Email (basic)
  const emailInput = document.getElementById('femail');
  if(!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    emailInput.classList.add('error-border');
    valid = false;
  } else { emailInput.classList.remove('error-border'); }
 
  if(!valid) return;
 
  // Success feedback
  alert(`✅ Appointment booked!\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate: ${date||'Not set'}\nTime: ${time||'Not set'}`);
}
 
/* ═══════════════════════════════════════════════════
   SCROLL-TO-TOP visibility
═══════════════════════════════════════════════════ */
window.addEventListener('scroll', ()=>{
  document.getElementById('scrollTopBtn').style.opacity = window.scrollY > 100 ? '1' : '0.5';
});
 
// Init time display
renderTime();


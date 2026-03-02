

    let currentUserKey = localStorage.getItem('gusteaCurrentUserKey') || '';
    let reservations = [];

    const userKeyInput = document.getElementById('user-key');
    const loadBtn = document.getElementById('load-my-reservations');
    const form = document.getElementById('reservation-form');
    const list = document.getElementById('reservations-list');
    const noRes = document.getElementById('no-reservations');
    const clearBtn = document.getElementById('clear-my-reservations');

    if (currentUserKey) {
    userKeyInput.value = currentUserKey;
    loadReservations();
}

    function getStorageKey() {
    const key = userKeyInput.value.trim().toLowerCase();
    if (!key) {
    showToast("Please enter your personal code first", false);
    return null;
}
    return `gusteaReservations_${key}`;
}

    function loadReservations() {
    const storageKey = getStorageKey();
    if (!storageKey) return;

    currentUserKey = userKeyInput.value.trim();
    localStorage.setItem('gusteaCurrentUserKey', currentUserKey);

    const saved = localStorage.getItem(storageKey);
    reservations = saved ? JSON.parse(saved) : [];
    renderList();
    showToast(`Loaded your reservations (${reservations.length})`, true);
}

    function saveReservations() {
    const storageKey = getStorageKey();
    if (!storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(reservations));
    renderList();
}

    function removeReservation(index) {
    if (confirm("Cancel this reservation?")) {
    reservations.splice(index, 1);
    saveReservations();
    showToast("Reservation cancelled", true);
}
}

    function renderList() {
    list.innerHTML = '';
    if (reservations.length === 0) {
    noRes.classList.remove('hidden');
    return;
}
    noRes.classList.add('hidden');

    reservations.forEach((res, index) => {
    const li = document.createElement('li');
    li.className = 'p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-zinc-800 last:border-b-0';

    const dateTime = new Date(`${res.date}T${res.time}`).toLocaleString('en-GB', {
    dateStyle: 'short',
    timeStyle: 'short'
});

    li.innerHTML = `
      <div class="flex-1">
        <p class="font-medium text-white">${res.name} — ${res.guests} guest${res.guests !== 1 ? 's' : ''}</p>
        <p class="text-sm text-gray-400">${dateTime}</p>
      </div>
      <div class="flex items-center gap-4">
        <span class="text-yellow-400 font-bold text-sm uppercase tracking-wide">PENDING</span>
        <button onclick="removeReservation(${index})"
                class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition">
          Cancel
        </button>
      </div>
    `;
    list.appendChild(li);
});
}

    function showToast(message, isSuccess = true) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    document.getElementById('toast-icon').innerHTML = isSuccess
    ? `<svg class="w-7 h-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    : `<svg class="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`;

    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

    loadBtn.addEventListener('click', loadReservations);

    form.addEventListener('submit', e => {
    e.preventDefault();

    if (!getStorageKey()) return;

    const name   = document.getElementById('res-name').value.trim();
    const date   = document.getElementById('res-date').value;
    const time   = document.getElementById('res-time').value;
    const guests = parseInt(document.getElementById('res-guests').value);

    if (!name || !date || !time || !guests || guests < 1) {
    showToast("Please fill all fields correctly", false);
    return;
}

    reservations.push({ name, date, time, guests });
    saveReservations();

    showToast("Reservation added – only visible to you", true);
    form.reset();
});

    clearBtn.addEventListener('click', () => {
    if (confirm("Clear ALL your reservations?")) {
    reservations = [];
    saveReservations();
    showToast("All your reservations cleared", true);
}
});



<!-- Make removeReservation available globally so onclick works -->
window.removeReservation = removeReservation;
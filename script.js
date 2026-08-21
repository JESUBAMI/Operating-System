// boot sequence — plays once on load, then fades to reveal the lock screen
function skipBoot() {
    var boot = document.getElementById('boot-screen');
    if (boot) { boot.classList.add('hidden'); }
}
setTimeout(skipBoot, 2600);

// live clock — drives lock screen and taskbar
function pad(n) { return n.toString().padStart(2, '0'); }
function updateClock() {
    var now = new Date();
    var hh = pad(now.getHours());
    var mm = pad(now.getMinutes());
    var dd = pad(now.getDate());
    var mo = pad(now.getMonth() + 1);
    var yy = now.getFullYear().toString().slice(-2);
    document.getElementById('time').textContent = hh + ':' + mm;
    document.getElementById('date').textContent = dd + '/' + mo + '/' + yy;
    var lockTime = document.getElementById('lock-time');
    var lockDate = document.getElementById('lock-date');
    if (lockTime) {
        lockTime.textContent = hh + ':' + mm;
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        lockDate.textContent = days[now.getDay()] + ', ' + months[now.getMonth()] + ' ' + now.getDate();
    }
    var readout = document.getElementById('settings-time-readout');
    if (readout) { readout.textContent = hh + ':' + mm + ' \u2014 ' + dd + '/' + mo + '/' + yy; }
}
updateClock();
setInterval(updateClock, 1000 * 10);

// lock screen
function unlock() {
    document.getElementById('lock-screen').classList.add('hidden');
}
document.addEventListener('keydown', unlock);

// start menu
function toggleStartMenu(e) {
    e.stopPropagation();
    document.getElementById('start-menu').classList.toggle('open');
}
document.addEventListener('click', function (e) {
    var menu = document.getElementById('start-menu');
    if (!menu.contains(e.target) && !e.target.closest('.start-btn')) {
        menu.classList.remove('open');
    }
});

// window focus / stacking order — shared by every window on the desktop
var topZ = 401;
function bringToFront(el) {
    topZ += 1;
    el.style.zIndex = topZ;
}

// portfolio window
function openWindow() {
    document.getElementById('portfolio-window').classList.add('open');
    document.getElementById('taskbar-portfolio-btn').classList.add('open');
    document.getElementById('start-menu').classList.remove('open');
    bringToFront(document.getElementById('portfolio-window'));
}
function closeWindow() {
    document.getElementById('portfolio-window').classList.remove('open');
    document.getElementById('taskbar-portfolio-btn').classList.remove('open');
}
function toggleWindow() {
    var win = document.getElementById('portfolio-window');
    if (win.classList.contains('open')) { closeWindow(); } else { openWindow(); }
}
function toggleMaximize() {
    document.getElementById('portfolio-window').classList.toggle('maximized');
}

// desktop icons that jump straight to a section (About Me, Projects, Resume, Contact)
function openToSection(name) {
    openWindow();
    var btn = document.querySelector('.nav-item[data-section="' + name + '"]');
    if (btn) { showSection(name, btn); }
}

// sidebar navigation inside the portfolio window
function showSection(name, btn) {
    document.querySelectorAll('.content-section').forEach(function (s) { s.classList.remove('active'); });
    document.querySelectorAll('.nav-item').forEach(function (n) { n.classList.remove('active'); });
    document.getElementById('section-' + name).classList.add('active');
    btn.classList.add('active');
}

// settings window
function openSettings() {
    document.getElementById('settings-window').classList.add('open');
    document.getElementById('taskbar-settings-btn').classList.add('open');
    document.getElementById('start-menu').classList.remove('open');
    bringToFront(document.getElementById('settings-window'));
}
function closeSettings() {
    document.getElementById('settings-window').classList.remove('open');
    document.getElementById('taskbar-settings-btn').classList.remove('open');
}
function toggleSettings() {
    var win = document.getElementById('settings-window');
    if (win.classList.contains('open')) { closeSettings(); } else { openSettings(); }
}
function toggleMaximizeSettings() {
    document.getElementById('settings-window').classList.toggle('maximized');
}

// category navigation inside the settings window
function showSettingsPane(name, btn) {
    document.querySelectorAll('.settings-pane').forEach(function (p) { p.classList.remove('active'); });
    document.querySelectorAll('.settings-nav-item').forEach(function (n) { n.classList.remove('active'); });
    document.getElementById('pane-' + name).classList.add('active');
    btn.classList.add('active');
}
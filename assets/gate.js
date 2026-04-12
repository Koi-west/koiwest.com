(function () {
  var KEY = 'koi_auth';
  var EXPIRE_MS = 7 * 24 * 60 * 60 * 1000;
  var P = [108,104,55,108,106,120,121,97,121,115,121,115];

  function valid() {
    try {
      var d = JSON.parse(localStorage.getItem(KEY));
      return d && (Date.now() - d.t < EXPIRE_MS);
    } catch (_) { return false; }
  }

  function match(s) {
    if (s.length !== P.length) return false;
    for (var i = 0; i < P.length; i++) {
      if (s.charCodeAt(i) !== P[i]) return false;
    }
    return true;
  }

  if (valid()) return;

  document.documentElement.style.overflow = 'hidden';

  var el = document.createElement('div');
  el.id = 'koi-gate';
  el.innerHTML =
    '<div style="display:flex;flex-direction:column;align-items:center;gap:20px">' +
    '<div style="font:600 28px/1 \'KingHwa_OldSong\',\'PingFang SC\',system-ui,sans-serif;color:#1D1D1F;letter-spacing:-0.02em">koi</div>' +
    '<input id="koi-pw" type="password" placeholder="password" autocomplete="off" ' +
    'style="width:260px;padding:12px 16px;font:400 15px/1.4 \'PingFang SC\',system-ui,sans-serif;' +
    'border:1px solid #E5E5EA;border-radius:10px;outline:none;background:#fff;color:#1D1D1F;' +
    'text-align:center;letter-spacing:0.08em;transition:border-color .15s">' +
    '<div id="koi-err" style="font:400 13px/1 \'PingFang SC\',system-ui,sans-serif;color:#FF3B30;opacity:0;transition:opacity .2s;height:16px"></div>' +
    '</div>';

  el.style.cssText =
    'position:fixed;inset:0;z-index:99999;background:#F5F5F7;' +
    'display:flex;align-items:center;justify-content:center';

  document.body.appendChild(el);

  var inp = document.getElementById('koi-pw');
  var err = document.getElementById('koi-err');

  inp.addEventListener('focus', function () {
    inp.style.borderColor = '#1D1D1F';
  });
  inp.addEventListener('blur', function () {
    inp.style.borderColor = '#E5E5EA';
  });

  inp.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter') return;
    if (match(inp.value)) {
      localStorage.setItem(KEY, JSON.stringify({ t: Date.now() }));
      el.style.opacity = '0';
      el.style.transition = 'opacity .25s';
      setTimeout(function () {
        el.remove();
        document.documentElement.style.overflow = '';
      }, 260);
    } else {
      err.textContent = '密码不对';
      err.style.opacity = '1';
      inp.value = '';
      inp.style.borderColor = '#FF3B30';
      setTimeout(function () {
        err.style.opacity = '0';
        inp.style.borderColor = '#E5E5EA';
      }, 1500);
    }
  });

  setTimeout(function () { inp.focus(); }, 100);
})();

// Project sanity checks. Run: npm test
import fs from 'node:fs';
import vm from 'node:vm';
let fail = 0;
const ok = (m) => console.log('PASS', m);
const bad = (m) => { console.error('FAIL', m); fail++; };

const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const cfg = JSON.parse(fs.readFileSync('capacitor.config.json', 'utf8'));

['capacitor.config.ts', 'capacitor.config.js'].forEach((f) =>
  fs.existsSync(f) ? bad('conflicting ' + f) : ok('no conflicting ' + f));

/^[a-z][a-z0-9_]*(\.[a-z][a-z0-9_]*)+$/.test(cfg.appId) ? ok('appId format: ' + cfg.appId) : bad('invalid appId');
cfg.webDir === 'www' && fs.existsSync('www/index.html') ? ok('webDir www/index.html exists') : bad('webDir or index.html missing');
Number.isInteger(pkg.androidVersionCode) && pkg.androidVersionCode > 0 ? ok('versionCode ' + pkg.androidVersionCode) : bad('bad androidVersionCode');
/^\d+\.\d+\.\d+$/.test(pkg.version) ? ok('versionName ' + pkg.version) : bad('bad version');

const html = fs.readFileSync('www/index.html', 'utf8');
const scripts = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
scripts.length ? ok('inline script found') : bad('no inline script');
scripts.forEach((s, i) => { try { new vm.Script(s); ok('script ' + i + ' syntax valid'); } catch (e) { bad('script syntax: ' + e.message); } });
/<script[^>]+src=/i.test(html) ? bad('external script found (app must work offline)') : ok('no external scripts');
/https?:\/\//.test(html) ? bad('web URL found in app code') : ok('no network URLs in app code');

if (cfg.appId.includes('changeme')) {
  if (process.env.REQUIRE_FINAL_ID === '1') bad('appId is still the placeholder; set your real package ID before a signed release');
  else console.warn('WARN appId is a placeholder (com.changeme...). Change it before publishing.');
}
process.exit(fail ? 1 : 0);

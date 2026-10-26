(function () {
  if (typeof window === 'undefined') return;

  function ensureCharaMusicFix() {
    if (window.SECRETS && window.SECRETS.chara) {
      const originalCheck = window.SECRETS.chara.check;
      window.SECRETS.chara.check = function (name) {
        const result = originalCheck ? originalCheck(name) : null;

        if (name === 'CHARA') {
          if (result) {
            result.music = 'chara';
            return result;
          }

          return {
            hp: 99,
            maxHp: 99,
            mode: 'chara',
            enemyName: 'METTATON EX',
            enemyHp: 60,
            message: '💀 LV 20 · METTATON EX MODE',
            hardMode: true,
            attackMultiplier: 1.5,
            bulletSpeed: 1.5,
            waveCount: 2,
            bulletCount: 10,
            label: '📺 METTATON EX',
            title: 'Mettaton EX · Quiz',
            theme: 'chara-theme',
            sprite: 'mettaton_ex',
            voice: 'mettaton_ex',
            music: 'chara',
            soul: 'red',
            bossDialogue: 'METTATON_EX',
            bossQuiz: 'METTATON_EX',
            hasSubjectSelector: true
          };
        }

        return result;
      };
    }

    if (typeof window.setCharacterMusic === 'function') {
      const originalSetCharacterMusic = window.setCharacterMusic;
      window.setCharacterMusic = function (characterKey) {
        const musicMap = {
          ...(window.BG_MUSIC_SRC || {}),
          chara: (window.BG_MUSIC_SRC && window.BG_MUSIC_SRC.mettaton_ex) || 'Death By Glamour.mp3',
          mettaton_ex: (window.BG_MUSIC_SRC && window.BG_MUSIC_SRC.mettaton_ex) || 'Death By Glamour.mp3'
        };

        if (characterKey === 'chara') {
          const musicPath = musicMap.chara;
          if (musicPath && window.bgMusic) {
            window.bgMusic.src = musicPath;
            window.bgMusic.loop = true;
            window.bgMusic.volume = 0.7;
            window.bgMusic.play().catch(() => {});
            return;
          }
        }

        return originalSetCharacterMusic.call(this, characterKey);
      };
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureCharaMusicFix);
  } else {
    ensureCharaMusicFix();
  }
})();

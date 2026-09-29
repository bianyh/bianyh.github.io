(function () {
  var elements = document.querySelectorAll('[data-zh][data-en]');
  var languageButtons = document.querySelectorAll('[data-lang]');
  var storedLanguage = null;
  try { storedLanguage = window.localStorage.getItem('by-language'); } catch (error) {}

  function setLanguage(language) {
    var isEnglish = language === 'en';
    elements.forEach(function (element) {
      var value = element.getAttribute(isEnglish ? 'data-en' : 'data-zh');
      var textNode = Array.prototype.slice.call(element.childNodes).find(function (node) {
        return node.nodeType === Node.TEXT_NODE && node.textContent.trim();
      });
      if (textNode) textNode.textContent = value;
      else element.textContent = value;
    });
    document.querySelectorAll('[data-alt-zh][data-alt-en]').forEach(function (image) {
      image.alt = image.getAttribute(isEnglish ? 'data-alt-en' : 'data-alt-zh');
    });
    document.documentElement.lang = isEnglish ? 'en' : 'zh-CN';
    languageButtons.forEach(function (button) {
      button.classList.toggle('is-active', button.getAttribute('data-lang') === language);
      button.setAttribute('aria-pressed', button.getAttribute('data-lang') === language ? 'true' : 'false');
    });
    document.title = isEnglish ? 'Bian Yuhan | Academic Profile' : '边宇晗 | Bian Yuhan';
    try { window.localStorage.setItem('by-language', language); } catch (error) {}
  }

  languageButtons.forEach(function (button) {
    button.addEventListener('click', function () { setLanguage(button.getAttribute('data-lang')); });
  });
  setLanguage(storedLanguage === 'en' ? 'en' : 'zh');
}());

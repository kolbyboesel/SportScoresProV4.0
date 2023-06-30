window.cookieInterop = {
  setCookie: function (name, value, expires, path, domain, secure) {
    document.cookie =
      name +
      "=" +
      value +
      (expires ? ";expires=" + expires.toUTCString() : "") +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "") +
      (secure ? ";secure" : "");
  },

  getCookie: function (name) {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.startsWith(name + "=")) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  },

  deleteCookie: function (name, path, domain) {
    document.cookie =
      name +
      "=; expires=Thu, 01 Jan 1970 00:00:00 UTC" +
      (path ? ";path=" + path : "") +
      (domain ? ";domain=" + domain : "");
  },

  reloadPage: function () {
    location.reload();
  },
};

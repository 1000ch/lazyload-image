(function () {
  'use strict';

  var FALLBACK_IMAGE = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==';
  var DEFAULT_OFFSET = 300;

  /**
   * throttle
   * @param fn
   * @param delay
   * @returns {Function}
   * @private
   * @description forked from underscore.js
   */
  function throttle(fn, delay) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    return function() {
      var now = Date.now();
      if (!previous) {
        previous = now;
      }
      var remaining = delay - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = fn.apply(context, args);
        context = args = null;
      }
      return result;
    };
  }

  // create prototype from HTMLImageElement
  var LazyloadImagePrototype = Object.create(HTMLImageElement.prototype);

  // lifecycle callbacks
  LazyloadImagePrototype.createdCallback = function () {

    var that = this;

    // swap original src attribute
    this.original = this.src;
    this.src = FALLBACK_IMAGE;

    // get offset attribute for preloading
    this.offset = this.getAttribute('offset') - 0 || DEFAULT_OFFSET;

    this.onLoad = function (e) {
      window.removeEventListener('scroll', that.onScroll);
    };

    this.onError = function (e) {
      that.src = FALLBACK_IMAGE;
      window.removeEventListener('scroll', that.onScroll);
    };

    this.onScroll = throttle(function (e) {
      var imgRect = that.getBoundingClientRect();
      if (imgRect.top > document.documentElement.scrollTop - that.offset &&
          imgRect.bottom < document.documentElement.clientHeight + that.offset) {
        that.addEventListener('load', that.onLoad);
        that.addEventListener('error', that.onError);
        that.src = that.original;
      }
    }, 300);
  };

  LazyloadImagePrototype.attachedCallback = function () {
    var imgRect = this.getBoundingClientRect();
    if (imgRect.top > document.documentElement.scrollTop - this.offset &&
        imgRect.bottom < document.documentElement.clientHeight + this.offset) {
      this.addEventListener('load', this.onLoad);
      this.addEventListener('error', this.onError);
      this.src = this.original;
    } else {
      window.addEventListener('scroll', this.onScroll);
    }
  };

  LazyloadImagePrototype.detachedCallback = function () {
    this.removeEventListener('load', this.onLoad);
    this.removeEventListener('error', this.onError);
    window.removeEventListener('scroll', this.onScroll);
  };

  // register element as lazyload-image
  window.LazyloadImage = document.registerElement('lazyload-image', {
    prototype: LazyloadImagePrototype,
    extends: 'img'
  });

})();
export default class LazyloadImage extends HTMLImageElement {
  static get FALLBACK_IMAGE() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==';
  }

  static get observedAttributes() {
    return [
      'offset'
    ];
  }

  constructor(width, height) {
    super(width, height);

    this.original = this.currentSrc || this.src;
    this.src = LazyloadImage.FALLBACK_IMAGE;
    this.onIntersect = this.onIntersect.bind(this);
  }

  connectedCallback() {
    this.observe();
  }

  disconnectedCallback() {
    this.unobserve();
  }

  get offset() {
    return this.getAttribute('offset');
  }

  set offset(value) {
    this.setAttribute('offset', value);
  }

  get observer() {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(this.onIntersect, {
        rootMargin: this.offset
      });
    }

    return this.intersectionObserver;
  }

  observe() {
    this.observer.observe(this);
  }

  unobserve() {
    this.observer.unobserve(this);
    this.observer.disconnect();
  }

  onIntersect(entries) {
    if (entries.length === 0) {
      return;
    }

    if (entries[0].intersectionRatio <= 0) {
      return;
    }

    this.addEventListener('load', () => {
      this.unobserve();
    });

    this.addEventListener('error', () => {
      this.src = LazyloadImage.FALLBACK_IMAGE;
      this.unobserve();
    });

    this.src = this.original;
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (this.observer === null) {
      return;
    }

    this.unobserve();
    this.observe();
  }
}

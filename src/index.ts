export default class LazyloadImage extends HTMLImageElement {
  static get FALLBACK_IMAGE() {
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAEElEQVR42gEFAPr/AP///wAI/AL+Sr4t6gAAAABJRU5ErkJggg==';
  }

  static get observedAttributes() {
    return [
      'offset'
    ];
  }

  original?: string = null;
  intersectionObserver?: IntersectionObserver = null;

  constructor() {
    super();

    this.original = this.currentSrc || this.src;
    this.src = LazyloadImage.FALLBACK_IMAGE;
    this.onIntersect = this.onIntersect.bind(this);
  }

  connectedCallback(): void {
    this.observe();
  }

  disconnectedCallback(): void {
    this.unobserve();
  }

  get offset(): string {
    return this.getAttribute('offset');
  }

  set offset(value) {
    this.setAttribute('offset', value);
  }

  get observer(): IntersectionObserver {
    if (!this.intersectionObserver) {
      this.intersectionObserver = new IntersectionObserver(this.onIntersect, {
        rootMargin: this.offset
      });
    }

    return this.intersectionObserver;
  }

  observe(): void {
    this.observer.observe(this);
  }

  unobserve(): void {
    this.observer.unobserve(this);
    this.observer.disconnect();
  }

  onIntersect(entries: IntersectionObserverEntry[]): void {
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

  attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
    if (this.observer === null) {
      return;
    }

    this.unobserve();
    this.observe();
  }
}

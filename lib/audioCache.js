class AudioCache {
  constructor() {
    this.cache = new Map();
    this.maxSize = 50;
  }

  getCacheKey(text) {
    return `audio_${text.substring(0, 50).replace(/[^a-zA-Z0-9]/g, '_')}`;
  }

  has(text) {
    return this.cache.has(this.getCacheKey(text));
  }

  get(text) {
    const key = this.getCacheKey(text);
    const cached = this.cache.get(key);
    
    if (cached && cached.expiresAt > Date.now()) {
      return cached.url;
    }
    
    if (cached) {
      this.cache.delete(key);
      URL.revokeObjectURL(cached.url);
    }
    
    return null;
  }

  set(text, audioBlob) {
    if (this.cache.size >= this.maxSize) {
      const firstKey = this.cache.keys().next().value;
      const oldEntry = this.cache.get(firstKey);
      URL.revokeObjectURL(oldEntry.url);
      this.cache.delete(firstKey);
    }

    const key = this.getCacheKey(text);
    const url = URL.createObjectURL(audioBlob);
    
    this.cache.set(key, {
      url,
      expiresAt: Date.now() + (24 * 60 * 60 * 1000)
    });

    return url;
  }

  clear() {
    this.cache.forEach(entry => URL.revokeObjectURL(entry.url));
    this.cache.clear();
  }
}

export const audioCache = new AudioCache();
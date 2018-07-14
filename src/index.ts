class UnicodeRange {
  static REGEXP = /^u\+(?:([0-9a-f]?[0-9a-f?]{1,5})|([0-9a-f]{1,6})-([0-9a-f]{1,6}))?$/i;

  static parse(arr: string[]): number[] {
    const result = new Set<number>();

    for (const range of arr) {
      if (!UnicodeRange.REGEXP.test(range)) {
        throw new TypeError(`"${range}" is invalid unicode-range.`);
      }

      const [, single, start, end] = range.match(UnicodeRange.REGEXP)!;

      // Single unicode-range (e.g. U+20, U+3F U+30??)
      if (single) {
        if (/\?[^?]+$/.test(single)) {
          throw new TypeError(`"${range}" is invalid unicode-range.`);
        }
        if (single.includes('?')) {
          const start = single.replace(/\?/g, '0');
          const end = single.replace(/\?/g, 'F');
          const tmp = UnicodeRange.parse([`U+${start}-${end}`]);
          for (const codePoint of tmp) {
            result.add(codePoint);
          }
        } else {
          result.add(parseInt(single, 16));
        }
      }

      // Interval unicode-range (e.g. U+30-39)
      if (start && end) {
        const startCodePoint = parseInt(start, 16);
        const endCodePoint = parseInt(end, 16);
        for (let codePoint = startCodePoint; codePoint <= endCodePoint; codePoint++) {
          result.add(codePoint);
        }
      }
    }

    return Array.from(result).sort((a, b) => a - b);
  }

  static stringify(_arr: number[]): string[] {
    return [];
  }
}

export default UnicodeRange;

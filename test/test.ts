import test from 'ava';
import UnicodeRange from '../src';

function closedInterval(start: number, end: number) {
  const arr = [];
  for (let num = start; num <= end; num++) {
    arr.push(num);
  }
  return arr;
}

// UnicodeRange.parse
test('U+20', t => {
  const unicodeRangeArray = ['U+20'];
  const expected = [0x20];
  const actual = UnicodeRange.parse(unicodeRangeArray);
  t.deepEqual(actual, expected);
});

test('U+30-39', t => {
  const unicodeRangeArray = ['U+30-39'];
  const expected = closedInterval(0x30, 0x39);
  const actual = UnicodeRange.parse(unicodeRangeArray);
  t.deepEqual(actual, expected);
});

test('U+3?', t => {
  const unicodeRangeArray = ['U+3?'];
  const expected = closedInterval(0x30, 0x3f);
  const actual = UnicodeRange.parse(unicodeRangeArray);
  t.deepEqual(actual, expected);
});

test('U+??', t => {
  const unicodeRangeArray = ['U+??'];
  const expected = closedInterval(0x0, 0xff);
  const actual = UnicodeRange.parse(unicodeRangeArray);
  t.deepEqual(actual, expected);
});

// Errors
test('U+XX', t => {
  const unicodeRangeArray = ['U+XX'];
  t.throws(
    () => {
      UnicodeRange.parse(unicodeRangeArray);
    },
    {
      instanceOf: TypeError,
      message: '"U+XX" is invalid unicode-range.',
    },
  );
});

test('U+1?3', t => {
  const unicodeRangeArray = ['U+1?3'];
  t.throws(
    () => {
      UnicodeRange.parse(unicodeRangeArray);
    },
    {
      instanceOf: TypeError,
      message: '"U+1?3" is invalid unicode-range.',
    },
  );
});

test('U+1234567', t => {
  const unicodeRangeArray = ['U+1234567'];
  t.throws(
    () => {
      UnicodeRange.parse(unicodeRangeArray);
    },
    {
      instanceOf: TypeError,
      message: '"U+1234567" is invalid unicode-range.',
    },
  );
});

test('U+123456-1234567', t => {
  const unicodeRangeArray = ['U+123456-1234567'];
  t.throws(
    () => {
      UnicodeRange.parse(unicodeRangeArray);
    },
    {
      instanceOf: TypeError,
      message: '"U+123456-1234567" is invalid unicode-range.',
    },
  );
});

test('U+3?-40', t => {
  const unicodeRangeArray = ['U+3?-40'];
  t.throws(
    () => {
      UnicodeRange.parse(unicodeRangeArray);
    },
    {
      instanceOf: TypeError,
      message: '"U+3?-40" is invalid unicode-range.',
    },
  );
});

test('U+??????', t => {
  const unicodeRangeArray = ['U+??????'];
  t.throws(
    () => {
      UnicodeRange.parse(unicodeRangeArray);
    },
    {
      instanceOf: TypeError,
      message: '"U+??????" is invalid unicode-range.',
    },
  );
});

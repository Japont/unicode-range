# @japont/unicode-range

> Unicode-range parser/builder.

## Install

```bash
npm i @japont/unicode-range
# - OR -
yarn add @japont/unicode-range
```

## Usage

```js
import { UnicodeRange } from '@japont/unicode-range';

// Parse ( e.g. U+30-39 -> [30, 31, ..., 39] )
const HiraganaUnicodeRangeList = ['U+3041-3096', 'U+3099-309F'];
const HiraganaCodePointList = UnicodeRange.parse(HiraganaUnicodeRangeList);
const Hiragana = HiraganaCodePointList.map(cp => String.fromCodePoint(cp)));
console.log(Hiragana);

// Stringify ( e.g. [30, 31, ..., 39] -> U+30-39 )
const Digit = '0123456789';
const DigitCodePointList = Digit.split('').map(c => c.codePointAt(0));
const DigitUnicodeRangeList = UnicodeRange.stringify(DigitCodePointList);
console.log(NumericUnicodeRangeList);
```

## Contribute

PRs accepted.

## License

MIT (c) 3846masa
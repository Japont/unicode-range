# @japont/unicode-range

[![NPM-Badge]][NPM]
[![CircleCI-Badge]][CircleCI]
[![Codecov-Badge]][Codecov]

[NPM-Badge]: https://img.shields.io/npm/v/@japont/unicode-range.svg?style=flat-square
[NPM]: https://www.npmjs.com/package/@japont/unicode-range
[CircleCI-Badge]: https://img.shields.io/circleci/project/github/Japont/unicode-range.svg?style=flat-square
[CircleCI]: https://circleci.com/gh/Japont/unicode-range
[Codecov-Badge]: https://img.shields.io/codecov/c/github/Japont/unicode-range.svg?style=flat-square
[Codecov]: https://codecov.io/gh/Japont/unicode-range

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

MIT (c) [3846masa]

[3846masa]: https://3846masa.netlify.com
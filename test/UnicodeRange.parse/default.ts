import test, { ExecutionContext } from 'ava';
import UnicodeRange from '../../src';

function closedInterval(start: number, end: number) {
  const arr = [];
  for (let num = start; num <= end; num++) {
    arr.push(num);
  }
  return arr;
}

function macro(t: ExecutionContext<{}>, input: any, expected: any) {
  const actual = UnicodeRange.parse(input);
  t.deepEqual(actual, expected);
}
Object.assign(macro, {
  title: (_: string, input: string[]) => input.join(',\x20'),
});

const testCaseList = [
  {
    values: ['U+20'],
    expected: [0x20],
  },
  {
    values: ['U+30-39'],
    expected: closedInterval(0x30, 0x39),
  },
  {
    values: ['U+3?'],
    expected: closedInterval(0x30, 0x3f),
  },
  {
    values: ['U+??'],
    expected: closedInterval(0x0, 0xff),
  },
];
testCaseList.forEach(testCase => test(macro, testCase.values, testCase.expected));

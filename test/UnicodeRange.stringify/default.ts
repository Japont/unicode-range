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
  const actual = UnicodeRange.stringify(input);
  t.deepEqual(actual, expected);
}
Object.assign(macro, {
  title: (_: string, input: number[]) => input.map(num => `0x${num.toString(16)}`).join(',\x20'),
});

const testCaseList = [
  {
    values: [0x20],
    expected: ['U+20'],
  },
  {
    values: closedInterval(0x30, 0x39),
    expected: ['U+30-39'],
  },
  {
    values: [0x20, 0x30],
    expected: ['U+20', 'U+30'],
  },
  {
    values: [0x20, ...closedInterval(0x30, 0x39)],
    expected: ['U+20', 'U+30-39'],
  },
  {
    values: [0x20, ...closedInterval(0x30, 0x39), 0x40].sort(() => (Math.random() < 0.5 ? 1 : -1)),
    expected: ['U+20', 'U+30-39', 'U+40'],
  },
];
testCaseList.forEach(testCase => test(macro, testCase.values, testCase.expected));

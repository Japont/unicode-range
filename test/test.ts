import test, { ExecutionContext } from 'ava';
import UnicodeRange from '../src';

function closedInterval(start: number, end: number) {
  const arr = [];
  for (let num = start; num <= end; num++) {
    arr.push(num);
  }
  return arr;
}

function equalsMacro(t: ExecutionContext<{}>, input: any, expected: any) {
  const actual = UnicodeRange.parse(input);
  t.deepEqual(actual, expected);
}
Object.assign(equalsMacro, {
  title: (_: string, input: string[]) => input.join(',\x20'),
});

const equalsTestCaseList = [
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

equalsTestCaseList.forEach(testCase => test(equalsMacro, testCase.values, testCase.expected));

function invalidMacro(t: ExecutionContext<{}>, input: any) {
  t.throws(
    () => {
      UnicodeRange.parse([input]);
    },
    {
      instanceOf: TypeError,
      message: `"${input}" is invalid unicode-range.`,
    },
  );
}
Object.assign(invalidMacro, {
  title: (_: string, input: string[]) => `Invalid range test: ${input}`,
});

const invalidTestCaseList = ['U+XX', 'U+1?3', 'U+1234567', 'U+123456-1234567', 'U+3?-40', 'U+??????'];

invalidTestCaseList.forEach(testCase => test(invalidMacro, testCase));

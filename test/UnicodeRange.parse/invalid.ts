import test, { ExecutionContext } from 'ava';
import UnicodeRange from '../../src';

function macro(t: ExecutionContext<{}>, input: any) {
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
Object.assign(macro, {
  title: (_: string, input: string[]) => `Invalid range test: ${input}`,
});

const testCaseList = ['U+XX', 'U+1?3', 'U+1234567', 'U+123456-1234567', 'U+3?-40', 'U+??????'];
testCaseList.forEach(testCase => test(macro, testCase));

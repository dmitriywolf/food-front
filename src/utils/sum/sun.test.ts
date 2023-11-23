import { sum } from './sum';

describe('sum', () => {
  test('numbers 2', () => {
    expect(sum(1, 2)).toBe(3);
  });

  test('numbers 3', () => {
    expect(sum(1, 2)).not.toBe(5);
  });
});

import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../../src/index';

describe('Options', () => {
  describe('printWidth', () => {
    test('should handle printWidth', () => {
      const expected: string = readFileSync(
        resolve(__dirname, 'formatted.pug'),
        'utf8',
      );
      const code: string = readFileSync(
        resolve(__dirname, 'unformatted.pug'),
        'utf8',
      );
      const actual: string = format(code, {
        parser: 'pug',
        plugins: [plugin],
        printWidth: 120,
      });

      expect(actual).toBe(expected);
    });
  });
});

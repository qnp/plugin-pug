import { readFileSync } from 'fs';
import { resolve } from 'path';
import { format } from 'prettier';
import { describe, expect, test } from 'vitest';
import { plugin } from './../../../src/index';

describe('Pragma', () => {
  test('should insert pragma if option is set', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'with-pragma.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'no-pragma.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
      insertPragma: true,
      bracketSpacing: false,
    });

    expect(actual).toBe(expected);
  });
  test('should not insert multiple pragma if option is set', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'with-pragma.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'no-pragma.pug'),
      'utf8',
    );
    let actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
      insertPragma: true,
      bracketSpacing: false,
    });
    actual = format(actual, {
      parser: 'pug',
      plugins: [plugin],
      insertPragma: true,
      bracketSpacing: false,
    });

    expect(actual).toBe(expected);
  });
  test('should not insert pragma if option is not set', () => {
    const expected: string = readFileSync(
      resolve(__dirname, 'no-pragma.pug'),
      'utf8',
    );
    const code: string = readFileSync(
      resolve(__dirname, 'no-pragma.pug'),
      'utf8',
    );
    const actual: string = format(code, {
      parser: 'pug',
      plugins: [plugin],
      bracketSpacing: false,
    });

    expect(actual).toBe(expected);
  });
});

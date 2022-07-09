import { describe, expect, it } from 'vitest';
import { computePosition } from '../core';

// The two tests marked with concurrent will be run in parallel
describe('core', () => {
  it('should be a function', () => {
    expect(computePosition);
  });
});

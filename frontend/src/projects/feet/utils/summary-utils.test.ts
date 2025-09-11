import { describe, expect, test } from 'vitest';

import emptyConfig from '../../../utils/test/testdata/empty-feet.json';
import { mapSummaryToExcel } from './summary-utils.ts';
import { SheetValueType } from './utils.ts';

describe('mapSummaryToExcel', () => {
  test('correctly maps a panel to excel types', () => {
    expect(
      mapSummaryToExcel(emptyConfig.system.panels, (key: SheetValueType) => key)
    ).toBe(3);
  });
});

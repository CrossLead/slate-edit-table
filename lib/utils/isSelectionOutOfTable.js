// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionOutOfTable(opts: Options, value: Value): boolean {
    if (!value.selection.startKey) return false;

    const { startBlock, endBlock, document } = value;

    // Only handle events in cells
    if (
        startBlock.type !== opts.typeCell &&
        !document.getClosest(startBlock.key, n => n.type === opts.typeCell) &&
        endBlock.type !== opts.typeCell &&
        !document.getClosest(endBlock.key, n => n.type === opts.typeCell)
    ) {
        return false;
    }
}

export default isSelectionOutOfTable;

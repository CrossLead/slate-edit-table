// @flow

import type { Value } from 'slate';
import type Options from '../options';

/**
 * Is the selection in a table
 */
function isSelectionInTable(opts: Options, value: Value): boolean {
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

    if (startBlock === endBlock) {
        return true;
    }
    // Not the same cell, look into ancestor chain:

    // Check for same table row
    const startRow = document.getClosest(startBlock.key, n => n.type === opts.typeRow);
    const endRow = document.getClosest(endBlock.key, n => n.type === opts.typeRow);
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    // Check for same table
    const startTable = document.getClosest(startBlock.key, n => n.type === opts.typeTable);
    const endTable = document.getClosest(endBlock.key, n => n.type === opts.typeTable);
    return startTable === endTable;
}

export default isSelectionInTable;

'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Is the selection in a table
 */
function isSelectionInTable(opts, value) {
    if (!value.selection.startKey) return false;

    var startBlock = value.startBlock,
        endBlock = value.endBlock,
        document = value.document;

    // Only handle events in cells

    if (startBlock.type !== opts.typeCell && !document.getClosest(startBlock.key, function (n) {
        return n.type === opts.typeCell;
    }) && endBlock.type !== opts.typeCell && !document.getClosest(endBlock.key, function (n) {
        return n.type === opts.typeCell;
    })) {
        return false;
    }

    if (startBlock === endBlock) {
        return true;
    }
    // Not the same cell, look into ancestor chain:

    // Check for same table row
    var startRow = document.getClosest(startBlock.key, function (n) {
        return n.type === opts.typeRow;
    });
    var endRow = document.getClosest(endBlock.key, function (n) {
        return n.type === opts.typeRow;
    });
    if (startRow === endRow) {
        return true;
    }
    // Different rows

    // Check for same table
    var startTable = document.getClosest(startBlock.key, function (n) {
        return n.type === opts.typeTable;
    });
    var endTable = document.getClosest(endBlock.key, function (n) {
        return n.type === opts.typeTable;
    });
    return startTable === endTable;
}

exports.default = isSelectionInTable;
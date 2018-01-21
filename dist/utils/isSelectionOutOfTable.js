'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});


/**
 * Is the selection in a table
 */
function isSelectionOutOfTable(opts, value) {
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
}

exports.default = isSelectionOutOfTable;
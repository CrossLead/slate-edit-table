'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slate = require('slate');

var _utils = require('../utils');

/**
 * Delete the whole table at position
 */
function removeTable(opts, change) {
    var value = change.value;
    var startBlock = value.startBlock;


    var pos = _utils.TablePosition.create(value, startBlock);
    var table = pos.table;
    var document = change.value.document;

    var nextFocusBlock = null;
    var shouldCollapseToEnd = false;

    var nextBlock = change.value.document.getNextBlock(table.key);
    if (nextBlock) {
        nextFocusBlock = nextBlock;
    } else {
        var prevBlock = change.value.document.getPreviousBlock(table.key);
        if (prevBlock) {
            nextFocusBlock = prevBlock;
            shouldCollapseToEnd = true;
        } else if (opts.exitBlockType) {
            nextFocusBlock = _slate.Block.create({
                type: opts.exitBlockType,
                nodes: [_slate.Text.create('')]
            });
            var tableParent = document.getParent(table.key);
            var insertionIndex = tableParent.nodes.indexOf(table) + 1;
            change.insertNodeByKey(tableParent.key, insertionIndex, nextFocusBlock);
        }
    }

    change.removeNodeByKey(table.key);
    if (!nextFocusBlock) {
        return change;
    }
    if (shouldCollapseToEnd) {
        change.collapseToEndOf(nextFocusBlock).focus();
    } else {
        change.collapseToStartOf(nextFocusBlock).focus();
    }
    return change;
}

exports.default = removeTable;
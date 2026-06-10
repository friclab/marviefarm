"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinDisplay = joinDisplay;
exports.fullPersonName = fullPersonName;
function joinDisplay(fields, separator = ' - ') {
    return fields
        .filter((f) => f != null && f.trim() !== '')
        .join(separator);
}
function fullPersonName(name, surname) {
    const parts = [name, surname].filter((f) => f != null && f.trim() !== '');
    return parts.length > 0 ? parts.join(' ') : null;
}
//# sourceMappingURL=display-name.js.map
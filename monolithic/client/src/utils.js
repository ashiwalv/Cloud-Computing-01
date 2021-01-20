exports.formatDate = timestamp => {
    if (!timestamp) return "";
    var date = new Date(timestamp);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
}
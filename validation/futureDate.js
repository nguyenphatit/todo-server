module.exports = isFutureDate = idate => {
    var check = Date.parse(idate);
    var today = new Date().getTime();
    if (check < today)
        return false
    else
        return true;
}
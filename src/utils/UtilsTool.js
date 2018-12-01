// 获取北京时间戳
function  GetBJTimesTamp() {
    let d = new Date();
    let len = d.getTime();
    let offset = d.getTimezoneOffset() * 60000;
    let utcTime = len + offset;
    return Math.round(new Date(utcTime + 3600000 * 8).getTime() / 1000);
}

export {
    GetBJTimesTamp
}
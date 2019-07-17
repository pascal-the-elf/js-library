var DataInURL = {};
var u = location.href;
if(u.search("\\?")!=-1) u = u.substr(u.search("\\?"));
var _f = 1;
while(_f || u.search("\\&")!=-1) {
    _f = 0;
    var k1=1, k2, v1, v2, tmp=0;
    while(u.charAt(tmp)!="=") {
        if(tmp < u.length) tmp++;
        else break;
    }
    k2 = tmp;
    v1 = tmp + 1;
    while(u.charAt(tmp)!="&") {
        if(tmp < u.length) tmp++;
        else break;
    }
    v2 = tmp;
    if(tmp > u.length) break;
    DataInURL[decodeURIComponent(u.substring(k1, k2))] = decodeURIComponent(u.substring(v1, v2));
    u = u.substr(tmp);
}

function urlKey(key) {
    return DataInURL[key];
}

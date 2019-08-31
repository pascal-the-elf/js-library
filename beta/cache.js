const CACHE = {
    ver: 1
};
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
        chr   = this.charCodeAt(i);
        hash  = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
function cache(item) {
    var cacheType = "string";
    if(typeof item == "object") {
        item = JSON.stringify(item);
        cacheType = "object";
    }
    if(typeof item != "string") {
        console.error("Cache Error: Not Object Or String.");
        return 0;
    }
    localStorage["_Cache_"+CACHE.ver+"_"+item.hashCode().toString(36)] = item;
    localStorage["_CacheTime_"+CACHE.ver+"_"+item.hashCode().toString(36)] = Date.now();
    localStorage["_CacheType_"+CACHE.ver+"_"+item.hashCode().toString(36)] = cacheType;
}
function checkCache(item) {
    if(typeof item == "object") {
        item = JSON.stringify(item);
    }
    if(typeof item != "string") {
        console.error("Cache Error: Not Object Or String.");
        return 0;
    }
    if(!localStorage["_Cache_"+CACHE.ver+"_"+item.hashCode().toString(36)]) {
        return 0;
    }
    return parseCache(item.hashCode().toString(36));
}
function parseCache(id) {
    let type = "string", item = localStorage["_Cache_"+CACHE.ver+"_"+id];
    if(localStorage["_CacheType_"+CACHE.ver+"_"+id] == "object") {
        item = JSON.parse(item);
        type = "object";
    }
    return {
        cache: item,
        type: type,
        time: parseInt(localStorage["_CacheTime_"+CACHE.ver+"_"+id], 36)
    };
}

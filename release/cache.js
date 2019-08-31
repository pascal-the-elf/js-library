const CACHE = {
    ver = 1
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
function hotCache(item) {
    
}

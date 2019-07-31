function Fetch(url, set = {}) {
    if (window.FetchHistory == undefined) window.FetchHistory = [];
    FetchHistory.push({
        target: url,
        settings: set,
        time: {
            start: Date.now(),
            end: -1,
            spend: -1
        },
        status: "fetching",
        code: 0,
        original: "",
        error: ""
    });
    var FID = FetchHistory.length - 1;
    return (fetch(url, set).then(r => {
        FetchHistory[FID].time.end = Date.now();
        FetchHistory[FID].time.spend = FetchHistory[FID].time.end - FetchHistory[FID].time.start;
        FetchHistory[FID].status = "success";
        FetchHistory[FID].code = r.status;
        FetchHistory[FID].original = r;
        return r;
    }).catch(e => {
        FetchHistory[FID].time.end = Date.now();
        FetchHistory[FID].time.spend = FetchHistory[FID].time.end - FetchHistory[FID].time.start;
        FetchHistory[FID].status = "failed";
        FetchHistory[FID].code = e.status;
        FetchHistory[FID].error = e;
        console.error("Fetch Error: " + e);
    }));
}

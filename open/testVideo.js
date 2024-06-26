import { __jsEvalReturn } from './xiaoya.js';

var spider = __jsEvalReturn();

async function test() {
    var spType = null;
    var spVid = null;
    //spType = '1$/每日更新$0';
    // spVid = '95873';

    await spider.init({ skey: 'xiaoya-tv', ext: "http://192.168.50.60:4567/vod" });
    var classes = JSON.parse(await spider.home(true));
    console.log(classes);
    var homeVod = JSON.parse(await spider.homeVod());
    console.log(homeVod);
    if (classes.class && classes.class.length > 0) {
        var page = JSON.parse(await spider.category(spType || classes.class[0].type_id, 0, true, {"score":"high", "sort":"year,desc;name,desc"}));
        console.log(page);
        if (page.list && page.list.length > 0) {
            for (const k in page.list) {
                if (k > 1) break;
                var detail = JSON.parse(await spider.detail(spVid || page.list[k].vod_id));
                console.log(detail);
                if (detail.list && detail.list.length > 0) {
                    var pFlag = detail.list[0].vod_play_from.split('$$$');
                    var pUrls = detail.list[0].vod_play_url.split('$$$');
                    if (pFlag.length > 0 && pUrls.length > 0) {
                        for (const i in pFlag) {
                            var flag = pFlag[i];
                            var urls = pUrls[i].split('#');
                            if (urls.length > 0) {
                                var url = urls[0].split('$')[1];
                                console.log(flag, url);
                                var playUrl = await spider.play(flag, url, []);
                                console.log(playUrl);
                            }
                        }
                    }
                }
                if (spVid) break;
            }
        }
    }
    var search = JSON.parse(await spider.search('家有姐妹'));
    console.log(search);

    // search = JSON.parse(await spider.search('喜欢'));
    // console.log(search);
}

export { test };
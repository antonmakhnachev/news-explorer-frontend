export function uniqueKeywords (newsData) {
    const arr = new Array();
    for (const news of newsData) {
        arr.push(news.keyword)
    };        
    return Array.from(new Set(arr));
};
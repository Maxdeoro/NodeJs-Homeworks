import scrapeTranslate from "./src/node-scrape-google-translate.js";

const translate = new scrapeTranslate({
    url: 'https://translate.google.com/#view=home&op=translate&sl={sl}&tl={tl}&text={text}',
    userAgent : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.129 Safari/537.36',
});

if(process.argv[2] !== undefined && process.argv[3] !== undefined && process.argv[4] !== undefined) {
    ( async () => {
        try {
            let response = await translate.scrape(process.argv[2], process.argv[3], 
                process.argv[4].toString()
            );
            console.log(response);
        } catch(err) {
            console.log(err);
        }
    })();
} else {
    console.log('Argument not valid');
}
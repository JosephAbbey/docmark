import fs from 'fs';
import path from 'path';
import Prism from 'prismjs';
import cheerio from 'cheerio';

export default function postprocess(input: string): string {
    var css = fs.readFileSync(path.join(__dirname, 'index.css'), 'utf8');
    var output = `<html lang="en"><head><style>${css}</style></head><body>${input}</body></html>`;
    var $ = cheerio.load(output);
    $('code[class*=language-]').each((i, s) => {
        var self = $(s);
        self.attr().class.replace(/language-(\w+)/, (m, language: string) => {
            console.log();
            self.html(
                Prism.highlight(
                    self.text() || '',
                    Prism.languages[language],
                    language
                )
            );
            return m;
        });
    });
    return $.html();
}

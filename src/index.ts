import fs from 'fs';
import { createCommand } from 'commander';
import marked from 'marked';
import preprocess from './preprocessor';
import postprocess from './postprocessor';

const commander = createCommand('docmark');
commander
    .version(require('../package.json').version, '-v, --version')
    .usage('[OPTIONS]...')
    .option('-i, --input-file <path>', 'set the input file', 'index.md')
    .parse(process.argv);

const options = commander.opts();

const input = options.inputFile;

const data = fs.readFileSync(input).toString();

console.log(
    postprocess(
        marked(preprocess(data), {
            xhtml: true,
        })
    )
);

export default function preprocess(input: string): string {
    var output = input.replace(/\:(.+?)\:/g, (match, group) => {
        return `<i class="fab fa-${group}" style="font-size: 48px;"></i>`;
    });
    output = output.replace(/==(.+?)==/g, (match, group) => {
        return `<span class="highlight">${group}</span>`;
    });
    return output;
}

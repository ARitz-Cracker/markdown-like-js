import {MarkdownLikeBase} from "./elements/_base_class";
import { MarkdownLikeBold } from "./elements/bold";
import { MarkdownLikeCode } from "./elements/code";
import { MarkdownLikeInlineQuote } from "./elements/inline-quote";
import { MarkdownLikeLink } from "./elements/link";
import { MarkdownLikeStrike } from "./elements/strike";
import { MarkdownLikeSubscript } from "./elements/subscript";
const specialCharsMap: {[key: string]: string} = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;'
};
let regexString = "[&<>\"'";
for(let i = 0; i < 0x10; i += 1){
	regexString += "\\x0" + i.toString(16);
	specialCharsMap[String.fromCharCode(i)] = "&#" + i + ";";
}
for(let i = 0x10; i < 0x20; i += 1){
	regexString += "\\x" + i.toString(16);
	specialCharsMap[String.fromCharCode(i)] = "&#" + i + ";";
}
for(let i = 0x80; i < 0xa0; i += 1){
	regexString += "\\x" + i.toString(16);
	specialCharsMap[String.fromCharCode(i)] = "&#" + i + ";";
}

regexString += "]";
const htmlEntitiesRegex = new RegExp(regexString, "g");

export function escapeHTMLSpecialChars(str: string, escapeControlChars: boolean = false) {
	if(escapeControlChars){
		return str.replace(htmlEntitiesRegex, m => specialCharsMap[m]);
	}else{
		return str.replace(/[&<>"']/g, m => specialCharsMap[m]);
	}
}

const markdownLikeElems = {
	bold: new MarkdownLikeBold(),
	code: new MarkdownLikeCode(),
	inlineQuote: new MarkdownLikeInlineQuote(),
	italic: new MarkdownLikeInlineQuote(),
	link: new MarkdownLikeLink(),
	strike: new MarkdownLikeStrike(),
	subscript: new MarkdownLikeSubscript(),
	superscript: new MarkdownLikeSubscript()
}

export type MarkdownLikeOptions = {
	newlineSeperator?: string,
	escapeControlChars?: boolean,
	beyondParagraphs?: boolean
}

export type MarkdownLikeOutput = "line" | "paragraphs" | "extended";

export function markdownToHTML(str: string, newlineSeperator: string = " ", escapeControlChars: boolean = false){
	return escapeHTMLSpecialChars(str, escapeControlChars)
		.replace(escapeControlChars ? /&#13;/g : /\r/g, "")
		// superscript

		// monospace
		.replace(/([^\\]|^)\`(.*?[^\\])\`/g, (match, p1, p2, offset, str) => {
			return p1 + "<code>" + p2 + "</code>";
		})
		.replace(/\\\`/g, "`")
		// Link
		.replace(/(^|[^\\])\[(.*?[^\\])\]\((.*?[^\\])\)/g, (match, p1, linkName, url) => {
			// Undo the HTML escaping we did earlier to the URL
			url = url.replace(/&amp;/g, "&")
				.replace(/&lt;/g, "%3C")
				.replace(/&gt;/g, "%3E")
				.replace(/&quot;/g, "%22")
				.replace(/&apos;/g, "'")
				.replace(/<b>|<\/b>/g, "*")
				.replace(/<s>|<\/s>/g, "~")
				.replace(/<sup>|<\/sup>/g, "%5E")
				.replace(/<sub>|<\/sub>/g, "%7C")
				.replace(/<code>|<\/code>/g, "%60");
			// Allow the user to specify a link to open a new window
			if(url[0] === "@"){
				return p1 + "<a href=\"" + url.substring(1) + "\" target=\"_blank\">" + linkName + "</a>";
			}
			return p1 + "<a href=\"" + url + "\">" + linkName + "</a>";
		})
		.replace(/\\([\[\]\(\)])/g, (fullMatch, escapedChar) => escapedChar)
		// Newline seperation (Something like "<br>" or "</p><p>")
		.replace(escapeControlChars ? /&#10;/g : /\n/g, newlineSeperator);
}

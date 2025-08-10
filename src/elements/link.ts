import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeLink extends MarkdownLikeBase {
	doMarkdown(str: string, markdownLikeElems: MarkdownLikeBase[]): string {
		return str
			.replace(/(^|[^\\])\[(.*?[^\\])\]\((.*?[^\\])\)/g, (match, p1, linkName, url) => {
				// Undo the HTML escaping we did earlier to the URL
				for (let i = 0; i < markdownLikeElems.length; i += 1){
					url = markdownLikeElems[i].undoMarkdownForUrl(url);
				}
				// Allow the user to specify a link to open a new window
				if(url[0] === "@"){
					return p1 + "<a href=\"" + url.substring(1) + "\" target=\"_blank\">" + linkName + "</a>";
				}
				return p1 + "<a href=\"" + url + "\">" + linkName + "</a>";
			})
			.replace(/\\([\[\]\(\)])/g, (fullMatch, escapedChar) => escapedChar)
	}
	undoMarkdownForUrl(str: string): string {
		// Do nothing?
		return str;
	}
}

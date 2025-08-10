import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeCode extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str
			.replace(/([^\\]|^)\|(.*?[^\\])\|/g, (match, p1, p2, offset, str) => {
				return p1 + "<sub>" + p2 + "</sub>";
			})
			.replace(/\\\|/g, "|")
	}
	undoMarkdownForUrl(str: string): string {
		return str.replace(/<code>|<\/code>/g, "%60");
	}
}

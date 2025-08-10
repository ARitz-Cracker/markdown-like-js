import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeInlineQuote extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str
			.replace(/([^\\]|^)\"(.*?[^\\])\"/g, (match, p1, p2, offset, str) => {
				return p1 + "<q>" + p2 + "</q>";
			})
			.replace(/\\\"/g, "\"")
	}
	undoMarkdownForUrl(str: string): string {
		return str.replace(/<q>|<\/q>/g, "%22");
	}
}

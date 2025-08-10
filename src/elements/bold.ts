import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeBold extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str
			.replace(/([^\\]|^)\*(.*?[^\\])\*/g, (match, p1, p2, offset, str) => {
				return p1 + "<b>" + p2 + "</b>";
			})
			.replace(/\\\*/g, "*"); // Remove escaping slashes
	}
	undoMarkdownForUrl(str: string): string {
		return str.replace(/<b>|<\/b>/g, "*");
	}
}

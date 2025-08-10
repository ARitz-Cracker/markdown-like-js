import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeSuperscript extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str
			.replace(/([^\\]|^)\^(.*?[^\\])\^/g, (match, p1, p2, offset, str) => {
				return p1 + "<sup>" + p2 + "</sup>";
			})
			.replace(/\\\^/g, "^")
	}
	undoMarkdownForUrl(str: string): string {
		return str.replace(/<sup>|<\/sup>/g, "%5E");
	}
}

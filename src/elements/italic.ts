import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeItalic extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str
			.replace(/([^\\]|^)\_(.*?[^\\])\_/g, (match, p1, p2, offset, str) => {
				return p1 + "<i>" + p2 + "</i>";
			})
			.replace(/\\\_/g, "_");
	}
	undoMarkdownForUrl(str: string): string {
		return str.replace(/<i>|<\/i>/g, "_");
	}
}

import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeStrike extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str
			.replace(/([^\\]|^)\~(.*?[^\\])\~/g, (match, p1, p2, offset, str) => {
				return p1 + "<s>" + p2 + "</s>";
			})
			.replace(/\\\~/g, "~");
	}
	undoMarkdownForUrl(str: string): string {
		return str.replace(/<s>|<\/s>/g, "~");
	}
}

// (?:\n|^)(?:[\t ]*?(?:-|\*|[0-9]+[.:]|[a-zA-Z]+[.:])[\t ]+.*(?:\n|$))+
import { MarkdownLikeBase } from "./_base_class";

export class MarkdownLikeStrike extends MarkdownLikeBase {
	doMarkdown(str: string): string {
		return str.replace(/(?:\n|^)(?:[\t ]*?(?:-|\*|[0-9]+[.:]|[a-zA-Z]+[.:])[\t ]+.*(?:\n|$))+/g, (match) => {
			// TODO: Go through lines in match, count spaces, make nested lists when needed, etc.
			return "";
		})
	}
	undoMarkdownForUrl(str: string): string {
		// Impossible (should be anyway)
		return str;
	}
}

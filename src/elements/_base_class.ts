export class MarkdownLikeBase {
	constructor() {}
	doMarkdown(str: string, markdownLikeElems: MarkdownLikeBase[]): string {
		throw new Error("not implemented for " + this.constructor.name)
	}
	undoMarkdownForUrl(str: string): string {
		throw new Error("not implemented for " + this.constructor.name)
	}
}

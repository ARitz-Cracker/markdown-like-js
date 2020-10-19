const specialCharsMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&apos;'
};
exports.escapeHTMLSpecialChars = function(str) {
	return str.replace(/[&<>"']/g, function(m) { return specialCharsMap[m]; });
}
// Not going to do underlines cuz anything underlined is a clickable link
exports.markdownToHTML = function(str, newlineSeperator = " "){
	return exports.escapeHTMLSpecialChars(str)
		// Remove useless CR
		.replace(/\r/, "")
		// Bold
		.replace(/([^\\]|^)\*(.*?[^\\])\*/g, (match, p1, p2, offset, str) => {
			return p1 + "<b>" + p2 + "</b>";
		})
		.replace(/\\\*/g, "*") // Remove escaping slashes
		// italic
		.replace(/([^\\]|^)\_(.*?[^\\])\_/g, (match, p1, p2, offset, str) => {
			return p1 + "<i>" + p2 + "</i>";
		})
		.replace(/\\\_/g, "_")
		// strike
		.replace(/([^\\]|^)\~(.*?[^\\])\~/g, (match, p1, p2, offset, str) => {
			return p1 + "<s>" + p2 + "</s>";
		})
		.replace(/\\\~/g, "~")
		// superscript
		.replace(/([^\\]|^)\^(.*?[^\\])\^/g, (match, p1, p2, offset, str) => {
			return p1 + "<sup>" + p2 + "</sup>";
		})
		.replace(/\\\^/g, "^")
		// subscript
		.replace(/([^\\]|^)\|(.*?[^\\])\|/g, (match, p1, p2, offset, str) => {
			return p1 + "<sub>" + p2 + "</sub>";
		})
		.replace(/\\\|/g, "|")
		// monospace
		.replace(/([^\\]|^)\`(.*?[^\\])\`/g, (match, p1, p2, offset, str) => {
			return p1 + "<span class=\"monospace\">" + p2 + "</span>";
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
				.replace(/<i>|<\/i>/g, "_")
				.replace(/<s>|<\/s>/g, "~")
				.replace(/<sup>|<\/sup>/g, "%5E")
				.replace(/<sub>|<\/sub>/g, "%7C")
				.replace(/<span class="monospace">|<\/span>/g, "%60");
			// Allow the user to specify a link to open a new window
			if(url[0] === "@"){
				return p1 + "<a href=\"" + url.substring(1) + "\" target=\"_blank\">" + linkName + "</a>";
			}
			return p1 + "<a href=\"" + url + "\">" + linkName + "</a>";
		})
		// Newline seperation (Something like "<br>" or "</p><p>")
		.replace(/\n/g, newlineSeperator);
}

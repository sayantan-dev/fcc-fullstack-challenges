const ta = document.querySelector("#markdown-input");     
const htmlOutputContainer = document.querySelector("#html-output");
const previewContainer = document.querySelector("#preview");

ta.addEventListener("input", () => {
  const renderedHtml = convertMarkdown();
  htmlOutputContainer.textContent = renderedHtml;
  previewContainer.innerHTML = renderedHtml;
});

function convertMarkdown() {
  const inp = ta.value;
  const arr = inp.split("\n");
  const newar = [];

  for (let i = 0; i < arr.length; i++) {
    let currentLine = arr[i].trim();
    if (currentLine === "") continue;

    let k = "";
    let isHeading = false;
    let isQuote = false;

    if (currentLine.startsWith("#")) {
      isHeading = true;
      let firstSpace = currentLine.indexOf(" ");
      let m = firstSpace === -1 ? currentLine.length : firstSpace;
      let headingContent = firstSpace === -1 ? "" : currentLine.slice(firstSpace + 1);
      k = "<h" + m + ">" + headingContent + "</h" + m + ">";
    } 
    else if (currentLine.startsWith(">")) {
      isQuote = true;
      k = "<blockquote>" + currentLine.slice(1).trim() + "</blockquote>";
    } 
    else {
      k = currentLine;
    }

    k = parseInlineToken(k, "**", "<strong>", "</strong>");
    k = parseInlineToken(k, "__", "<strong>", "</strong>");
    k = parseInlineToken(k, "*", "<em>", "</em>");
    k = parseInlineToken(k, "_", "<em>", "</em>");

    
    while (k.includes("![") && k.includes("](") && k.includes(")")) {
      let startImg = k.indexOf("![");
      let endBrac = k.indexOf("](", startImg);
      let endParen = k.indexOf(")", endBrac);

      if (startImg !== -1 && endBrac > startImg && endParen > endBrac) { 
        let altText = k.slice(startImg + 2, endBrac);
        let srcUrl = k.slice(endBrac + 2, endParen);
        let fullImg = k.slice(startImg, endParen + 1);
        let imgTag = '<img alt="' + altText + '" src="' + srcUrl + '">';
        k = k.replace(fullImg, imgTag);
      } else {
        break;
      }
    }

  
    while (k.includes("[") && k.includes("](") && k.includes(")")) {
      let startBrac = k.indexOf("[");
      let endBrac = k.indexOf("](");
      let endParen = k.indexOf(")", endBrac);
      
      if (startBrac !== -1 && endBrac > startBrac && endParen > endBrac) {
        let linkText = k.slice(startBrac + 1, endBrac);
        let url = k.slice(endBrac + 2, endParen);
        let fullLink = k.slice(startBrac, endParen + 1);
        let aTag = '<a href="' + url + '">' + linkText + '</a>';
        k = k.replace(fullLink, aTag);
      } else {
        break;
      }
    }

    if (!isHeading && !isQuote && !k.includes("<img") && !k.startsWith("<a") && !k.startsWith("<strong") && !k.startsWith("<em")) {
      k = "<p>" + k + "</p>";
    }

    newar.push(k);
  }
  return newar.join("");
}

function parseInlineToken(str, delimiter, openTag, closeTag) {
  let result = str;
  while (result.includes(delimiter)) {
    let firstIdx = result.indexOf(delimiter);
    let secondIdx = result.indexOf(delimiter, firstIdx + delimiter.length);
    
    if (secondIdx !== -1) {
      let targetText = result.slice(firstIdx + delimiter.length, secondIdx);
      let matchedSegment = result.slice(firstIdx, secondIdx + delimiter.length);
      let replacement = openTag + targetText + closeTag;
      result = result.replace(matchedSegment, replacement);
    } else {
      break; 
    }
  }
  return result;
}

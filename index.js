document.querySelector("button").addEventListener("click", (event) => {
  FormatText(event, document.getElementById("script").value);
});
document.getElementById("copy").addEventListener("click", (event) => {
  copy(event);
});

function FormatText(event, text) {
  event.preventDefault();
  document.getElementById("output").innerHTML = "";
  let pLength = document.querySelector("input").value;

  let body = document.querySelector("body");

  body.style.fontFamily = document.querySelector("select").value;
  body.style.fontSize = document.getElementById("FontSize").value;
  console.log(document.getElementById("FontSize").value + "px");

  let paragraphs = text.split("\n");

  paragraphs.forEach((p) => {
    if (p.length < pLength) {
      paragraph(p);
      paragraph("\r\n");
    } else {
      let paraWords = "";
      let paragraphText = p;

      let words = paragraphText.split(" ");

      words.forEach((word, index) => {
        if (
          paraWords.length + word.length > pLength ||
          index === words.length - 1
        ) {
          if (index === words.length - 1) {
            paraWords += word;
          }
          paragraph(paraWords);
          paraWords = word + " ";
          return;
        } else {
          paraWords += word + " ";
        }
      });
    }
  });
}

function copy(event) {
  event.preventDefault();
  let copyText = "";
  if (document.selection) {
    var textRange = document.body.createTextRange();
    textRange.moveToElementText(document.getElementById("output"));
    textRange.select();

    console.log(textRange);
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById("output"));
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(range);

    copyText = document.getSelection();
    copyText = copyText.toString();
  }

  navigator.clipboard.writeText(copyText);
  document.getSelection().removeAllRanges();
}

function paragraph(text) {
  if (text !== "") {
    let para;
    if (text === "\r\n") {
      para = document.createElement("p");
    } else {
      para = document.createElement("div");
    }
    para.textContent = text;
    document.getElementById("output").append(para);
  }
}

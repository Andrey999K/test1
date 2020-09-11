document.addEventListener("DOMContentLoaded", () => {
  const content = document.querySelector(".content");
  const clear = document.querySelector(".clear");
  const save = document.querySelector(".save");
  let end1 = true;

  content.innerHTML = localStorage.getItem("text");

  const addInput = (element) => {
    content.insertAdjacentHTML(
      "beforeend",
      `<input type="text" class="input ${element}">`
    );
    document.querySelector(`input.${element}`).focus();
  };

  const addElement = (className, end = true) => {
    let input = document.querySelector(".input");
    if (input.value == "") {
      content.removeChild(input);
      return true;
    }
    if (className == "title") {
      tag = "h2";
    }
    if (className == "text") {
      tag = "p";
    }
    if (className == "list") {
      tag = "ul";
    }
    if (className == "list_number") {
      tag = "ol";
    }
    if (className == "list__item") {
      tag = "li";
    }
    let element = document.createElement(tag);
    if (tag == "ul" || tag == "ol") {
      element.className = className;
      let li = document.createElement("li");
      li.className = "list__item";
      if (input.value == "") {
        content.removeChild(input);
        end = true;
      } else {
        li.textContent = input.value;
        element.insertAdjacentElement("beforeend", li);
        input.value = "";
        end = false;
      }
    } else if (tag == "li") {
      element = document.querySelectorAll("ol, ul")[
        document.querySelectorAll("ol, ul").length - 1
      ];
      let li = document.createElement("li");
      li.className = "list__item";
      li.textContent = input.value;
      element.insertAdjacentElement("beforeend", li);
      input.value = "";
      end = false;
    } else {
      element.className = className;
      element.textContent = input.value;
      content.removeChild(input);
      end = true;
    }
    content.insertAdjacentElement("beforeend", element);
    localStorage.setItem("text", content.innerHTML);
    return end;
  };

  document.addEventListener("keydown", () => {
    if (event.target.tagName != "INPUT") {
      if (event.ctrlKey == true) {
        if (event.code != "F5") {
          event.preventDefault();
        }
        if (event.code == "KeyH") {
          addInput("title");
        }
        if (event.code == "KeyP") {
          addInput("text");
        }
        if (event.code == "KeyU") {
          addInput("list");
        }
        if (event.code == "KeyO") {
          addInput("list_number");
        }
      }
    }

    if (event.target.tagName == "INPUT") {
      if (event.code == "Enter") {
        let className = event.target.classList[1];
        if (end1) {
          end1 = addElement(className);
        } else {
          end1 = addElement("list__item");
        }
      }

      if (event.code == "Escape") {
        content.removeChild(event.target);
      }
    }
  });

  document.addEventListener("click", () => {
    if (event.target.className != "input") {
      let end1 = true;
      let className = document.querySelector(".input").classList[1];
      if (end1) {
        end1 = addElement(className);
      } else {
        end1 = addElement("list__item");
      }
    }
  });

  clear.addEventListener("click", () => {
    content.innerHTML = "";
    localStorage.removeItem("text");
  });

  save.addEventListener("click", () => {
    let header = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
      "xmlns:w='urn:schemas-microsoft-com:office:word' " +
      "xmlns='http://www.w3.org/TR/REC-html40'>" +
      "<head><meta charset='utf-8'><title>Export HTML to Word Document with JavaScript</title></head><body>";
    let footer = "</body></html>";
    let sourceHTML = header + content.innerHTML + footer;

    let source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(sourceHTML);
    let fileDownload = document.createElement("a");
    document.body.appendChild(fileDownload);
    fileDownload.href = source;
    fileDownload.download = 'document.doc';
    fileDownload.click();
    document.body.removeChild(fileDownload);
  });
});
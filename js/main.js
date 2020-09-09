document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  let end1 = true;

  const addInput = (element) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<input type="text" class="input ${element}">`
    );
    document.querySelector(`input.${element}`).focus();
  };

  const addElement = (className, end = true) => {
    let input = document.querySelector(".input");
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
      let li = document.createElement("li");
      li.className = "list__item";
      if (input.value == "") {
        container.removeChild(input);
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
      console.log(element);
      let li = document.createElement("li");
      li.className = "list__item";
      if (input.value == "") {
        container.removeChild(input);
        end = true;
      } else {
        li.textContent = input.value;
        element.insertAdjacentElement("beforeend", li);
        input.value = "";
        end = false;
      }
    } else {
      element.className = className;
      element.textContent = input.value;
      container.removeChild(input);
      end = true;
    }
    container.insertAdjacentElement("beforeend", element);
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
        container.removeChild(event.target);
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
});

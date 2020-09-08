document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  const addInput = (element) => {
    container.insertAdjacentHTML(
      "beforeend",
      `<input type="text" class="input ${element}">`
    );
    document.querySelector(`input.${element}`).focus();
  };

  const addElement = (className) => {
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
    let element = document.createElement(tag);
    if (tag == "ul" || tag == "ol") {
      let li = document.createElement("li");
      li.textContent = event.target.value;
      console.log(li);
      element.insertAdjacentElement("beforeend", li);
    } else {
      element.className = className;
      element.textContent = event.target.value;
    }
    container.insertAdjacentElement("beforeend", element);
    container.removeChild(event.target);
  };

  document.addEventListener("keydown", () => {
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

    if (event.target.tagName == "INPUT") {
      if (event.code == "Enter") {
        let className = event.target.classList[1];
        addElement(className);
      }
    }
  });
});

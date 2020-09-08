document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");

  const addElement = () => {
    console.dir(event.target);
  };

  document.addEventListener("keydown", () => {
    if (event.ctrlKey == true) {
      if (event.code != "F5") {
        event.preventDefault();
      }
      if (event.code == "KeyH") {
        container.insertAdjacentHTML(
          "beforeend",
          `<input type="text" class="input title">`
        );
        document.querySelector(".title").focus();
      }
    }

    if (event.target.tagName == "INPUT") {
      console.log(event);
      if (event.code == "Enter") {
        let title = document.createElement("h2");
        title.className = "title";
        title.textContent = event.target.value;
        container.insertAdjacentElement("beforeend", title);
        container.removeChild(event.target);
      }
    }
  });
});

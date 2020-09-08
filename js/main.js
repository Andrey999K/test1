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
      let input = event.target;
      input.addEventListener("keydown", () => {
        console.log(event);
        if (event.code == "Enter") {
          console.log("GGGGGGG");
        }
      });
    }
  });
});

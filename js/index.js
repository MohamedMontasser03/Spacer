const APP = (function () {
  const menuButton = document.querySelector("header button");
  const menu = document.querySelector("header ul");

  function handleMenu() {
    menuButton.addEventListener("click", (e) => {
      menu.setAttribute(
        "content-hidden",
        menu.getAttribute("content-hidden") === "true" ? "false" : "true"
      );
    });
  }

  function handleDest(data) {
    const planetList = document.getElementsByClassName("planet-list")[0];
    const domName = document.getElementsByTagName("h2")[0];
    const domWebp = document.querySelector(".planet-img picture").children[0];
    const domImage = document.querySelector(".planet-img picture").children[1];
    const domDesc = document.getElementsByClassName("desc")[0];
    const domDest = document.querySelector(".info :first-child span");
    const domTime = document.querySelector(".info :last-child span");
    let selected = 0;

    for (let i = 0; i < planetList.children.length; i++) {
      const el = planetList.children[i];

      el.addEventListener("click", () => {
        if (el.getAttribute("aria-selected") !== "true") {
          planetList.children[selected].setAttribute("aria-selected", "false");
          el.setAttribute("aria-selected", "true");
          selected = i;

          domName.textContent = data["destinations"][i].name;
          domDesc.textContent = data["destinations"][i].description;
          domWebp.srcset = data["destinations"][i].images.webp;
          domImage.src = data["destinations"][i].images.png;
          domDest.innerHTML = data["destinations"][i].distance;
          domTime.innerHTML = data["destinations"][i].travel;
        }
      });
    }
  }
  function handleTechnology(data) {
    const Selector = document.getElementsByClassName("number-indicator")[0];
    const domName = document.getElementsByTagName("h2")[0].children[1];
    const domDesc = document.getElementsByTagName("p")[0];
    const domImage = document.getElementsByClassName("tech-image")[0];
    let selected = 0;

    for (let i = 0; i < Selector.children.length; i++) {
      const el = Selector.children[i];

      el.addEventListener("click", () => {
        if (el.getAttribute("aria-selected") !== "true") {
          Selector.children[selected].setAttribute("aria-selected", "false");
          el.setAttribute("aria-selected", "true");
          selected = i;

          domName.textContent = data["technology"][i].name;
          domDesc.textContent = data["technology"][i].description;
          domImage.style.setProperty(
            "--landscape-img",
            `url('${data["technology"][i].images.landscape}')`
          );
          domImage.style.setProperty(
            "--portrait-img",
            `url('${data["technology"][i].images.portrait}')`
          );
        }
      });
    }
  }

  function handleCrew(data) {
    const Selector = document.getElementsByClassName("dot-indicator")[0];
    const domName = document.getElementsByTagName("h2")[0].children[1];
    const domrole = document.getElementsByTagName("h2")[0].children[0];
    const domWebp =
      document.getElementsByClassName("member-img")[0].children[0].children[0];
    const domImage =
      document.getElementsByClassName("member-img")[0].children[0].children[1];
    const domBIO = document.getElementsByClassName("crew-desc")[0];
    let selected = 0;

    for (let i = 0; i < Selector.children.length; i++) {
      const el = Selector.children[i];

      el.addEventListener("click", () => {
        if (el.getAttribute("aria-selected") !== "true") {
          Selector.children[selected].setAttribute("aria-selected", "false");
          el.setAttribute("aria-selected", "true");
          selected = i;

          domName.innerHTML = data["crew"][i].name;
          domrole.innerHTML = data["crew"][i].role;
          domWebp.srcset = data["crew"][i].images.webp;
          domImage.src = data["crew"][i].images.png;
          domBIO.innerHTML = data["crew"][i].bio;
        }
      });
    }
  }

  function init() {
    handleMenu();
    if (location.pathname.includes("destination")) {
      fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
          handleDest(data);
        });
    } else if (location.pathname.includes("crew")) {
      fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
          handleCrew(data);
        });
    } else if (location.pathname.includes("technology")) {
      fetch("./data.json")
        .then((res) => res.json())
        .then((data) => {
          handleTechnology(data);
        });
    }
  }

  return {
    init,
  };
})();

APP.init();

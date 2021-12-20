const APP = (function () {
  const menuButton = document.querySelector("header button");
  const menu = document.querySelector("header ul");
  let busy = false;

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
        if (el.getAttribute("aria-selected") !== "true" && !busy) {
          busy = true;
          planetList.children[selected].setAttribute("aria-selected", "false");
          el.setAttribute("aria-selected", "true");
          selected = i;
          domImage.classList.add("pimg-out");
          setTimeout(() => {
            domImage.classList.remove("pimg-out");

            domName.textContent = data["destinations"][i].name;
            domDesc.textContent = data["destinations"][i].description;
            domWebp.srcset = data["destinations"][i].images.webp;
            domImage.src = data["destinations"][i].images.png;
            domDest.innerHTML = data["destinations"][i].distance;
            domTime.innerHTML = data["destinations"][i].travel;

            domImage.classList.add("pimg-in");
            setTimeout(() => {
              domImage.classList.remove("pimg-in");
              busy = false;
            }, 1000);
          }, 1000);
        }
      });
    }
  }

  function handleTechnology(data) {
    const Selector = document.getElementsByClassName("number-indicator")[0];
    const domName = document.getElementsByTagName("h2")[0].children[1];
    const domDesc = document.getElementsByTagName("p")[0];
    const domImage = document.getElementsByClassName("tech-image")[0];
    setTimeout(() => {
      domImage.classList.remove("fadin");
    }, 500);
    const domImageT = document.getElementsByClassName("tech-image")[1];
    let selected = 0;

    for (let i = 0; i < Selector.children.length; i++) {
      const el = Selector.children[i];

      el.addEventListener("click", () => {
        if (el.getAttribute("aria-selected") !== "true" && !busy) {
          busy = true;
          domImageT.style.setProperty(
            "--landscape-img",
            `url('${data["technology"][i].images.landscape}')`
          );
          domImageT.style.setProperty(
            "--portrait-img",
            `url('${data["technology"][i].images.portrait}')`
          );
          domImage.classList.add(i - selected > 0 ? "out" : "in");
          domImageT.classList.add(i - selected > 0 ? "in" : "out");

          Selector.children[selected].setAttribute("aria-selected", "false");
          el.setAttribute("aria-selected", "true");
          selected = i;

          setTimeout(() => {
            domImageT.classList.remove("in", "out");
            domImage.classList.remove("out", "in");

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
            busy = false;
          }, 1000);
        }
      });
    }
  }

  function handleCrew(data) {
    const Selector = document.getElementsByClassName("dot-indicator")[0];
    const domName = document.getElementsByTagName("h2")[0].children[1];
    const domrole = document.getElementsByTagName("h2")[0].children[0];
    const realPic =
      document.getElementsByClassName("member-img")[0].children[0];
    const animPic =
      document.getElementsByClassName("member-img")[0].children[1];
    const domWebp = realPic.children[0];
    const domImage = realPic.children[1];
    const domBIO = document.getElementsByClassName("crew-desc")[0];
    let selected = 0;

    for (let i = 0; i < Selector.children.length; i++) {
      const el = Selector.children[i];

      el.addEventListener("click", () => {
        if (el.getAttribute("aria-selected") !== "true" && !busy) {
          busy = true;
          el.setAttribute("aria-selected", "true");
          Selector.children[selected].setAttribute("aria-selected", "false");
          selected = i;
          animPic.children[0].srcset = data["crew"][i].images.webp;
          animPic.children[1].src = data["crew"][i].images.png;
          realPic.classList.add("anim");
          animPic.classList.add("anim");
          setTimeout(() => {
            animPic.classList.remove("anim");
            realPic.classList.remove("anim");

            domName.innerHTML = data["crew"][i].name;
            domrole.innerHTML = data["crew"][i].role;
            domWebp.srcset = data["crew"][i].images.webp;
            domImage.src = data["crew"][i].images.png;
            domBIO.innerHTML = data["crew"][i].bio;
            busy = false;
          }, 1000);
        }
      });
    }
  }

  function handleContact() {
    let alert = document.getElementById("alert");
    let name = document.forms[0].children[1];
    let email = document.forms[0].children[3];
    let message = document.forms[0].children[5];
    function useAlert(msg) {
      alert.style.setProperty("display", "block");
      alert.textContent = msg;
      setTimeout(() => {
        alert.style.setProperty("display", "none");
      }, 2000);
    }

    document.forms[0].addEventListener("submit", (e) => {
      e.preventDefault();
      if (name.value === "") {
        useAlert("Name field is required");
      } else if (!name.value.match(/[a-zA-Z][a-zA-Z ]{,}/)) {
        useAlert("Can't have numbers in the name field");
      } else if (email.value === "") {
        useAlert("Email field is required");
      } else if (
        email.value
          .toLowerCase()
          .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
      ) {
        useAlert("Email is not correct");
      } else if (message.value.split(" ").length < 100) {
        useAlert("Message must be at least 100 words long");
      } else {
        useAlert("Email Sent");
      }
    });
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
    } else if (location.pathname.includes("contact")) {
      handleContact();
    }
  }

  return {
    init,
  };
})();

APP.init();

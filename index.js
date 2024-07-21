const DrawerWidth = $(".drawer").innerWidth();
const sideMenueWidth = $(".sideMenue").width();
const imageUrlBase = "https://image.tmdb.org/t/p/w500";

if ($(document).width() < 920) {
  $(".drawer").css("display", "none");
  $(".open-drawer").css("display", "block");
} else {
  $(".drawer").css("display", "block");
  $(".open-drawer").css("display", "none");
}

$(".drawer").css("left", -DrawerWidth + sideMenueWidth);

const ToggleSlider = () => {
  if ($(".drawer").css("left") == `${-DrawerWidth + sideMenueWidth}px`) {
    $(".drawer").animate({ left: `0px` });

    $("close-item").removeClass("fa-align-justify");
    $(".close-item").addClass("fa-x");

    // animate items
    for (let i = 0; i < 6; i++) {
      $(".tab")
        .eq(i)
        .animate(
          {
            top: i * 50,
            opacity: 1,
          },
          (i + 6) * 100
        );
    }
  } else {
    $(".drawer").animate({ left: -DrawerWidth + sideMenueWidth });

    $("close-item").addClass("fa-align-justify");
    $(".close-item").removeClass("fa-x");
    $(".tab").css("top", "400px");
    $(".tab").css("opacity", "0");
  }
};

$(".close-item").click(function () {
  ToggleSlider();
});

$(".open-drawer").click(function () {
  ToggleSlider();
});

// $("h1").css("postion", "absolute");
// // movies item animation
// $(".overLayer").hover(() => {
//   $(".overLayer:hover h1").slideUp(1000);
//   console.log("asdasd");
// });

// /////////////////////////////////////////////////////////////////// display data ///////////////////////////////////

const DisplayData = (array) => {
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    var Stars = ``;
    // console.log(array[i].backdrop_path);

    const Rate = Math.floor(array[i].vote_average) / 5;
    for (let i = 0; i < Rate; i++) {
      Stars += `<i class="fa-solid fa-star" style="color: yellow;"></i>`;
    }

    if (!Number.isInteger(array[i].vote_average)) {
      Stars += `<i class="fa-solid fa-star-half-stroke"  style="color: yellow;"></i>`;
    }

    if (array[i].vote_average == 0) {
      Stars = `<i class="fa-solid fa-star" style="color: gray;"></i>`;
    }

    box += `
    <div class="col-lg-4 col-md-6 movie-item">
          <img
            src="${imageUrlBase}${array[i].poster_path}"
            class="w-100"
            style="height : 500px"
            alt=""
          />

          <div class="overLayer">
            <h1 class="text-center text-light " id="title">${array[
              i
            ].title.substring(0, 25)}</h1>
            <p class="parag text-center text-light fw-light my-1 mb-3">
            ${array[i].overview.substring(0, 200)}...
            </p>
            <p class="text-light animationUp">Release Date :2024-05-01</p>
            <div class="animationUp">
              ${Stars}
            </div>

            <div
              class=" animationUp border border-1 border-success p-1 rounded-circle d-inline-block m-2"
            >
              <p class="text-light mb-0">${
                Math.floor(array[i].vote_average * 10) / 10
              }</p>
            </div>
          </div>
        </div>
    `;
  }

  $(".data-section").html(box);
};

const GetNowPlayingMovies = async () => {
  const Data = await fetch(
    "https://api.themoviedb.org/3/movie/now_playing?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  const Movies = await Data.json();
  console.log("now playing", Movies);

  DisplayData(Movies?.results);
};

const GetPopularMovies = async () => {
  const Data = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  const Movies = await Data.json();
  console.log("GetPopularMovies", Movies);

  DisplayData(Movies?.results);
};

const GetTopRatedMovies = async () => {
  const Data = await fetch(
    "https://api.themoviedb.org/3/movie/top_rated?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  const Movies = await Data.json();
  console.log("GetTopRatedMovies", Movies);

  DisplayData(Movies?.results);
};

const GetTrendingMovies = async () => {
  const Data = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  const Movies = await Data.json();
  console.log("GetTrendingMovies", Movies);

  DisplayData(Movies?.results);
};

const GetupcomingMovies = async () => {
  const Data = await fetch(
    "https://api.themoviedb.org/3/movie/upcoming?api_key=eba8b9a7199efdcb0ca1f96879b83c44"
  );
  const Movies = await Data.json();
  console.log("GetupcomingMovies", Movies);

  DisplayData(Movies?.results);
};

const SearchMovies = async (movieName) => {
  const apiKey = "eba8b9a7199efdcb0ca1f96879b83c44";
  const Data = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
      movieName
    )}`
  );
  const Movies = await Data.json();
  console.log("SearchMovies", Movies);

  DisplayData(Movies?.results);
};

// ///////////////////////////////////////////////////////////// manage tabs //////////////////////////

var selectedTab = "Trending";

// console.log(selectedTab);

const ReternData = () => {
  switch (selectedTab) {
    case "Now Playing":
      GetNowPlayingMovies();
      break;
    case "Popular":
      GetPopularMovies();
      break;
    case "Top Rated":
      GetTopRatedMovies();
      break;
    case "Trending":
      GetTrendingMovies();
      break;
    case "UpComing":
      GetupcomingMovies();
      break;
    case "Contact Us":
      console.log(selectedTab);
      break;
  }
};

ReternData();

document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target");
    if (targetId == "Contact Us") {
      const targetElement = document.getElementById("contact");
      targetElement.scrollIntoView({ behavior: "smooth" });
    } else {
      selectedTab = targetId;
      const targetElement = document.getElementById("Main");
      targetElement.scrollIntoView({ behavior: "smooth" });
      ReternData();
    }
  });
});

$("#searchInput").on("input", function (e) {
  if (e.target.value) {
    SearchMovies(e.target.value);
  } else {
    ReternData();
  }
});

// ///////////////////////////////////// input validations //////////////////////////////

var password = "";

function ValidateInputs(element) {
  const Validators = {
    name: /^(\w{3,})$/,
    email: /^(\w)+@((\w)+\.(\w)+)+$/,
    phoneNumber: /^(01|01|00201)[0-2,5]{1}[0-9]{8}$/,
    Age: /\b(1[7-9]|[2-9]\d|1[01]\d|120)\b/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
  };

  if (element.id === "Repassword") {
    console.log("password", password);
    if (element.value == password) {
      RemoveError(element.id);
      return true;
    } else {
      AddError(element.id);
      return false;
    }
  } else if (Validators[element.id].test(element.value)) {
    RemoveError(element.id);
    return true;
  } else {
    AddError(element.id);
    return false;
  }
}

$("input").on("input", function (evt) {
  if (evt.target.id == "password") {
    password = evt.target.value;
  }

  ValidateInputs(this);
});

$("input").on("keypress", function (evt) {
  if (evt.target.id == "phoneNumber" || evt.target.id == "Age") {
    if (evt.which < 48 || evt.which > 57) {
      evt.preventDefault();
    }
  }
});

const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", function () {
  const type =
    passwordInput.getAttribute("type") === "password" ? "text" : "password";
  passwordInput.setAttribute("type", type);
  togglePassword.classList.toggle("fa-eye-slash");
  togglePassword.classList.toggle("fa-eye");
});

// Show the eye icon when the input is focused
passwordInput.addEventListener("focus", () => {
  togglePassword.style.opacity = "1";
  togglePassword.style.transform = "translateY(0%)";
});

// Hide the eye icon when the input loses focus and there is no value
passwordInput.addEventListener("blur", () => {
  if (!passwordInput.value) {
    togglePassword.style.opacity = "0";
    togglePassword.style.transform = "translateY(-100%)";
  }
});

$("button").on("mouseover", function (event) {
  if ($("button").hasClass("shake")) {
    if ($("button").hasClass("rightTranslate")) {
      $("button").removeClass("rightTranslate");
      $("button").addClass("leftTranslate");
    } else {
      $("button").removeClass("leftTranslate");
      $("button").addClass("rightTranslate");
    }
  }
});

const AddError = (selector) => {
  $(`.${selector}`).removeClass("d-none");
  $(`.${selector}`).addClass("d-block");
  $("button").removeClass("btn-dark");
  $("button").addClass("btn-danger");
  $("button").addClass("shake");
};

const RemoveError = (selector) => {
  $(`.${selector}`).removeClass("d-block");
  $(`.${selector}`).addClass("d-none");
  $("button").removeClass("btn-danger");
  $("button").removeClass("shake");
  $("button").addClass("btn-dark");
};

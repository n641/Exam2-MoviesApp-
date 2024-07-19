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

$("#title").css("postion", "absolute");
// movies item animation
$(".movie-item").hover(() => {
  $("#title").slideDown(1000);
  console.log("asdasd");
});

// /////////////////////////////////////////////////////////////////// display data ///////////////////////////////////

const DisplayData = (array) => {
  let box = ``;
  for (let i = 0; i < array.length; i++) {
    var Stars = ``;
    console.log(array[i].backdrop_path);

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
            <h1 class="text-center text-light" id="title">${array[
              i
            ].title.substring(0, 25)}</h1>
            <p class="text-center text-light fw-light my-1 mb-3">
            ${array[i].overview.substring(0, 200)}...
            </p>
            <p class="text-light">Release Date :2024-05-01</p>
            <div>
              ${Stars}
            </div>

            <div
              class="border border-1 border-success p-1 rounded-circle d-inline-block m-2"
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

console.log(selectedTab);

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

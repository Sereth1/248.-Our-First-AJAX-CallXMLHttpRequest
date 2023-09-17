const btn = document.querySelector(".btn-country");
const coutriesContainer = document.querySelector(".countries");
const form = document.querySelector(".form");
const inpt = document.querySelector(".inpt");
const country = document.querySelector(".country");
///////////////////////xml http request///////////////////////////

form.addEventListener("submit", function (e) {
  e.preventDefault();
  console.log(statusbar);
  coutriesContainer.innerHTML = "";
  let flag = [];
  flag.push(inpt.value);
  inpt.value = "";
  flags(flag);
  let html;
  const rednerCountry = function (data, className) {
    const img = data.flags.png;
    const lang = data.languages[Object.keys(data.languages)[0]];
    const cur = data.currencies[Object.keys(data.currencies)[0]];

    html = ` <article class="country ${className}">
  <img class="country__img" src=${img} />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${(
      +data.population / 1000000
    ).toFixed(1)} people</p>
    <p class="country__row"><span>🗣️</span>${lang}</p>
    <p class="country__row"><span>💰</span>${cur.name}</p>
  </div>
</article>`;
    coutriesContainer.insertAdjacentHTML("beforeend", html);
    coutriesContainer.style.opacity = 1;
  };

  function flags(names) {
    const request = new XMLHttpRequest();
    request.open("GET", `https://restcountries.com/v3.1/name/${names}`);
    request.send();
    request.addEventListener("load", function () {
      if (this.status === 200) {
        const [data] = JSON.parse(this.responseText);

        rednerCountry(data);
        // second call
        console.log(data.borders.flatMap((a) => [a]));
        const request2 = new XMLHttpRequest();
        const borders = data.borders?.[0];
        console.log(borders);
        request2.open("GET", `https://restcountries.com/v3.1/alpha/${borders}`);
        request2.send();
        request2.addEventListener("load", function () {
          const [data2] = JSON.parse(this.responseText);

          rednerCountry(data2, "neighbour");
          
        });
      } else {
        alert("Not found");
      }
    });
  }
});

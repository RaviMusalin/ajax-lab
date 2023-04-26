'use strict';

// PART 1: SHOW A FORTUNE

function showFortune(evt) {
  // TODO: get the fortune and show it in the #fortune-text div
  fetch('/fortune')
  .then((response) => response.text())
  .then((fortune) => {
    document.querySelector('#fortune-text').innerHTML = fortune;
    });
};

document.querySelector('#get-fortune-button').addEventListener('click', showFortune);

// PART 2: SHOW WEATHER

function showWeather(evt) {
  evt.preventDefault();

  const url = '/weather.json';
  const zipcode = document.querySelector('#zipcode-field').value;

  // TODO: request weather with that URL and show the forecast in #weather-info
  fetch(`${url} ?zipcode=${zipcode}`)
  .then((response) => response.json())
  .then((weather) => {
    document.querySelector('#weather-info').innerHTML = weather['forecast'];
  });
};

document.querySelector('#weather-form').addEventListener('submit', showWeather);

// PART 3: ORDER MELONS

function orderMelons(evt) {
  evt.preventDefault();

  // TODO: show the result message after your form
  // TODO: if the result code is ERROR, make it show up in red (see our CSS!)
  const formInputs = {
    qty: document.querySelector('#qty-field').value,
    melon_type: document.querySelector('#melon-type-field').value,
  };

  fetch('/order-melons.json', {
    method: 'POST',
    body: JSON.stringify(formInputs),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((melonInfo) => {
        if (melonInfo.code == "OK") {
            // document.querySelector('#order-status').innerHTML = code;
            document.querySelector('#order-status').innerHTML = `<p>${melonInfo.msg}</p>`
        } else {
            document.querySelector('#order-status').innerHTML = `<p><b>${melonInfo.msg}</b></p>`;
        }

    });
};


document.querySelector('#order-form').addEventListener('submit', orderMelons);

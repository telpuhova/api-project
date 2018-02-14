let listItem = function(test) {
  $('#launches').empty();
  $('#launches').append(`<ul class="list-group">`);
  for (let i=0; i<test.length; i++) {
    $('#launches').append(`
          <li class="list-group-item"> <strong>${test[i].rocket.rocket_name}</strong> <br>
        ${test[i].launch_site.site_name_long}<br>Launch Date: ${test[i].launch_date_local}<br>
        Core Serial: ${test[i].rocket.first_stage.cores[0].core_serial}

        </li>
    `)
  }
  $('#launches').append(`</ul>`);
}

let blockItem = function(response) {
  $('#launches').empty();
  for (let i=0; i<response.length; i++) {
    $('#launches').append(`
      <div class="card" style="width: 18rem;">
        <div class="cardBox">
          <img class="card-img-top" src="${response[i].links.mission_patch}" alt="Card image cap">
        </div>
        <div class="card-body">
          <h5 class="card-title">${response[i].rocket.rocket_name}</h5>
          <p class="card-text">${response[i].launch_site.site_name_long}</p>
        </div>
      </div>
    `)
  }
}

$(document).ready(function() {
  let url = 'https://api.spacexdata.com/v2/launches';
  let objectsFromResponse;
  let objectsFromJsResponse;

  //API call with jQuery
  $.ajax({
    url: url,
    type: 'GET',
    data: {
      format: 'json'
    },
    success: function(response) {
      objectsFromResponse = response;
      blockItem(response);
    },
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.");
    }
  });

  //API call with js
  // let request = new XMLHttpRequest();
  // request.onreadystatechange = function() {
  //   if (this.readyState === 4 && this.status === 200) {
  //     let jsResponse = JSON.parse(this.responseText);
  //     objectsFromJsResponse = jsResponse;
  //   }
  // }
  //
  // request.open("GET", url, true);
  // request.send();



  $('#listItem').click(function(){
    listItem(objectsFromResponse);
  });
  $('#blockItem').click(function(){
    blockItem(objectsFromResponse);
  });


});

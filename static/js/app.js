var tableData = data;

function createTable(data) {
  d3.select("tbody")
  .selectAll("tr")
  .data(data)
  .enter()
  .append("tr")
  .html(function(d) {
    return `<td>${d.datetime}</td><td>${d.city}</td><td>${d.state}</td><td>${d.country}</td><td>${d.shape}</td><td>${d.durationMinutes}</td><td>${d.comments}</td>`;
  })};

function multiFilter(arr, filters) {
  const filterKeys = Object.keys(filters);
  return arr.filter(eachObj => {
    return filterKeys.every(eachKey => {
      if (!filters[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey]);
    });
  });
};

createTable(data);

var submit = d3.select("#filter-btn");

submit.on("click", function() {

  d3.event.preventDefault();

  var inputElement = d3.select("#datetime").property("value");
  var inputElement1 = d3.select("#city").property("value");
  var inputElement2 = d3.select("#state").property("value");
  var inputElement3 = d3.select("#country").property("value");
  var inputElement4 = d3.select("#shape").property("value");
  var rawValue = [inputElement, inputElement1, inputElement2, inputElement3, inputElement4]
  var inputValue = rawValue.filter(n => n)

  // console.log(inputValue);

  if (inputValue.length == 1) {
    
        var filteredData = tableData.filter(sighting => 
        sighting.datetime === inputElement ||
        sighting.city === inputElement1 ||
        sighting.state === inputElement2 ||
        sighting.country === inputElement3 ||
        sighting.shape === inputElement4

        );
  } else if (inputValue.length == 0 || inputValue === undefined) {
      var filteredData = tableData

    // attempt at multisort
  } else {
    let filters = {
        datetime: [inputElement],
        city: [inputElement1],
        // state: [inputElement2],
        // country: [inputElement3],
        // shape: [inputElement4]
    };

    // Object.keys(filters).forEach(function(key) {
    //     if(filters[key] === "") {
    //         filters[key] == undefined;
    //     }
    // })

    console.log(filters)

    var filteredData = multiFilter(tableData, filters);
  }
  
  // console.log(filteredData)

  var Parent = document.getElementById("ufo-body");
  while(Parent.hasChildNodes())
  {
     Parent.removeChild(Parent.firstChild);
  }

  createTable(filteredData);


});


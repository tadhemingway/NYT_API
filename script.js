//Setup Variables
//======================================
var authKey = "R1a31F4tBjCUaM2ho8GtIFsrSdtXt30M";
var queryTerm = "";
var numResults = "";
var startYear = 0;
var endYear = 0;

//URL Base variable
var queryURLBase = "http://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + authKey;

//Variable to track the number of articles being returned
var articleCounter = 0;



//Functions
//======================================

function runQuery(numArticles, queryURL) {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (NYTData) {
        for (var i = 0; i < numArticles; i++) {
            console.log(NYTData.response.docs[i].headline.main);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].byline.original);
            console.log(NYTData.response.docs[i].web_url);

            //start dumping html here
            var wellSection = $('<div>');
            wellSection.addClass('well');
            wellSection.attr('id', 'articleWell-' + i);
            $('#wellSection').append(wellSection);

            //Attach the content to the appropiate well
            $('#articleWell-' + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
            $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
            $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].pub_date + "<h5>");
            $('#articleWell-' + i).append("<h5>" + NYTData.response.docs[i].byline.original + "<h5>");
            $('#articleWell-' + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");
        }
    })
};

//Main Processes
//======================================

$('#run-search').click(function () {
    queryTerm = $('#search-term').val().trim();
    startYear = $('#start-year').val().trim();
    endYear = $('#end-year').val().trim();
    numResults = $('#article-count').val();
    var newURL = queryURLBase + "&q=" + queryTerm;
    //Adding beginning date information to URL
    if (parseInt(startYear)) {
        startYear = startYear + "0101";
        newURL = newURL + "&begin_date=" + startYear;
    }
    //adding end date information to URL
    if (parseInt(endYear)) {
        endYear = endYear + "1231";
        newURL = newURL + "&end_date=" + endYear;
    }

    runQuery(numResults, newURL);
    event.preventDefault();
})

//1. Retrieve user inputs and convert them to variables
//2. Use those variables to run on AJAX call to the New York Times
//3. Break down the NYT Object into useable fields
//4. Dynamically generage html content

//5. Dealing with "edge cases" - bugs
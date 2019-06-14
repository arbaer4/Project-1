//NYT API
//Environment will be our hardcoded news_desk filter to return articles about the environment
var title = "Environment";
//our api key
var apikey = "kfv7BnPMd5mvBPeGSaKGQdhyRAGGhhWG";
  // queryURL is the url we'll use to query the API - calling Environment articles sorting from newest - NYT intially returns 10 results - we can use pagination for more if we want it
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?&fq=news_desk=" + title + "&sort=newest&api-key=" + apikey;

// Make the AJAX request to the API 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response){
    //console log to ensure response from API
console.log(response);
  });




// ===============================================================================
// LOAD DATA
// We are linking our routes to our data source.
// This data source hold information on friends.
// ===============================================================================

var friendData = require("../data/friends.js");


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function(req, res) {
    res.json(friendData);
  });

    // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a reservation request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/new", function(req, res) {
    
    
      var newFriend = req.body;

      var bestMatches = [];

      var differencesArray = [];


      var newFriendScore = newFriend.scores;


      for (var i = 0; i < friendData.length; i++) {
        var friendDifference = 0;

        for (var j = 0; j < friendData[i].scores.length; j++) {
          friendDifference += Math.abs(parseInt(friendData[i].scores[j]) - parseInt(newFriendScore[j]))
        }
        //collects all the differences
        differencesArray.push(friendDifference);

        }
        // find the minimum difference
        var minDifference;
        for (var i = 0; i < differencesArray.length; i++) {
          if (i === 0) {
            minDifference = differencesArray[i];
          } else if (minDifference > differencesArray[i]) {
            minDifference = differencesArray[i];
          }
        }

        //loop through differencesArray to find how many instances of minimum difference occur and push data to best matches
        for (var i = 0; i < differencesArray.length; i++) {
          if (minDifference === differencesArray[i]) {
            var match = {
              name: friendData[i].name,
              photo: friendData[i].photo,
              difference: minDifference,
            };
           
            bestMatches.push(match);
          }
        }

      

      //console.log(match);

      console.log(bestMatches);
    
      // Add new data to the existing friends data.
      //do this last so don't match with latest user
      friendData.push(newFriend);
      
      //send the match to the modal
      
      res.json(bestMatches);
  });

  // ---------------------------------------------------------------------------

  app.post("/api/clear", function() {
    // Empty out the arrays of data
    friendData = [];
    
    console.log(friendData);
  });
};
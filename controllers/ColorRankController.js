/**
 * Created by Dylan on 2015-06-05.
 */
angular.module('ColorRank',[]).controller('ColorRankCtrl', function($scope) {

  var colorIdx = null;

  $scope.formImage = {
    url: "/BCPI/images/default.bmp"
  };

  $scope.fullColors = [];

  filepicker.setKey("AvKg0zzXeRNquaFMJdqfoz");

  // Calls FilePicker API pick function, to set Profile Picture
  $scope.pickFile = function() {
    filepicker.pick(
      {
        imageDim: [28, 28],
        mimetype: 'image/*',
        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'URL', 'WEBCAM']
      },
      function(Blob){                                       // Blob is the object returned by FilePicker
        console.log("FilePicker Success.");
        console.log("Image URL: " + Blob.url);
        $scope.formImage.url = Blob.url;                    // Sets user profile image url from Blob
        $scope.$apply();                                    // Refreshes visible profile image
      },
      // Outputs error to console if one occurs
      function(FPError){
        console.log("FilePicker Error.");
        console.log(FPError.toString());
      }
    );
  };

  // Creates an array containing the colors and their frequencies
  $scope.getColorsArray = function() {
    console.log("Getting colors array..");
    $scope.fullColors = new Array();
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = $scope.formImage.url;

    ctx.drawImage(img,0,0); // Or at whatever offset you like
    var imgData=ctx.getImageData(0,0,canvas.width,canvas.height);
    //var imgData=img.getImageData(0,0,img.width,img.height);

    //var arrayIndex = 0;

    //var pixel = {color:"255, 255, 255", freq:0};
    //$scope.fullColors[0] = pixel;
    //var pixel = {color:"255, 255, 255", freq:0};
    //$scope.fullColors[1] = pixel;

    console.log("fullColors before count: " + JSON.stringify($scope.fullColors));

    // loop to count and sort colors
    console.log("imgData: " + JSON.stringify(imgData));
    for (var i = 0; i < imgData.data.length; i += 4) {
      //select colors: red, green, blue, and alpha
      r = imgData.data[i];
      g = imgData.data[i+1];
      b = imgData.data[i+2];
      a = imgData.data[i+3]; //not needed

      //create rgb string of the color
      var currentColor = r + ', ' + g + ', ' + b;

      colorIdx = -1;

      //Flag if color exists stop looking & don't add it to the array
      //var flagColorExists = false;

      // Add color to fullColors array if it hasn't been already
      if (!doesColorExist(currentColor)) {
        console.log("Adding " + currentColor + " to array.");
        $scope.fullColors[$scope.fullColors.length] = {
          color: currentColor,
          freq: 1
        };
      } else {
        //console.log("Attempting to add 1 to " + currentColor + " frequency.");
        // add 1 to the frequency if color does exist
        try {
          $scope.fullColors[colorIdx].freq++;
        } catch(err) {
          console.log("ERROR: Could not add 1 to frequency. " + err);
        }
      }

      ////check if color exists- if true then increase frequency
      //for (var j = 0; j < $scope.fullColors.length; j++) {
      //  if ($scope.fullColors[j]) {
      //    console.log("fullColors[" + j + "] exists.");
      //    if ($scope.fullColors[j].color == color && flagColorExists == false) {
      //      $scope.fullColors[j].freq = $scope.fullColors[j].freq + 1;
      //      console.log("fullColors[" + j + "] frequency increased to " + $scope.fullColors[j].freq);
      //      flagColorExists = true;
      //    }
      //  }
      //}

      ////If color exists flag is FALSE then add the color to the array
      //if(!flagColorExists) {
      //  arrayIndex++; // add to the array index
      //  //create nested array of each pixel color and the frequency the color shows up
      //  var pixel = {color:color, freq:1};
      //  $scope.fullColors[arrayIndex] = pixel;
      //}
    }

    //call sort
    $scope.fullColors.sort(sortByFreq);
    console.log("fullColors after sort: " + JSON.stringify($scope.fullColors));

    //sort function (greatest to least)
    function sortByFreq (a, b) {
      if (a['freq'] === b['freq']) {
        return 0;
      }
      else {
        return (a['freq'] < b['freq']) ? 1 : -1;
      }
    };

    // Return true if color has already been found in image
    function doesColorExist (cl) {
      var colorFound = false;
      //console.log("fullColors.length: " + $scope.fullColors.length);
      //if ($scope.fullColors.length < 2)
        //console.log("fullColors: " + JSON.stringify($scope.fullColors));
      if ($scope.fullColors.length > 0) {
        for (var i = 0; i < $scope.fullColors.length; i++) {
          if ($scope.fullColors[i].color == cl) {
            colorIdx = i;
            colorFound = true;
            //console.log("Color " + cl + " found. i is " + i + ". colorIdx is " + colorIdx + ".");
            i = $scope.fullColors.length;
          }
        }
      }
      if (!colorFound)
        console.log("Color " + cl + " not found.");
      return colorFound;
    };


    if ($scope.fullColors[0])
      document.getElementById("colorRank1").style.background = "rgb(" + $scope.fullColors[0].color + ")";
    if ($scope.fullColors[1])
      document.getElementById("colorRank2").style.background = "rgb(" + $scope.fullColors[1].color + ")";
    if ($scope.fullColors[2])
      document.getElementById("colorRank3").style.background = "rgb(" + $scope.fullColors[2].color + ")";
    if ($scope.fullColors[3])
      document.getElementById("colorRank4").style.background = "rgb(" + $scope.fullColors[3].color + ")";
  };

});
/**
 * Created by Dylan on 2015-06-05.
 */
angular.module('ColorRank',[]).controller('ColorRankCtrl', function($scope) {

  $scope.formImage = {
    url: "http://triplecrit.com/wp-content/themes/creativemag/images/default.png"
  };

  $scope.fullColors = [];

  filepicker.setKey("AvKg0zzXeRNquaFMJdqfoz");

  // Calls FilePicker API pick function, to set Profile Picture
  $scope.pickFile = function() {
    filepicker.pick(
      {
        imageDim: [200, 200],
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

  // Returns an array containing the colors and their frequencies
  $scope.getColorsArray = function () {
    var c=document.getElementById('canvas');
    var ctx=c.getContext('2d');
    var imgData=ctx.getImageData(0,0,c.width,c.height);

    var arrayIndex = 0;
    $scope.fullColors = [];

    var pixel = {color:"333, 333, 333", freq:0};
    $scope.fullColors[0] = pixel;
    var pixel = {color:"333, 333, 333", freq:0};
    $scope.fullColors[1] = pixel;

    for (var i = 0; i < imgData.data.length; i += 4) {
      //select colors: red, green, blue, and alpha
      r = imgData.data[i];
      g = imgData.data[i+1];
      b = imgData.data[i+2];
      a = imgData.data[i+3]; //not needed

      //create rgb string of the color
      color = r + ', ' + g + ', ' + b;

      //Flag if color exists stop looking & don't add it to the array
      var flagColorExists = false;

      //check if color exists- if true then increase frequency
      for (var j = 0; j < $scope.fullColors.length; j++) {
        if ($scope.fullColors[j].color == color && flagColorExists == false) {
          $scope.fullColors[j].freq = $scope.fullColors[j].freq + 1;
          flagColorExists = true;
        }
      }

      //If color exists flag is FALSE then add the color to the array
      if(!flagColorExists) {
        arrayIndex++; // add to the array index
        //create nested array of each pixel color and the frequency the color shows up
        var pixel = {color:color, freq:1};
        $scope.fullColors[arrayIndex] = pixel;
      }
    }

    //call sort
    $scope.fullColors.sort(sortByFreq);

    //sort function (greatest to least)
    function sortByFreq(a, b) {
      if (a['freq'] === b['freq']) {
        return 0;
      }
      else {
        return (a['freq'] < b['freq']) ? 1 : -1;
      }
    }

    //return $scope.fullColors;
  }

  //// Coolhoon function
  //$scope.cool = function () {
  //  //Get image and set its source
  //  var img = new Image();
  //  // Allows image src to come from another server (FilePicker)
  //  img.crossOrigin = "Anonymous";
  //  img.src = $scope.formImage.url;
  //
  //  //define array of all the pixel colors
  //  $scope.fullColors = [];
  //
  //  //create canvas to read pixels on the image
  //  var c=document.getElementById('canvas');
  //  var ctx=c.getContext('2d');
  //
  //  ctx.drawImage(img, 0, 0);
  //
  //  var imgData=ctx.getImageData(0,0,c.width,c.height);
  //
  //  var arrayIndex = 0; //because the for loop goes up by 4, the array needs index that counts by 1s
  //
  //  //initialize array with dummy pixels so that the "check if pixel color exists then add to freq"
  //  var pixel = {color:"333, 333, 333", freq:0};
  //  $scope.fullColors[0] = pixel;
  //  var pixel = {color:"333, 333, 333", freq:0};
  //  $scope.fullColors[1] = pixel;
  //
  //  //iterate through each pixel color(r,g,b,a)
  //  for (var i=0;i<imgData.data.length;i+=4) {
  //    //select colors: red, green, blue, and alpha
  //    r = imgData.data[i];
  //    g = imgData.data[i+1];
  //    b = imgData.data[i+2];
  //    a = imgData.data[i+3];
  //
  //    //create rgb string of the color
  //    color = r + ', ' + g + ', ' + b;
  //
  //    //Flag if color exists stop looking & don't add it to the array
  //    var flagColorExists = false;
  //
  //    //check if color exists- if true then increase frequency
  //    for (var j = 0; j < $scope.fullColors.length; j++) {
  //      if ($scope.fullColors[j].color == color && flagColorExists == false) {
  //        $scope.fullColors[j].freq = $scope.fullColors[j].freq + 1;
  //        flagColorExists = true;
  //      }
  //    }
  //
  //    //If color exists flag is FALSE then add the color to the array
  //    if(!flagColorExists) {
  //      arrayIndex++; // add to the array index
  //      //create nested array of each pixel color and the frequency the color shows up
  //      var pixel = {color:color, freq:1};
  //      fullColors[arrayIndex] = pixel;
  //    }
  //
  //  }
  //
  //  //call sort
  //  $scope.fullColors.sort(sortByFreq);
  //
  //  //sort function (greatest to least)
  //  function sortByFreq(a, b) {
  //    if (a['freq'] === b['freq']) {
  //      return 0;
  //    }
  //    else {
  //      return (a['freq'] < b['freq']) ? 1 : -1;
  //    }
  //  }
  //
  //  //testing output
  //  document.write('<p><div style="width:10px;height:10px;border:1px solid black;background:rgb('+fullColors[0].color+');"></div>Most common color: ' + fullColors[0].color + ' with a frequency of: ' + fullColors[0].freq + '</p>');
  //  document.write('<p><div style="width:10px;height:10px;border:1px solid black;background:rgb('+fullColors[1].color+');"></div>Second most: ' + fullColors[1].color + ' with a frequency of: ' +fullColors[1].freq + '</p>');
  //  document.write('<p><div style="width:10px;height:10px;border:1px solid black;background:rgb('+fullColors[2].color+');"></div>Third most: ' + fullColors[2].color + ' with a frequency of: ' +fullColors[2].freq + '</p>');
  //  document.write('<p><div style="width:10px;height:10px;border:1px solid black;background:rgb('+fullColors[3].color+');"></div>Fourth most: ' + fullColors[3].color + ' with a frequency of: ' +fullColors[3].freq + '</p>');
  //
  //  console.log("Full Color Array: " + JSON.stringify($scope.fullColors)); //dumping the full array in the console log
  //}

});

  var config = {
    apiKey: "AIzaSyDHGpBBPU8AHz4TBX0aS6yW9Lo6Btkxwqc",
    authDomain: "traintime-e5b21.firebaseapp.com",
    databaseURL: "https://traintime-e5b21.firebaseio.com",
    projectId: "traintime-e5b21",
    storageBucket: "traintime-e5b21.appspot.com",
    messagingSenderId: "762101973344"
  };

  firebase.initializeApp(config);

var trainData = firebase.database();

$('#add-train-btn').on('click', function() {
    // grab user input
    let trainName = $('#train-name-input').val().trim();
    let destination = $('#destiniation-input').val().trim();
    let firstTrain = $('#first-train-input').val().trim();
    let frequency = $('#frequency-input').val().trim();
console.log(trainName);

    // add user input to train object
    let newTrain = {
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency: frequency,
    }
    console.log(newTrain);
    //upload train to database
    trainData.ref().push(newTrain);

    return false;
});

// add data event
trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {
    //store everything into a variable
    // console.log(childSnapshot.val());
});





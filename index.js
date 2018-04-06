
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
    debugger;
    // grab user input
    let trainName = $('#train-name-input').val().trim();
    let destination = $('#destiniation-input').val().trim();
    let firstTrain = $('#first-train-input').val().trim();
    let frequency = $('#frequency-input').val().trim();

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
    console.log(childSnapshot.val());
    let tName = childSnapshot.val().name;
    let tDestination = childSnapshot.val().destination;
    let tFrequency = childSnapshot.val().frequency;
    let tFirstTrain = childSnapshot.val().firstTrain;

    let trainArr = tFirstTrain.split(':');
    let trainTime = moment().hours(trainArr[0]).minutes(trainArr[1]);
    let maxMoment = moment.max(moment(), trainTime);
    let tMinutes;
    let tArrival;

    // if first train is later than current time, set arrival to the first train time
    if(maxMoment === trainTime) {
        tArrival = trainTime.format("hh:mm A");
        tMinutes = trainTime.diff(moment(), "minutes");

    } else {
        // calculate minutes until arrival using math
        let differenceTimes = moment().diff(trainTime, "minutes");
        let tRemainder = differenceTimes % tFrequency;
        tMinutes = tFirstTrain - tRemainder;
        // calculate arrival time
        tArrival = moment().add(tMinutes, "m").format("mm:hh A");
    }

    $("#train-table > tbody").append('<tr><td>' + tName + '</td><td>' + tDestination + '</td><td>' + tFrequency + '</td><td>' + tArrival + '</td><td>' + tMinutes + '</td></tr>');
});



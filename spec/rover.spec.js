const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  // TEST 7 “constructor sets position and default values for mode and generatorWatts”. Refer to the Rover Class description above for these default values.
  let rover = new Rover(2000);

  it("constructor sets position and default values for mode and generatorWatts", function() {
    expect(rover.position).toEqual(2000);
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  // TEST 8 “response returned by receiveMessage contains the name of the message”

  it("response returned by receiveMessage contains the name of the message", function() {
    let message = new Message(
      "Test message with two commands",[
        new Command("MODE_CHANGE","LOW_POWER"),
        new Command("STATUS_CHECK")
      ]);
    expect(message.name).toEqual('Test message with two commands');
  });

  // TEST 9 “response returned by receiveMessage includes two results if two commands are sent in the message”

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    let message = new Message(
      "Test message with two commands",[
        new Command("MODE_CHANGE","LOW_POWER"),
        new Command("STATUS_CHECK")
      ]);
    expect(message.commands.length).toEqual(2);
  });

  // TEST 10 “responds correctly to the status check command”

  test("responds correctly to the status check command", function(){
    let message = new Message(
      "Status Check Test",[
        new Command("STATUS_CHECK")
      ]);
      let result = rover.receiveMessage(message);
      expect(result.results[0]).toEqual({
        completed: true, 
        roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 2000 }
   });
  });

  //TEST 11 “responds correctly to the mode change command”
  

  test("responds correctly to the mode change command", function(){
    let message = new Message(
      "Status Check Test",[
        new Command("STATUS_CHECK")
      ]);
      let result = rover.receiveMessage(message);
      expect(result.results[0].completed).toBeTruthy();
  });

  //TEST 12 “responds with a false completed value when attempting to move in LOW_POWER mode”

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let message = new Message("Low Power Move",[
      new Command("MODE_CHANGE","LOW_POWER"),
      new Command("MOVE",1500),
      new Command("STATUS_CHECK") 
    ]);
    let result = rover.receiveMessage(message);
    expect(result.results[1].completed).toBeFalsy();
    expect(result.results[2].roverStatus.position).toBe(2000);
  });

  //TEST 13 “responds with the position for the move command”

  test("responds with the position for the move command", function(){
    let message = new Message("Moving Rover",[
      new Command("MODE_CHANGE","NORMAL"),
      new Command("MOVE",5000),
      new Command("STATUS_CHECK")
    ]);
    let result = rover.receiveMessage(message);
    expect(result.results[1].completed).toBeTruthy();
    expect(result.results[2].roverStatus.position).toBe(5000);
  });

});

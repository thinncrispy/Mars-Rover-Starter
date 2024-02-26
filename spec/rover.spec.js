const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  // TEST 7 “constructor sets position and default values for mode and generatorWatts”. Refer to the Rover Class description above for these default values.

  test("constructor sets position and default values for mode and generatorWatts", function(){
    expect(new Rover(1511).mode).toBe('NORMAL');
    expect(new Rover(1511).generatorWatts).toBe(110);
  });

  // TEST 8 “response returned by receiveMessage contains the name of the message”

  test("response returned by receiveMessage contains the name of the message", function(){
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).message).toBe('Test message with two commands');
  });

  // TEST 9 “response returned by receiveMessage includes two results if two commands are sent in the message”

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results.length).toBe(2);
  });

  // TEST 10 “responds correctly to the status check command”

  test("responds correctly to the status check command", function(){
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')])).results[1]).toEqual({
      completed: true, 
      roverStatus: { mode: 'NORMAL', generatorWatts: 110, position: 1511 }
   });
  });

  //TEST 11 “responds correctly to the mode change command”
  

  test("responds correctly to the mode change command", function(){
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results[0].completed).toBe(true);
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')])).results[1].roverStatus.mode).toBe('LOW_POWER');
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')])).results[1].roverStatus.mode).toBe('NORMAL');
  });

  //TEST 12 “responds with a false completed value when attempting to move in LOW_POWER mode”

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 1511), new Command('STATUS_CHECK')])).results[1].completed).toBe(false);
  });

  //TEST 13 “responds with the position for the move command”

  test("responds with the position for the move command", function(){
    expect(new Rover(1511).receiveMessage(new Message('Test message with two commands', [new Command('MODE_CHANGE', 'NORMAL'), new Command('MOVE', 1511), new Command('STATUS_CHECK')])).results[2].roverStatus.position).toBe(1511);
  });




});

const Message = require('./message.js'); // Assuming the file path to Message class
const Command = require('./command.js');


class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }
   receiveMessage(message) {
      this.message = message;
      this.results = [];
      this.message.commands.forEach(element => {
         if(element.commandType === 'MOVE' && this.mode !== 'LOW_POWER'){
            this.position = element.value;
            this.results.push({completed: true});
         } else if(element.commandType === 'MODE_CHANGE') {
            
            this.mode = element.value;
            this.results.push({completed: true,
                           roverStatus: {
                              mode: this.mode
                           }
            });

         } else if(element.commandType === 'STATUS_CHECK'){
            this.results.push({completed: true, 
                               roverStatus: {
                                 mode: this.mode,
                                 generatorWatts: this.generatorWatts,
                                 position: this.position}})
         } else {
            this.results.push({completed: false})
         }
      });
      return {message: this.message.name,
              results: this.results}
}

}
module.exports = Rover;

// let rover = new Rover(100);
// let commands = [
//    new Command('MOVE', 4321),
//    new Command('STATUS_CHECK'),
//    new Command('MODE_CHANGE', 'LOW_POWER'),
//    new Command('MOVE', 3579),
//    new Command('STATUS_CHECK')
// ];
// let message = new Message('TA power', commands);
// let response = rover.receiveMessage(message);

// console.log(rover)
// console.log(response)
// console.log(JSON.stringify(response, null, 2));
class Message {
   constructor(name, commands) {
     this.name = name;
     this.commands = commands;
     if (!name) {
       throw Error("Message name required.");
     }
     if (!Array.isArray(commands)){
      throw Error("Commands must be provided as an array.")
     }
   }
 
 }

module.exports = Message;
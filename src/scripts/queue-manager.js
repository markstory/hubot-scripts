module.exports = function(robot) {
  var queue, show;
  robot.brain.data.queuemanager = robot.brain.data.queuemanager || [];
  queue = robot.brain.data.queuemanager;
  robot.respond(/qadd\s*(\d+)/, function(msg) {
    var ticket;
    ticket = msg.match[1];
    queue.push(ticket);
    msg.send(show());
    return msg.topic(show());
  });
  robot.respond(/qrm/, function(msg) {
    queue.shift();
    msg.send(show());
    return msg.topic(show());
  });
  robot.respond(/qls/, function(msg) {
    return msg.send(show());
  });
  robot.respond(/qnext\s*(\d+)/, function(msg) {
    var index, ticket;
    ticket = msg.match[1];
    index = queue.indexOf(ticket);
    if (index > -1) {
      queue.splice(index, 1);
    }
    queue.unshift(ticket);
    msg.send(show());
    return msg.topic(show());
  });
  robot.respond(/qdelay\s*(\d+)/, function(msg) {
    var index, ticket;
    ticket = msg.match[1];
    index = queue.indexOf(ticket);
    if (index === -1) {
      return msg.send("" + ticket + " not in the queue; did you mean qadd " + ticket + "?");
    }
    queue.splice(index, 1);
    queue.push(ticket);
    msg.send(show());
    return msg.topic(show());
  });
  return show = function() {
    if (queue.length === 0) {
      return 'The queue is empty, well done!';
    }
    return "The queue is: [" + (queue.join(', ')) + "]";
  };
};
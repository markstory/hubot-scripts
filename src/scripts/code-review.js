var __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
module.exports = function(robot) {
  var people;
  robot.brain.data.codereview = robot.brain.data.codereview || [];
  people = robot.brain.data.codereview;
  robot.respond(/haz/i, function(msg) {
    var user;
    user = msg.message.user.id;
    if (__indexOf.call(people, user) >= 0) {
      return msg.send('You are already on my list.');
    } else {
      people.push(user);
      return msg.send('Thanks, you will be part of code review today.');
    }
  });
  robot.respond(/nohaz/i, function(msg) {
    var user;
    user = msg.message.user.id;
    if (__indexOf.call(people, user) >= 0) {
      people.splice(people.indexOf(user), 1);
      return msg.send("You've been removed from today's code review.");
    } else {
      return msg.send("You're not in the list silly.");
    }
  });
  robot.respond(/whohaz/i, function(msg) {
    if (people.length === 0) {
      return msg.send('Nobody needs code review. Get to work!');
    } else {
      return msg.send("Awaiting code review: [" + (people.join(',')) + "]");
    }
  });
  return robot.respond(/pairup/i, function(msg) {
    var loner, num, pair, text, who;
    if (people.length < 2) {
      return msg.send('Need at least two people for code review!');
    }
    who = people;
    people = [];
    who.sort(function() {
      return 0.5 - Math.random();
    });
    text = ['Code Review Pairs', '-----------------'];
    pair = '';
    if (who.length % 2 === 1) {
      loner = who.pop;
      pair += "" + loner + ", ";
    }
    num = who.length;
    while (num -= 2) {
      text.push("" + who[i] + " and " + who[i + 1]);
    }
    return msg.send(text.join('\n'));
  });
};
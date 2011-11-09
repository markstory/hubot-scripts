#
# wall - Post a message in every room the bot knows about.
#

module.exports = (robot) ->

  robot.respond /wall\s+(.*)$/, (msg)  ->
    # Send the message text to every room the bot 
    # knows about.
    robot.adapter.options?.rooms?.forEach (room) ->
      msg.user.room = room
      msg.send msg.match[1]

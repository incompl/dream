dream.begin({

  start: {
    name: "Outdoor Bowling Alley",
    description: "This bowling alley is hidden in a tropical forest. The lanes \
                  are so hilly that no fair game could ever take place here. \
                  Judging by the innumerable empty beer and liquor bottles \
                  scattered about, this inequity is inconsequential.",
    north: "northShore",
    east: "clearing",
    west: "westShore",
    south: "southShore",
    item: {
      name: "a bottle of vodka",
      description: "You could POUND this. Maybe.",
      command: "pound",
      effect: function(game, item) {
        game.respond("You try to drink it, but it's too strong!");
      }
    }
  },
  
  northShore: {
    name: "North Shore",
    description: "The sandy beach of a tropical island. The sea air smells \
                  clean and fresh.",
    south: "start",
    item: {
      name: "some hay",
      description: "You could FEED this to someone.",
      command: "feed",
      effect: function(game, item) {
        if (game.room.npc && game.room.npc.name === "a brown cow") {
          game.respond("You feed " + item.name + " " + " to " + game.room.npc.name);
          game.removeItem(item);
          game.respond(game.room.npc.name + " moos with surprise and lays a giant egg!");
          game.addItemInRoom({
            name: "a giant egg",
            description: "You could COOK this.",
            command: "cook",
            effect: function(game, item) {
              if (game.room.item && game.room.item.name === "a giant frying pan") {
                game.respond("You cook up a giant omelet.");
                game.removeItem(item);
                game.givePlayerItem({
                  name: "a giant omelet",
                  description: "This would be good for BRUNCH.",
                  command: "brunch",
                  effect: function(game, item) {
                    if (game.playerHasItem("a bloody mary")) {
                      game.removeItem(item);
                      game.removeItem("a bloody mary");
                      game.state("full", true);
                      game.respond("You enjoy a delicious brunch.");
                    }
                    else {
                      game.respond("You need a bloody mary for brunch.");
                    }
                  }
                });
              }
              else {
                game.respond("Nothing to cook it with around here.");
              }
            }
          });
        }
        else {
          game.respond("No one takes you up on your offer.");
        }
      }
    }
  },
  
  clearing: {
    name: "Tropical Forest Clearing",
    description: "This clearing is well-grazed by the local bovine resident. \
                  The chattering and chirping of local fauna are occasionally \
                  drowned out by a hearty moo.",
    west: "start",
    east: "eastShore",
    npc: {
      name: "a brown cow",
      dialog: "Mooo...."
    }
  },
  
  westShore: {
    name: "West Shore",
    description: "A lazy sun dips into the sea's distant horizon.  The violet water \
                  shimmers with glints of warm orange sky. The sand is coarse and \
                  rich with colorful shells and smooth stones.",
    east: "start",
    enter: "hut",
    hint: "There is a grass hut here."
  },
  
  hut: {
    name: "Grass Hut",
    description: "This humble dwelling has only crude handmade wooden furnishings, \
                  each scratched and worn with years of use. The dry grass roof \
                  leaks shafts of orange sun, highlighting motes of wandering dust.",
    leave: "westShore",
    west: "wardrobe",
    item: {
      name: "a giant frying pan",
      heavy: "This cast iron frying pan weighs more than you do."
    }
  },
  
  wardrobe: {
    name: "Inside a Wooden Wardrobe",
    description: "Oddly large for the hut it's within, this wardrobe has been \
                  pillaged, leaving only a few scattered sundries of no account.",
    east: "hut",
    item: {
      name: "a highball glass",
      description: "You could MIX a drink in this",
      command: "mix",
      effect: function(game, item) {
        if (game.playerHasItem("a bottle of vodka") &&
            game.playerHasItem("a rotten tomato")) {
          game.removeItem("a bottle of vodka");
          game.removeItem("a rotten tomato");
          game.removeItem(item);
          game.givePlayerItem({
            name: "a bloody mary",
            description: "You could POUND this.",
            command: "pound",
            effect: function(game, item) {
              game.respond("This would be a waste without some breakfast.");
            }
          });
          game.respond("You mix up a bloody mary");
        }
        else {
          game.respond("You don't have the necessary ingredients.");
        }
      }
    }
  },
  
  southShore: {
    name: "South Shore",
    description: "Overgrown ruffage creeps right up to and into the ocean. \
                  The smell of overripe fruit wafts up with every footstep.",
    north: "start",
    item: {
      name: "a rotten tomato",
      description: "You could NOM this. Maybe.",
      command: "nom",
      effect: function(game, item) {
        game.respond("It's too rotten. You'd rather barf than eat this.");
      }
    }
  },
  
  eastShore: {
    name: "The Dock",
    description: "A rickety wooden dock meanders into the sea. Hundreds of \
                  thriving barnacles and shellfish cling to its legs. The \
                  sound of waves sliding up the shore occasionally breaks the \
                  relative silence.",
    west: "clearing",
    item: {
      name: "a wooden boat",
      heavy: "This boat isn't going anywhere without you in it.",
      command: "sail",
      effect: function(game, item) {
        if (game.state("full")) {
          game.respond("Ta ta!");
          game.goto("ocean");
        }
        else {
          game.respond("You're too hungry to make the voyage.");
        }
      }
    },
    hint: "Maybe you'd like to SAIL away?"
  },
  
  ocean:{
    name: "Ocean of Victory",
    description: "You made it! But now what? I don't know. Look at my blog? <a href='http://incompl.com'>http://incompl.com</a>"
  }

});
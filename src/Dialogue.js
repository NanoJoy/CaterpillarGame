function DialogueController(name, trees, deciders) {
        this.name = name;
        this.trees = trees;
        this.deciders = deciders;
        this.currentDialogue = 0;
        this.gameObject = null;
        this.firstTime = true;
    }
    DialogueController.prototype.nextIsForced = function (game) {
        var nextDialogue = null;        
        if (this.firstTime) {
            return true;
        }
        if (this.deciders[this.currentDialogue + 1] !== null) {
            nextDialogue = this.deciders[this.currentDialogue + 1].apply(null, [game, this.gameObject, this.currentDialogue]);
        }
        return nextDialogue !== null && this.trees[nextDialogue].force;
    }
    DialogueController.prototype.getNextDialogue = function (game) {
        if (this.firstTime) {
            this.firstTime = false;
            this.currentDialogue = this.deciders[0].apply(null, [game, this.gameObject, this.currentDialogue]);
            return this.trees[this.currentDialogue];
        }
        if (this.deciders[this.currentDialogue + 1] !== null) {
            this.currentDialogue = this.deciders[this.currentDialogue + 1].apply(null, [game, this.gameObject, this.currentDialogue]);
        }
        return this.trees[this.currentDialogue];
    };
    DialogueController.prototype.reset = function () {
        this.firstTime = true;
        this.currentDialogue = 0;
    };
    DialogueController.prototype.setTo = function (num) {
        this.firstTime = false;
        this.currentDialogue = num;
    };
    DialogueController.prototype.callOnFinish = function (game, selectedOption) {
        this.trees[this.currentDialogue].onFinish.apply(null, [game, this.gameObject, selectedOption]);
    };

function DialogueTree(prompt, options, force) {
    this.prompt = prompt;
    this.options = options;
    this.force = force;
    this.onFinish = function (game, character, selectedOption) {};
}

var DialogueOption = (function () {
    function DialogueOption(text, tree) {
        this.text = text;
        this.tree = tree;
    }
    return DialogueOption;
})();

var DIALOGUE_DONE = new DialogueTree("DONE", []);

var DEFAULT_FIRST_DECIDER = function (game, owner, currentDialogue) {
    return 0;
};

var responseTrees = {
    jumpExplainer: {
        directions: {
            prompt: "I don't know where your milkweed patch is, but before you go anywhere you're gonna have to get out of Boingbug Town. Boingbug town was built inside this tree 50 years ago.",
            options: [
                {
                    text: "That's fascinating! How does your economy work?",
                    prompt: "directions"
                }
            ]
        },
        prompt: "Welcome to the Boingbug Town visitor center. Is there anything I can help you with?",
        options: [
            {
                text: "Can you give me directions? I need to get back to my milkweed patch.",
                prompt: "directions"
            },
            {
                text: "What are those purple bugs behind you?",
                prompt: "flutterpod"
            },
            {
                text: "What do you have at this visitor center?",
                prompt: "visitorCenter"
            }
        ]
    },
    deer: {
        prompt: "If you don't have the ability to hide yet, I would go touch this leaf.",
        options: [
            {
                text: "Ok",
                tree: "DONE"
            }
        ]
    },
    orb: {
        prompt: "Because you have killed so many stinkbugs, I will offer you this orb that has been in my family for generations",
        options: [
            {
                text: "Ok",
                tree: "DONE"
            }
        ]
    },
    rock: {
        prompt: "Will you lift the rock?",
        options: [
            {
                text: "Yes",
                tree: "DONE"
            },
            {
                text: "No",
                tree: "DONE"
            }
        ]
    },
    firstBoingbug: {
        firstTime: {
            prompt: "You should know that you can get around town by touching leaves. " + "Nobody really knows how it works, but it does. " + "Most of us are pretty friendly. You can talk to any of us again by pressing B.",
            options: [
                {
                    text: "Ok. Bye",
                    tree: "DONE"
                }
            ]
        },
        questionWrong: {
            prompt: "Everybody who has even walked past here knows about the bravery of our first mayor, The World's Fattest Snail. " + "Let me give you some pointers since you are clearly new.",
            options: [
                {
                    text: "Sure",
                    tree: "firstTime"
                },
                {
                    text: "I hate you. Go away.",
                    tree: {
                        prompt: "Ok, whatever you say...",
                        options: [
                            {
                                text: "Yeah, that's right. Walk away",
                                tree: "DONE"
                            }
                        ]
                    }
                }
            ]
        },
        prompt: "Hey, you! Is this your first time around here?",
        options: [
            {
                text: "Yeah",
                tree: "firstTime"
            },
            {
                text: "No",
                tree: {
                    prompt: "It's not? You don't look like anyone I've see before. I don't believe you. " + "Hmm...  You should know this then: Who was the first mayor of BoingbugTown?",
                    options: [
                        {
                            text: "Henrik the Jolly Bouncer",
                            tree: "questionWrong"
                        },
                        {
                            text: "The World's Fattest Slug",
                            tree: {
                                prompt: "You're right! I guess I was wrong to question you. Sorry about that. Welp, have fun I guess.",
                                options: [
                                    {
                                        text: "Ok. Bye",
                                        tree: "DONE"
                                    }
                                ]
                            }
                        },
                        {
                            text: "Buzzy the Centipede",
                            tree: "questionWrong"
                        }
                    ]
                }
            }
        ]
    },
    blockExplainer: {
        prompt: "Ramming your face into blocks is one way to move them. But you can also drag them wherever you please if you press DOWN.",
        options: [
            {
                text: "Cool",
                tree: "DONE"
            }
        ]
    },
    stinkbugs: {
        explainStinkbug: {
            prompt: "Stinkbugs are these gross things that are appearing everywhere somehow. It's probably about two months ago I first saw one. They really are a nuisance.",
            options: [
                {
                    text: "What do they do?",
                    tree: {
                        prompt: "I heard one stinkbug ate a whole family of slugs.",
                        options: [
                            {
                                text: "That's terrible! I'll see what I can do to help.",
                                tree: "DONE"
                            },
                            {
                                text: "Well, what do boingbugs eat?",
                                tree: {
                                    prompt: "Lettuce",
                                    options: [
                                        {
                                            text: "Ok",
                                            tree: "DONE"
                                        }
                                    ]
                                }
                            }
                        ]
                    }
                },
                {
                    text: "Where did they come from?",
                    tree: {
                        prompt: "The first to see one was a worm from the east. They seem built for a colder climate.",
                        options: [
                            {
                                text: "I wonder why they came here.",
                                tree: "DONE"
                            },
                            {
                                text: "I'm built for a warmer climate.",
                                tree: "DONE"
                            }
                        ]
                    }
                }
            ]
        },
        prompt: "Whoa, you're weird looking. Were you sent here to get rid of these stinkbugs for us?",
        options: [
            {
                text: "Uh, sure",
                tree: {
                    prompt: "You must be brave. I never want to see a stinkbug again.",
                    options: [
                        {
                            text: "You bet I am, kiddo. Now get back to your homework or whatever",
                            tree: "DONE"
                        },
                        {
                            text: "What is a stinkbug anyway?",
                            tree: "explainStinkbug"
                        }
                    ]
                }
            },
            {
                text: "Nope",
                tree: {
                    prompt: "So what are you doing here then?",
                    options: [
                        {
                            text: "Looking for my friend. He's big and green",
                            tree: {
                                prompt: "I think my mom saw someone like that a few days ago.",
                                options: [
                                    {
                                        text: "Thanks for the info",
                                        tree: "DONE"
                                    }
                                ]
                            }
                        },
                        {
                            text: "Trying to find new ways to increase my power",
                            tree: {
                                prompt: "I'm not sure what you mean.",
                                options: [
                                    {
                                        text: "I have to go",
                                        tree: "DONE"
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                text: "What's a stinkbug?",
                tree: "explainStinkbug"
            }
        ]
    },
    spazzy: {
        prompt: "I was going to bring this rock home to give to my wife for her birthday, but I got it stuck in this corner. Do you think you could get it out?",
        options: [
            {
                text: "I'll do it, but only because I need to use it",
                tree: {
                    prompt: "Hey, whatever man. Just don't run off with it.",
                    options: [
                        {
                            text: "No promises",
                            tree: "DONE"
                        },
                        {
                            text: "I won't",
                            tree: "DONE"
                        }
                    ]
                }
            },
            {
                text: "Yes, but you must promise me you will always remain faithful to her",
                tree: {
                    prompt: "But boingbugs find a new mate each year.",
                    options: [
                        {
                            text: "Relax, I was just kidding.",
                            tree: "DONE"
                        },
                        {
                            text: "That does not sound like a fulfilling life",
                            tree: "DONE"
                        }
                    ]
                }
            },
            {
                text: "No, because I don't remember how to do that",
                tree: {
                    prompt: "I would try to go against it and get DOWN and drag it out. I know I'm too weak but you might be able to do it.",
                    options: [
                        {
                            text: "Thanks. Hey, looks like this thing could be used as a weapon.",
                            tree: "DONE"
                        },
                        {
                            text: "Thanks, I hope this rock compels your wife to exude several thousand maggots more"
                        }
                    ]
                }
            }
        ]
    },
    saves: {
        prompt: "I love planting these flowers around. They way the droop is so graceful and humble. You can rest under one if you want by pressing S",
        options: [
            {
                text: "I'll try that",
                tree: "DONE"
            }
        ]
    },
    killStinkbug: {
        prompt: "Watch out, there's a stinkbug wandering around over there. Do you think you could kill it? Also, did you know you can press K to kill yourself?",
        options: [
            {
                text: "How could I do that?",
                tree: {
                    prompt: "Do you mean how can one physically kill a stinkbug or how could you bring yourself to kill another creature?",
                    options: [
                        {
                            text: "The first thing you said",
                            tree: {
                                prompt: "Smashing their faces or backs in with something heavy usually works.",
                                options: [
                                    {
                                        text: "Perfect",
                                        tree: "DONE"
                                    }
                                ]
                            }
                        },
                        {
                            text: "The second thing you said",
                            tree: {
                                prompt: "I saw a stinkbug snacking on the brain of a young worm. Is that enough?",
                                options: [
                                    {
                                        text: "Yeah, I guess I'll do it",
                                        tree: "DONE"
                                    },
                                    {
                                        text: "Why don't you do it then?",
                                        tree: {
                                            prompt: "During the mating season I have to continuously shake up and down to attract a mate or I have no chance of reproducing",
                                            options: [
                                                {
                                                    text: "I'm not sure I believe you",
                                                    tree: "DONE"
                                                },
                                                {
                                                    text: "Reproducing is overrated",
                                                    tree: "DONE"
                                                },
                                                {
                                                    text: "To each his own",
                                                    tree: "DONE"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    },
    hide: {
        prompt: 'HIDE:\nPress H to hide from enemies for 3 seconds. They can still hurt you. After use, there is a 10 second wait to use again',
        options: [
            {
                text: "Ok",
                tree: 'DONE'
            }
        ]
    },
    shoot: {
        prompt: 'SHOOT:\nYou feel pretty weird after all this action. It turns out you can shoot pellets by pressing Q. In order to do this you need to find the pellets. They look like little flowers.',
        options: [
            {
                text: "Ok",
                tree: "DONE"
            }
        ]
    },
    behindDoor: {
        prompt: "Hey, do you want to hear a secret?",
        options: [
            {
                text: "Yes, but expect nothing in return",
                tree: {
                    prompt: "Relax, I'm going to tell you anyway. The only reason I'm telling you is because you might have a key. If you don't then whatever. If you go behind this door there is something very strange and exciting.",
                    options: [
                        {
                            text: "That's not really a secret",
                            tree: "DONE"
                        },
                        {
                            text: "I don't have a key",
                            tree: {
                                prompt: "Well I guess you were kind of mean to me so I don't care",
                                options: [
                                    {
                                        text: "Ok",
                                        tree: "DONE"
                                    },
                                    {
                                        text: "Ok...  ...",
                                        tree: {
                                            prompt: "I'm sorry, are you going to say something else?",
                                            options: [
                                                {
                                                    text: "No",
                                                    tree: "DONE"
                                                },
                                                {
                                                    text: "I want to tell you how I got here",
                                                    tree: "backStory"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                text: "Yes, and I'll tell you a secret too",
                tree: {
                    prompt: "Okay, whatever you want. I've been seeing you doing good work around here. There's something behind this door that I think might help you. Or it might make you blow up. Or do nothing. What's your secret?",
                    options: [
                        {
                            text: "I want to tell you how I got here",
                            tree: "backStory"
                        },
                        {
                            text: "That's not much of a secret.",
                            tree: {
                                prompt: "Then your secret must not be either. I don't want to hear it.",
                                options: [
                                    {
                                        text: "Good",
                                        tree: "DONE"
                                    },
                                    {
                                        text: "Too bad",
                                        tree: "backStory"
                                    }
                                ]
                            }
                        }
                    ]
                }
            },
            {
                text: "No, I hate keeping secrets because I'm bad at it",
                tree: {
                    prompt: "At least you are wise enough to know that. Say, what are you doing around here anyway?",
                    options: [
                        {
                            text: "Well...",
                            tree: "backStory"
                        },
                        {
                            text: "Doesn't matter",
                            tree: "DONE"
                        }
                    ]
                }
            },
            {
                text: "No, because I don't know you",
                tree: {
                    prompt: "Yes you do. I was present when you were born.",
                    options: [
                        {
                            text: "Really?",
                            tree: {
                                prompt: "Yes. I am the boingbug ambassador to butterflies. But that's a story for another day.",
                                options: [
                                    {
                                        text: "Ok",
                                        tree: "DONE"
                                    }
                                ]
                            }
                        },
                        {
                            text: "No you weren't",
                            tree: {
                                prompt: "Whatever you say.",
                                options: [
                                    {
                                        text: "Yup",
                                        tree: "DONE"
                                    }
                                ]
                            }
                        }
                    ]
                }
            }
        ]
    },
    floating: {
        prompt: "I've been floating here for over a year. What the fuck is going on?",
        options: [
            {
                text: "I don't know",
                tree: "DONE"
            }
        ]
    },
    givingUp: {
        prompt: "Sometimes I just feel like giving up.",
        options: [
            {
                text: "Then do it",
                tree: "DONE"
            }
        ]
    },
    placeholder: {
        prompt: "placeholder",
        options: [
            {
                text: "Ok",
                tree: "DONE"
            }
        ]
    },
    backStory: {
        prompt: "Let me guess. You were happily chomping down on a leaf one day when a robin grabbed you around the next and starting flying away with the intent to feed you to her children.",
        options: [
            {
                text: "That's true! But what happened next?",
                tree: {
                    prompt: "An eagle killed the robin and you fell to the ground around here",
                    options: [
                        {
                            text: "I'm embarrassed that you must have seen",
                            tree: "DONE"
                        },
                        {
                            text: "I'm happy you know what I've been through",
                            tree: "DONE"
                        }
                    ]
                }
            },
            {
                text: "Yes, then an eagle killed the robin and I fell to the ground around here.",
                tree: {
                    prompt: "I know. Well, you better get back to the milkweeds in time to turn into a butterfly.",
                    options: [
                        {
                            text: "You're right",
                            tree: "DONE"
                        },
                        {
                            text: "I'm not ready to grow up yet",
                            tree: "DONE"
                        }
                    ]
                }
            }
        ]
    }
};

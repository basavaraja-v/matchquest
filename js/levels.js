const levels = [
    {
        level: 1,
        animals: [
            { name: 'cat', image: 'cat.png' },
            { name: 'dog', image: 'dog.png' },
            { name: 'rabbit', image: 'rabbit.png' },
            { name: 'fish', image: 'fish.png' }
        ],
        names: ['cat', 'dog', 'rabbit', 'fish']
    },
    {
        level: 2,
        animals: [
            { name: 'mouse', image: 'mouse.png' },
            { name: 'elephant', image: 'elephant.png' },
            { name: 'snake', image: 'snake.png' },
            { name: 'turtle', image: 'turtle.png' }
        ],
        names: ['mouse', 'elephant', 'snake', 'turtle']
    },
    {
        level: 3,
        animals: [
            { name: 'horse', image: 'horse.png' },
            { name: 'lion', image: 'lion.png' },
            { name: 'penguin', image: 'penguin.png' },
            { name: 'zebra', image: 'zebra.png' }
        ],
        names: ['horse', 'lion', 'penguin', 'zebra']
    },
    {
        level: 4,
        animals: [
            { name: 'bear', image: 'bear.png' },
            { name: 'monkey', image: 'monkey.png' },
            { name: 'gorilla', image: 'gorilla.png' },
            { name: 'koala', image: 'koala.png' }
        ],
        names: ['bear', 'monkey', 'gorilla', 'koala']
    },
    {
        level: 5,
        animals: [
            { name: 'panda', image: 'panda.png' },
            { name: 'tiger', image: 'tiger.png' },
            { name: 'cheetah', image: 'cheetah.png' },
            { name: 'leopard', image: 'leopard.png' }
        ],
        names: ['panda', 'tiger', 'cheetah', 'leopard']
    },
   
    {
        level: 6,
        animals: [
            { name: 'owl', image: 'owl.png' },
            { name: 'bat', image: 'bat.png' },
            { name: 'cockatoo', image: 'cockatoo.png' },
            { name: 'parrot', image: 'parrot.png' }
        ],
        names: ['owl', 'bat', 'cockatoo', 'parrot']
    },
    {
        level: 7,
        animals: [
            { name: 'hamster', image: 'hamster.png' },
            { name: 'guinea pig', image: 'guinea-pig.png' },
            { name: 'chinchilla', image: 'chinchilla.png' },
            { name: 'gerbil', image: 'gerbil.png' }
        ],
        names: ['hamster', 'guinea pig', 'chinchilla', 'gerbil']
    },
    {
        level: 8,
        animals: [
            { name: 'crocodile', image: 'crocodile.png' },
            { name: 'hippopotamus', image: 'hippopotamus.png' },
            { name: 'rhinoceros', image: 'rhinoceros.png' },
            { name: 'giraffe', image: 'giraffe.png' }
        ],
        names: ['crocodile', 'hippopotamus', 'rhinoceros', 'giraffe']
    },
    {
        level: 9,
        animals: [
            { name: 'antelope', image: 'antelope.png' },
            { name: 'buffalo', image: 'buffalo.png' },
            { name: 'camel', image: 'camel.png' },
            { name: 'donkey', image: 'donkey.png' }
        ],
        names: ['antelope', 'buffalo', 'camel', 'donkey']
    },
    {
        level: 10,
        animals: [
            { name: 'goat', image: 'goat.png' },
            { name: 'sheep', image: 'sheep.png' },
            { name: 'cow', image: 'cow.png' },
            { name: 'pig', image: 'pig.png' }
        ],
        names: ['goat', 'sheep', 'cow', 'pig']
    },
];

function getLevelData(level) {
    return levels.find(l => l.level === level);
}

function shuffleArray(array) {
    // Function to shuffle an array (Fisher-Yates shuffle algorithm)
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


/*
 {
        level: 6,
        animals: [
            { name: 'fox', image: 'fox.png' },
            { name: 'wolf', image: 'wolf.png' },
            { name: 'deer', image: 'deer.png' },
            { name: 'rabbit', image: 'rabbit.png' }
        ],
        names: ['fox', 'wolf', 'deer', 'rabbit']
    },
    {
        level: 9,
        animals: [
            { name: 'rabbit', image: 'rabbit.png' },
            { name: 'frog', image: 'frog.png' },
            { name: 'snail', image: 'snail.png' },
            { name: 'turtle', image: 'turtle.png' }
        ],
        names: ['rabbit', 'frog', 'snail', 'turtle']
    },
     {
        level: 13,
        animals: [
            { name: 'chicken', image: 'chicken.png' },
            { name: 'duck', image: 'duck.png' },
            { name: 'turkey', image: 'turkey.png' },
            { name: 'rooster', image: 'rooster.png' }
        ],
        names: ['chicken', 'duck', 'turkey', 'rooster']
    },
    {
        level: 14,
        animals: [
            { name: 'eagle', image: 'eagle.png' },
            { name: 'hawk', image: 'hawk.png' },
            { name: 'falcon', image: 'falcon.png' },
            { name: 'vulture', image: 'vulture.png' }
        ],
        names: ['eagle', 'hawk', 'falcon', 'vulture']
    },
    {
        level: 15,
        animals: [
            { name: 'pelican', image: 'pelican.png' },
            { name: 'stork', image: 'stork.png' },
            { name: 'swan', image: 'swan.png' },
            { name: 'albatross', image: 'albatross.png' }
        ],
        names: ['pelican', 'stork', 'swan', 'albatross']
    },
    {
        level: 16,
        animals: [
            { name: 'woodpecker', image: 'woodpecker.png' },
            { name: 'hummingbird', image: 'hummingbird.png' },
            { name: 'kingfisher', image: 'kingfisher.png' },
            { name: 'puffin', image: 'puffin.png' }
        ],
        names: ['woodpecker', 'hummingbird', 'kingfisher', 'puffin']
    },
    {
        level: 17,
        animals: [
            { name: 'blue jay', image: 'blue-jay.png' },
            { name: 'cardinal', image: 'cardinal.png' },
            { name: 'goldfinch', image: 'goldfinch.png' },
            { name: 'robin', image: 'robin.png' }
        ],
        names: ['blue jay', 'cardinal', 'goldfinch', 'robin']
    },
    {
        level: 18,
        animals: [
            { name: 'parakeet', image: 'parakeet.png' },
            { name: 'macaw', image: 'macaw.png' },
            { name: 'cockatiel', image: 'cockatiel.png' },
            { name: 'budgerigar', image: 'budgerigar.png' }
        ],
        names: ['parakeet', 'macaw', 'cockatiel', 'budgerigar']
    },
    {
        level: 19,
        animals: [
            { name: 'iguana', image: 'iguana.png' },
            { name: 'chameleon', image: 'chameleon.png' },
            { name: 'gecko', image: 'gecko.png' },
            { name: 'anole', image: 'anole.png' }
        ],
        names: ['iguana', 'chameleon', 'gecko', 'anole']
    },
    {
        level: 20,
        animals: [
            { name: 'salamander', image: 'salamander.png' },
            { name: 'newt', image: 'newt.png' },
            { name: 'axolotl', image: 'axolotl.png' },
            { name: 'caecilian', image: 'caecilian.png' }
        ],
        names: ['salamander', 'newt', 'axolotl', 'caecilian']
    },
    {
        level: 21,
        animals: [
            { name: 'starfish', image: 'starfish.png' },
            { name: 'sea urchin', image: 'sea-urchin.png' },
            { name: 'jellyfish', image: 'jellyfish.png' },
            { name: 'octopus', image: 'octopus.png' }
        ],
        names: ['starfish', 'sea urchin', 'jellyfish', 'octopus']
    },
    {
        level: 22,
        animals: [
            { name: 'squid', image: 'squid.png' },
            { name: 'cuttlefish', image: 'cuttlefish.png' },
            { name: 'nautilus', image: 'nautilus.png' },
            { name: 'shark', image: 'shark.png' }
        ],
        names: ['squid', 'cuttlefish', 'nautilus', 'shark']
    },
    {
        level: 23,
        animals: [
            { name: 'whale', image: 'whale.png' },
            { name: 'dolphin', image: 'dolphin.png' },
            { name: 'seal', image: 'seal.png' },
            { name: 'walrus', image: 'walrus.png' }
        ],
        names: ['whale', 'dolphin', 'seal', 'walrus']
    },
    {
        level: 24,
        animals: [
            { name: 'penguin', image: 'penguin.png' },
            { name: 'polar bear', image: 'polar-bear.png' },
            { name: 'seahorse', image: 'seahorse.png' },
            { name: 'manatee', image: 'manatee.png' }
        ],
        names: ['penguin', 'polar bear', 'seahorse', 'manatee']
    },
    {
        level: 25,
        animals: [
            { name: 'swordfish', image: 'swordfish.png' },
            { name: 'anglerfish', image: 'anglerfish.png' },
            { name: 'lionfish', image: 'lionfish.png' },
            { name: 'moray eel', image: 'moray-eel.png' }
        ],
        names: ['swordfish', 'anglerfish', 'lionfish', 'moray eel']
    }
*/
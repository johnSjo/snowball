
import PubSub from './PubSub';

import mainGame from './mainGame';
import player from './player';

const pubsub = PubSub.create();

Promise.all([
    mainGame.init(pubsub),
    player.init(pubsub),
])
    .then(() => {
        pubsub.publish('gameReady');
    });

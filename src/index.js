
import PubSub from './PubSub';

import mainGame from './mainGame';

const pubsub = PubSub.create();

Promise.all([
    mainGame.init(pubsub),
])
    .then(() => {
        pubsub.publish('gameReady');
    });

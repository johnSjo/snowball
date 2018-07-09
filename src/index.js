
import PubSub from './PubSub';

import hud from './hud';
import mainGame from './mainGame';
import player from './player';
import splashScreen from './splashScreen';

const pubsub = PubSub.create();

Promise.all([
    hud.init(pubsub),
    mainGame.init(pubsub),
    player.init(pubsub),
    splashScreen.init(pubsub)
])
    .then(() => {
        pubsub.publish('gameReady');
    });

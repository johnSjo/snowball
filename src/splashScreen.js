
export default {
    init (pubsub) {
        // create a 'start game' splash and a 'game over' splash

        // TEMP
        pubsub.publish('startGame');
        
        pubsub.subscribeOnce('gameReady', () => {
            // show 'start game' splash and game canvas
        });

        pubsub.subscribe('allLivesSpent', (score) => {
            // show 'game over' splash
        });
    }
};
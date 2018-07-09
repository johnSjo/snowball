
export default {
    init (pubsub) {

        // create the hud

        pubsub.subscribe('livesLeft', (lives) => {
            // update lives
        });

        pubsub.publish('scoreUpdate', (score) => {
            // update the score
        });

        pubsub.subscribe('startGame', () => {
            // reset hud
        });
    }
};
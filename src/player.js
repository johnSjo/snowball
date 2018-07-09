
const LIVES = 3;

const SCORING_SPEED = 1000;

export default {
    init (pubsub) {

        let lives;
        const score = {
            current: 0,
            top: 0,
            counter: null
        };

        pubsub.subscribe('treeHit', () => {
            console.log('you hit a tree');

            // update lives left
            pubsub.publish('livesLeft', lives--);

            if (lives < 1) {
                // stop the score counter
                clearInterval(score.counter);

                // if dead trigger game over splash
                pubsub.publish('allLivesSpent', score);
            }
        });

        pubsub.subscribe('startGame', () => {
            // reset 'lives'
            lives = LIVES;

            score.current = 0;

            pubsub.publish('scoreUpdate', score);
            pubsub.publish('livesLeft', lives);

            // start counter
            score.counter = setInterval(() => {
                score.current++;
                score.top = Math.max(score.current, score.top);

                pubsub.publish('scoreUpdate', score);
            }, SCORING_SPEED);

        });
    }
};
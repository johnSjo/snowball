
export default {
    init (pubsub) {
        const startGameButton = document.getElementById('startGame');
        const container = document.getElementById('splash');
        const gameOver = document.getElementById('gameOver');
        const newHighScore = document.getElementById('newHighScore');
        const splashScoreBar = document.getElementById('splashScoreBar');
        const bar = document.getElementById('splashBar');

        startGameButton.onpointerup = () => {
            pubsub.publish('startGame');
            container.style.display = 'none';
        };

        pubsub.subscribeOnce('gameReady', () => {
            // show 'start game' splash and game canvas
            const gameContainer = document.getElementById('game');

            container.style.display = 'flex';
            gameContainer.style.display = 'flex';
        });

        pubsub.subscribe('allLivesSpent', (score) => {
            container.style.display = 'flex';
            gameOver.style.display = 'flex';

            if (score.current < score.top) {
                splashScoreBar.style.display = 'block';
                bar.style.width = `${(score.current / score.top) * 100}%`;
            } else {
                newHighScore.style.display = 'block';
                newHighScore.innerHTML = `New record! ${score.top}m travelled`;
            }
        });

        pubsub.subscribe('startGame', () => {
            splashScoreBar.style.display = 'none';
            newHighScore.style.display = 'none';
        });
    }
};

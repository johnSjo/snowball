
function createSplash (pubsub) {
    const startGameButton = document.getElementById('startGame');
    const container = document.getElementById('splash');

    startGameButton.onpointerup = () => {
        pubsub.publish('startGame');
        container.style.display = 'none';
    };

    return {
        container,
        startGameButton,
        gameOver: document.getElementById('gameOver'),
        newHighScore: document.getElementById('newHighScore'),
        splashScoreBar: document.getElementById('splashScoreBar'),
        bar: document.getElementById('splashBar')
    };
}

export default {
    init (pubsub) {
        // create the splash
        const splash = createSplash(pubsub);

        pubsub.subscribeOnce('gameReady', () => {
            // show 'start game' splash and game canvas
            const gameContainer = document.getElementById('game');

            splash.container.style.display = 'flex';
            gameContainer.style.display = 'flex';
        });

        pubsub.subscribe('allLivesSpent', (score) => {
            splash.container.style.display = 'flex';
            splash.gameOver.style.display = 'flex';

            if (score.current < score.top) {
                splash.splashScoreBar.style.display = 'block';
                splash.bar.style.width = `${(score.current / score.top) * 100}%`;
            } else {
                splash.newHighScore.style.display = 'block';
                splash.newHighScore.innerHTML = `New record! ${score.top}m travelled`;
            }
        });

        pubsub.subscribe('startGame', () => {
            splash.splashScoreBar.style.display = 'none';
            splash.newHighScore.style.display = 'none';
        });
    }
};
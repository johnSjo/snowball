
export default {
    init (pubsub) {

        // create the hud
        const container = document.getElementById('hud');
        const livesLeft = document.getElementById('livesLeft');
        const scoreBar = document.getElementById('hudScoreBar');
        const bar = document.getElementById('hudBar');
        const scoreNr = document.getElementById('scoreNr');
        const topScoreNr = document.getElementById('topScoreNr');
        let topScoreReached = false;

        pubsub.subscribe('livesLeft', (lives) => {
            // update lives
            livesLeft.innerHTML = lives;
        });

        pubsub.subscribe('scoreUpdate', (score) => {
            // update the score
            topScoreNr.innerHTML = score.top;
            
            if (!topScoreReached && score.current < score.top) {
                // progress the bar
                bar.style.width = `${(score.current / score.top) * 100}%`;
                
            } else {
                topScoreReached = true;
                scoreNr.innerHTML = score.current;
                scoreBar.style.display = 'none';
                scoreNr.style.display = 'block';
            }

        });

        pubsub.subscribe('startGame', () => {
            container.style.display = 'flex';

            // reset hud
            bar.style.width = '100%';
            scoreBar.style.display = 'block';
            scoreNr.style.display = 'none';
            topScoreReached = false;
        });

        pubsub.subscribe('allLivesSpent', () => {
            container.style.display = 'none';
        });

    }
};
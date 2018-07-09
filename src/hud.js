
function createHud () {
    // for now -> just get the dom elements

    return {
        container: document.getElementById('hud'),
        livesLeft: document.getElementById('livesLeft'),
        scoreBar: document.getElementById('hudScoreBar'),
        bar: document.getElementById('hudBar'),
        scoreNr: document.getElementById('scoreNr'),
        topScoreNr: document.getElementById('topScoreNr')
    };
}

export default {
    init (pubsub) {

        // create the hud
        const hud = createHud();
        let topScoreReached = false;

        pubsub.subscribe('livesLeft', (lives) => {
            // update lives
            hud.livesLeft.innerHTML = lives;
        });

        pubsub.subscribe('scoreUpdate', (score) => {
            // update the score
            hud.topScoreNr.innerHTML = score.top;
            
            if (!topScoreReached && score.current < score.top) {
                // progress the bar
                hud.bar.style.width = `${(score.current / score.top) * 100}%`;
                console.log(hud.bar.style.width);
                
            } else {
                topScoreReached = true;
                hud.scoreNr.innerHTML = score.current;
                hud.scoreBar.style.display = 'none';
                hud.scoreNr.style.display = 'block';
            }

        });

        pubsub.subscribe('startGame', () => {
            hud.container.style.display = 'flex';

            // reset hud
            hud.bar.style.width = '100%';
            hud.scoreBar.style.display = 'block';
            hud.scoreNr.style.display = 'none';
            topScoreReached = false;
        });

        pubsub.subscribe('allLivesSpent', () => {
            hud.container.style.display = 'none';
        });

    }
};
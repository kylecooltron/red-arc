<template>
    <div id="game-info-flexbox">
        <img src="@/assets/game-1.png" alt="Game Screenshot">
        <p>
            Some stuff about this game. This is a test game. It is not real! Yippee, so much fun to play a game that 
            isn't even real. Right? Yeah, good ol' gaming. That's what we're about.
        </p>
    </div>
</template>

<style>
#game-info-flexbox {
    display: flex;
    flex-direction: row;
}
#game-info-flexbox img {
  border: 10px solid rgb(34, 22, 19);
  border-radius: 10px;
  min-width: 100px;
  min-height: 100px;
}
#game-info-flexbox p {
  margin-left: 3em;
  max-width: 500px;
}

@media only screen and (max-width: 600px) {
    #game-info-flexbox p {
        margin-left: 1.2em;
    }
    #game-info-flexbox img {
        object-fit:contain;
        margin-bottom: auto;
    }
}

</style>
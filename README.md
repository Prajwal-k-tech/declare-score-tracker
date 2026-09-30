# Declare Score Tracker

A small browser app for recording rounds of Declare with 2 to 12 players. The lowest cumulative score wins.

## Use

Open `index.html` in a browser. Choose the number of players, enter whole-number scores for each round, and select **Next Round** to add another round. **Declare Winner** includes every displayed round, including the current one. Blank scores count as zero; ties are shown together. You can correct a previous score and declare the results again.

## Scope

HTML, CSS and vanilla JavaScript with no build step or server. Scores remain in memory for the current page session. Refreshing the page or restarting the game clears them. The app tracks scores entered by players; it does not enforce card-game rules or calculate penalties.

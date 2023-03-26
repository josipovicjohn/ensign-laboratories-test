# Higher or Lower

This project contains the 'Higher or Lower' game built with React.

# How to Play

At the start of each game, a deck of playing cards is shuffled and
the player is presented with a playing card. 

The player must guess if the value of the next card is higher 
or lower than the presented card by clicking either the `HIGHER` or `LOWER` button.

The value of the cards range from 2-14 - Picture cards above 10 are assigned the following values:
- JACK: 11
- QUEEN: 12
- KING: 13
- ACE: 14

If the player's guess is correct, they earn 1 point. Otherwise, they lose 1 point.

The player wins once they reach 5 points.

If the player's score reaches -5 points or if they are unable to obtain 5 points before
all the cards in the deck have been served, then they lose. 

The player can reset the game anytime by clicking the `RESET` button.

# Assumptions
- Only 1 deck is used in the game.
- There are no joker cards.
- The suit of the playing card is irrelevant.
- If a player makes `HIGHER` guess for the value of the next card and the value of the next card is
  equal to the value of the current card, they earn a point.
- If the player does not have a score of at least 5 when all cards in the deck have been served, they lose.

# Available Scripts

In the project directory, you can run:

## `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

Use this script to start the game.

## `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

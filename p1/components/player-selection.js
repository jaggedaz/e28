Vue.component('player-selection', {
  props: ['playerSelection'],
  template: `
    <div id="selection">
      <h2>Make your selection:</h2>
      <div>
        <img
          src="./assets/rock.png" alt="rock"
          @click="$emit('select', 'rock')"
          :class="{ selected: playerSelection === 'rock' }" />
        <img
          src="./assets/paper.png" alt="paper"
          @click="$emit('select', 'paper')"
          :class="{ selected: playerSelection === 'paper' }" />
        <img
          src="./assets/scissors.png" alt="scissors"
          @click="$emit('select', 'scissors')"
          :class="{ selected: playerSelection === 'scissors' }" />
      </div>
      <button @click="$emit('go')" :disabled="!playerSelection">GO!</button>
    </div>
  `
});

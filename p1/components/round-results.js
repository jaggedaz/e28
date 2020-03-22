Vue.component('round-results', {
  props: ['playerSelection', 'computerSelection', 'result'],
  template: `
    <div id="result" :class="{ 'result-won': result === 'won', 'result-lost': result === 'lost' }">
      <p>You chose: <strong>{{ playerSelection }}</strong></p>
      <p>The computer chose: <strong>{{ computerSelection }}</strong></p>
      <h1>You {{ result }}!</h1>
      <button @click="$emit('play-again')">Play Again</button>
    </div>
  `
});

Vue.component('game-stats', {
  props: ['playerScore', 'computerScore', 'history'],
  template: `
    <div id="stats">
      <div>
        <div>
          <h3>Score</h3>
          <p>Player: <strong>{{ playerScore }}</strong></p>
          <p>Computer: <strong>{{ computerScore }}</strong></p>
        </div>
        <div>
          <h3>History</h3>
          <ul>
            <li v-for="(result, index) in history" :key="index">
              Round {{ index + 1 }}: <strong>{{ result }}</strong>
            </li>
          </ul>
        </div>
      </div>
      <button @click="$emit('reset-stats')">Reset Stats</button>
    </div>
  `
});

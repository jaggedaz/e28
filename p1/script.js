let app = new Vue({
  el: '#app',
  data: {
    playerSelection: '',
    computerSelection: '',
    result: '',
    playerScore: 0,
    computerScore: 0,
    history: []
  },
  methods: {
    handlePlayerSelection: function (selection) {
      this.playerSelection = this.playerSelection === selection ? '' : selection;
    },
    handleGo: function () {
      const options = ['rock', 'paper', 'scissors'];
      this.computerSelection = options[Math.floor(Math.random() * options.length)];

      if (this.playerSelection === this.computerSelection) {
        this.result = 'tied'
      } else {
        if (this.playerSelection === 'rock') {
          this.result = this.computerSelection === 'scissors' ? 'won' : 'lost';
        } else if (this.playerSelection === 'paper') {
          this.result = this.computerSelection === 'rock' ? 'won' : 'lost';
        } else if (this.playerSelection === 'scissors') {
          this.result = this.computerSelection === 'paper' ? 'won' : 'lost';
        }
      }

      if (this.result === 'won') {
        this.playerScore++;
        this.history.push('Player won');
      } else if (this.result === 'lost') {
        this.computerScore++;
        this.history.push('Computer won');
      } else {
        this.history.push('Tied');
      }
    },
    handlePlayAgain: function () {
      this.playerSelection = '';
      this.computerSelection = '';
      this.result = '';
    },
    handleResetStats: function () {
      this.playerScore = 0;
      this.computerScore = 0;
      this.history = [];
    }
  }
});

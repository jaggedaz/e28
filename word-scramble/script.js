let app = new Vue({
  el: '#app',
  data: {
    words: [
      ['apple', 'Sometimes red, sometimes delicious'],
      ['washington', 'Rushmore\'s left edge'],
      ['pumpkin', 'Halloween\'s favorite fruit'],
      ['football', 'Play with your hands or feet, depending on your location']
    ],
    playerName: '',
    isPlayerNameSubmitted: false,
    selectedWordIndex: undefined,
    guess: '',
    isCorrectAnswer: undefined
  },
  methods: {
    startResetGame: function() {
      if (this.playerName) {
        let randomPickIndex;
        do {
          randomPickIndex = Math.floor(Math.random() * this.words.length);
        }
        while (randomPickIndex === this.selectedWordIndex);
        this.selectedWordIndex = randomPickIndex;
  
        this.isPlayerNameSubmitted = true;
        this.isCorrectAnswer = undefined;
        this.guess = '';
      }
    },
    submitGuess: function() {
      if (this.guess) {
        this.isCorrectAnswer = this.guess === this.words[this.selectedWordIndex][0];
      }
    }
  },
  computed: {
    mysteryWord: function() {
      const shuffle = function(word) {
        let letters = word.split('');
        
        for (var i = letters.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = letters[i];
            letters[i] = letters[j];
            letters[j] = tmp;
        }

        return letters.join('');
      };

      return shuffle(this.words[this.selectedWordIndex][0]);
    }
  }
});

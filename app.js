new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      // deal damage to monsterHealth from playerHealth
      // generate random num between 1-10
      this.monsterHealth -= damage;
      // add log entry
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster for ' + damage
      });
      // check if we won
      // if we did, stop executing the rest of this function
      if (this.checkWin()) {
        return;
      }
      // receive damage from monsterHealth to playerHealth
      this.monsterAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.monsterHealth -= damage;
      // add log entry
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
      this.playerHealth += 10;
    } else {
      this.playerHealth = 100;
    }
    // add log entry
    this.turns.unshift({
      isPlayer: true,
      text: 'Player heals 10pts'
    });
      this.monsterAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    monsterAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      // add log entry
      this.turns.unshift({
        isPlayer: false,
        text: 'Monster hits Player for ' + damage
      });
            this.checkWin();
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.monsterHealth <= 0) {
        this.monsterHealth = 0;
        if (confirm('You win! New Game?')) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true; // stop executing the rest of the function (monster cant damage us back)
      } else if (this.playerHealth <= 0) {
          this.playerHealth = 0;
          if (confirm('You lost! New Game?')) {
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
          return true;
      }
      return false;
    }
  }
});

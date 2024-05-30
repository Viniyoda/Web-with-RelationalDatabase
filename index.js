const { createApp } = Vue;
const { debounce } = ('lodash');
createApp({
    data() {
        return {
            heroi: {vida: 100, pocao: 3},
            vilao: {vida: 100, pocao: 3},
            consoleH: "",
            consoleV: "",
            usuarioId: 0
        }
    },
    setup() {
        var defenderH = false;
        var defenderV = false;
    },
    methods: {
        atacar(isHeroi) {
            if (isHeroi) {
                console.log("Herói atacou");
                this.acaoVilao();
                if (defenderV == false) {
                    this.vilao.vida -= 10;
                }
                else {
                }
                this.consoleH = "Herói atacou"
            } 
            else {
                console.log("Vilão atacou");
                if (defenderH == false) {
                    this.heroi.vida -= 20;
                }
                else {
                }
                this.consoleV = "Vilão atacou"
            }
            this.defenderReset();
        },
        async atualizarVidaNoBD() {
            console.log("entramos no atualizarVidaNoBD");
            try {
                const response = await fetch('/atualizarVida', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        vidaHeroi: this.heroi.vida,
                        vidaVilao: this.vilao.vida,
                        consoleHeroi: this.consoleH,
                        consoleVilao: this.consoleV,
                        userID: this.usuarioId  // Certifique-se de que `this.usuarioId` está definido no Vue.js
                    })
                });
            } catch (error) {
                console.log('Erro ao atualizar a vida no banco de dados:', error);
            }
        },
        async atualizarVidaERedirecionar() {
            await this.atualizarVidaNoBD();
        },
        defender(isHeroi) {
            if (isHeroi) {
                defenderH = true;
                this.consoleH = "Herói usou defesa";
                this.acaoVilao();
            }
            else {
                this.consoleV = "Vilão usou defesa";
                defenderV = true;
            }
        },
        usarPocao(isHeroi) {
            if (isHeroi) {
                if (this.heroi.pocao > 0) {
                    this.heroi.pocao -= 1;
                    this.heroi.vida += 15;
                    if (this.heroi.vida >= 100) {
                        this.heroi.vida = 100;
                    }
                    this.consoleH = "Herói usou poção | " + this.heroi.pocao;
                }
                else {
                    this.consoleH = "Suas poções acabaram"
                }
                this.acaoVilao();
            }
            else {
                console.log("Vilão usou poção");
                if (this.vilao.pocao > 0) {
                    this.vilao.pocao -= 1;
                    this.vilao.vida += 15;
                    if (this.vilao.vida >= 100) {
                        this.vilao.vida = 100;
                    }
                    this.consoleV = "Vilão usou poção | " + this.vilao.pocao;
                }
                else {
                    this.consoleV = "Poções do vilão acabaram"
                }
            }
            this.defenderReset();
        },
        especial(isHeroi) {
            let numCerto = Math.floor(Math.random() * 7);
            let numAtaque = Math.floor(Math.random() * 7);
            if (isHeroi) {
                this.acaoVilao();
                if (numAtaque == numCerto) {
                    this.consoleH = "Herói acertou o especial"
                    this.vilao.vida -= 20;
                } else { this.consoleH = "Herói errou o especial" }
            } else {
                if (numAtaque == numCerto) {
                    this.consoleV = "Vilão acertou o especial"
                    this.heroi.vida -= 25;
                } else { this.consoleV = "Vilão errou o especial" }
            }
            this.defenderReset();
        },
        acaoVilao() {
            const acoes = [
                'atacar', 'defender',
                'usarPocao', 'especial'];
            const acaoAleatoria = 
            acoes[Math.floor(Math.random() * acoes.length)];
            this[acaoAleatoria](false);
        },
        defenderReset(){
            defenderH = false;
            defenderV = false;
        }
    }
}).mount(app);
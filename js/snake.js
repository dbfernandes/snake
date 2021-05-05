(function () {

    const TAM = 40;
    const FPS = 5;
    let board;
    let snake;
    
    function init() {
        board = new Board();
        snake = new Snake();
        window.setInterval(run, 1000/FPS);
    }

    window.addEventListener("keydown", function(e) {
        switch(e.key) {            
            case "ArrowUp":
                snake.mudarDirecao(0);
                break;
            case "ArrowRight":
                snake.mudarDirecao(1);
                break;
            case "ArrowDown":
                snake.mudarDirecao(2);
                break;              
            case "ArrowLeft":
                snake.mudarDirecao(3);
                break;                  
        }
    });

    class Board {
        constructor() {
            this.element = document.createElement("table");
            this.element.setAttribute('id','board');
            this.cor = "#EEEEEE";
            for (let i = 0; i < TAM; i++) {
                let row = document.createElement("tr");
                for (let j = 0; j < TAM; j++) {
                    let campo = document.createElement("td");
                    row.appendChild(campo);
                }
                this.element.appendChild(row);
            }
            document.body.prepend(this.element);
        }
    }

    class Snake {
        constructor() {
            this.corpo = [[4,5],[4,6],[4,7]];
            this.cor = "#111111";
            this.direcao = 1; // 0:pracima; 1:pradireita; 2:prabaixo; 3:praesquerda
            this.corpo.forEach(campo => document.querySelector(`#board tr:nth-child(${campo[0]}) td:nth-child(${campo[1]})`).style.backgroundColor = this.cor);
        }

        andar() {
            let head = this.corpo[this.corpo.length-1];
            let add;
            switch(this.direcao) {
                case 0:
                    add = [head[0]-1,head[1]];
                   break;
                case 1:
                    add = [head[0],head[1]+1];
                    break;
                case 2:
                    add = [head[0]+1,head[1]];
                    break;  
                case 3:
                    add = [head[0],head[1]-1];
                    break;                                                            
            }
            this.corpo.push(add);
            document.querySelector(`#board tr:nth-child(${add[0]}) td:nth-child(${add[1]})`).style.backgroundColor = this.cor;
            let rem = this.corpo.shift();
            document.querySelector(`#board tr:nth-child(${rem[0]}) td:nth-child(${rem[1]})`).style.backgroundColor = board.cor;
        }

        mudarDirecao(direcao) {
            this.direcao = direcao;
        }
    }

    function run () {
        snake.andar();
    }

    init();

})();




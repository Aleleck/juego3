class Juego extends Phaser.Scene {
    constructor() {
        super({ key: 'Juego' });
    }

    preload() {
        this.load.setPath('./assets');
        this.load.video('vid1', 'vid1.mp4');
        this.load.video('vid2', 'vid2.mp4');
        this.load.video('vid3', 'vid3.mp4');
        this.load.video('vid4', 'vid4.mp4');
        this.load.image('primera', 'inicioj.png');
        this.load.image('termo', 'termo.webp');
        this.load.image('fondo', 'fondo.png');
        this.load.image('boton', 'boton.png');
        this.load.image('solido', 'solido.png');
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0).setScale(0.6);
        this.add.image(450, 450, 'primera').setScale(0.3);
        this.add.image(770, 500, 'termo').setScale(0.3);
        this.add.image(300, 300, 'solido').setScale(1);
        
        const barraRoja = this.add.graphics();
        const vid1 = this.add.video(450, 450, 'vid1').setScale(0.3);
        const vid2 = this.add.video(450, 450, 'vid2').setScale(0.3);
        const vid3 = this.add.video(450, 450, 'vid3').setScale(0.3);
        const vid4 = this.add.video(450, 450, 'vid4').setScale(0.3);

        barraRoja.fillStyle(0xff0000, 1).fillRect(765, 555, 10, 10);
        const playButton = this.add.image(770, 400, 'boton');
        playButton.setInteractive();

        let numClicks = 0; // Contador de clics

        playButton.on('pointerdown', function () {
            if (numClicks < 4) { // Limita el crecimiento máximo a 4 clics
                numClicks++;

                // Ajusta la altura de la barra según el número de clics
                const barHeight = 10 + numClicks * 28; // Ajusta el valor según tus necesidades

                // Limpia la barra antes de redibujar
                barraRoja.clear();
                barraRoja.fillStyle(0xff0000, 1).fillRect(765, 555 - barHeight, 10, barHeight);

                // Inicia el video correspondiente basado en el número de clics
                if (numClicks === 1) {
                    vid1.play(true);
                } else if (numClicks === 2) {
                    vid2.play(true);
                } else if (numClicks === 3) {
                    vid3.play(true);
                } else if (numClicks === 4) {
                    vid4.play(true);
                }
            }
        });
        
    }

    update(time, delta) {

    }
}

export default Juego;

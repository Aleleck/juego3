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
        this.load.image('particle_yellow', 'particula.png');
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0).setScale(0.6);
        this.add.image(450, 450, 'primera').setScale(0.3);
        this.add.image(770, 500, 'termo').setScale(0.3);
        this.add.image(300, 300, 'solido').setScale(1);
        this.physics.world.setBounds(500, 150, 100, 100);

        const barraRoja = this.add.graphics();
        const vid1 = this.add.video(450, 450, 'vid1').setScale(0.3);
        const vid2 = this.add.video(450, 450, 'vid2').setScale(0.3);
        const vid3 = this.add.video(450, 450, 'vid3').setScale(0.3);
        const vid4 = this.add.video(450, 450, 'vid4').setScale(0.3);

        barraRoja.fillStyle(0xff0000, 1).fillRect(765, 555, 10, 10);
        const playButton = this.add.image(770, 400, 'boton');
        playButton.setInteractive();

        const particles = this.physics.add.group({
            key: 'particle_yellow',
            frameQuantity: 500,
            collideWorldBounds: true,
            bounceX: 0.8,
            bounceY: 0.8,
        });

        this.physics.add.collider(particles, particles);

        particles.children.iterate((particle) => {
            particle.setPosition(
                Phaser.Math.Between(300, 500),
                Phaser.Math.Between(200, 400)
            );
            particle.setScale(0.3);
            particle.body.allowGravity = false;
            particle.setVelocity(Phaser.Math.Between(-10, 1), Phaser.Math.Between(-10, 1)); // Valores más bajos
        });

        const actualizarVelocidadParticulas = () => {
            const velocidadParticulas = Phaser.Math.Linear(50, 300, longitudBarra / longitudMaxima);
            particles.setVelocityX(velocidadParticulas);
            particles.setVelocityY(velocidadParticulas);
        };

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
                    for (let i = 0; i < 200; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }
                } else if (numClicks === 2) {
                    vid2.play(true);
                    for (let i = 0; i < 200; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }
                    
                } else if (numClicks === 3) {
                    vid3.play(true);
                    for (let i = 0; i < 200; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }                 
                } else if (numClicks === 4) {
                    vid4.play(true);
                    for (let i = 0; i < 200; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }
                }
            }
        });

        this.physics.world.setBoundsCollision(true, true, true, true);



    }

    update(time, delta) {

    }
}

export default Juego;

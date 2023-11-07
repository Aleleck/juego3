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
        this.load.image('fond', 'fond.webp');
        this.load.image('boton', 'boton.png');
        this.load.image('deco', 'deco.webp');
        this.load.image('lupa', 'lupa.png');
        this.load.image('robot', 'robot.webp');
        this.load.image('liquido', 'Liquido.png');
        this.load.image('particle_yellow', 'particula.png');
    }

    create() {
        this.add.image(0, 0, 'fondo').setOrigin(0, 0).setScale(0.6);
        this.add.image(450, 450, 'primera').setScale(0.3);
        this.add.image(200, 130, 'liquido').setScale(0.5);
        this.add.image(750, 500, 'termo').setScale(0.3).setDepth(2);
        this.add.image(100, 500, 'deco').setScale(1);
        this.add.image(400, 300, 'fond').setScale(1.45, 1.75).setDepth(2);
        const robot = this.add.image(200, 320, 'robot').setScale(0.4);
        const lupa = this.add.image(500, 300, 'lupa').setScale(0.7); // Crea la capa y define su posición
        this.physics.world.setBounds(520, 200, 90, 90);

        const barraRoja = this.add.graphics();
        
        const vid1 = this.add.video(450, 450, 'vid1').setScale(0.3);
        const vid2 = this.add.video(450, 450, 'vid2').setScale(0.3);
        const vid3 = this.add.video(450, 450, 'vid3').setScale(0.3);
        const vid4 = this.add.video(450, 450, 'vid4').setScale(0.3);

        barraRoja.fillStyle(0xff0000, 1).fillRect(745, 555, 10, 10).setDepth(2);
        const playButton = this.add.image(750, 390, 'boton').setDepth(2);
        playButton.setInteractive();

        const particles = this.physics.add.group({
            key: 'particle_yellow',
            frameQuantity: 300,
            collideWorldBounds: true,
            bounceX: 0.94,
            bounceY: 0.94,
        });

        this.physics.add.collider(particles, particles);

        particles.children.iterate((particle) => {
            particle.setPosition(
                Phaser.Math.Between(300, 500),
                Phaser.Math.Between(200, 400)
            );
            particle.setScale(0.2);
            particle.body.allowGravity = false;
            particle.setVelocity(Phaser.Math.Between(-20, 20), Phaser.Math.Between(-20, 20)); // Valores más bajos
        });

        let numClicks = 0; // Contador de clics

        playButton.on('pointerdown', function () {
            if (numClicks < 4) { // Limita el crecimiento máximo a 4 clics
                numClicks++;

                // Ajusta la altura de la barra según el número de clics
                const barHeight = 10 + numClicks * 28; // Ajusta el valor según tus necesidades

                // Limpia la barra antes de redibujar
                barraRoja.clear();
                barraRoja.fillStyle(0xff0000, 1).fillRect(745, 555 - barHeight, 10, barHeight);

                // Inicia el video correspondiente basado en el número de clics
                if (numClicks === 1) {
                    vid1.play(true).setDepth(1);
                    lupa.setDepth(2);
                    robot.setDepth(2);
                    for (let i = 0; i < 200; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }
                }  else if (numClicks === 2) {
                    vid1.setVisible(false);
                    vid2.play(true);
                    //lupa.setDepth(2);
                    for (let i = 0; i < 200; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }
                    
                } else if (numClicks === 3) {
                    vid2.setVisible(false);
                    vid3.play(true);
                    
                    for (let i = 0; i < 50; i++) {
                        const particle = particles.getChildren()[i];
                        if (particle) {
                            particle.destroy();
                        }
                    }                 
                } else if (numClicks === 4) {
                    vid3.setVisible(false);
                    vid4.play(true);
                    for (let i = 0; i < 40; i++) {
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

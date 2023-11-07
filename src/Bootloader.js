class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader');
    }

    preload() {
        this.load.setPath('./assets');

        // Carga las imágenes
        this.load.image('presentacion1', 'img1.png');
        this.load.image('presentacion2', 'img2.png');
        this.load.image('siguiente', 'siguiente.png');
    }

    create() {
        // Muestra la primera imagen
        const image = this.add.image(400, 300, 'presentacion1');
        image.setDisplaySize(800, 600);

        // Agrega un botón para avanzar a la siguiente imagen
        const button = this.add.image(700, 500, 'siguiente').setScale(0.2);
        button.setInteractive();

        // Agrega un botón para retroceder a la imagen anterior
        const button2 = this.add.image(550, 500, 'siguiente').setScale(0.2).setRotation(Phaser.Math.DegToRad(-180));
        button2.setInteractive().setVisible(false);

        // Configura eventos de clic para los botones
        button.on('pointerdown', () => {
            if (image.texture.key === 'presentacion2') {
                // Si estamos en 'presentacion2', cambia a la escena 'OtraEscena'
                this.scene.start('Juego');
            } else {
                // Si no estamos en 'presentacion2', cambia a la siguiente imagen
                image.setTexture('presentacion2');
                button2.setVisible(true);
            }
        });

        button2.on('pointerdown', () => {
            image.setTexture('presentacion1');
            button2.setVisible(false)
        });
    }
}

export default Bootloader;

import Juego from './Juego.js';
import Bootloader from './Bootloader.js';

const config = {
    title: "elementos",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 800,
        height: 600,
    },
    backgroundColor: "#ffffff",
    pixelArt: true,
    physics: {
        default: "arcade",
        "arcade": {
            gravity: {
                y: 500
            }
        }
    },
    scene: [Bootloader, Juego]
};

new Phaser.Game(config);
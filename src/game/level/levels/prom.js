import * as PIXI from 'pixi.js'
import colliderContainerFromSvg from '../utils/colliderContainerFromSvg';

import { Thing } from '../../items'
import { Person } from '../../sprites'

export default class {
    constructor(levelManager) {
        this.levelManager = levelManager;
        this.mapScale = 3;

        this.player = {
            x: 200,
            y: 125,
        }

        // const floorResource = new PIXI.resources.SVGResource(require("@/assets/map/hospital/hospital-floor.svg"), { scale: this.mapScale });
        // const floorTexture = PIXI.Texture.from(floorResource);
        // this.floor = PIXI.Sprite.from(floorTexture);

        // const wallResource = new PIXI.resources.SVGResource(require("@/assets/map/hospital/hospital-walls.svg"), { scale: this.mapScale });
        // const wallTexture = PIXI.Texture.from(wallResource);
        // this.walls = PIXI.Sprite.from(wallTexture);

        // const itemsResource = new PIXI.resources.SVGResource(require("@/assets/map/hospital/hospital-items.svg"), { scale: this.mapScale });
        // const itemsTexture = PIXI.Texture.from(itemsResource);
        // this.itemSpirte = PIXI.Sprite.from(itemsTexture);

        this.background = PIXI.Sprite.from(PIXI.Texture.WHITE);
        this.background.anchor.set(0.5)
        this.background.width = 5000;
        this.background.height = 5000;
        this.background.tint = 0xEAE5E1;

        this.wallColliders = colliderContainerFromSvg(require("!!raw-loader!@/assets/map/hospital/hospital-colliders.svg").default, this.mapScale);

        this.gridSize = 9 * this.mapScale;


        // Main Containers
        this.bottom = new PIXI.Container();
        this.top = new PIXI.Container();

        // Sub containers
        this.itemsContainer = new PIXI.Container();
        this.charactersContainer = new PIXI.Container();

        this.items = [];
        this.characters = [];

        this.bottom.addChild(this.background);
        // this.bottom.addChild(this.floor);
        // this.bottom.addChild(this.itemSpirte);
        // this.bottom.addChild(this.itemsContainer);
        // this.bottom.addChild(this.charactersContainer);
        // this.top.addChild(this.walls);
        // this.top.addChild(this.wallColliders);

        // this.addItems();
        // this.addCharacters();
        this.addDialog();

    }

    addItems() {
        const item = new Thing({ x: 25, y: 42, gridSize: this.gridSize })
        this.items.push(item);
        this.itemsContainer.addChild(item.sprite);
    }

    addCharacters() {
        const person = new Person({ x: 30, y: 45, gridSize: this.gridSize })

        person.interact = () => {
            store.commit("addDialogue", { name: 'Bob', message: "Hi!  I'm Bob, the purple square!" })
        }

        this.characters.push(person);
        this.charactersContainer.addChild(person.sprite);
    }

    addDialog() {
        this.levelManager.store.commit("addDialogue", [
            {
                name: 'Principal Nut',
                message: `Welcome to Prom Everybody`
            },

            {
                name: 'Grandpa Wal',
                message: "I'm so proud of you ${player}!  That is a very nice girlfrield you have!"
            },
            {
                name: '${player}',
                message: `Thank you Gramps`
            },
            {
                name: 'THE END',
                message: ``
            },
            {
                action: () => this.generateEndingMessage()
            }
        ])


    }

    generateEndingMessage() {
        return this.levelManager.store.commit("addDialogue", [{
            name: 'THE END',
            message: ``
        },
        {
            action: () => this.generateEndingMessage()
        }])
    }


}
import { StationManager } from './manager.js';

export class MapInstance {
    constructor() {
        this.manager = new StationManager();
        this.map = L.map('map').setView([42.356428, -71.078908], 14.5);
    }
}
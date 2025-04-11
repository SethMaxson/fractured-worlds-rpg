import { RpgShape } from "@rpgjs/server";

export module Utils {
    export function isShapeObjectPlayerRadius(shape: RpgShape) {
        return shape.name == "player-interact-shape";
    }
}
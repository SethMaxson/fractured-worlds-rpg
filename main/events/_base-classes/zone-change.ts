import { RpgEvent, EventData, RpgPlayer, Move } from '@rpgjs/server'
import { Direction, MoveTo, PositionXY_OptionalZ } from '@rpgjs/types';

export default class ZoneChangeEvent extends RpgEvent {
    async teleportPlayer(player: RpgPlayer, destination: PositionXY_OptionalZ, directionAfter?: Direction, arrivalWalkDistance?: number) {
        if (!player.canMove) {
            return;
        }

        const destinationMapScale = {
            x: player.getCurrentMap()?.tileWidth || 32,
            y: player.getCurrentMap()?.tileHeight || 32
        };
        // player.setVariable('CHANGING_ZONE', true);
        player.canMove = false;
        // await player.moveRoutes([ Move.tileRight(1) ]);
        player.teleport({ x: destination.x * destinationMapScale.x, y: destination.y * destinationMapScale.y });

        if (directionAfter) {
            // Do a fun little transition animation
            const dist = arrivalWalkDistance || 1;
            const modX = (directionAfter == Direction.Left ? -1
                : directionAfter == Direction.Right ? 1 : 0) * dist;
            const modY = (directionAfter == Direction.Up ? -1
                : directionAfter == Direction.Down ? 1 : 0) * dist;
            
            // Failsafe in case the complete or stuck callbacks don't work.
            window.setTimeout(() => {
                player.stopMoveTo();
                player.canMove = true;
            }, 100);

            // player.moveTo(
            //     { 
            //         x: (destination.x + modX) * destinationMapScale,
            //         y: (destination.y + modY) * destinationMapScale
            //     },
            //     {
            //         onComplete: () => {
            //             player.canMove = true;
            //         },
            //         onStuck: () => {
            //             player.canMove = true;
            //         },
            //     }
            // );
            
            player.moveTo({ 
                    x: (destination.x + modX) * destinationMapScale.x,
                    y: (destination.y + modY) * destinationMapScale.y
                }).subscribe({
                    complete: () => {
                        player.canMove = true;
                    }
                });
        }
        else {
            // Just teleport the player and move on
            player.canMove = true;
        }

        // player.setVariable('CHANGING_ZONE', false);
    }
} 
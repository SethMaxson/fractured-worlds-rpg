import { R as RpgGui, S as Spritesheet, A as Animation$1, D as Direction, P as Presets, _ as _export_sfc, o as openBlock, c as createElementBlock, t as toDisplayString, a as RpgModule, b as RpgMap, M as MapData, d as Skill, C as Class, e as Actor, f as Presets$1, g as Control, h as RpgEvent, i as Move, E as EventData, j as Components, k as State, l as _rpgjs_plugin_emotion_bubbles, m as _rpgjs_title_screen, n as _rpgjs_save, p as _rpgjs_mobile_gui, q as _rpgjs_default_gui, r as _rpgjs_gamepad, s as entryPoint } from "./vendor-36fb8c2e.js";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity)
      fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy)
      fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous")
      fetchOpts.credentials = "omit";
    else
      fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const globalConfigClient = { "shortName": "Fractured Worlds", "description": "The JRPG styled companion to the Fractured Worlds campaign.", "themeColor": "#9900ff", "canvas": { "antialias": false }, "name": "Fractured Worlds RPG", "emotionBubble": {}, "gamepad": {} };
const globalConfigServer = { "startMap": "somewhere-district-1", "start": { "map": "somewhere-district-1", "graphic": "tero-2", "hitbox": [16, 16] }, "compilerOptions": { "build": { "pwaEnabled": true, "outputDir": "dist" } }, "vite": { "server": { "port": 62318 } }, "modulesRoot": "", "autostart": true, "express": { "port": 62318 }, "name": "Fractured Worlds RPG" };
const sprite = {
  onInit(sprite2) {
    sprite2.eventMode = "static";
    if (sprite2.data && sprite2.data.type == "event")
      ;
  }
};
const sceneMap = {
  onAfterLoading() {
    RpgGui.display("npc-tooltip");
  }
};
var __defProp$w = Object.defineProperty;
var __getOwnPropDesc$w = Object.getOwnPropertyDescriptor;
var __decorateClass$w = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$w(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$w(target, key, result);
  return result;
};
const AncientCrystalSpritesheetPreset = () => {
  const stand = (framesWidth, speed = 5) => {
    const array = [];
    for (let i = 0; i < framesWidth; i++) {
      array.push({
        time: i * speed,
        frameX: i,
        frameY: 0
      });
    }
    return array;
  };
  return {
    anchor: [0, 0.5],
    pivot: [0, 0.8],
    rectWidth: 64,
    rectHeight: 120,
    scale: [1 / 2],
    spriteRealSize: {
      width: 64,
      height: 64
    },
    framesWidth: 7,
    framesHeight: 1,
    textures: {
      [Animation$1.Stand]: {
        offset: {
          x: 0,
          y: 0
        },
        animations: () => [stand(7, 5)]
      }
    }
  };
};
let AncientCrystal = class {
};
AncientCrystal = __decorateClass$w([Spritesheet({
  ...AncientCrystalSpritesheetPreset()
})], AncientCrystal);
var __defProp$v = Object.defineProperty;
var __getOwnPropDesc$v = Object.getOwnPropertyDescriptor;
var __decorateClass$v = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$v(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$v(target, key, result);
  return result;
};
const LPCSpritesheetPreset = () => {
  const frameY = (direction) => {
    return {
      [Direction.Down]: 2,
      [Direction.Left]: 1,
      [Direction.Right]: 3,
      [Direction.Up]: 0
    }[direction];
  };
  const stand = (direction) => [{
    time: 0,
    frameX: 1,
    frameY: frameY(direction)
  }];
  const anim = (direction, framesWidth, speed = 5) => {
    const array = [];
    for (let i = 0; i < framesWidth; i++) {
      array.push({
        time: i * speed,
        frameX: i,
        frameY: frameY(direction)
      });
    }
    return array;
  };
  return {
    rectWidth: 64,
    rectHeight: 64,
    spriteRealSize: {
      width: 48,
      height: 52
    },
    framesWidth: 6,
    framesHeight: 4,
    textures: {
      [Animation$1.Stand]: {
        offset: {
          x: 0,
          y: 512
        },
        animations: (direction) => [stand(direction)]
      },
      [Animation$1.Walk]: {
        offset: {
          x: 0,
          y: 512
        },
        framesWidth: 9,
        framesHeight: 4,
        animations: (direction) => [anim(direction, 9)]
      },
      [Animation$1.Attack]: {
        offset: {
          x: 0,
          y: 768
        },
        framesWidth: 6,
        framesHeight: 4,
        animations: (direction) => [anim(direction, 6, 3)]
      },
      [Animation$1.Skill]: {
        framesWidth: 7,
        framesHeight: 4,
        animations: (direction) => [anim(direction, 7, 3)]
      }
    }
  };
};
let CharactersLPC = class {
};
CharactersLPC = __decorateClass$v([Spritesheet({
  ...LPCSpritesheetPreset()
})], CharactersLPC);
var __defProp$u = Object.defineProperty;
var __getOwnPropDesc$u = Object.getOwnPropertyDescriptor;
var __decorateClass$u = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$u(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$u(target, key, result);
  return result;
};
const {
  RMSpritesheet: RMSpritesheet$2
} = Presets;
let CharactersOwlbear = class {
};
CharactersOwlbear = __decorateClass$u([Spritesheet({
  ...RMSpritesheet$2(1, 1),
  scale: [2 / 15],
  spriteRealSize: {
    width: 45,
    height: 52
  }
})], CharactersOwlbear);
var __defProp$t = Object.defineProperty;
var __getOwnPropDesc$t = Object.getOwnPropertyDescriptor;
var __decorateClass$t = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$t(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$t(target, key, result);
  return result;
};
const {
  RMSpritesheet: RMSpritesheet$1
} = Presets;
let CharactersShitty = class {
};
CharactersShitty = __decorateClass$t([Spritesheet({
  ...RMSpritesheet$1(3, 4)
})], CharactersShitty);
var __defProp$s = Object.defineProperty;
var __getOwnPropDesc$s = Object.getOwnPropertyDescriptor;
var __decorateClass$s = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$s(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$s(target, key, result);
  return result;
};
const {
  RMSpritesheet
} = Presets;
let Characters2MinuteTabletop = class {
};
Characters2MinuteTabletop = __decorateClass$s([Spritesheet({
  ...RMSpritesheet(1, 1),
  scale: [4 / 15],
  spriteRealSize: {
    width: 45,
    height: 52
  }
})], Characters2MinuteTabletop);
const npcTooltip_vue_vue_type_style_index_0_lang = "";
const _sfc_main = {
  name: "npc-tooltip",
  rpgAttachToSprite: true,
  props: ["spriteData"],
  inject: ["rpgScene"],
  data() {
    return {
      id: ""
    };
  },
  mounted() {
    this.rpgScene().getSprite(this.spriteData.id);
    this.id = this.spriteData.id;
  }
};
const _hoisted_1 = { class: "speech-bubble" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1, toDisplayString($data.id), 1);
}
const _main_gui_npc_tooltipvue = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
var __defProp$r = Object.defineProperty;
var __getOwnPropDesc$r = Object.getOwnPropertyDescriptor;
var __decorateClass$r = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$r(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$r(target, key, result);
  return result;
};
AncientCrystal.images = {
  "ancient-crystal": "/main/spritesheets/ancient-crystal/ancient-crystal.png"
};
AncientCrystal.prototype.width = 448;
AncientCrystal.prototype.height = 120;
CharactersLPC.images = {
  "cobb-1": "/main/spritesheets/characters-lpc/cobb-1.png",
  "tero-1": "/main/spritesheets/characters-lpc/tero-1.png",
  "tero-2": "/main/spritesheets/characters-lpc/tero-2.png"
};
CharactersLPC.prototype.width = 832;
CharactersLPC.prototype.height = 3456;
CharactersOwlbear.images = {
  "cade": "/main/spritesheets/characters-owlbear-rodeo/cade.webp",
  "dread": "/main/spritesheets/characters-owlbear-rodeo/dread.webp",
  "ekhaas-nasaar": "/main/spritesheets/characters-owlbear-rodeo/ekhaas-nasaar.webp",
  "epimelas-ordii": "/main/spritesheets/characters-owlbear-rodeo/epimelas-ordii.webp",
  "harriet-goodearth": "/main/spritesheets/characters-owlbear-rodeo/harriet-goodearth.webp",
  "hedge-knight": "/main/spritesheets/characters-owlbear-rodeo/hedge-knight.webp",
  "Ilphas Traynor": "/main/spritesheets/characters-owlbear-rodeo/Ilphas Traynor.webp",
  "lop": "/main/spritesheets/characters-owlbear-rodeo/lop.webp",
  "Magic Caterpillar": "/main/spritesheets/characters-owlbear-rodeo/Magic Caterpillar.png",
  "matthias": "/main/spritesheets/characters-owlbear-rodeo/matthias.webp",
  "pepsi-wilson": "/main/spritesheets/characters-owlbear-rodeo/pepsi-wilson.webp",
  "portia": "/main/spritesheets/characters-owlbear-rodeo/portia.webp",
  "razu-mur-nasaar": "/main/spritesheets/characters-owlbear-rodeo/razu-mur-nasaar.webp",
  "seiveril-scribe": "/main/spritesheets/characters-owlbear-rodeo/seiveril-scribe.webp",
  "skeemo": "/main/spritesheets/characters-owlbear-rodeo/skeemo.webp",
  "swedish-chef": "/main/spritesheets/characters-owlbear-rodeo/swedish-chef.png",
  "throden": "/main/spritesheets/characters-owlbear-rodeo/throden.webp",
  "tobbler": "/main/spritesheets/characters-owlbear-rodeo/tobbler.webp",
  "tuura-nasaar": "/main/spritesheets/characters-owlbear-rodeo/tuura-nasaar.webp",
  "zuzu": "/main/spritesheets/characters-owlbear-rodeo/zuzu.webp"
};
CharactersOwlbear.prototype.width = 480;
CharactersOwlbear.prototype.height = 480;
CharactersShitty.images = {
  "female": "/main/spritesheets/characters-shitty/female.png",
  "hero": "/main/spritesheets/characters-shitty/hero.png"
};
CharactersShitty.prototype.width = 96;
CharactersShitty.prototype.height = 128;
Characters2MinuteTabletop.images = {
  "alice": "/main/spritesheets/characters-tokens-240/alice.png",
  "chesire-cat": "/main/spritesheets/characters-tokens-240/chesire-cat.png",
  "knave-of-hearts": "/main/spritesheets/characters-tokens-240/knave-of-hearts.png",
  "mad-hatter": "/main/spritesheets/characters-tokens-240/mad-hatter.png",
  "queen-of-hearts": "/main/spritesheets/characters-tokens-240/queen-of-hearts.png"
};
Characters2MinuteTabletop.prototype.width = 240;
Characters2MinuteTabletop.prototype.height = 240;
let RpgClientModuleEngine$1 = class RpgClientModuleEngine {
};
RpgClientModuleEngine$1 = __decorateClass$r([
  RpgModule({
    spritesheets: [
      AncientCrystal,
      CharactersLPC,
      CharactersOwlbear,
      CharactersShitty,
      Characters2MinuteTabletop
    ],
    sprite,
    scenes: { map: sceneMap },
    gui: [_main_gui_npc_tooltipvue],
    sounds: []
  })
], RpgClientModuleEngine$1);
const vitePluginRequire_1743700423988_38708195 = "/assets/vehicle-one-more-day.tmx";
var __defProp$q = Object.defineProperty;
var __getOwnPropDesc$q = Object.getOwnPropertyDescriptor;
var __decorateClass$q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$q(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$q(target, key, result);
  return result;
};
let Simplemap = class extends RpgMap {
  // onLoad() {
  //     const spawner = new Spawner(this, MobSpawnList);
  //     setInterval(() => {
  //         const mobs = getMobsOnMapCount(this);
  //         spawner.populate(mobs);
  //     }, 60 * 1000)
  //     spawner.populate({});
  // }
};
Simplemap = __decorateClass$q([MapData({
  id: "vehicle-one-more-day",
  file: vitePluginRequire_1743700423988_38708195
})], Simplemap);
const _main_worlds_lightshipsworld = { "maps": [{ "fileName": "maps/vehicle-one-more-day.tmx", "height": 832, "width": 736, "x": 0, "y": 0 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/lightships.world" };
const _main_worlds_memoriesworld = { "maps": [{ "fileName": "maps/[Memories]/wonderland-visit-1-maze.tmx", "height": 992, "width": 992, "x": 0, "y": -160 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/memories.world" };
const _main_worlds_myworldworld = { "maps": [{ "fileName": "maps/simplemap.tmx", "height": 640, "width": 800, "x": 64, "y": -160 }, { "fileName": "maps/simplemap2.tmx", "height": 640, "width": 640, "x": -160, "y": 480 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/myworld.world" };
const _main_worlds_somewhere_interiorsworld = { "maps": [{ "fileName": "maps/somewhere-interior-frost-lords-bounty-f1.tmx", "height": 480, "width": 352, "x": 0, "y": 0 }, { "fileName": "maps/interiors/somewhere-interior-copper-general-f1.tmx", "height": 480, "width": 352, "x": 352, "y": 0 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/somewhere-interiors.world" };
const _main_worlds_somewhereworld = { "maps": [{ "fileName": "maps/somewhere-district-3.tmx", "height": 1184, "width": 1024, "x": 1888, "y": 800 }, { "fileName": "maps/somewhere-docks.tmx", "height": 2112, "width": 2304, "x": -288, "y": 2144 }, { "fileName": "maps/somewhere-district-2.tmx", "height": 2624, "width": 1984, "x": 0, "y": -2240 }, { "fileName": "maps/somewhere-district-1.tmx", "height": 2080, "width": 1888, "x": 0, "y": 128 }, { "fileName": "maps/somewhere-east-park.tmx", "height": 1152, "width": 672, "x": 2144, "y": -288 }, { "fileName": "maps/somewhere-refuge-row.tmx", "height": 1184, "width": 1056, "x": 2688, "y": -320 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/somewhere.world" };
var Elements = /* @__PURE__ */ ((Elements2) => {
  Elements2["Air"] = "air";
  Elements2["Dark"] = "dark";
  Elements2["Earth"] = "earth";
  Elements2["Fire"] = "fire";
  Elements2["Ice"] = "ice";
  Elements2["Light"] = "light";
  Elements2["Lightning"] = "lightning";
  Elements2["Water"] = "water";
  return Elements2;
})(Elements || {});
var __defProp$p = Object.defineProperty;
var __getOwnPropDesc$p = Object.getOwnPropertyDescriptor;
var __decorateClass$p = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$p(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$p(target, key, result);
  return result;
};
let Fire = class {
  onLearn(player2) {
  }
  onUse(player2) {
  }
  onForget(player2) {
  }
};
Fire = __decorateClass$p([Skill({
  name: "Fire",
  description: "Shoots a ball of fire",
  spCost: 10,
  power: 100,
  variance: 10,
  hitRate: 1,
  addStates: [],
  removeStates: [],
  elements: [Elements.Fire],
  coefficient: {
    // [ATK]: 2
  }
})], Fire);
var __defProp$o = Object.defineProperty;
var __getOwnPropDesc$o = Object.getOwnPropertyDescriptor;
var __decorateClass$o = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$o(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$o(target, key, result);
  return result;
};
let Fighter = class {
  // Called when the class is assigned to the player
  onSet(player2) {
  }
  // Return true if the player can equip the item
  canEquip(item, player2) {
    return true;
  }
};
Fighter = __decorateClass$o([Class({
  name: "Fighter",
  description: "A great fighter!",
  skillsToLearn: [{
    level: 5,
    skill: Fire
  }],
  statesEfficiency: [],
  elementsEfficiency: []
})], Fighter);
var __defProp$n = Object.defineProperty;
var __getOwnPropDesc$n = Object.getOwnPropertyDescriptor;
var __decorateClass$n = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$n(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$n(target, key, result);
  return result;
};
const {
  MAXHP
} = Presets$1;
let Tero = class {
  onSet(player2) {
  }
};
Tero = __decorateClass$n([Actor({
  name: "Tero",
  description: "A talented warrior who channels the elements.",
  initialLevel: 1,
  finalLevel: 20,
  expCurve: {
    basis: 1e3,
    extra: 0,
    accelerationA: 0,
    accelerationB: 0
  },
  parameters: {
    [MAXHP]: {
      start: 56,
      end: 1e4
    }
  },
  startingEquipment: [],
  class: Fighter
})], Tero);
const player = {
  onConnected(player2) {
    player2.name = "Tero";
    player2.setActor(Tero);
  },
  onInput(player2, {
    input
  }) {
    if (input == Control.Back) {
      player2.callMainMenu();
    }
  },
  async onJoinMap(player2) {
    player2.cameraFollow(player2, {});
    if (player2.getVariable("SHOW_INTRO")) {
      await player2.showText("Welcome to the start of RPGJS. Short presentation of the structure:");
      await player2.showText("1. Open the map src/modules/main/server/maps/tmx/samplemap.tmx with Tiled Map Editor !");
      await player2.showText("2. All the modules are in src/modules/index.ts, it is a suite of systems to make a complete set. Remove modules or add some!");
      await player2.showText("3. The global configuration is done in src/config");
      await player2.showText("And, please, support the project on github https://github.com/RSamaium/RPG-JS ! :)");
      player2.removeVariable("SHOW_INTRO");
      return;
    }
  },
  async onInShape(player2, shape) {
    const destinationMapScale = 32;
    console.log(`player in shape: ${shape.name}`);
    const destName = shape.properties["dest"];
    const destX = shape.properties["destX"];
    const destY = shape.properties["destY"];
    shape.properties["destZ"];
    if (!destName) {
      return;
    }
    if (destX && destY) {
      player2.changeMap(destName, {
        x: destX * destinationMapScale,
        y: destY * destinationMapScale
      });
    } else {
      player2.changeMap(destName);
    }
  }
};
var __defProp$m = Object.defineProperty;
var __getOwnPropDesc$m = Object.getOwnPropertyDescriptor;
var __decorateClass$m = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$m(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$m(target, key, result);
  return result;
};
let ZoneChange$a = class ZoneChange extends RpgEvent {
  async onPlayerTouch(player2) {
    if (player2.getVariable("CHANGING_ZONE")) {
      return;
    }
    const destinationMapScale = 32;
    player2.setVariable("CHANGING_ZONE", true);
    await player2.teleport({
      x: 11 * destinationMapScale,
      y: 16 * destinationMapScale
    });
    await player2.moveRoutes([Move.tileLeft(2)]);
    player2.setVariable("CHANGING_ZONE", false);
  }
};
ZoneChange$a = __decorateClass$m([EventData({
  name: "omd-b1-to-f1"
})], ZoneChange$a);
var __defProp$l = Object.defineProperty;
var __getOwnPropDesc$l = Object.getOwnPropertyDescriptor;
var __decorateClass$l = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$l(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$l(target, key, result);
  return result;
};
let ZoneChange$9 = class ZoneChange2 extends RpgEvent {
  async onPlayerTouch(player2) {
    if (player2.getVariable("CHANGING_ZONE")) {
      return;
    }
    const destinationMapScale = 32;
    player2.setVariable("CHANGING_ZONE", true);
    player2.teleport({
      x: 20 * destinationMapScale,
      y: 14 * destinationMapScale
    });
    player2.setVariable("CHANGING_ZONE", false);
  }
};
ZoneChange$9 = __decorateClass$l([EventData({
  name: "omd-f1-to-b1"
})], ZoneChange$9);
var __defProp$k = Object.defineProperty;
var __getOwnPropDesc$k = Object.getOwnPropertyDescriptor;
var __decorateClass$k = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$k(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$k(target, key, result);
  return result;
};
let ZoneChange$8 = class ZoneChange3 extends RpgEvent {
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    player2.teleport({
      x: 2 * destinationMapScale,
      y: 14 * destinationMapScale
    });
  }
};
ZoneChange$8 = __decorateClass$k([EventData({
  name: "omd-f1-to-f2"
})], ZoneChange$8);
var __defProp$j = Object.defineProperty;
var __getOwnPropDesc$j = Object.getOwnPropertyDescriptor;
var __decorateClass$j = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$j(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$j(target, key, result);
  return result;
};
let ZoneChange$7 = class ZoneChange4 extends RpgEvent {
  async onPlayerTouch(player2) {
    const destinationMapScale = 32;
    await player2.teleport({
      x: 10 * destinationMapScale,
      y: 14 * destinationMapScale
    });
    await player2.moveTo({
      x: 10 * destinationMapScale,
      y: 15 * destinationMapScale
    }, {
      infinite: false
    });
  }
};
ZoneChange$7 = __decorateClass$j([EventData({
  name: "omd-f2-to-f1"
})], ZoneChange$7);
var __defProp$i = Object.defineProperty;
var __getOwnPropDesc$i = Object.getOwnPropertyDescriptor;
var __decorateClass$i = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$i(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$i(target, key, result);
  return result;
};
let VillagerEvent$7 = class VillagerEvent extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  async onAction(player2) {
    const choice = await player2.showChoices("Where do you want to go?", [{
      text: "Somewhere",
      value: "somewhere-district-1"
    }, {
      text: "My ship, the One More Day",
      value: "lightship-one-more-day"
    }, {
      text: "Actually, I think I'll stay here",
      value: "none"
    }], {
      talkWith: this
    });
    if (choice && choice.value != "none") {
      await player2.changeMap(choice.value);
    }
  }
};
VillagerEvent$7 = __decorateClass$i([EventData({
  name: "ship-wheel",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$7);
class NpcEvent extends RpgEvent {
  onInit() {
    this.getCurrentMap();
    {
      return;
    }
  }
  /**
   * Say something to the specified player.
   * @param player Who is this NPC talking to?
   * @param message What is this NPC saying?
   * @param speaker Who is actually doing the speaking? '' for no name display.
   * @param options Configure the dialog GUI settings.
   */
  async speak(player2, message, speaker, options) {
    await player2.showText(this._formatDialogString(message, speaker), this._getDialogOptions(options));
  }
  async showTextFromMinecraftDialog(player2, scenes, speaker, options) {
    let choice = await this._showMinecraftDialogScene(player2, scenes[0], speaker, options);
    while (choice && choice.value != "none") {
      let filtered = scenes.filter((s) => s.scene_tag == (choice == null ? void 0 : choice.value));
      if (filtered.length == 0) {
        console.log(`unable to find scene: ${choice.value}`);
        return;
      }
      choice = await this._showMinecraftDialogScene(player2, filtered[0], speaker, options);
    }
  }
  /**
   * Formats the dialog string for display.
   * @param message What is being said?
   * @param speaker Who is actually doing the speaking? '' for no name display.
   */
  _formatDialogString(message, speaker) {
    const speakerName = this._getSpeakerNameString(speaker);
    const msg = speakerName + message;
    return msg;
  }
  /**
   * Gets a formatted string to display the speaker's name.
   * @param speaker Who is actually doing the speaking? '' for no name display.
   */
  _getSpeakerNameString(speaker) {
    if (speaker && speaker == "") {
      return "";
    }
    let name = speaker || "";
    if (!speaker) {
      name = this.name;
    }
    return name + ": ";
  }
  async _showMinecraftDialogScene(player2, dialog, speaker, options) {
    const possibleChoices = dialog.buttons.map((b) => {
      return {
        text: b.text,
        value: b.value && b.value[0] || "none"
      };
    });
    const choice = await player2.showChoices(this._formatDialogString(dialog.text, speaker), possibleChoices, this._getDialogOptions(options));
    return choice;
  }
  _getDialogOptions(options) {
    const dialogOptions = options || {};
    dialogOptions.talkWith || (dialogOptions.talkWith = this);
    return dialogOptions;
  }
}
var __defProp$h = Object.defineProperty;
var __getOwnPropDesc$h = Object.getOwnPropertyDescriptor;
var __decorateClass$h = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$h(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$h(target, key, result);
  return result;
};
let VillagerEvent$6 = class VillagerEvent2 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("chesire-cat");
    this.name = "Chesire Cat";
  }
  async onAction(player2) {
    await this.speak(player2, "I'm a freaky, eldritch abomination that happens to resemble a cat. Isn't that strange and upsetting?");
    await this.speak(player2, "Don't worry about it too much, kiddo.");
  }
};
VillagerEvent$6 = __decorateClass$h([EventData({
  name: "mem-chesire-cat-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$6);
var __defProp$g = Object.defineProperty;
var __getOwnPropDesc$g = Object.getOwnPropertyDescriptor;
var __decorateClass$g = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$g(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$g(target, key, result);
  return result;
};
let VillagerEvent$5 = class VillagerEvent3 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("hedge-knight");
    this.name = "Hedge Knight";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#ffee00"
    }));
  }
  async onAction(player2) {
    await this.speak(player2, "Hail, traveler! I'm an friendly, overly trusting knight who doesn't seem to realize that literally every obstacle adventurers face is bigger than I am.");
  }
};
VillagerEvent$5 = __decorateClass$g([EventData({
  name: "mem-hedge-knight-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$5);
var __defProp$f = Object.defineProperty;
var __getOwnPropDesc$f = Object.getOwnPropertyDescriptor;
var __decorateClass$f = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$f(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$f(target, key, result);
  return result;
};
let VillagerEvent$4 = class VillagerEvent4 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("dread");
    this.name = "[Surgeon] Dread";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Arial"
    }), {
      width: 64,
      height: 16,
      marginTop: 5,
      marginLeft: 0,
      marginRight: 0,
      marginBottom: 10
    });
  }
  async onAction(player2) {
    const scenes = [{
      "scene_tag": "dread_greeting",
      "npc_name": "§e[Surgeon] Dread",
      text: "...",
      "buttons": [
        // {
        // 	text: "I need medical assistance.",
        // 	value: ["dread_greeting"]
        // },
        {
          text: "Let's chat.",
          value: ["dread_chat"]
        },
        {
          text: "Nevermind."
        }
      ]
    }, {
      "scene_tag": "dread_chat",
      text: "...what?",
      "buttons": [{
        text: "About you...",
        value: ["dread_chat_self"]
      }, {
        text: "About this city...",
        value: ["dread_chat_city"]
      }, {
        text: "Nevermind."
        // value: ["dread_greeting"]
      }]
    }, {
      "scene_tag": "dread_chat_city",
      text: "What of it?",
      "buttons": [{
        text: "Heard any good rumors?",
        value: ["dread_chat_city_rumors"]
      }, {
        text: "Nevermind.",
        value: ["dread_chat"]
      }]
    }, {
      "scene_tag": "dread_chat_self",
      text: "...",
      "buttons": [{
        text: "What are you?",
        value: ["dread_chat_self_what"]
      }, {
        text: "Your family.",
        value: ["dread_chat_self_family"]
      }, {
        text: "Your homeland.",
        value: ["dread_chat_self_homeland"]
      }, {
        text: "Nevermind.",
        value: ["dread_chat"]
      }]
    }, {
      "scene_tag": "dread_chat_self_what",
      text: "...I am a surgeon.",
      "buttons": [{
        text: "[continue]",
        value: ["dread_chat_self"]
      }]
    }, {
      "scene_tag": "dread_chat_self_family",
      text: "I am a §4tiefling§r. I do not have one of those.",
      "buttons": [{
        text: "What do you mean?",
        value: ["dread_chat_self_family_2"]
      }, {
        text: "[back]",
        value: ["dread_chat_self"]
      }]
    }, {
      "scene_tag": "dread_chat_self_homeland",
      text: "...my homeland was evil. \n\nI do not miss it. I simply continue my work here instead.",
      "buttons": [{
        text: "[back]",
        value: ["dread_chat_self"]
      }]
    }, {
      "scene_tag": "dread_chat_city_rumors",
      text: "The small reporter is loud and annoying, but she investigates well. Her paper is a surprisingly good place to learn which people need... surgery.",
      "buttons": [{
        text: "[back]",
        value: ["dread_chat_city"]
      }]
    }, {
      "scene_tag": "dread_chat_self_family_2",
      text: "Whoever sired me did not wish to raise me. Perhaps I was better off without knowing such pitiful creatures.",
      "buttons": [{
        text: "[back]",
        value: ["dread_chat_self"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$4 = __decorateClass$f([EventData({
  name: "dread-1",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$4);
var __defProp$e = Object.defineProperty;
var __getOwnPropDesc$e = Object.getOwnPropertyDescriptor;
var __decorateClass$e = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$e(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$e(target, key, result);
  return result;
};
let VillagerEvent$3 = class VillagerEvent5 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("throden");
    this.name = "Shopkeeper";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#ffee00"
    }));
  }
  async onAction(player2) {
    await player2.showText("I give you 10 gold.", {
      talkWith: this
    });
    player2.gold += 10;
  }
};
VillagerEvent$3 = __decorateClass$e([EventData({
  name: "THRODEN-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$3);
var __defProp$d = Object.defineProperty;
var __getOwnPropDesc$d = Object.getOwnPropertyDescriptor;
var __decorateClass$d = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$d(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$d(target, key, result);
  return result;
};
let ZoneChange$6 = class ZoneChange5 extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    player2.changeMap(this.properties["dest"], {
      x: this.properties["destX"] * destinationMapScale,
      y: this.properties["destY"] * destinationMapScale
    });
  }
};
ZoneChange$6 = __decorateClass$d([EventData({
  name: "somewhere-cg-enter-e"
})], ZoneChange$6);
var __defProp$c = Object.defineProperty;
var __getOwnPropDesc$c = Object.getOwnPropertyDescriptor;
var __decorateClass$c = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$c(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$c(target, key, result);
  return result;
};
let ZoneChange$5 = class ZoneChange6 extends RpgEvent {
  onInit() {
    this.name = "To Jeweler";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#808080"
    }));
  }
  onPlayerTouch(player2) {
    this.travel(player2);
  }
  onInShape(player2, shape) {
    this.travel(player2);
  }
  travel(player2) {
    const destinationMapScale = 32;
    const destX = this.properties["destX"];
    const destY = this.properties["destY"];
    this.properties["destZ"];
    if (destX && destY) {
      player2.changeMap(this.properties["dest"], {
        x: destX * destinationMapScale,
        y: destY * destinationMapScale
      });
    } else {
      player2.changeMap(this.properties["dest"]);
    }
  }
};
ZoneChange$5 = __decorateClass$c([EventData({
  name: "somewhere-cg-enter-s"
})], ZoneChange$5);
var __defProp$b = Object.defineProperty;
var __getOwnPropDesc$b = Object.getOwnPropertyDescriptor;
var __decorateClass$b = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$b(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$b(target, key, result);
  return result;
};
let ZoneChange$4 = class ZoneChange7 extends RpgEvent {
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    player2.changeMap("somewhere-district-1", {
      x: 25 * destinationMapScale,
      y: 27 * destinationMapScale
    });
  }
};
ZoneChange$4 = __decorateClass$b([EventData({
  name: "somewhere-cg-exit-e"
})], ZoneChange$4);
var __defProp$a = Object.defineProperty;
var __getOwnPropDesc$a = Object.getOwnPropertyDescriptor;
var __decorateClass$a = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$a(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$a(target, key, result);
  return result;
};
let ZoneChange$3 = class ZoneChange8 extends RpgEvent {
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    player2.changeMap("somewhere-district-1", {
      x: 21 * destinationMapScale,
      y: 34 * destinationMapScale
    });
  }
};
ZoneChange$3 = __decorateClass$a([EventData({
  name: "somewhere-cg-exit-s"
})], ZoneChange$3);
var __defProp$9 = Object.defineProperty;
var __getOwnPropDesc$9 = Object.getOwnPropertyDescriptor;
var __decorateClass$9 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$9(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$9(target, key, result);
  return result;
};
let ZoneChange$2 = class ZoneChange9 extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    const destX = this.properties["destX"];
    const destY = this.properties["destY"];
    this.properties["destZ"];
    if (destX && destY) {
      player2.changeMap(this.properties["dest"], {
        x: destX * destinationMapScale,
        y: destY * destinationMapScale
      });
    } else {
      player2.changeMap(this.properties["dest"]);
    }
  }
};
ZoneChange$2 = __decorateClass$9([EventData({
  name: "door"
})], ZoneChange$2);
var __defProp$8 = Object.defineProperty;
var __getOwnPropDesc$8 = Object.getOwnPropertyDescriptor;
var __decorateClass$8 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$8(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$8(target, key, result);
  return result;
};
let ZoneChange$1 = class ZoneChange10 extends RpgEvent {
  onInit() {
    this.name = "To Jeweler";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#808080"
    }));
  }
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    player2.changeMap("somewhere-interior-frost-lords-bounty-f1", {
      x: 4 * destinationMapScale,
      y: 13 * destinationMapScale
    });
  }
};
ZoneChange$1 = __decorateClass$8([EventData({
  name: "somewhere-flb-enter"
})], ZoneChange$1);
var __defProp$7 = Object.defineProperty;
var __getOwnPropDesc$7 = Object.getOwnPropertyDescriptor;
var __decorateClass$7 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$7(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$7(target, key, result);
  return result;
};
let ZoneChange11 = class extends RpgEvent {
  onPlayerTouch(player2) {
    const destinationMapScale = 32;
    player2.changeMap("somewhere-district-1", {
      x: 31 * destinationMapScale,
      y: 28 * destinationMapScale,
      z: 1
    });
  }
};
ZoneChange11 = __decorateClass$7([EventData({
  name: "somewhere-flb-exit"
})], ZoneChange11);
const TeleportDestinations = [{
  text: "Somewhere",
  value: "somewhere-district-1"
}, {
  text: "My ship, the One More Day",
  value: "vehicle-one-more-day"
}, {
  text: "I'd like to reminisce about Wonderland",
  value: "wonderland-visit-1-maze"
}, {
  text: "Actually, I think I'll stay here",
  value: "none"
}];
var __defProp$6 = Object.defineProperty;
var __getOwnPropDesc$6 = Object.getOwnPropertyDescriptor;
var __decorateClass$6 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$6(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$6(target, key, result);
  return result;
};
let VillagerEvent$2 = class VillagerEvent6 extends RpgEvent {
  onInit() {
    this.name = "Exit Memory";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#66ffff"
    }));
  }
  async onAction(player2) {
    const filteredOptions = TeleportDestinations.filter((op) => {
      var _a;
      return op.value != ((_a = player2.getCurrentMap()) == null ? void 0 : _a.id);
    });
    const choice = await player2.showChoices("Where do you want to go?", filteredOptions, {
      talkWith: this
    });
    if (choice && choice.value != "none") {
      await player2.changeMap(choice.value);
    }
  }
};
VillagerEvent$2 = __decorateClass$6([EventData({
  name: "memory-exit",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$2);
var __defProp$5 = Object.defineProperty;
var __getOwnPropDesc$5 = Object.getOwnPropertyDescriptor;
var __decorateClass$5 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$5(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$5(target, key, result);
  return result;
};
let VillagerEvent$1 = class VillagerEvent7 extends RpgEvent {
  onInit() {
    this.setGraphic("ancient-crystal");
    this.name = "Teleport";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#66ffff",
      fontSize: 12,
      fontFamily: "Arial Black"
    }), {
      width: 64,
      height: 20,
      marginTop: 5
    });
  }
  async onAction(player2) {
    const filteredOptions = TeleportDestinations.filter((op) => {
      var _a;
      return op.value != ((_a = player2.getCurrentMap()) == null ? void 0 : _a.id);
    });
    const choice = await player2.showChoices("Where do you want to go?", filteredOptions, {
      talkWith: this
    });
    if (choice && choice.value != "none") {
      await player2.changeMap(choice.value);
    }
  }
};
VillagerEvent$1 = __decorateClass$5([EventData({
  name: "teleport-menu",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$1);
var __defProp$4 = Object.defineProperty;
var __getOwnPropDesc$4 = Object.getOwnPropertyDescriptor;
var __decorateClass$4 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$4(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$4(target, key, result);
  return result;
};
let VillagerEvent8 = class extends RpgEvent {
  onInit() {
    this.setGraphic("female");
  }
  async onAction(player2) {
    await player2.showText("I give you 10 gold.", {
      talkWith: this
    });
    player2.gold += 10;
  }
};
VillagerEvent8 = __decorateClass$4([EventData({
  name: "EV-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent8);
var Efficiency = /* @__PURE__ */ ((Efficiency2) => {
  Efficiency2[Efficiency2["GAIN_HP"] = -0.5] = "GAIN_HP";
  Efficiency2[Efficiency2["INVULNERABLE"] = 0] = "INVULNERABLE";
  Efficiency2[Efficiency2["RESISTANT"] = 0.5] = "RESISTANT";
  Efficiency2[Efficiency2["NORMAL"] = 1] = "NORMAL";
  Efficiency2[Efficiency2["VULNERABLE"] = 1.5] = "VULNERABLE";
  Efficiency2[Efficiency2["VERY_VULNERABLE"] = 2] = "VERY_VULNERABLE";
  return Efficiency2;
})(Efficiency || {});
var __defProp$3 = Object.defineProperty;
var __getOwnPropDesc$3 = Object.getOwnPropertyDescriptor;
var __decorateClass$3 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$3(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$3(target, key, result);
  return result;
};
let Paralyse = class {
};
Paralyse = __decorateClass$3([State({
  name: "Paralyse",
  description: "The player is paralyzed",
  effects: [],
  // paramsModifier: [],
  statesEfficiency: [],
  elementsEfficiency: [{
    rate: Efficiency.VULNERABLE,
    element: Elements.Lightning
  }]
})], Paralyse);
var __defProp$2 = Object.defineProperty;
var __getOwnPropDesc$2 = Object.getOwnPropertyDescriptor;
var __decorateClass$2 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$2(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$2(target, key, result);
  return result;
};
const _lastConnectedCb = player.onConnected;
player.onConnected = async (player2) => {
  if (_lastConnectedCb)
    await _lastConnectedCb(player2);
  if (!player2.server.module.customHookExists("server.player.onAuth")) {
    player2.setGraphic("tero-2");
    player2.setHitbox(16, 16);
    await player2.changeMap("somewhere-district-1");
  }
};
let RpgServerModuleEngine$1 = class RpgServerModuleEngine {
};
RpgServerModuleEngine$1 = __decorateClass$2([
  RpgModule({
    player,
    events: [ZoneChange$a, ZoneChange$9, ZoneChange$8, ZoneChange$7, VillagerEvent$7, VillagerEvent$6, VillagerEvent$5, VillagerEvent$4, VillagerEvent$3, ZoneChange$6, ZoneChange$5, ZoneChange$4, ZoneChange$3, ZoneChange$2, ZoneChange$1, ZoneChange11, VillagerEvent$2, VillagerEvent$1, VillagerEvent8, NpcEvent].map((val) => {
      if (!val) {
        throw new Error('Do you have "export default" in this file ? :  ./main/events/_base-classes/npc.ts');
      }
      return val;
    }),
    database: [Tero, Fighter, Fire, Paralyse].map((val) => {
      if (!val) {
        throw new Error('Do you have "export default" in this file ? :  ./main/database/states/paralyse.ts');
      }
      return val;
    }),
    maps: [Simplemap],
    worldMaps: [_main_worlds_lightshipsworld, _main_worlds_memoriesworld, _main_worlds_myworldworld, _main_worlds_somewhere_interiorsworld, _main_worlds_somewhereworld]
  })
], RpgServerModuleEngine$1);
const _main = {
  client: RpgClientModuleEngine$1,
  server: RpgServerModuleEngine$1
};
var __defProp$1 = Object.defineProperty;
var __getOwnPropDesc$1 = Object.getOwnPropertyDescriptor;
var __decorateClass$1 = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$1(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$1(target, key, result);
  return result;
};
let RpgClientModuleEngine2 = class {
};
RpgClientModuleEngine2 = __decorateClass$1([
  RpgModule({
    // others options here and ...
    scenes: {
      map: {
        onAfterLoading(scene) {
          var _a;
          if (!scene || !scene.viewport) {
            return;
          }
          // (_a = scene.viewport) == null ? void 0 : _a.setZoom(2);
        }
      }
    }
  })
], RpgClientModuleEngine2);
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __decorateClass = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp(target, key, result);
  return result;
};
let RpgServerModuleEngine2 = class {
};
RpgServerModuleEngine2 = __decorateClass([
  RpgModule({})
], RpgServerModuleEngine2);
const mod = {
  client: RpgClientModuleEngine2,
  server: RpgServerModuleEngine2
};
const modules = [
  _rpgjs_plugin_emotion_bubbles,
  _main,
  mod,
  _rpgjs_title_screen,
  _rpgjs_save,
  _rpgjs_mobile_gui,
  _rpgjs_default_gui,
  _rpgjs_gamepad
];
document.addEventListener("DOMContentLoaded", async function() {
  window.RpgStandalone = await entryPoint(modules, {
    globalConfigClient,
    globalConfigServer,
    envs: {
      VITE_BUILT: 1,
      VITE_SERVER_URL: void 0,
      VITE_GAME_URL: void 0,
      VITE_RPG_TYPE: "rpg",
      VITE_ASSETS_PATH: "",
      VITE_REACT: true
    }
  }).start();
});

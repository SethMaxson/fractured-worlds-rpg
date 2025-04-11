import { R as RpgGui, P as PrebuiltGui, S as Spritesheet, A as Animation$1, D as Direction, a as Presets, _ as _export_sfc, o as openBlock, c as createElementBlock, t as toDisplayString, b as RpgModule, d as RpgMap, M as MapData, e as Skill, C as Class, f as Actor, g as Presets$1, h as Control, i as ShapePositioning, j as RpgEvent, E as EmotionBubble, k as Components, l as EventData, I as Item, m as State, n as normalizeClass, p as normalizeStyle, r as resolveComponent, q as createBlock, w as withCtx, T as Transition, s as createBaseVNode, u as createVNode, v as createCommentVNode, x as renderSlot, y as debounceTime, F as Fragment, z as renderList, B as createTextVNode, G as pushScopeId, H as popScopeId, J as resolveDynamicComponent, K as Sound, L as _rpgjs_plugin_emotion_bubbles, N as _rpgjs_title_screen, O as _rpgjs_save, Q as _rpgjs_mobile_gui, U as _rpgjs_default_gui, V as _rpgjs_gamepad, W as entryPoint } from "./vendor-4f584c95.js";
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
const globalConfigClient = { "shortName": "Fractured Worlds", "description": "The JRPG styled companion to the Fractured Worlds campaign.", "themeColor": "#9900ff", "canvas": { "antialias": false, "autoDensity": true }, "inputs": { "action": { "name": "action", "bind": ["space", "enter"] } }, "name": "Fractured Worlds RPG", "emotionBubble": {}, "gamepad": {} };
const globalConfigServer = { "startMap": "vehicle-one-more-day", "start": { "map": "vehicle-one-more-day", "graphic": "tero-2", "hitbox": [16, 16] }, "compilerOptions": { "build": { "pwaEnabled": true, "outputDir": "dist" } }, "vite": { "server": { "port": 62318 } }, "modulesRoot": "", "autostart": true, "inputs": { "action": { "name": "action", "bind": ["space", "enter"] } }, "name": "Fractured Worlds RPG" };
let _socket;
const sprite = {
  onInit(sprite2) {
    sprite2.eventMode = "static";
    sprite2.on("pointerdown", (position) => {
      _socket.emit("click");
    });
    if (sprite2.data && sprite2.data.type == "event") {
      sprite2.onclick = () => {
      };
      sprite2.on("pointerdown", () => {
        console.log("clicked sprite");
      });
    }
  }
};
const Config = {
  debug: false,
  devSettings: {
    forceMobile: true,
    showHitboxes: false
  },
  dialog: {
    typewriterEffect: true
  },
  display: {
    devicesSpecific: {
      desktop: {
        zoomFactor: 2
      },
      mobile: {
        zoomFactor: 1
      }
    }
  },
  font: {
    default: {
      family: "Pixelify Sans",
      size: 14
    }
  },
  game: {
    ui: {
      labels: {
        showLabelsForAllNpcs: false,
        showLabelsForImportantNpcs: true
      }
    }
  }
};
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 1280 || Config.debug;
}
const sceneMap = {
  onAfterLoading(scene) {
    var _a, _b;
    RpgGui.display("npc-tooltip");
    if (!isMobileDevice()) {
      RpgGui.hide(PrebuiltGui.Controls);
    }
    if (!scene || !scene.viewport) {
      return;
    }
    if (!isMobileDevice()) {
      (_a = scene.viewport) == null ? void 0 : _a.setZoom(Config.display.devicesSpecific.desktop.zoomFactor);
    } else {
      (_b = scene.viewport) == null ? void 0 : _b.setZoom(Config.display.devicesSpecific.mobile.zoomFactor);
    }
  }
};
var __defProp$S = Object.defineProperty;
var __getOwnPropDesc$S = Object.getOwnPropertyDescriptor;
var __decorateClass$S = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$S(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$S(target, key, result);
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
AncientCrystal = __decorateClass$S([Spritesheet({
  ...AncientCrystalSpritesheetPreset()
})], AncientCrystal);
var __defProp$R = Object.defineProperty;
var __getOwnPropDesc$R = Object.getOwnPropertyDescriptor;
var __decorateClass$R = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$R(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$R(target, key, result);
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
      height: 54
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
      // [Animation.Stand]: {
      //     offset: {
      //         x: 0,
      //         y: 1408,
      //     },
      //     framesWidth: 2,
      //     framesHeight: 4,
      //     animations: (direction: Direction) => [anim(direction, 2, 75)]
      // },
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
CharactersLPC = __decorateClass$R([Spritesheet({
  ...LPCSpritesheetPreset()
})], CharactersLPC);
var __defProp$Q = Object.defineProperty;
var __getOwnPropDesc$Q = Object.getOwnPropertyDescriptor;
var __decorateClass$Q = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$Q(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$Q(target, key, result);
  return result;
};
const {
  RMSpritesheet: RMSpritesheet$3
} = Presets;
let CharactersShitty = class {
};
CharactersShitty = __decorateClass$Q([Spritesheet({
  ...RMSpritesheet$3(3, 4)
})], CharactersShitty);
var __defProp$P = Object.defineProperty;
var __getOwnPropDesc$P = Object.getOwnPropertyDescriptor;
var __decorateClass$P = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$P(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$P(target, key, result);
  return result;
};
const {
  RMSpritesheet: RMSpritesheet$2
} = Presets;
let CharactersStatic1024x1024 = class {
};
CharactersStatic1024x1024 = __decorateClass$P([Spritesheet({
  ...RMSpritesheet$2(1, 1),
  anchor: [0.2, 0.5],
  pivot: [0, 0.5],
  scale: [1 / 16],
  spriteRealSize: {
    width: 45,
    height: 52
  }
})], CharactersStatic1024x1024);
var __defProp$O = Object.defineProperty;
var __getOwnPropDesc$O = Object.getOwnPropertyDescriptor;
var __decorateClass$O = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$O(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$O(target, key, result);
  return result;
};
const {
  RMSpritesheet: RMSpritesheet$1
} = Presets;
let Characters2MinuteTabletop = class {
};
Characters2MinuteTabletop = __decorateClass$O([Spritesheet({
  ...RMSpritesheet$1(1, 1),
  anchor: [0.2, 0.5],
  pivot: [0, 0.5],
  scale: [4 / 15],
  spriteRealSize: {
    width: 45,
    height: 52
  }
})], Characters2MinuteTabletop);
var __defProp$N = Object.defineProperty;
var __getOwnPropDesc$N = Object.getOwnPropertyDescriptor;
var __decorateClass$N = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$N(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$N(target, key, result);
  return result;
};
const {
  RMSpritesheet
} = Presets;
let CharactersOwlbear = class {
};
CharactersOwlbear = __decorateClass$N([Spritesheet({
  ...RMSpritesheet(1, 1),
  anchor: [0.2, 0.5],
  pivot: [0, 0.5],
  scale: [2 / 15],
  spriteRealSize: {
    width: 45,
    height: 52
  }
})], CharactersOwlbear);
const npcTooltip_vue_vue_type_style_index_0_lang = "";
const _sfc_main$h = {
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
const _hoisted_1$c = { class: "speech-bubble" };
function _sfc_render$h(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$c, toDisplayString($data.id), 1);
}
const _main_gui_npc_tooltipvue = /* @__PURE__ */ _export_sfc(_sfc_main$h, [["render", _sfc_render$h]]);
var __defProp$M = Object.defineProperty;
var __getOwnPropDesc$M = Object.getOwnPropertyDescriptor;
var __decorateClass$M = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$M(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$M(target, key, result);
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
CharactersShitty.images = {
  "female": "/main/spritesheets/characters-shitty/female.png",
  "hero": "/main/spritesheets/characters-shitty/hero.png"
};
CharactersShitty.prototype.width = 96;
CharactersShitty.prototype.height = 128;
CharactersStatic1024x1024.images = {
  "cobb": "/main/spritesheets/characters-tokens-1024/cobb.png",
  "crew-hamisfore": "/main/spritesheets/characters-tokens-1024/crew-hamisfore.webp",
  "crew-ootah": "/main/spritesheets/characters-tokens-1024/crew-ootah.webp",
  "phil": "/main/spritesheets/characters-tokens-1024/phil.png",
  "tero-chibi": "/main/spritesheets/characters-tokens-1024/tero-chibi.png",
  "tropey": "/main/spritesheets/characters-tokens-1024/tropey.png"
};
CharactersStatic1024x1024.prototype.width = 1024;
CharactersStatic1024x1024.prototype.height = 1024;
Characters2MinuteTabletop.images = {
  "nortle": "/main/spritesheets/characters-tokens-240/nortle.png",
  "sw-arctic-dust": "/main/spritesheets/characters-tokens-240/sw-arctic-dust.png",
  "sw-lazy-flower": "/main/spritesheets/characters-tokens-240/sw-lazy-flower.png",
  "wonderland-alice": "/main/spritesheets/characters-tokens-240/wonderland-alice.png",
  "wonderland-chesire-cat": "/main/spritesheets/characters-tokens-240/wonderland-chesire-cat.png",
  "wonderland-knave-of-hearts": "/main/spritesheets/characters-tokens-240/wonderland-knave-of-hearts.png",
  "wonderland-mad-hatter": "/main/spritesheets/characters-tokens-240/wonderland-mad-hatter.png",
  "wonderland-queen-of-hearts": "/main/spritesheets/characters-tokens-240/wonderland-queen-of-hearts.png"
};
Characters2MinuteTabletop.prototype.width = 240;
Characters2MinuteTabletop.prototype.height = 240;
CharactersOwlbear.images = {
  "bear-ojo": "/main/spritesheets/characters-tokens-480/bear-ojo.png",
  "bear-pip-and-pop": "/main/spritesheets/characters-tokens-480/bear-pip-and-pop.png",
  "bear-treelo": "/main/spritesheets/characters-tokens-480/bear-treelo.png",
  "bear-tutter": "/main/spritesheets/characters-tokens-480/bear-tutter.png",
  "crew-carrie-ward": "/main/spritesheets/characters-tokens-480/crew-carrie-ward.webp",
  "crew-eva-davis": "/main/spritesheets/characters-tokens-480/crew-eva-davis.webp",
  "crew-giuseppe": "/main/spritesheets/characters-tokens-480/crew-giuseppe.webp",
  "crew-gloria": "/main/spritesheets/characters-tokens-480/crew-gloria.webp",
  "crew-tom-cox": "/main/spritesheets/characters-tokens-480/crew-tom-cox.webp",
  "crew-tommy": "/main/spritesheets/characters-tokens-480/crew-tommy.webp",
  "ht-bouncer": "/main/spritesheets/characters-tokens-480/ht-bouncer.webp",
  "ht-bramble": "/main/spritesheets/characters-tokens-480/ht-bramble.webp",
  "ht-chef-1": "/main/spritesheets/characters-tokens-480/ht-chef-1.webp",
  "ht-chef-5": "/main/spritesheets/characters-tokens-480/ht-chef-5.webp",
  "ht-dj": "/main/spritesheets/characters-tokens-480/ht-dj.webp",
  "ht-elryn": "/main/spritesheets/characters-tokens-480/ht-elryn.webp",
  "ht-lee": "/main/spritesheets/characters-tokens-480/ht-lee.webp",
  "ht-martin": "/main/spritesheets/characters-tokens-480/ht-martin.webp",
  "ht-melia": "/main/spritesheets/characters-tokens-480/ht-melia.webp",
  "ht-waiter-1": "/main/spritesheets/characters-tokens-480/ht-waiter-1.webp",
  "ht-waiter-6": "/main/spritesheets/characters-tokens-480/ht-waiter-6.webp",
  "nle-cade": "/main/spritesheets/characters-tokens-480/nle-cade.webp",
  "pandr-jean-ralphio": "/main/spritesheets/characters-tokens-480/pandr-jean-ralphio.png",
  "pandr-jerry-gergich": "/main/spritesheets/characters-tokens-480/pandr-jerry-gergich.png",
  "pandr-ron-swanson": "/main/spritesheets/characters-tokens-480/pandr-ron-swanson.png",
  "pandr-tommy-haverford": "/main/spritesheets/characters-tokens-480/pandr-tommy-haverford.png",
  "ss-bert": "/main/spritesheets/characters-tokens-480/ss-bert.png",
  "ss-cookie-monster": "/main/spritesheets/characters-tokens-480/ss-cookie-monster.png",
  "ss-elmo": "/main/spritesheets/characters-tokens-480/ss-elmo.png",
  "ss-grover": "/main/spritesheets/characters-tokens-480/ss-grover.png",
  "ss-hoots": "/main/spritesheets/characters-tokens-480/ss-hoots.png",
  "sw-berber": "/main/spritesheets/characters-tokens-480/sw-berber.webp",
  "sw-bernard-hairy-darrow": "/main/spritesheets/characters-tokens-480/sw-bernard-hairy-darrow.webp",
  "sw-berrak": "/main/spritesheets/characters-tokens-480/sw-berrak.webp",
  "sw-berty": "/main/spritesheets/characters-tokens-480/sw-berty.webp",
  "sw-billie-martin": "/main/spritesheets/characters-tokens-480/sw-billie-martin.webp",
  "sw-boom": "/main/spritesheets/characters-tokens-480/sw-boom.webp",
  "sw-bowuf": "/main/spritesheets/characters-tokens-480/sw-bowuf.webp",
  "sw-brug-freeman": "/main/spritesheets/characters-tokens-480/sw-brug-freeman.webp",
  "sw-coke-a-cola quaid": "/main/spritesheets/characters-tokens-480/sw-coke-a-cola quaid.webp",
  "sw-donna-palmer": "/main/spritesheets/characters-tokens-480/sw-donna-palmer.webp",
  "sw-dread": "/main/spritesheets/characters-tokens-480/sw-dread.webp",
  "sw-ekhaas-nasaar": "/main/spritesheets/characters-tokens-480/sw-ekhaas-nasaar.webp",
  "sw-epimelas-ordii": "/main/spritesheets/characters-tokens-480/sw-epimelas-ordii.webp",
  "sw-harriet-goodearth": "/main/spritesheets/characters-tokens-480/sw-harriet-goodearth.webp",
  "sw-ilphas-traynor": "/main/spritesheets/characters-tokens-480/sw-ilphas-traynor.webp",
  "sw-lop": "/main/spritesheets/characters-tokens-480/sw-lop.webp",
  "sw-matthias": "/main/spritesheets/characters-tokens-480/sw-matthias.webp",
  "sw-pepsi-wilson": "/main/spritesheets/characters-tokens-480/sw-pepsi-wilson.webp",
  "sw-portia": "/main/spritesheets/characters-tokens-480/sw-portia.webp",
  "sw-razu-mur-nasaar": "/main/spritesheets/characters-tokens-480/sw-razu-mur-nasaar.webp",
  "sw-seiveril-scribe": "/main/spritesheets/characters-tokens-480/sw-seiveril-scribe.webp",
  "sw-skeemo": "/main/spritesheets/characters-tokens-480/sw-skeemo.webp",
  "sw-swedish-chef": "/main/spritesheets/characters-tokens-480/sw-swedish-chef.png",
  "sw-throden": "/main/spritesheets/characters-tokens-480/sw-throden.webp",
  "sw-tobbler": "/main/spritesheets/characters-tokens-480/sw-tobbler.webp",
  "sw-tuura-nasaar": "/main/spritesheets/characters-tokens-480/sw-tuura-nasaar.webp",
  "sw-zuzu": "/main/spritesheets/characters-tokens-480/sw-zuzu.webp",
  "wonderland-absalom": "/main/spritesheets/characters-tokens-480/wonderland-absalom.png",
  "wonderland-hedge-knight": "/main/spritesheets/characters-tokens-480/wonderland-hedge-knight.webp"
};
CharactersOwlbear.prototype.width = 480;
CharactersOwlbear.prototype.height = 480;
let RpgClientModuleEngine = class {
};
RpgClientModuleEngine = __decorateClass$M([
  RpgModule({
    spritesheets: [
      AncientCrystal,
      CharactersLPC,
      CharactersShitty,
      CharactersStatic1024x1024,
      Characters2MinuteTabletop,
      CharactersOwlbear
    ],
    sprite,
    scenes: { map: sceneMap },
    gui: [_main_gui_npc_tooltipvue],
    sounds: []
  })
], RpgClientModuleEngine);
const vitePluginRequire_1744406398616_73749002 = "/assets/vehicle-one-more-day.tmx";
var __defProp$L = Object.defineProperty;
var __getOwnPropDesc$L = Object.getOwnPropertyDescriptor;
var __decorateClass$L = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$L(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$L(target, key, result);
  return result;
};
let SimpleMap = class extends RpgMap {
  // onLoad() {
  //     const spawner = new Spawner(this, MobSpawnList);
  //     setInterval(() => {
  //         const mobs = getMobsOnMapCount(this);
  //         spawner.populate(mobs);
  //     }, 60 * 1000)
  //     spawner.populate({});
  // }
};
SimpleMap = __decorateClass$L([MapData({
  id: "vehicle-one-more-day",
  file: vitePluginRequire_1744406398616_73749002
})], SimpleMap);
const _main_worlds_dev_roomworld = { "maps": [{ "fileName": "maps/[DevRoom]/npc-test.tmx", "height": 1600, "width": 1600, "x": 0, "y": 0 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/dev-room.world" };
const _main_worlds_happy_turtleworld = { "maps": [{ "fileName": "maps/[Lightships]/happy-turtle/happy-turtle-f1.tmx", "height": 1344, "width": 1536, "x": 0, "y": 0 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/happy-turtle.world" };
const _main_worlds_lightshipsworld = { "maps": [{ "fileName": "maps/vehicle-one-more-day.tmx", "height": 832, "width": 736, "x": 0, "y": 0 }, { "fileName": "maps/[Lightships]/whaleship-f4.tmx", "height": 448, "width": 1568, "x": 1024, "y": 0 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/lightships.world" };
const _main_worlds_memoriesworld = { "maps": [{ "fileName": "maps/[Memories]/wonderland-visit-1-maze.tmx", "height": 992, "width": 992, "x": 0, "y": -160 }, { "fileName": "maps/[Memories]/well-of-memories.tmx", "height": 480, "width": 960, "x": 992, "y": -160 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/memories.world" };
const _main_worlds_myworldworld = { "maps": [{ "fileName": "maps/simplemap.tmx", "height": 640, "width": 800, "x": 64, "y": -160 }, { "fileName": "maps/simplemap2.tmx", "height": 640, "width": 640, "x": -160, "y": 480 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/myworld.world" };
const _main_worlds_somewhere_interiorsworld = { "maps": [{ "fileName": "maps/somewhere-interior-frost-lords-bounty-f1.tmx", "height": 480, "width": 352, "x": 0, "y": 0 }, { "fileName": "maps/interiors/somewhere-interior-copper-general-f1.tmx", "height": 480, "width": 352, "x": 384, "y": 0 }, { "fileName": "maps/interiors/somewhere-interior-info-center-f1.tmx", "height": 416, "width": 384, "x": 768, "y": 0 }, { "fileName": "maps/interiors/somewhere-interior-blacksmith-f1.tmx", "height": 576, "width": 352, "x": 1152, "y": 0 }, { "fileName": "maps/interiors/somewhere-dist6-little-earth-f1.tmx", "height": 960, "width": 672, "x": 1536, "y": 0 }, { "fileName": "maps/interiors/somewhere-interior-happs-f1.tmx", "height": 512, "width": 448, "x": 2208, "y": 0 }, { "fileName": "maps/interiors/somewhere-d2-black-powder.tmx", "height": 480, "width": 416, "x": 2208, "y": 608 }, { "fileName": "maps/interiors/somewhere-d2-mall.tmx", "height": 1312, "width": 1056, "x": 2624, "y": 608 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/somewhere-interiors.world" };
const _main_worlds_somewhereworld = { "maps": [{ "fileName": "maps/somewhere-district-3.tmx", "height": 1184, "width": 1024, "x": 2144, "y": 1152 }, { "fileName": "maps/somewhere-docks.tmx", "height": 2112, "width": 2304, "x": -288, "y": 2144 }, { "fileName": "maps/somewhere-district-2.tmx", "height": 2624, "width": 1984, "x": 0, "y": -2592 }, { "fileName": "maps/somewhere-district-1.tmx", "height": 2336, "width": 1888, "x": 0, "y": 128 }, { "fileName": "maps/somewhere-east-park.tmx", "height": 1152, "width": 672, "x": 2144, "y": -288 }, { "fileName": "maps/somewhere-refuge-row.tmx", "height": 1184, "width": 1056, "x": 2688, "y": -320 }, { "fileName": "maps/somewhere-district-6.tmx", "height": 3136, "width": 1728, "x": 2016, "y": -3232 }], "onlyShowAdjacentMaps": false, "type": "world", "basePath": "./main/worlds", "id": "./main/worlds/somewhere.world" };
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
var __defProp$K = Object.defineProperty;
var __getOwnPropDesc$K = Object.getOwnPropertyDescriptor;
var __decorateClass$K = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$K(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$K(target, key, result);
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
Fire = __decorateClass$K([Skill({
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
var __defProp$J = Object.defineProperty;
var __getOwnPropDesc$J = Object.getOwnPropertyDescriptor;
var __decorateClass$J = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$J(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$J(target, key, result);
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
Fighter = __decorateClass$J([Class({
  name: "Fighter",
  description: "A great fighter!",
  skillsToLearn: [{
    level: 5,
    skill: Fire
  }],
  statesEfficiency: [],
  elementsEfficiency: []
})], Fighter);
var __defProp$I = Object.defineProperty;
var __getOwnPropDesc$I = Object.getOwnPropertyDescriptor;
var __decorateClass$I = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$I(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$I(target, key, result);
  return result;
};
const {
  MAXHP
} = Presets$1;
let Tero = class {
  onSet(player2) {
  }
};
Tero = __decorateClass$I([Actor({
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
    player2.items || (player2.items = []);
    player2.on("click", () => {
      console.log(player2.id);
    });
  },
  onInput(player2, {
    input
  }) {
    if (input == Control.Back) {
      player2.callMainMenu();
    }
  },
  async onJoinMap(player2) {
    player2.cameraFollow(player2, {
      smoothMove: true
    });
    player2.attachShape({
      height: 100,
      width: 100,
      positioning: ShapePositioning.Center,
      name: "player-interact-shape"
    });
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
    const destDir = shape.properties["destDir"];
    if (destName) {
      if (destX && destY) {
        await player2.changeMap(destName, {
          x: destX * destinationMapScale,
          y: destY * destinationMapScale
        });
      } else {
        await player2.changeMap(destName);
      }
      if (destDir) {
        switch (destDir) {
          case "down":
          case "d":
            player2.changeDirection(Direction.Down);
            break;
          case "left":
          case "l":
            player2.changeDirection(Direction.Left);
            break;
          case "right":
          case "r":
            player2.changeDirection(Direction.Right);
            break;
          case "up":
          case "u":
            player2.changeDirection(Direction.Up);
            break;
        }
      }
    }
  }
};
var Utils;
((Utils2) => {
  function isShapeObjectPlayerRadius(shape) {
    return shape.name == "player-interact-shape";
  }
  Utils2.isShapeObjectPlayerRadius = isShapeObjectPlayerRadius;
})(Utils || (Utils = {}));
class NpcEvent extends RpgEvent {
  constructor() {
    super(...arguments);
    this._isMale = true;
    this._isInsideInteractShape = false;
  }
  onInit() {
    this.getCurrentMap();
    {
      return;
    }
  }
  //#region Properties
  get isFemale() {
    return !this._isMale;
  }
  set isFemale(value) {
    this._isMale = !value;
  }
  get isMale() {
    return this._isMale;
  }
  set isMale(value) {
    this._isMale = value;
  }
  //#endregion Properties
  //#region Event Handlers
  async onInShape(shape) {
    this.showEmotionBubble(EmotionBubble.Exclamation);
    if (Utils.isShapeObjectPlayerRadius(shape)) {
      this._isInsideInteractShape = true;
    }
  }
  async onOutShape(shape) {
    if (Utils.isShapeObjectPlayerRadius(shape)) {
      this._isInsideInteractShape = false;
    }
  }
  //#endregion Event Handlers
  //#region Dialog Stuff
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
    const possibleChoices = dialog.buttons ? dialog.buttons.map((b) => {
      return {
        text: b.text,
        value: b.value && b.value[0] || "none"
      };
    }) : [];
    const choice = await player2.showChoices(this._formatDialogString(dialog.text, speaker), possibleChoices, this._getDialogOptions(options));
    return choice;
  }
  _getDialogOptions(options) {
    const dialogOptions = options || {};
    dialogOptions.talkWith || (dialogOptions.talkWith = this);
    dialogOptions.typewriterEffect = Config.dialog.typewriterEffect;
    return dialogOptions;
  }
  //#endregion Dialog Stuff
}
class CrewmateEvent extends NpcEvent {
  onInit() {
    super.onInit();
    this.setComponentsTop(Components.text("{name}", {
      fill: "#80ff80",
      fontSize: Config.font.default.size,
      fontFamily: Config.font.default.family
    }), {
      // width: 64,
      // height: 16,
      // marginTop: 5,
      marginLeft: 0,
      marginRight: 0
      // marginBottom: 10
    });
  }
  // async onInShape(shape: RpgShape) {
  //     this.showEmotionBubble(EmotionBubble.Exclamation);
  // }
}
var __defProp$H = Object.defineProperty;
var __getOwnPropDesc$H = Object.getOwnPropertyDescriptor;
var __decorateClass$H = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$H(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$H(target, key, result);
  return result;
};
let VillagerEvent$n = class VillagerEvent extends CrewmateEvent {
  onInit() {
    this.setGraphic("crew-carrie-ward");
    this.name = "Carrie Ward";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "Heya, cap! You think they'll have any more of those Star Wars movies on the next world we stop at?");
  }
};
VillagerEvent$n = __decorateClass$H([EventData({
  name: "crew-carrie-ward",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$n);
var __defProp$G = Object.defineProperty;
var __getOwnPropDesc$G = Object.getOwnPropertyDescriptor;
var __decorateClass$G = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$G(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$G(target, key, result);
  return result;
};
let VillagerEvent$m = class VillagerEvent2 extends CrewmateEvent {
  onInit() {
    this.setGraphic("crew-eva-davis");
    this.name = "Eva Davis";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "I know the Void Realm is terrible and all, but it feels kind of nice to stare at an oppressive, lightless pit of despair that isn't a DOS prompt.");
    await this.speak(player2, "Oh, they probably didn't have DOS on your world, huh? Well, it's sort of like...");
    await this.speak(player2, "Never mind. You're probably happier not knowing.");
  }
};
VillagerEvent$m = __decorateClass$G([EventData({
  name: "crew-eva",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$m);
var __defProp$F = Object.defineProperty;
var __getOwnPropDesc$F = Object.getOwnPropertyDescriptor;
var __decorateClass$F = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$F(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$F(target, key, result);
  return result;
};
const identifier$5 = "crew-giuseppe";
let VillagerEvent$l = class VillagerEvent3 extends CrewmateEvent {
  onInit() {
    this.setGraphic(identifier$5);
    this.name = "Giuseppe";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "Ciao amico! I do hope we find some colore at our next stop. I'm getting dangerously low on black.");
  }
};
VillagerEvent$l = __decorateClass$F([EventData({
  name: identifier$5,
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$l);
var __defProp$E = Object.defineProperty;
var __getOwnPropDesc$E = Object.getOwnPropertyDescriptor;
var __decorateClass$E = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$E(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$E(target, key, result);
  return result;
};
const identifier$4 = "crew-gloria";
let VillagerEvent$k = class VillagerEvent4 extends CrewmateEvent {
  onInit() {
    this.setGraphic(identifier$4);
    this.name = "Gloria Molloy";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "*Gloria appears to be staring at a photo, but she quickly puts it away when she notices you.*");
    await this.speak(player2, "Oh, hey. Did you need something?");
  }
};
VillagerEvent$k = __decorateClass$E([EventData({
  name: identifier$4,
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$k);
var __defProp$D = Object.defineProperty;
var __getOwnPropDesc$D = Object.getOwnPropertyDescriptor;
var __decorateClass$D = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$D(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$D(target, key, result);
  return result;
};
const identifier$3 = "crew-hamisfore";
let VillagerEvent$j = class VillagerEvent5 extends CrewmateEvent {
  onInit() {
    this.setGraphic(identifier$3);
    this.name = "Hamisfore";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "Heya, kiddo. What d'you need? Is it time to break something?");
  }
};
VillagerEvent$j = __decorateClass$D([EventData({
  name: identifier$3,
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$j);
var __defProp$C = Object.defineProperty;
var __getOwnPropDesc$C = Object.getOwnPropertyDescriptor;
var __decorateClass$C = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$C(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$C(target, key, result);
  return result;
};
const identifier$2 = "crew-ootah";
let VillagerEvent$i = class VillagerEvent6 extends CrewmateEvent {
  onInit() {
    this.setGraphic(identifier$2);
    this.name = "Ootah";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "Ugh... I'm dyin' from not-enough-candy disease...");
    await this.speak(player2, "Howcome we ain't made it to candy world yet? Ya don't fink somefin' happened to it, do ya?");
  }
};
VillagerEvent$i = __decorateClass$C([EventData({
  name: identifier$2,
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$i);
var __defProp$B = Object.defineProperty;
var __getOwnPropDesc$B = Object.getOwnPropertyDescriptor;
var __decorateClass$B = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$B(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$B(target, key, result);
  return result;
};
const identifier$1 = "crew-tom-cox";
let VillagerEvent$h = class VillagerEvent7 extends CrewmateEvent {
  onInit() {
    this.setGraphic(identifier$1);
    this.name = "Tom Cox";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "This whole Voidspace thing is far out in, like, a bad way, man. Decidedly ungroovy.");
  }
};
VillagerEvent$h = __decorateClass$B([EventData({
  name: identifier$1,
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$h);
var __defProp$A = Object.defineProperty;
var __getOwnPropDesc$A = Object.getOwnPropertyDescriptor;
var __decorateClass$A = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$A(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$A(target, key, result);
  return result;
};
const identifier = "crew-tommy";
let VillagerEvent$g = class VillagerEvent8 extends CrewmateEvent {
  onInit() {
    this.setGraphic(identifier);
    this.name = "Tommy";
    super.onInit();
  }
  async onAction(player2) {
    await this.speak(player2, "Hey dude! How's it hangin'?");
    await this.speak(player2, "Do you think the next world will have snacks?");
  }
};
VillagerEvent$g = __decorateClass$A([EventData({
  name: identifier,
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$g);
class ZoneChangeEvent extends RpgEvent {
  async teleportPlayer(player2, destination, directionAfter, arrivalWalkDistance) {
    var _a, _b;
    if (!player2.canMove) {
      return;
    }
    const destinationMapScale = {
      x: ((_a = player2.getCurrentMap()) == null ? void 0 : _a.tileWidth) || 32,
      y: ((_b = player2.getCurrentMap()) == null ? void 0 : _b.tileHeight) || 32
    };
    player2.canMove = false;
    player2.teleport({
      x: destination.x * destinationMapScale.x,
      y: destination.y * destinationMapScale.y
    });
    if (directionAfter) {
      const dist = arrivalWalkDistance || 1;
      const modX = (directionAfter == Direction.Left ? -1 : directionAfter == Direction.Right ? 1 : 0) * dist;
      const modY = (directionAfter == Direction.Up ? -1 : directionAfter == Direction.Down ? 1 : 0) * dist;
      window.setTimeout(() => {
        player2.stopMoveTo();
        player2.canMove = true;
      }, 100);
      player2.moveTo({
        x: (destination.x + modX) * destinationMapScale.x,
        y: (destination.y + modY) * destinationMapScale.y
      }).subscribe({
        complete: () => {
          player2.canMove = true;
        }
      });
    } else {
      player2.canMove = true;
    }
  }
}
var __defProp$z = Object.defineProperty;
var __getOwnPropDesc$z = Object.getOwnPropertyDescriptor;
var __decorateClass$z = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$z(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$z(target, key, result);
  return result;
};
let ZoneChange$a = class ZoneChange extends ZoneChangeEvent {
  async onPlayerTouch(player2) {
    this.teleportPlayer(player2, {
      x: 11,
      y: 16
    }, Direction.Left, 0.5);
  }
};
ZoneChange$a = __decorateClass$z([EventData({
  name: "omd-b1-to-f1"
})], ZoneChange$a);
var __defProp$y = Object.defineProperty;
var __getOwnPropDesc$y = Object.getOwnPropertyDescriptor;
var __decorateClass$y = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$y(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$y(target, key, result);
  return result;
};
let ZoneChange$9 = class ZoneChange2 extends ZoneChangeEvent {
  async onPlayerTouch(player2) {
    this.teleportPlayer(player2, {
      x: 20,
      y: 14
    }, Direction.Right, 0.5);
  }
};
ZoneChange$9 = __decorateClass$y([EventData({
  name: "omd-f1-to-b1"
})], ZoneChange$9);
var __defProp$x = Object.defineProperty;
var __getOwnPropDesc$x = Object.getOwnPropertyDescriptor;
var __decorateClass$x = (decorators, target, key, kind) => {
  var result = kind > 1 ? void 0 : kind ? __getOwnPropDesc$x(target, key) : target;
  for (var i = decorators.length - 1, decorator; i >= 0; i--)
    if (decorator = decorators[i])
      result = (kind ? decorator(target, key, result) : decorator(result)) || result;
  if (kind && result)
    __defProp$x(target, key, result);
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
ZoneChange$8 = __decorateClass$x([EventData({
  name: "omd-f1-to-f2"
})], ZoneChange$8);
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
ZoneChange$7 = __decorateClass$w([EventData({
  name: "omd-f2-to-f1"
})], ZoneChange$7);
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
let VillagerEvent$f = class VillagerEvent9 extends RpgEvent {
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
VillagerEvent$f = __decorateClass$v([EventData({
  name: "ship-wheel",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$f);
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
let VillagerEvent$e = class VillagerEvent10 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("wonderland-chesire-cat");
    this.name = "Chesire Cat";
  }
  async onAction(player2) {
    await this.speak(player2, "I'm a freaky, eldritch abomination that happens to resemble a cat. Isn't that strange and upsetting?");
    await this.speak(player2, "Don't worry about it too much, kiddo.");
  }
};
VillagerEvent$e = __decorateClass$u([EventData({
  name: "mem-chesire-cat-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$e);
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
let VillagerEvent$d = class VillagerEvent11 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("wonderland-hedge-knight");
    this.name = "Hedge Knight";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#ffee00"
    }));
  }
  async onAction(player2) {
    await this.speak(player2, "Hail, traveler! I'm a friendly, overly trusting knight who doesn't seem to realize that literally every obstacle adventurers face is bigger than I am.");
  }
};
VillagerEvent$d = __decorateClass$t([EventData({
  name: "mem-hedge-knight-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent$d);
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
let VillagerEvent$c = class VillagerEvent12 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-arctic-dust");
    this.name = "Arctic Dust";
    this.setComponentsTop(Components.text("[Blacksmith] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "greeting",
      "npc_name": "§e[Blacksmith] Arctic Dust",
      "text": "Well met, traveler.",
      "buttons": [{
        "text": "Let's trade.",
        "value": ["greeting"]
      }, {
        "text": "Let's chat.",
        "value": ["chat"]
      }, {
        "text": "Goodbye.",
        "value": ["leaving"]
      }]
    }, {
      "scene_tag": "leaving",
      "npc_name": "",
      "text": "May the sun bless your afternoons."
    }, {
      "scene_tag": "chat",
      "npc_name": "",
      "text": "What do you want to talk about, traveler?",
      "buttons": [{
        "text": "You",
        "value": ["chat_self"]
      }, {
        "text": "This city",
        "value": ["chat_city"]
      }, {
        "text": "Nevermind.",
        "value": ["greeting"]
      }]
    }, {
      "scene_tag": "chat_city",
      "npc_name": "",
      "text": "Yes. §2Somewhere§r is a good place. Not as good as my homeland. But still good.",
      "buttons": [{
        "text": "Rumors?",
        "value": ["chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self",
      "npc_name": "",
      "text": "You want to talk about me? This is good! I know a lot about that!",
      "buttons": [{
        "text": "What are you?",
        "value": ["chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_city_rumors",
      "npc_name": "",
      "text": "You are going to think old Arctic Dust is crazy, but I never run out of ingots or fuel in this city. I keep using metal and using metal, but, §4after a sleep, I always find the same amount of raw metal§r as I had before all the making things.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self_what",
      "npc_name": "",
      "text": "I am Arctic Dust, and Arctic Dust is blacksmith. Finest §4tabaxi§r blacksmith in all of §2Decapos§r, as voted by Arctic Dust, haha!",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_family",
      "npc_name": "",
      "text": "My §1heartsong§r fell ill and departed from us more than a hundred moons ago, but I thank the §3Sun Father§r every day for our little cub.\n\nIt is just me and my §1Flower§r now. But if you buy enough from old Arctic Dust, maybe you can be family too, haha!",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_homeland",
      "npc_name": "",
      "text": "Arctic Dust comes from §2the land of Bitai§r. Beautiful place, blessed by the §3Sun Father§r himself! The afternoon naps were the best in the world. The afternoon naps here are pretty good here too, though they would be better with a sun, ha ha!",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$c = __decorateClass$s([EventData({
  name: "arctic-dust",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$c);
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
let VillagerEvent$b = class VillagerEvent13 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-berrak");
    this.name = "Berrak";
    this.setComponentsTop(Components.text("[Ship Parts] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "main",
      "npc_name": "§e[Ship Parts] Berrak",
      "text": "What d'ya need?",
      "buttons": [{
        "text": "Trade",
        "value": ["main"]
      }, {
        "text": "Chat",
        "value": ["chat"]
      }, {
        "text": "Nevermind.",
        "value": ["leaving"]
      }]
    }, {
      "scene_tag": "leaving",
      "npc_name": "",
      "text": "See ya."
    }, {
      "scene_tag": "chat",
      "npc_name": "",
      "text": "What d'ya wanna talk about?",
      "buttons": [{
        "text": "You.",
        "value": ["chat_self"]
      }, {
        "text": "This city.",
        "value": ["chat_city"]
      }, {
        "text": "Nevermind.",
        "value": ["main"]
      }]
    }, {
      "scene_tag": "chat_city",
      "npc_name": "",
      "text": "'Course. What'sit you wanna know?",
      "buttons": [{
        "text": "Rumors?",
        "value": ["chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self",
      "npc_name": "",
      "text": "I'm §1Berrak§r. I make §4ship parts§r.",
      "buttons": [{
        "text": "What are you?",
        "value": ["chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self_what",
      "npc_name": "",
      "text": "A bloke who makes ship parts. S'pose that makes me a smith of some sort.",
      "buttons": [{
        "text": "Informative.",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_family",
      "npc_name": "",
      "text": "§1My mum§r works at the hotel. I work here. Now you're up to speed.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_homeland",
      "npc_name": "",
      "text": "S'gone now, so it hardly matters, eh?",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_city"]
      }]
    }, {
      "scene_tag": "chat_city_rumors",
      "npc_name": "",
      "text": `You want rumors, eh?

I heard a rumor that a bloke who kept annoyin' a local smith spontaneously caught §o"painful punch in the jaw"§r disease. Nasty stuff.`,
      "buttons": [{
        "text": "[back]",
        "value": ["chat_city"]
      }]
    }];
    await this.speak(player2, "How'sit?");
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$b = __decorateClass$r([EventData({
  name: "berrak",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$b);
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
let VillagerEvent$a = class VillagerEvent14 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-berrak");
    this.name = "Berrak";
    this.setComponentsTop(Components.text("[Ship Parts] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "greeting",
      "npc_name": "§e[Jeweler] Deldric Helcral",
      "text": "Hail, customer! \n\nTake a look around, and give me or me §1wee assistant§r a shout if somethin' strikes yer fancy.",
      "buttons": [{
        "text": "Trade",
        "value": ["greeting"]
      }, {
        "text": "Chat",
        "value": ["chat"]
      }, {
        "text": "Nevermind.",
        "value": ["leaving"]
      }]
    }, {
      "scene_tag": "leaving",
      "npc_name": "",
      "text": "'Til next time."
    }, {
      "scene_tag": "chat",
      "npc_name": "",
      "text": "It's small talk yer after, eh? Me wit's not near as sharp as the cuts on me gems, but I'll oblige ya.",
      "buttons": [{
        "text": "You.",
        "value": ["chat_self"]
      }, {
        "text": "This city.",
        "value": ["chat_city"]
      }, {
        "text": "Nevermind.",
        "value": ["greeting"]
      }]
    }, {
      "scene_tag": "chat_city",
      "npc_name": "",
      "text": "Hel– I mean, heck of a town, innit? I'd have been too young to get me own shop back home, but nobody s'much as bats an eye here.",
      "buttons": [{
        "text": "Rumors?",
        "value": ["chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self",
      "npc_name": "",
      "text": "Me name's §1Deldric§r. I come from the proud house of §1Helcral§r in the mighty kingdom of §2Bolderhal§r. And before ya go judgin' me beard, ye should know I'm still a few months shy of my twentieth year. It'll grow in.",
      "buttons": [{
        "text": "What are you?",
        "value": ["chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self_what",
      "npc_name": "",
      "text": "I'm the jeweler 'round here. And if yer one o' them that hasn't seen a §4dwarf§r before, I be one.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_family",
      "npc_name": "",
      "text": "Me gran, gramps, and mam all went out fightin' orcs. Me pap and brothers all vanished in §4The Fracturin'§r. I've no doubts they're all singin' and sharin' mead with the ancestors now.\n\nThe wee one o'er there, §1Saélihn§r, lost her folks in The Fracturin' too. She did nae have anybody to look after her when she first showed up, so she's been me little sister ever since.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_homeland",
      "npc_name": "",
      "text": "Me name's §1Deldric§r. I come from the proud house of §1Helcral§r in the mighty kingdom of §2Bolderhal§r. And before ya go judgin' me beard, ye should know I'm still a few months shy of my twentieth year. It'll grow in.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_city"]
      }]
    }, {
      "scene_tag": "chat_city_rumors",
      "npc_name": "",
      "text": "I'm nae the sort who likes to talk behind folks' backs, but if I had to say somethin' was fishy, I'd say it's the info from that §1Berty§r guy. Near everythin' out his mouth seems made up on the spot. I'm nae sure he even realizes how much of a loon he sounds.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_city"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$a = __decorateClass$q([EventData({
  name: "berrak",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$a);
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
let VillagerEvent$9 = class VillagerEvent15 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-dread");
    this.name = "Dread";
    this.setComponentsTop(Components.text("[Surgeon] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
VillagerEvent$9 = __decorateClass$p([EventData({
  name: "dread",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$9);
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
let VillagerEvent$8 = class VillagerEvent16 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-ekhaas-nasaar");
    this.name = "Ekhaas Nasaar";
    this.setComponentsTop(Components.text("[Sheriff] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "greeting",
      "npc_name": "§e[Sheriff] Ekhaas Nasaar",
      "text": "Greetings, citizen.",
      "buttons": [{
        "text": "Chat",
        "value": ["chat"]
      }, {
        "text": "Nevermind."
      }]
    }, {
      "scene_tag": "chat",
      "npc_name": "",
      "text": "You are aware that law and order do not enforce themselves, yes? Crime laughs while you burn my ear with idle chatter.",
      "buttons": [{
        "text": "You.",
        "value": ["chat_self"]
      }, {
        "text": "This city.",
        "value": ["chat_city"]
      }, {
        "text": "Nevermind."
      }]
    }, {
      "scene_tag": "chat_city",
      "npc_name": "",
      "text": "Ah. A sensible request, though the §1strange gnome§r at the §2Information Center§r may be better suited to answer such questions.",
      "buttons": [{
        "text": "Rumors?",
        "value": ["chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self",
      "npc_name": "",
      "text": "That is a vague an inane request. Be more specific, citizen.",
      "buttons": [{
        "text": "What are you?",
        "value": ["chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["chat"]
      }]
    }, {
      "scene_tag": "chat_self_what",
      "npc_name": "",
      "text": "I am Ekhaas Nasaar - proud §4hobgoblin§r warrior. I stood watch over the ruins of the §3Sarakt§r for decades, preparing for the inevitable return of their arcane tyrany.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_family",
      "npc_name": "",
      "text": "Three of my descendants survived §4The Fracturing§r - far more than most familes. Doubtless it is because the universe knows they are suited to combat the evils that plague it. My §1granddaughters§r dwell here in §4Somewhere§r, and my §1grandson§r is the commander of the armed forces of a turtle vessel. I have trained each of them since they could hold a blade. You would do well not to cross them.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_self"]
      }]
    }, {
      "scene_tag": "chat_self_homeland",
      "npc_name": "",
      "text": "I hail from the nation of §4Prysyaha§r. It was a nation founded on duty, honor, and necessity, not like the petty things that drive other nations.\n\nI dedicated my life to slaying any that would threaten the freedom of any peoples. That oath is not broken just because my world is.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_city"]
      }]
    }, {
      "scene_tag": "chat_city_rumors",
      "npc_name": "",
      "text": "It is unwise to deal in rumors. A good warrior knows to share only things that are known.",
      "buttons": [{
        "text": "[back]",
        "value": ["chat_city"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$8 = __decorateClass$o([EventData({
  name: "ekhaas-nasaar",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$8);
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
let VillagerEvent$7 = class VillagerEvent17 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-lazy-flower");
    this.name = "Lazy Flower";
    this.setComponentsTop(Components.text("[Shipwright] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "lazy_flower_greeting",
      "npc_name": "§e[Shipwright] Lazy Flower",
      "text": "Hiya, friend!",
      "buttons": [{
        "text": "Let's trade.",
        "value": ["lazy_flower_greeting"]
      }, {
        "text": "Let's chat.",
        "value": ["lazy_flower_chat"]
      }, {
        "text": "Goodbye.",
        "value": ["lazy_flower_leaving"]
      }]
    }, {
      "scene_tag": "lazy_flower_leaving",
      "npc_name": "",
      "text": "Bye! May the sun bless your afternoons!"
    }, {
      "scene_tag": "lazy_flower_chat",
      "npc_name": "",
      "text": "Ooh, is it time to dish? Do you have any good travel stories for me?\n\nOh, you want me to do the dishing? That's not as fun. Still pretty fun, though!",
      "buttons": [{
        "text": "You",
        "value": ["lazy_flower_chat_self"]
      }, {
        "text": "This city",
        "value": ["lazy_flower_chat_city"]
      }, {
        "text": "Nevermind.",
        "value": ["lazy_flower_greeting"]
      }]
    }, {
      "scene_tag": "lazy_flower_chat_city",
      "npc_name": "",
      "text": "§2Somewhere§r is so weird. It keeps changing, and there are people from so many worlds that sound so different than where I grew up. I love it!",
      "buttons": [{
        "text": "Rumors?",
        "value": ["lazy_flower_chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["lazy_flower_chat"]
      }]
    }, {
      "scene_tag": "lazy_flower_chat_self",
      "npc_name": "",
      "text": "You want to talk about me? Okay, but only if you tell me about all the sparkly worlds you've visited later, okay?",
      "buttons": [{
        "text": "What are you?",
        "value": ["lazy_flower_chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["lazy_flower_chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["lazy_flower_chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["lazy_flower_chat"]
      }]
    }, {
      "scene_tag": "lazy_flower_chat_city_rumors",
      "npc_name": "",
      "text": "Sometimes I hear §4weird little feet§r running around when most people are asleep. Do you think that has anything to do with how supplies keep appearing in my §ododa§r's shop?",
      "buttons": [{
        "text": "[back]",
        "value": ["lazy_flower_chat_city"]
      }]
    }, {
      "scene_tag": "lazy_flower_chat_self_what",
      "npc_name": "",
      "text": `An optimist? Oh, you mean, like, my species? I'm a §4tabaxi§r, but I think a lot of people call us §4catfolk§r. "Catfolk" is descriptive and all, but... it's a little plain, right? Tabaxi is §oway§r better.`,
      "buttons": [{
        "text": "[back]",
        "value": ["lazy_flower_chat_self"]
      }]
    }, {
      "scene_tag": "lazy_flower_chat_self_family",
      "npc_name": "",
      "text": "My §o§1doda§r runs the forge, and I can tell he loves it. I'm glad he can keep doing what he loves, even at the end of world!\n\nMy §o§1madu§r died when I was little, so it's just me and my §ododa§r.",
      "buttons": [{
        "text": "[back]",
        "value": ["lazy_flower_chat_self"]
      }]
    }, {
      "scene_tag": "lazy_flower_chat_self_homeland",
      "npc_name": "",
      "text": "I grew up in the §2City of Canyon Winds§r. It was super warm and sunny - great for napping, but I like it here, too. I get to meet a lot of really strange people, and I get to hear about all kinds of really fun sounding places.\n\nI would §okill§r for a §3Soothebrick§r, though. If you find any–§owhat's the Common term again?§r Catnip! If you find any catnip, I will be your best friend. §lI would help you hide a body§r for some catnip.",
      "buttons": [{
        "text": "[back]",
        "value": ["lazy_flower_chat_self"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$7 = __decorateClass$n([EventData({
  name: "lazy-flower",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$7);
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
let VillagerEvent$6 = class VillagerEvent18 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-portia");
    this.name = "Portia 'Jamjar' Fiddlewick";
    this.setComponentsTop(Components.text("[Journalist] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "portia_greeting",
      "npc_name": "§ePortia 'Jamjar' Fiddlewick",
      "text": "Hey, Mac. Got a scoop for me?",
      "buttons": [{
        "text": "What's the latest?",
        "value": ["portia_chat_city_rumors"]
      }, {
        "text": "Let's chat.",
        "value": ["portia_chat"]
      }, {
        "text": "Goodbye.",
        "value": ["portia_leaving"]
      }]
    }, {
      "scene_tag": "portia_leaving",
      "text": "Don't be a stranger!",
      "buttons": []
    }, {
      "scene_tag": "portia_chat",
      "npc_name": "",
      "text": "I'm always down for a good lipflap. What's the word?",
      "buttons": [{
        "text": "You",
        "value": ["portia_chat_self"]
      }, {
        "text": "This city",
        "value": ["portia_chat_city"]
      }, {
        "text": "Nevermind.",
        "value": ["portia_greeting"]
      }]
    }, {
      "scene_tag": "portia_chat_city",
      "npc_name": "",
      "text": "It's a pretty odd town, right? That's fine by me. Lots of weirdos means lots of news.",
      "buttons": [{
        "text": "Rumors?",
        "value": ["portia_chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["portia_chat"]
      }]
    }, {
      "scene_tag": "portia_chat_self",
      "npc_name": "",
      "text": "Hey! I'm the one who does interviews, Mac!\n\nEh, a little seltzer adds kick to the spuds. What do you wanna know?",
      "buttons": [{
        "text": "What are you?",
        "value": ["portia_chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["portia_chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["portia_chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["portia_chat"]
      }]
    }, {
      "scene_tag": "portia_chat_city_rumors",
      "text": "Why're you asking me directly? You too cheap to buy my §o§lfree§r paper or something?\n\nWait... You know your letters, right? If not, scratch my little outburst there.",
      "buttons": [{
        "text": "[back]",
        "value": ["portia_chat"]
      }]
    }, {
      "scene_tag": "portia_chat_self_what",
      "text": "I'm Portia Fiddlewick, but some of my old buddies took to calling me 'Jamjar' during the war. Don't ask why; you don't wanna know.\n\nI'm a reporter now. I'm smaller than most folk, so it's real easy for me to creep up on mooks and catch 'em red handed. Makes for great reading.",
      "buttons": [{
        "text": "[back]",
        "value": ["portia_chat_self"]
      }]
    }, {
      "scene_tag": "portia_chat_self_family",
      "text": "Don't got a blood family, but who needs one, right Mac? All my readers are family!",
      "buttons": [{
        "text": "[back]",
        "value": ["portia_chat_self"]
      }]
    }, {
      "scene_tag": "portia_chat_self_homeland",
      "text": "That story's hardly worth telling, Mac. I grew up in a backwater hole where nothing ever happened. Joined up with the mercs to feed myself. Retired early on account of how good they pay if you survive.\n\nBooooring! Now here? Here's there's more weirdos than you can shake a stick at, Mac. That's the cat's nightcap.",
      "buttons": [{
        "text": "[back]",
        "value": ["portia_chat_self"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$6 = __decorateClass$m([EventData({
  name: "portia",
  hitbox: {
    width: 32,
    height: 32
  }
})], VillagerEvent$6);
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
let HealingPotionMinor = class {
  onAdd(player2) {
  }
  onUse(player2) {
    player2.hp += 5;
  }
  onUseFailed(player2) {
  }
  onRemove(player2) {
  }
};
HealingPotionMinor = __decorateClass$l([Item({
  name: "Healing Potion, Minor",
  description: "Gives 5 HP",
  price: 4,
  hpValue: 5,
  hitRate: 1,
  consumable: true,
  addStates: [],
  removeStates: [],
  elements: [],
  // effects: [],
  paramsModifier: {},
  level: 1
})], HealingPotionMinor);
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
const hpValue$3 = 15;
let HealingPotionLesser = class {
  onAdd(player2) {
  }
  onUse(player2) {
    player2.hp += hpValue$3;
  }
  onUseFailed(player2) {
  }
  onRemove(player2) {
  }
};
HealingPotionLesser = __decorateClass$k([Item({
  name: "Healing Potion, Lesser",
  description: `Gives ${hpValue$3} HP`,
  price: 12,
  hpValue: hpValue$3,
  hitRate: 1,
  consumable: true,
  addStates: [],
  removeStates: [],
  elements: [],
  // effects: [],
  paramsModifier: {},
  level: 13
})], HealingPotionLesser);
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
const hpValue$2 = 25;
let HealingPotionModerate = class {
  onAdd(player2) {
  }
  onUse(player2) {
    player2.hp += hpValue$2;
  }
  onUseFailed(player2) {
  }
  onRemove(player2) {
  }
};
HealingPotionModerate = __decorateClass$j([Item({
  name: "Healing Potion, Moderate",
  description: `Gives ${hpValue$2} HP`,
  price: 50,
  hpValue: hpValue$2,
  hitRate: 1,
  consumable: true,
  addStates: [],
  removeStates: [],
  elements: [],
  // effects: [],
  paramsModifier: {},
  level: 16
})], HealingPotionModerate);
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
const hpValue$1 = 50;
let HealingPotionGreater = class {
  onAdd(player2) {
  }
  onUse(player2) {
    player2.hp += hpValue$1;
  }
  onUseFailed(player2) {
  }
  onRemove(player2) {
  }
};
HealingPotionGreater = __decorateClass$i([Item({
  name: "Healing Potion, Greater",
  description: `Gives ${hpValue$1} HP`,
  price: 400,
  hpValue: hpValue$1,
  hitRate: 1,
  consumable: true,
  addStates: [],
  removeStates: [],
  elements: [],
  // effects: [],
  paramsModifier: {},
  level: 12
})], HealingPotionGreater);
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
const hpValue = 70;
let HealingPotionMajor = class {
  onAdd(player2) {
  }
  onUse(player2) {
    player2.hp += hpValue;
  }
  onUseFailed(player2) {
  }
  onRemove(player2) {
  }
};
HealingPotionMajor = __decorateClass$h([Item({
  name: "Healing Potion, Major",
  description: `Gives ${hpValue} HP`,
  price: 5e3,
  hpValue,
  hitRate: 1,
  consumable: true,
  addStates: [],
  removeStates: [],
  elements: [],
  // effects: [],
  paramsModifier: {},
  level: 18
})], HealingPotionMajor);
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
let VillagerEvent$5 = class VillagerEvent19 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-throden");
    this.name = "Shopkeeper";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#ffee00"
    }));
  }
  async onAction(player2) {
    await this.speak(player2, "Welcome, welcome! What can I do you for?");
    await player2.callShop([HealingPotionMinor, HealingPotionLesser, HealingPotionModerate, HealingPotionGreater, HealingPotionMajor]);
  }
};
VillagerEvent$5 = __decorateClass$g([EventData({
  name: "throden",
  hitbox: {
    width: 32,
    height: 32
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
let VillagerEvent$4 = class VillagerEvent20 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-tobbler");
    this.name = "Tobbler";
    this.setComponentsTop(Components.text("['Doctor'] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "tobbler_greeting",
      "npc_name": "§e[Doctor] Tobbler",
      "text": "Hillo!\n\nI sense your problem. You have too many ghosts.",
      "buttons": [{
        "text": "Chat",
        "value": ["tobbler_chat"]
      }, {
        "text": "Treat",
        "value": ["tobbler_greeting"]
      }, {
        "text": "Nevermind.",
        "value": ["tobbler_leaving"]
      }]
    }, {
      "scene_tag": "tobbler_leaving",
      "npc_name": "",
      "text": "Watch out for ghosts!"
    }, {
      "scene_tag": "tobbler_chat",
      "npc_name": "",
      "text": "Okay, but this won't cure your ghosts.\n\nWhat do you want to talk about?",
      "buttons": [{
        "text": "You.",
        "value": ["tobbler_chat_self"]
      }, {
        "text": "This city.",
        "value": ["tobbler_chat_city"]
      }, {
        "text": "Nevermind."
      }]
    }, {
      "scene_tag": "tobbler_chat_city",
      "npc_name": "",
      "text": "Did you know this city is full of ghosts? I bet there are at least two haunting you §lright now!§r",
      "buttons": [{
        "text": "Rumors?",
        "value": ["tobbler_chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["tobbler_chat"]
      }]
    }, {
      "scene_tag": "tobbler_chat_self",
      "npc_name": "",
      "text": "Fun fact: I am not a ghost!",
      "buttons": [{
        "text": "What are you?",
        "value": ["tobbler_chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["tobbler_chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["tobbler_chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["tobbler_chat"]
      }]
    }, {
      "scene_tag": "tobbler_chat_self_what",
      "npc_name": "",
      "text": "I am a doctor. I am also slightly frightened of ghosts. Only slightly.",
      "buttons": [{
        "text": "[back]",
        "value": ["tobbler_chat_self"]
      }]
    }, {
      "scene_tag": "tobbler_chat_self_family",
      "npc_name": "",
      "text": "I had several thousand brothers and sisters, but they perished in the fracturing, so they are all ghosts now.\n\nNo matter how many times I ask, they refuse to stop haunting me.",
      "buttons": [{
        "text": "[back]",
        "value": ["tobbler_chat_self"]
      }]
    }, {
      "scene_tag": "tobbler_chat_self_homeland",
      "npc_name": "",
      "text": "I came from a luscious, slimey swamp that was ghost-free. Its many slimes were a natural ghost-repellant, you see.\n\nRhyming also repels ghosts.",
      "buttons": [{
        "text": "[back]",
        "value": ["tobbler_chat_self"]
      }]
    }, {
      "scene_tag": "tobbler_chat_city_rumors",
      "npc_name": "",
      "text": "Oh, yes! I have a very juicy rumor for you!\n\n§o§nThe frog pauses to lick his eye.§r\n\nThis town has many ghosts. You'll probably become one soon, based on the ghost that currently seems to be nibbling on your kidneys.",
      "buttons": [{
        "text": "[back]",
        "value": ["tobbler_chat_city"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$4 = __decorateClass$f([EventData({
  name: "tobbler",
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
let VillagerEvent$3 = class VillagerEvent21 extends NpcEvent {
  onInit() {
    super.onInit();
    this.setGraphic("sw-tuura-nasaar");
    this.name = "Tuura Nasaar";
    this.setComponentsTop(Components.text("[Chef] {name}", {
      fill: "#ffee00",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
      "scene_tag": "tuura_nasaar_greeting",
      "npc_name": "§e[Chef] Tuura Nasaar",
      "text": "The hells are you doing in my kitchen? You're too foul smelling and misshapen to be an ingredient.\n\nLeave, unless you want to volunteer to be the roast pig for Table 6!",
      "buttons": [{
        "text": "Trade",
        "value": ["tuura_nasaar_greeting"]
      }, {
        "text": "Chat",
        "value": ["tuura_nasaar_chat"]
      }, {
        "text": "Nevermind.",
        "value": ["tuura_nasaar_leaving"]
      }]
    }, {
      "scene_tag": "tuura_nasaar_leaving",
      "npc_name": "",
      "text": "§oNareshti§r."
    }, {
      "scene_tag": "tuura_nasaar_chat",
      "npc_name": "",
      "text": "I can't help but notice you are not gone yet. Will you leave faster if I answer your inane questions?\n\nFine. What do you want to annoy me about?",
      "buttons": [{
        "text": "You.",
        "value": ["tuura_nasaar_chat_self"]
      }, {
        "text": "This city.",
        "value": ["tuura_nasaar_chat_city"]
      }, {
        "text": "Nevermind."
      }]
    }, {
      "scene_tag": "tuura_nasaar_chat_city",
      "npc_name": "",
      "text": "What do I look like, §okhuylo§r? The city council?",
      "buttons": [{
        "text": "Rumors?",
        "value": ["tuura_nasaar_chat_city_rumors"]
      }, {
        "text": "Nevermind.",
        "value": ["tuura_nasaar_chat"]
      }]
    }, {
      "scene_tag": "tuura_nasaar_chat_self",
      "npc_name": "",
      "text": "§oTy mabutʹ zhartuyesh!§r If you are trying to make me like you, you are barking in the wrong forest!\n\nWhat?",
      "buttons": [{
        "text": "What are you?",
        "value": ["tuura_nasaar_chat_self_what"]
      }, {
        "text": "Your family.",
        "value": ["tuura_nasaar_chat_self_family"]
      }, {
        "text": "Your homeland.",
        "value": ["tuura_nasaar_chat_self_homeland"]
      }, {
        "text": "Nevermind.",
        "value": ["tuura_nasaar_chat"]
      }]
    }, {
      "scene_tag": "tuura_nasaar_chat_self_what",
      "npc_name": "",
      "text": 'A chef.\n\nIf you were asking about my people, I am an §ooplot§r. I think the outsider term is §4"hobgoblin."§r',
      "buttons": [{
        "text": "[back]",
        "value": ["tuura_nasaar_chat_self"]
      }]
    }, {
      "scene_tag": "tuura_nasaar_chat_self_family",
      "npc_name": "",
      "text": "Much of my family survived §4The Fracturing§r. My §1grandmother§r is the sheriff - it was the closest thing to a millitary for her to command here. My §1baby sister§r works with the admirably un-chatty man who makes chairs, and my §1elder brother§r lives on a §2flying turtle§r. Apparently his job is to ruin anyone who gets too testy on the turtle. I like my kitchen, but I almost envy him getting to draw so much blood.",
      "buttons": [{
        "text": "[back]",
        "value": ["tuura_nasaar_chat_self"]
      }]
    }, {
      "scene_tag": "tuura_nasaar_chat_self_homeland",
      "npc_name": "",
      "text": "§4Prysyaha§r. That's where I come from. It had giant mountains, sweeping plains, and I could legally kill anyone who annoyed me... I miss that.",
      "buttons": [{
        "text": "[back]",
        "value": ["tuura_nasaar_chat_city"]
      }]
    }, {
      "scene_tag": "tuura_nasaar_chat_city_rumors",
      "npc_name": "",
      "text": "§1That little §odyvak§r who works at the dockhouse is too nosy for someone so boot-sized. I've seen him slinking around in the shadows were he aughtn't be.\n\nIf I catch him following §ome§r, I'm going to try out that orcish recipe for Halfling Pot Pie.",
      "buttons": [{
        "text": "[back]",
        "value": ["tuura_nasaar_chat_city"]
      }]
    }];
    await this.showTextFromMinecraftDialog(player2, scenes);
  }
};
VillagerEvent$3 = __decorateClass$e([EventData({
  name: "tuura-nasaar",
  hitbox: {
    width: 32,
    height: 32
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
let VillagerEvent$2 = class VillagerEvent22 extends RpgEvent {
  onInit() {
    this.setGraphic("ancient-crystal");
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
let VillagerEvent$1 = class VillagerEvent23 extends RpgEvent {
  onInit() {
    this.setGraphic("ancient-crystal");
    this.name = "Teleport";
    this.setComponentsTop(Components.text("{name}", {
      fill: "#66ffff",
      fontSize: 12,
      fontFamily: "Pixelify Sans"
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
let VillagerEvent24 = class extends RpgEvent {
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
VillagerEvent24 = __decorateClass$4([EventData({
  name: "EV-1",
  hitbox: {
    width: 32,
    height: 16
  }
})], VillagerEvent24);
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
    await player2.changeMap("vehicle-one-more-day");
  }
};
let RpgServerModuleEngine = class {
};
RpgServerModuleEngine = __decorateClass$2([
  RpgModule({
    player,
    events: [VillagerEvent$n, VillagerEvent$m, VillagerEvent$l, VillagerEvent$k, VillagerEvent$j, VillagerEvent$i, VillagerEvent$h, VillagerEvent$g, ZoneChange$a, ZoneChange$9, ZoneChange$8, ZoneChange$7, VillagerEvent$f, VillagerEvent$e, VillagerEvent$d, VillagerEvent$c, VillagerEvent$b, VillagerEvent$a, VillagerEvent$9, VillagerEvent$8, VillagerEvent$7, VillagerEvent$6, VillagerEvent$5, VillagerEvent$4, VillagerEvent$3, ZoneChange$6, ZoneChange$5, ZoneChange$4, ZoneChange$3, ZoneChange$2, ZoneChange$1, ZoneChange11, VillagerEvent$2, VillagerEvent$1, VillagerEvent24, CrewmateEvent, NpcEvent, ZoneChangeEvent].map((val) => {
      if (!val) {
        throw new Error('Do you have "export default" in this file ? :  ./main/events/_base-classes/zone-change.ts');
      }
      return val;
    }),
    database: [Tero, Fighter, HealingPotionGreater, HealingPotionLesser, HealingPotionMajor, HealingPotionMinor, HealingPotionModerate, Fire, Paralyse].map((val) => {
      if (!val) {
        throw new Error('Do you have "export default" in this file ? :  ./main/database/states/paralyse.ts');
      }
      return val;
    }),
    maps: [SimpleMap],
    worldMaps: [_main_worlds_dev_roomworld, _main_worlds_happy_turtleworld, _main_worlds_lightshipsworld, _main_worlds_memoriesworld, _main_worlds_myworldworld, _main_worlds_somewhere_interiorsworld, _main_worlds_somewhereworld]
  })
], RpgServerModuleEngine);
const _main = {
  client: RpgClientModuleEngine,
  server: RpgServerModuleEngine
};
const arrow_vue_vue_type_style_index_0_scoped_85e0311b_lang = "";
const _sfc_main$g = {
  props: {
    direction: {
      type: String,
      default: "down"
    },
    size: {
      type: Number,
      default: 0.5
    },
    center: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    style() {
      return {
        "border-width": `0 ${this.size}em`,
        "border-top": `${this.size}em solid white`
      };
    }
  }
};
function _sfc_render$g(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("i", {
    class: normalizeClass(["arrow", { [$props.direction]: true, center: $props.center }]),
    style: normalizeStyle($options.style)
  }, null, 6);
}
const Arrow = /* @__PURE__ */ _export_sfc(_sfc_main$g, [["render", _sfc_render$g], ["__scopeId", "data-v-85e0311b"]]);
const window_vue_vue_type_style_index_0_lang = "";
const window_vue_vue_type_style_index_1_scoped_40de05c4_lang = "";
const _sfc_main$f = {
  name: "rpg-window",
  props: ["width", "height", "message", "position", "fullWidth", "arrow"],
  data() {
    return {
      loading: false
    };
  },
  computed: {
    classPosition() {
      return {
        [this.position]: true
      };
    },
    css() {
      return {
        "full-width": this.fullWidth
      };
    }
  },
  mounted() {
    this.loading = true;
  },
  components: {
    Arrow
  }
};
const _hoisted_1$b = { key: 0 };
const _hoisted_2$7 = { key: 1 };
function _sfc_render$f(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Arrow = resolveComponent("Arrow");
  return openBlock(), createBlock(Transition, { name: "fade" }, {
    default: withCtx(() => [
      $data.loading ? (openBlock(), createElementBlock("div", {
        key: 0,
        class: normalizeClass(["window", $options.classPosition]),
        style: normalizeStyle([{ "pointer-events": "auto" }, { height: $props.height }])
      }, [
        createBaseVNode("div", {
          class: normalizeClass(["window-content", $options.css]),
          style: normalizeStyle({ width: $props.width })
        }, [
          $props.arrow == "up" ? (openBlock(), createElementBlock("div", _hoisted_1$b, [
            createVNode(_component_Arrow, {
              center: true,
              direction: "up"
            })
          ])) : createCommentVNode("", true),
          renderSlot(_ctx.$slots, "default", {}, void 0, true),
          $props.arrow == "down" ? (openBlock(), createElementBlock("div", _hoisted_2$7, [
            createVNode(_component_Arrow, {
              center: true,
              direction: "down"
            })
          ])) : createCommentVNode("", true)
        ], 6)
      ], 6)) : createCommentVNode("", true)
    ]),
    _: 3
  });
}
const WindowUi = /* @__PURE__ */ _export_sfc(_sfc_main$f, [["render", _sfc_render$f], ["__scopeId", "data-v-40de05c4"]]);
const _sfc_main$e = {
  name: "rpg-choice",
  inject: ["rpgKeypress"],
  data() {
    return {
      selected: 0,
      scrollHeight: 0
    };
  },
  props: {
    choices: {
      type: Array,
      default: []
    },
    column: {
      type: Number,
      default: 1
    },
    align: {
      type: String,
      default: "left"
    },
    active: {
      type: Boolean,
      default: true
    }
  },
  mounted() {
    this.obsKeyPress = this.rpgKeypress.pipe(debounceTime(100)).subscribe(({
      control
    }) => {
      if (!this.active || !control)
        return;
      const name = control.actionName;
      if (this.column > 1) {
        if (name == Control.Left) {
          this.selected = Math.floor(this.selected - this.choices.length / this.column);
          this.moveCursor();
        } else if (name == Control.Right) {
          this.selected = Math.floor(this.choices.length / this.column + this.selected);
          this.moveCursor();
        }
      }
      if (name == Control.Down)
        this.moveCursor(1);
      else if (name == Control.Up)
        this.moveCursor(-1);
      else if (name == Control.Action)
        this.$emit("selected", this.selected);
      return false;
    });
  },
  methods: {
    moveCursor(move = 0) {
      if (this.choices.length == 0)
        return;
      let diff = 0;
      const checkInView = (container, element, partial) => {
        let cTop = container.scrollTop;
        let cBottom = cTop + container.clientHeight;
        let eTop = element.offsetTop;
        let eBottom = eTop + element.clientHeight + 20;
        let isTotal = eTop >= cTop && eBottom <= cBottom;
        let isPartial = partial && (eTop < cTop && eBottom > cTop || eBottom > cBottom && eTop < cBottom);
        diff = eBottom - cBottom;
        return isTotal || isPartial;
      };
      if (this.selected + move >= this.choices.length) {
        this.selected = 0;
      } else if (this.selected + move < 0) {
        this.selected = this.choices.length - 1;
      } else {
        this.selected = this.selected + move;
      }
      this.$emit("change", this.selected);
      const li = this.$refs[`li-${this.selected}`];
      const ul = this.$parent.$el;
      checkInView(ul, li, false);
      if (diff > 0) {
        this.scrollHeight = `-${diff}px`;
        this.$emit("canScroll", "up");
      } else {
        this.scrollHeight = 0;
        this.$emit("canScroll", null);
      }
      this.$nextTick(() => {
        const lastLi = this.$refs[`li-${this.choices.length - 1}`];
        const inView = checkInView(ul, lastLi, false);
        if (!inView)
          this.$emit("canScroll", "down");
      });
    },
    mouseOver(index) {
      this.selected = index;
      this.moveCursor();
    }
  },
  computed: {
    css() {
      return {
        "column-count": this.column > 1 ? this.column : void 0,
        "height": "100%",
        "margin-top": this.scrollHeight,
        "text-align": this.align
      };
    }
  },
  unmounted() {
    this.obsKeyPress.unsubscribe();
  },
  components: {
    Arrow
  }
};
const choice_vue_vue_type_style_index_0_scoped_db6ba2b9_lang = "";
const _hoisted_1$a = { class: "choice-container" };
const _hoisted_2$6 = ["onClick", "onMouseover"];
function _sfc_render$e(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$a, [
    createBaseVNode("ul", {
      style: normalizeStyle($options.css),
      ref: "ul"
    }, [
      (openBlock(true), createElementBlock(Fragment, null, renderList($props.choices, (choice, index) => {
        return openBlock(), createElementBlock("li", {
          key: index,
          class: normalizeClass({ active: $data.selected == index }),
          onClick: ($event) => _ctx.$emit("selected", index),
          onMouseover: ($event) => $options.mouseOver(index),
          ref_for: true,
          ref: `li-${index}`
        }, [
          renderSlot(_ctx.$slots, "default", { choice }, () => [
            createBaseVNode("p", null, [
              createBaseVNode("span", null, toDisplayString(choice.text), 1)
            ])
          ], true)
        ], 42, _hoisted_2$6);
      }), 128))
    ], 4)
  ]);
}
const ChoiceUi = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["render", _sfc_render$e], ["__scopeId", "data-v-db6ba2b9"]]);
const _sfc_main$d = {
  name: "rpg-dialog",
  inject: ["rpgEngine", "rpgKeypress", "rpgGuiClose", "rpgGui"],
  props: ["speaker", "message", "choices", "position", "fullWidth", "autoClose", "typewriterEffect"],
  data() {
    return {
      typing: false,
      msg: ""
    };
  },
  async mounted() {
    let interval;
    this.rpgEngine.controls.stopInputs();
    if (!this.isChoice && !this.autoClose) {
      this.obsKeyPress = this.rpgKeypress.subscribe(({
        control
      }) => {
        if (control && control.actionName == Control.Action) {
          this.close();
        }
      });
    }
    let index = 0;
    const typewriter = () => {
      if (!this.typing) {
        clearInterval(interval);
      } else if (index >= this.message.length) {
        this.typing = false;
        clearInterval(interval);
      } else {
        this.msg = this.msg + this.message[index];
        index++;
      }
    };
    if (!this.typewriterEffect) {
      this.msg = this.message;
    } else {
      this.typing = true;
      interval = setInterval(typewriter, 10);
    }
  },
  computed: {
    isChoice() {
      return this.choices && this.choices.length > 0;
    }
  },
  methods: {
    close(indexSelect) {
      if (this.typing) {
        this.msg = this.message;
        this.typing = false;
        return;
      }
      this.rpgGuiClose("rpg-dialog", indexSelect);
      this.rpgEngine.controls.listenInputs();
    },
    tryClose() {
      if (!this.isChoice) {
        this.close();
      }
    }
  },
  unmounted() {
    if (this.obsKeyPress)
      this.obsKeyPress.unsubscribe();
  },
  components: {
    Window: WindowUi,
    Choices: ChoiceUi,
    Arrow
  }
};
const dialog_vue_vue_type_style_index_0_scoped_f7271c79_lang = "";
const _hoisted_1$9 = {
  key: 0,
  class: "speaker"
};
function _sfc_render$d(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_choices = resolveComponent("choices");
  const _component_Arrow = resolveComponent("Arrow");
  const _component_window = resolveComponent("window");
  return openBlock(), createBlock(_component_window, {
    position: $props.position,
    fullWidth: $props.fullWidth,
    class: "dialog",
    onClick: $options.tryClose
  }, {
    default: withCtx(() => [
      $props.speaker ? (openBlock(), createElementBlock("p", _hoisted_1$9, toDisplayString($props.speaker), 1)) : createCommentVNode("", true),
      createBaseVNode("p", null, toDisplayString($data.msg), 1),
      $options.isChoice ? (openBlock(), createBlock(_component_choices, {
        key: 1,
        choices: $props.choices,
        onSelected: $options.close
      }, null, 8, ["choices", "onSelected"])) : !$props.autoClose ? (openBlock(), createBlock(_component_Arrow, {
        key: 2,
        direction: "down",
        center: true
      })) : createCommentVNode("", true)
    ]),
    _: 1
  }, 8, ["position", "fullWidth", "onClick"]);
}
const DialogUi = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["render", _sfc_render$d], ["__scopeId", "data-v-f7271c79"]]);
const bar_vue_vue_type_style_index_0_scoped_0a68660d_lang = "";
const _sfc_main$c = {
  props: ["nb", "max", "color", "name"],
  computed: {
    percent() {
      return this.nb / this.max * 100;
    }
  }
};
const _hoisted_1$8 = { class: "bar" };
const _hoisted_2$5 = { class: "bar-info space-between" };
const _hoisted_3$4 = { class: "param-name" };
const _hoisted_4$2 = { class: "bar-full" };
function _sfc_render$c(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", _hoisted_1$8, [
    createBaseVNode("div", _hoisted_2$5, [
      createBaseVNode("span", _hoisted_3$4, toDisplayString($props.name), 1),
      createBaseVNode("span", null, toDisplayString($props.nb) + " / " + toDisplayString($props.max), 1)
    ]),
    createBaseVNode("div", _hoisted_4$2, [
      createBaseVNode("div", {
        class: normalizeClass(["bar-content", { [$props.color]: true }]),
        style: normalizeStyle({ width: `${$options.percent}%` })
      }, null, 6)
    ])
  ]);
}
const Bar = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["render", _sfc_render$c], ["__scopeId", "data-v-0a68660d"]]);
const hero_vue_vue_type_style_index_0_scoped_c34eb9bd_lang = "";
const _sfc_main$b = {
  props: ["face"],
  inject: ["rpgCurrentPlayer"],
  data() {
    return {
      name: "",
      hp: 0,
      sp: 0,
      maxHp: 0,
      maxSp: 0,
      expForNextlevel: 0,
      exp: 0,
      level: 0,
      _class: {}
    };
  },
  mounted() {
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
      this.name = object.name;
      this.hp = object.hp;
      this.sp = object.sp;
      this.maxHp = object.param.maxHp;
      this.maxSp = object.param.maxSp;
      this.expForNextlevel = object.expForNextlevel;
      this.exp = object.exp;
      this.level = object.level;
    });
  },
  computed: {
    image() {
      return {
        backgroundImage: `url(${this.face})`
      };
    }
  },
  unmounted() {
    this.obsCurrentPlayer.unsubscribe();
  },
  components: {
    Bar
  }
};
const _withScopeId$1 = (n) => (pushScopeId("data-v-c34eb9bd"), n = n(), popScopeId(), n);
const _hoisted_1$7 = { class: "hero" };
const _hoisted_2$4 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("div", { class: "face-column" }, [
  /* @__PURE__ */ createBaseVNode("div")
], -1));
const _hoisted_3$3 = { class: "name-column" };
const _hoisted_4$1 = { class: "space-between" };
const _hoisted_5$1 = /* @__PURE__ */ _withScopeId$1(() => /* @__PURE__ */ createBaseVNode("span", { class: "param-name" }, "Level", -1));
const _hoisted_6$1 = { class: "bars-column" };
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_bar = resolveComponent("bar");
  return openBlock(), createElementBlock("div", _hoisted_1$7, [
    _hoisted_2$4,
    createBaseVNode("div", _hoisted_3$3, [
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, toDisplayString($data.name), 1),
        createBaseVNode("li", _hoisted_4$1, [
          _hoisted_5$1,
          createTextVNode(),
          createBaseVNode("span", null, toDisplayString($data.level), 1)
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_bar, {
            nb: $data.exp,
            max: $data.expForNextlevel,
            name: "EXP",
            color: "gray"
          }, null, 8, ["nb", "max"])
        ])
      ])
    ]),
    createBaseVNode("div", _hoisted_6$1, [
      createBaseVNode("ul", null, [
        createBaseVNode("li", null, toDisplayString($data._class.name), 1),
        createBaseVNode("li", null, [
          createVNode(_component_bar, {
            nb: $data.hp,
            max: $data.maxHp,
            name: "HP",
            color: "orange"
          }, null, 8, ["nb", "max"])
        ]),
        createBaseVNode("li", null, [
          createVNode(_component_bar, {
            nb: $data.sp,
            max: $data.maxSp,
            name: "SP",
            color: "blue"
          }, null, 8, ["nb", "max"])
        ])
      ])
    ])
  ]);
}
const Hero = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$b], ["__scopeId", "data-v-c34eb9bd"]]);
const main_vue_vue_type_style_index_0_lang = "";
const main_vue_vue_type_style_index_1_scoped_f4715a62_lang = "";
const _sfc_main$a = {
  props: {
    goldName: {
      type: String,
      default: "Gold"
    }
  },
  inject: ["rpgCurrentPlayer", "rpgKeypress", "rpgEngine", "rpgStage", "rpgGuiClose", "rpgGui"],
  data() {
    const menu = [
      {
        text: "Items",
        value: "item",
        layout: "ItemsLayout"
      }
      /*  {
          text: 'Skills',
          value: 'skill'
      },  {
          text: 'Equipment',
          value: 'equipment',
          layout: 'EquipmentLayout'
      }, 
      {
          text: 'Status',
          value: 'status',
          layout: 'StatusLayout'
      } */
    ];
    if (this.rpgGui.exists("rpg-save")) {
      menu.push({
        text: "Save",
        value: "save",
        layout: "SaveLayout"
      });
    }
    return {
      player: {},
      active: true,
      gold: 0,
      menu
    };
  },
  mounted() {
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
      this.gold = object.gold;
    });
    this.obsKeyPress = this.rpgKeypress.subscribe(({ control }) => {
      if (!this.active || !control)
        return;
      if (control.actionName == "back") {
        this.rpgStage.filters = [];
        if (this.rpgGui.exists("rpg-controls"))
          this.rpgGui.display("rpg-controls");
        this.rpgGuiClose("rpg-main-menu");
        this.rpgEngine.controls.listenInputs();
      }
    });
  },
  unmounted() {
    this.obsKeyPress.unsubscribe();
    this.obsCurrentPlayer.unsubscribe();
  },
  methods: {
    selectMenu(index) {
      this.$emit("changeLayout", this.menu[index].layout);
    }
  },
  components: {
    Hero
  }
};
const _hoisted_1$6 = { class: "menu-row" };
const _hoisted_2$3 = { class: "menu-left" };
const _hoisted_3$2 = { class: "menu-right" };
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rpg_choice = resolveComponent("rpg-choice");
  const _component_rpg_window = resolveComponent("rpg-window");
  const _component_Hero = resolveComponent("Hero");
  return openBlock(), createElementBlock("div", _hoisted_1$6, [
    createBaseVNode("div", _hoisted_2$3, [
      createVNode(_component_rpg_window, {
        fullWidth: true,
        class: "menu-choice"
      }, {
        default: withCtx(() => [
          createVNode(_component_rpg_choice, {
            choices: $data.menu,
            onSelected: $options.selectMenu,
            ref: "menu"
          }, null, 8, ["choices", "onSelected"])
        ]),
        _: 1
      }),
      createVNode(_component_rpg_window, {
        fullWidth: true,
        class: "gold"
      }, {
        default: withCtx(() => [
          createBaseVNode("p", null, toDisplayString($data.gold) + " " + toDisplayString($props.goldName), 1)
        ]),
        _: 1
      })
    ]),
    createBaseVNode("div", _hoisted_3$2, [
      createVNode(_component_rpg_window, {
        fullWidth: true,
        height: "100%"
      }, {
        default: withCtx(() => [
          createVNode(_component_Hero, { class: "hero-face" })
        ]),
        _: 1
      })
    ])
  ]);
}
const MainLayout = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$a], ["__scopeId", "data-v-f4715a62"]]);
const icon_vue_vue_type_style_index_0_scoped_287f3425_lang = "";
const _sfc_main$9 = {
  props: ["name"]
};
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("i", {
    class: normalizeClass($props.name)
  }, null, 2);
}
const Icon = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$9], ["__scopeId", "data-v-287f3425"]]);
const _sfc_main$8 = {
  inject: ["rpgCurrentPlayer", "rpgKeypress", "rpgSocket"],
  data() {
    return {
      description: "",
      items: [],
      arrow: null
    };
  },
  computed: {
    mapItems() {
      return this.items.filter((it) => it).map((it) => ({
        text: it.item.name,
        nb: it.nb,
        consumable: it.item.consumable
      }));
    }
  },
  mounted() {
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({
      object
    }) => {
      this.items = Object.values(object.items || []);
    });
    this.obsKeyPress = this.rpgKeypress.subscribe(({
      control
    }) => {
      if (!control)
        return;
      if (control.actionName == Control.Back) {
        this.$emit("changeLayout", "MainLayout");
      }
    });
    this.selected(0);
  },
  unmounted() {
    this.obsKeyPress.unsubscribe();
    this.obsCurrentPlayer.unsubscribe();
  },
  methods: {
    selected(index) {
      if (!this.items[index])
        return;
      this.description = this.items[index].item.description;
    },
    choiceItem(index) {
      if (!this.items[index])
        return;
      const {
        id,
        consumable
      } = this.items[index].item;
      if (!consumable)
        return;
      this.rpgSocket().emit("gui.interaction", {
        guiId: "rpg-main-menu",
        name: "useItem",
        data: id
      });
    }
  },
  components: {
    Icon
  }
};
const item_vue_vue_type_style_index_0_scoped_5302757f_lang = "";
const _hoisted_1$5 = { class: "item-menu" };
const _hoisted_2$2 = { class: "row" };
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rpg_choice = resolveComponent("rpg-choice");
  const _component_rpg_window = resolveComponent("rpg-window");
  return openBlock(), createElementBlock("div", _hoisted_1$5, [
    createVNode(_component_rpg_window, {
      fullWidth: true,
      height: "80%",
      arrow: $data.arrow
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_2$2, [
          createVNode(_component_rpg_choice, {
            choices: $options.mapItems,
            column: 1,
            onChange: $options.selected,
            onSelected: $options.choiceItem,
            ref: "choice",
            onCanScroll: _cache[0] || (_cache[0] = ($event) => $data.arrow = $event)
          }, {
            default: withCtx(({ choice }) => [
              createBaseVNode("p", {
                class: normalizeClass(["space-between item", { "not-consumable": !choice.consumable }])
              }, [
                createBaseVNode("span", null, toDisplayString(choice.text), 1),
                createBaseVNode("span", null, toDisplayString(choice.nb), 1)
              ], 2)
            ]),
            _: 1
          }, 8, ["choices", "onChange", "onSelected"])
        ])
      ]),
      _: 1
    }, 8, ["arrow"]),
    createVNode(_component_rpg_window, {
      fullWidth: true,
      height: "20%"
    }, {
      default: withCtx(() => [
        createBaseVNode("p", null, toDisplayString($data.description), 1)
      ]),
      _: 1
    })
  ]);
}
const ItemsLayout = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$8], ["__scopeId", "data-v-5302757f"]]);
const _sfc_main$7 = {
  components: {
    Bar
  }
};
const _hoisted_1$4 = { class: "status-menu" };
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_Bar = resolveComponent("Bar");
  const _component_rpg_window = resolveComponent("rpg-window");
  return openBlock(), createElementBlock("div", _hoisted_1$4, [
    createVNode(_component_rpg_window, {
      fullWidth: true,
      height: "80%"
    }, {
      default: withCtx(() => [
        createVNode(_component_Bar, {
          nb: 6500,
          max: 9999,
          name: "MaxHP"
        })
      ]),
      _: 1
    })
  ]);
}
const StatusLayout = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$7]]);
const _sfc_main$6 = {
  inject: ["rpgCurrentPlayer"],
  mounted() {
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({ object }) => {
      console.log(object);
    });
  }
};
const _hoisted_1$3 = { class: "equipment-menu" };
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rpg_window = resolveComponent("rpg-window");
  return openBlock(), createElementBlock("div", _hoisted_1$3, [
    createVNode(_component_rpg_window, {
      fullWidth: true,
      height: "80%"
    })
  ]);
}
const EquipmentLayout = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$6]]);
const _sfc_main$5 = {
  inject: ["rpgKeypress"],
  mounted() {
    this.obsKeyPress = this.rpgKeypress.subscribe(({
      control
    }) => {
      if (!control)
        return;
      if (control.actionName == Control.Back) {
        this.back();
      }
    });
  },
  unmounted() {
    this.obsKeyPress.unsubscribe();
  },
  methods: {
    back() {
      this.$emit("changeLayout", "MainLayout");
    }
  }
};
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rpg_save = resolveComponent("rpg-save");
  return openBlock(), createBlock(_component_rpg_save, { onSaved: $options.back }, null, 8, ["onSaved"]);
}
const SaveLayout = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$5]]);
const back_vue_vue_type_style_index_0_scoped_b6571b17_lang = "";
const _sfc_main$4 = {
  inject: ["rpgEngine"],
  methods: {
    back() {
      this.rpgEngine.controls.applyControl("back");
    }
  }
};
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: "back",
    onClick: _cache[0] || (_cache[0] = (...args) => $options.back && $options.back(...args))
  });
}
const BackButton = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-b6571b17"]]);
const main_vue_vue_type_style_index_0_scoped_5aacae3b_lang = "";
const _sfc_main$3 = {
  name: "rpg-main-menu",
  inject: ["rpgEngine", "rpgStage", "rpgGui"],
  data() {
    return {
      layout: "MainLayout"
    };
  },
  mounted() {
    if (this.rpgGui.exists("rpg-controls"))
      this.rpgGui.hide("rpg-controls");
    this.rpgEngine.controls.stopInputs();
    const blur = new this.rpgEngine.PIXI.BlurFilter();
    this.rpgStage.filters = [blur];
  },
  methods: {
    change(name) {
      this.layout = name;
    }
  },
  components: {
    MainLayout,
    ItemsLayout,
    StatusLayout,
    BackButton,
    EquipmentLayout,
    SaveLayout
  }
};
const _hoisted_1$2 = { class: "menu-main" };
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_BackButton = resolveComponent("BackButton");
  return openBlock(), createElementBlock("div", _hoisted_1$2, [
    (openBlock(), createBlock(resolveDynamicComponent($data.layout), {
      onChangeLayout: $options.change,
      ref: "layout"
    }, null, 40, ["onChangeLayout"])),
    createVNode(_component_BackButton)
  ]);
}
const MenuUi = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-5aacae3b"]]);
const _sfc_main$2 = {
  name: "rpg-shop",
  inject: ["rpgCurrentPlayer", "rpgKeypress", "rpgGuiClose", "rpgSocket", "rpgEngine", "rpgGui"],
  props: ["items"],
  data() {
    return {
      player: {},
      inventory: [],
      menuActive: true,
      menu: [{
        text: "Buy",
        value: "buy"
      }, {
        text: "Sell",
        value: "sell"
      }, {
        text: "Cancel",
        value: "cancel"
      }],
      currentItem: {},
      mode: "",
      goldName: "Gold",
      step: 0,
      quantity: 1,
      indexSelected: 0,
      doAction: false
    };
  },
  mounted() {
    if (this.rpgGui.exists("rpg-controls"))
      this.rpgGui.hide("rpg-controls");
    this.rpgEngine.controls.stopInputs();
    this.obsCurrentPlayer = this.rpgCurrentPlayer.subscribe(({
      object
    }) => {
      if (!this.player.items) {
        console.log("Player has no inventory!", this.player);
        return;
      }
      this.player = object;
      this.inventory = Object.values(this.player.items).filter((item) => item);
      if (this.doAction) {
        this.step = 0;
        this.quantity = 1;
        this.doAction = false;
      }
      this.selected(this.indexSelected);
    });
    const interactionBuy = (name) => {
      if (name == Control.Back) {
        this.step = 0;
      } else if (name == Control.Up) {
        const nextPrice = this.currentItem.price * (this.quantity + 1);
        if (nextPrice > this.player.gold) {
          return false;
        }
        this.quantity += 1;
      } else if (name == Control.Down) {
        if (this.quantity - 1 == 0) {
          return false;
        }
        this.quantity -= 1;
      } else if (name == Control.Action) {
        this.doAction = true;
        this.rpgSocket().emit("gui.interaction", {
          guiId: "rpg-shop",
          name: "buyItem",
          data: {
            id: this.currentItem.id,
            nb: this.quantity
          }
        });
      }
    };
    const interactionSell = (name) => {
      if (name == Control.Back) {
        this.step = 0;
      } else if (name == Control.Up) {
        if (this.quantity + 1 > this.currentItem.nb) {
          return false;
        }
        this.quantity += 1;
      } else if (name == Control.Down) {
        if (this.quantity - 1 == 0) {
          return false;
        }
        this.quantity -= 1;
      } else if (name == Control.Action) {
        this.doAction = true;
        this.rpgSocket().emit("gui.interaction", {
          guiId: "rpg-shop",
          name: "sellItem",
          data: {
            id: this.currentItem.id,
            nb: this.quantity
          }
        });
      }
    };
    this.obsKeyPress = this.rpgKeypress.subscribe(({
      control
    }) => {
      if (!control)
        return;
      const name = control.actionName;
      if (!this.mode) {
        if (name == Control.Back) {
          this.close();
        }
      } else if (this.mode) {
        if (this.step == 1) {
          if (this.mode == "buy")
            interactionBuy(name);
          if (this.mode == "sell")
            interactionSell(name);
        } else {
          if (name == Control.Back) {
            this.mode = "";
            this.description = "";
            this.menuActive = true;
          }
        }
      }
    });
  },
  computed: {
    buyerItems() {
      return this.items.map((item) => {
        const playerItem = this.playerItems.find((playerItem2) => playerItem2.id == item.id) || {
          nb: 0
        };
        return {
          ...item,
          nb: playerItem.nb
        };
      });
    },
    listItems() {
      return this.mode == "buy" ? this.buyerItems : this.playerItems;
    },
    totalPrice() {
      let nb = this.currentItem.price * this.quantity;
      if (this.mode == "sell") {
        return Math.floor(nb / 2);
      }
      return nb;
    },
    playerItems() {
      return this.inventory.map(({
        item,
        nb
      }) => ({
        ...item,
        nb
      }));
    }
  },
  methods: {
    selected(index) {
      if (!this.listItems[index]) {
        this.currentItem = {};
        this.indexSelected = 0;
        if (this.listItems.length == 0)
          this.mode = "";
        return;
      }
      this.currentItem = this.listItems[index];
      this.indexSelected = index;
    },
    changeMenu(index) {
      const mode = this.menu[index].value;
      if (mode == "cancel") {
        this.close();
        return;
      }
      this.menuActive = false;
      this.mode = mode;
      this.selected(0);
    },
    choiceItem(index) {
      const item = this.listItems[index];
      if (item.price > this.player.gold)
        return;
      this.step = 1;
    },
    price(nb) {
      if (this.mode == "sell") {
        return Math.floor(nb / 2);
      } else {
        return nb;
      }
    },
    close() {
      this.rpgGuiClose();
      this.rpgEngine.controls.listenInputs();
      if (this.rpgGui.exists("rpg-controls"))
        this.rpgGui.display("rpg-controls");
    }
  },
  components: {
    BackButton
  },
  unmounted() {
    this.obsKeyPress.unsubscribe();
    this.obsCurrentPlayer.unsubscribe();
  }
};
const main_vue_vue_type_style_index_0_scoped_ad4c083b_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-ad4c083b"), n = n(), popScopeId(), n);
const _hoisted_1$1 = { class: "row" };
const _hoisted_2$1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("hr", null, null, -1));
const _hoisted_3$1 = {
  key: 0,
  class: "shop-content"
};
const _hoisted_4 = { key: 1 };
const _hoisted_5 = { class: "space-between" };
const _hoisted_6 = { class: "cursor" };
const _hoisted_7 = { class: "space-between" };
const _hoisted_8 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, null, -1));
const _hoisted_9 = { class: "total" };
const _hoisted_10 = {
  key: 0,
  class: "shop-info"
};
const _hoisted_11 = { class: "space-between" };
const _hoisted_12 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("span", null, "Possession", -1));
const _hoisted_13 = {
  key: 1,
  class: "bottom"
};
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("hr", null, null, -1));
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rpg_choice = resolveComponent("rpg-choice");
  const _component_rpg_window = resolveComponent("rpg-window");
  const _component_BackButton = resolveComponent("BackButton");
  return openBlock(), createElementBlock(Fragment, null, [
    createVNode(_component_rpg_window, {
      fullWidth: true,
      height: "100%",
      class: "shop-menu"
    }, {
      default: withCtx(() => [
        createBaseVNode("div", _hoisted_1$1, [
          createVNode(_component_rpg_choice, {
            choices: $data.menu,
            column: 3,
            onSelected: $options.changeMenu,
            align: "center",
            active: $data.menuActive
          }, null, 8, ["choices", "onSelected", "active"]),
          createBaseVNode("div", null, [
            createBaseVNode("p", null, toDisplayString($data.player.gold) + " " + toDisplayString($data.goldName), 1)
          ])
        ]),
        _hoisted_2$1,
        $data.mode ? (openBlock(), createElementBlock("div", _hoisted_3$1, [
          createBaseVNode("div", {
            class: normalizeClass({ "item-quantity": $data.step == 1 })
          }, [
            $data.step == 0 ? (openBlock(), createBlock(_component_rpg_choice, {
              key: 0,
              choices: $options.listItems,
              column: 1,
              onChange: $options.selected,
              onSelected: $options.choiceItem,
              ref: "list"
            }, {
              default: withCtx(({ choice }) => [
                createBaseVNode("p", {
                  class: normalizeClass(["space-between item", { "can-not-buy": choice.price > $data.player.gold }])
                }, [
                  createBaseVNode("span", null, toDisplayString(choice.name), 1),
                  createBaseVNode("span", null, toDisplayString($options.price(choice.price)), 1)
                ], 2)
              ]),
              _: 1
            }, 8, ["choices", "onChange", "onSelected"])) : (openBlock(), createElementBlock("div", _hoisted_4, [
              createBaseVNode("p", _hoisted_5, [
                createBaseVNode("span", null, toDisplayString($data.currentItem.name), 1),
                createBaseVNode("span", _hoisted_6, [
                  createBaseVNode("span", null, "x " + toDisplayString($data.quantity), 1)
                ])
              ]),
              createBaseVNode("p", _hoisted_7, [
                _hoisted_8,
                createBaseVNode("span", _hoisted_9, toDisplayString($options.totalPrice) + " " + toDisplayString($data.goldName), 1)
              ])
            ]))
          ], 2),
          $data.currentItem.name ? (openBlock(), createElementBlock("div", _hoisted_10, [
            createBaseVNode("p", _hoisted_11, [
              _hoisted_12,
              createBaseVNode("span", null, toDisplayString($data.currentItem.nb), 1)
            ])
          ])) : createCommentVNode("", true)
        ])) : createCommentVNode("", true),
        $data.mode ? (openBlock(), createElementBlock("div", _hoisted_13, [
          _hoisted_14,
          createBaseVNode("p", null, toDisplayString($data.currentItem.description), 1)
        ])) : createCommentVNode("", true)
      ]),
      _: 1
    }),
    createVNode(_component_BackButton)
  ], 64);
}
const ShopUi = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__scopeId", "data-v-ad4c083b"]]);
const _sfc_main$1 = {
  name: "rpg-disconnect",
  inject: ["rpgStage", "rpgEngine"],
  mounted() {
    const blur = new this.rpgEngine.PIXI.BlurFilter();
    this.rpgStage.filters = [blur];
  },
  unmounted() {
    this.rpgStage.filters = [];
  }
};
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_rpg_dialog = resolveComponent("rpg-dialog");
  return openBlock(), createBlock(_component_rpg_dialog, {
    message: "Oops, you are disconnected. Please wait!",
    position: "middle",
    autoClose: true
  });
}
const DisconnectUi = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1]]);
const alert_vue_vue_type_style_index_0_lang = "";
const guiName = "rpg-notification";
const _sfc_main = {
  props: {
    icon: {
      defaut: ""
    },
    sound: {
      defaut: ""
    },
    message: {
      default: ""
    },
    time: {
      default: 2e3
    },
    position: {
      default: "bottom"
    },
    type: {
      default: ""
    }
  },
  name: guiName,
  inject: ["rpgGui", "rpgResource", "rpgSound", "rpgEngine"],
  data() {
    return {
      show: false
    };
  },
  computed: {
    image() {
      const resourceImage = this.rpgResource.spritesheets.get(this.icon);
      if (!resourceImage) {
        return this.icon;
      }
      return resourceImage.image;
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
      const globalConfig = this.rpgEngine.globalConfig.notification;
      const globalSound = globalConfig && globalConfig.sound;
      const sound = this.sound || globalSound || (this.type == "error" ? "error" : "alert");
      if (sound && globalSound !== null) {
        this.rpgSound.get(sound).play();
      }
    }, 10);
    setTimeout(() => {
      this.show = false;
      setTimeout(() => {
        this.rpgGui.hide(guiName);
      }, 500);
    }, this.time);
  }
};
const _hoisted_1 = {
  key: 0,
  class: "icon"
};
const _hoisted_2 = ["src"];
const _hoisted_3 = { class: "msg" };
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("div", {
    class: normalizeClass(["alert-panel", $props.position])
  }, [
    createBaseVNode("div", {
      class: normalizeClass(["alert", { show: $data.show, [$props.position]: true, [$props.type]: true }])
    }, [
      $options.image ? (openBlock(), createElementBlock("div", _hoisted_1, [
        createBaseVNode("img", { src: $options.image }, null, 8, _hoisted_2)
      ])) : createCommentVNode("", true),
      createBaseVNode("span", _hoisted_3, toDisplayString($props.message), 1)
    ], 2)
  ], 2);
}
const NotificationUi = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
const vitePluginRequire_1744406400336_95815352 = "/assets/error_002-76810ec3.ogg";
const vitePluginRequire_1744406400336_2842293 = "/assets/confirmation_002-33b17a9a.ogg";
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
let GuiSounds = class {
};
GuiSounds = __decorateClass$1([Sound({
  sounds: {
    alert: vitePluginRequire_1744406400336_2842293,
    error: vitePluginRequire_1744406400336_95815352
  }
})], GuiSounds);
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
let RpgClientEngine = class {
};
RpgClientEngine = __decorateClass([
  RpgModule({
    gui: [
      DialogUi,
      MenuUi,
      WindowUi,
      ChoiceUi,
      DisconnectUi,
      ShopUi,
      NotificationUi
    ],
    sounds: [
      GuiSounds
    ]
  })
], RpgClientEngine);
const mod = {
  client: RpgClientEngine
};
const modules = [
  _rpgjs_plugin_emotion_bubbles,
  _rpgjs_title_screen,
  _rpgjs_save,
  _rpgjs_mobile_gui,
  _rpgjs_default_gui,
  _rpgjs_gamepad,
  _main,
  mod
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

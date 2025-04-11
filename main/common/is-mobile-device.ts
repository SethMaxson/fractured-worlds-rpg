import Config from "../config";

export function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.innerWidth < 1280 
    || (Config.debug && Config.devSettings.forceMobile);
}
interface DeviceSpecificDisplayConfigurationSettings {
    zoomFactor: number;
}

const Config = {
    debug: true,
    devSettings: {
        forceMobile: false,
        forceZoom: false,
        displayMobileInputOnDesktop: true,
        forcedZoomValue: 2,
        showHitboxes: false,
    },
    dialog: {
        typewriterEffect: true,
    },
    display: {
        devicesSpecific: {
            desktop: {
                zoomFactor: 2
            } as DeviceSpecificDisplayConfigurationSettings,
            mobile: {
                zoomFactor: 1
            } as DeviceSpecificDisplayConfigurationSettings
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
                showLabelsForImportantNpcs: true,
            }
        }
    }
};

export default Config;
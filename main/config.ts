interface DeviceSpecificDisplayConfigurationSettings {
    zoomFactor: number;
}

const Config = {
    debug: false,
    devSettings: {
        forceMobile: true,
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
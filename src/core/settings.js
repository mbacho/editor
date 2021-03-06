define([
    "hr/hr",
    "utils/dialogs"
], function(hr, dialogs) {
    var key = "GitBookEditorSettings";
    var SettingsModel = hr.Model.extend({
        defaults: {
            autoSave: true,
            autoFileManagement: true,
            normalizeWhitespace: true,
            restartPreviewOnSave: true,
            editorShowInvisibles: false,
            normalizeEof: true,
            wordWrap: "free",
            keyboardHandler: "textinput",
            editorFontSize: "100%",
            editorLineHeight: 1.4,
            host: "https://www.gitbook.io"
        },
        getStateFromStorage: function (){
            this.set(hr.Storage.get(key));
        },
        setStateToStorage: function (){
            hr.Storage.set(key, this.toJSON());
        },
        dialog: function() {
            var that = this;
            return dialogs.fields("Advanced Settings", [
                {
                    autoFileManagement: {
                        label: "Auto file management",
                        type: "checkbox"
                    },
                    autoSave: {
                        label: "Auto save file",
                        type: "checkbox"
                    },
                },
                {
                    normalizeWhitespace: {
                        label: "Normalize whitespace",
                        type: "checkbox"
                    },
                    normalizeEof: {
                        label: "Normalize end-of-line",
                        type: "checkbox"
                    }
                },
                {
                    editorFontSize: {
                        label: "Editor font size",
                        type: "select",
                        options: {
                            "75%": "Small",
                            "100%": "Normal",
                            "150%": "Large",
                            "200%": "Larger"
                        }
                    },
                    editorLineHeight: {
                        label: "Line Height",
                        help: "Default is 1.4",
                        type: "number",
                        min: 1,
                        max: 3
                    },
                    keyboardHandler: {
                        label: "Keyboard",
                        type: "select",
                        options: {
                            "textinput": "Default",
                            "vim": "Vim",
                            "emacs": "Emacs"
                        }
                    },
                    wordWrap: {
                        label: "Soft Wrap",
                        type: "select",
                        options: {
                            "free": "Free",
                            "off": "Off",
                            "80": "80 chars",
                            "40": "40 chars"
                        }
                    },
                    editorShowInvisibles: {
                        label: "Show Invisibles",
                        type: "checkbox"
                    }
                },
                {
                    restartPreviewOnSave: {
                        label: "Restart preview website on save",
                        type: "checkbox"
                    }
                },
                {
                    username: {
                        label: "Username",
                        type: "text"
                    },
                    token: {
                        label: "Token",
                        type: "text"
                    },
                    host: {
                        label: "Host",
                        type: "text"
                    }
                }
            ], that.toJSON(), {
                className: "large"
            })
            .then(function(values) {
                that.set(values);
                that.setStateToStorage();
            });
        }
    });

    var settings = new SettingsModel({}, {});
    settings.getStateFromStorage();

    return settings;
});
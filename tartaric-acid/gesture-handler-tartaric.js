/* global AFRAME, THREE */

AFRAME.registerComponent('gesture-handler-tartaric', {
    schema: {
        enabled: { default: true },
        rotationzFactor: { default: 5 },
        rotationyFactor: { default: 5 },	
    },

    init: function() {
        this.handleRotationy = this.handleRotationy.bind(this);
        this.handleRotationz = this.handleRotationz.bind(this);
        this.isVisible = false;
 //       this.rotationyFactor = 5;
        this.el.sceneEl.addEventListener('markerFound', (e) => {
            this.isVisible = true;
        });
        this.el.sceneEl.addEventListener('markerLost', (e) => {
            this.isVisible = false;
        });
    },

    update: function() {
        if (this.data.enabled) {
            this.el.sceneEl.addEventListener('onefingermove', this.handleRotationz);
            this.el.sceneEl.addEventListener('twofingermove', this.handleRotationy);
        } else {
            this.el.sceneEl.removeEventListener('onefingermove', this.handleRotationz);
            this.el.sceneEl.removeEventListener('twofingermove', this.handleRotationy);
        }
    },

    remove: function() {
        this.el.sceneEl.removeEventListener('onefingermove', this.handleRotationz);
        this.el.sceneEl.removeEventListener('twofingermove', this.handleRotationy);
    },

    handleRotationz: function(event) {
        if (this.isVisible) {
            this.el.object3D.rotation.z +=
                event.detail.positionChange.x * this.data.rotationzFactor;
        }
    },

    handleRotationy: function(event) {
        if (this.isVisible) {
            this.data.rotationyFactor *=
                1 + event.detail.spreadChange / event.detail.startSpread;

            this.el.object3D.rotation.y +=
                event.detail.positionChange.y * this.data.rotationyFactor;

        }
    },
});
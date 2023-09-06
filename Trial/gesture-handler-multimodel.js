/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler-multimodel", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.01 },
      maxScale: { default: 8 },
    },
  
    init: function () {
      this.handleScale = this.handleScale.bind(this);
      this.handleRotation = this.handleRotation.bind(this);
      this.handleModel = this.handleModel.bind(this);
  
      this.isVisible = false;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
  
      this.el.addEventListener("markerFound", (e) => {
        this.isVisible = true;
      });
  
      this.el.addEventListener("markerLost", (e) => {
        this.isVisible = false;
      });
    },
  
    update: function () {
      if (this.data.enabled) {
        this.el.addEventListener("onefingermove", this.handleRotation);
        this.el.addEventListener("twofingermove", this.handleScale);
        this.el.addEventListener("btnevt", this.handleModel);

      } else {
        this.el.removeEventListener("onefingermove", this.handleRotation);
        this.el.removeEventListener("twofingermove", this.handleScale);
        this.el.removeEventListener("btnevt", this.handleModel);
        }
    },
  
    remove: function () {
      this.el.removeEventListener("onefingermove", this.handleRotation);
      this.el.removeEventListener("twofingermove", this.handleScale);
      this.el.removeEventListener("btnevt", this.handleModel);
    },
  
    handleRotation: function (event) {
      if (this.isVisible) {
        this.el.object3D.rotation.y +=
          event.detail.positionChange.x * this.data.rotationFactor;
        this.el.object3D.rotation.x +=
          event.detail.positionChange.y * this.data.rotationFactor;
      }
    },

    handleScale: function (event) {
      if (this.isVisible) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },

    handleModel: function (event) {
      if (this.isVisible) {
        this.el.removeAttribute("gltf-model");
        this.el.setAttribute("gltf-model","#orb" + event.detail.type);
        this.el.object3D.rotation.x = 0;
        this.el.object3D.rotation.y = 0;
        this.el.object3D.scale.x = 0.1;
        this.el.object3D.scale.y = 0.1;
        this.el.object3D.scale.z = 0.1;
      }
    },
  });
  

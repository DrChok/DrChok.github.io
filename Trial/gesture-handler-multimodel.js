/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler-multimodel", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.01 },
      maxScale: { default: 8 },
    },
  
    init: function () {
      const obj = document.getElementbyId('cis')
      obj.handleScale = obj.handleScale.bind(obj);
      obj.handleRotation = obj.handleRotation.bind(obj);
      obj.handleModel = obj.handleModel.bind(obj);
  
      obj.isVisible = false;
      obj.initialScale = obj.el.object3D.scale.clone();
      obj.scaleFactor = 1;
  
      obj.addEventListener("markerFound", (e) => {
        this.isVisible = true;
      });
  
      obj.addEventListener("markerLost", (e) => {
        this.isVisible = false;
      });
    },
  
    update: function () {
      if (obj.data.enabled) {
        obj.addEventListener("onefingermove", obj.handleRotation);
        obj.addEventListener("twofingermove", obj.handleScale);
        obj.addEventListener("btnevt", obj.handleModel);

      } else {
        obj.removeEventListener("onefingermove", obj.handleRotation);
        obj.removeEventListener("twofingermove", obj.handleScale);
        obj.removeEventListener("btnevt", obj.handleModel);
        }
    },
  
    remove: function () {
      obj.removeEventListener("onefingermove", obj.handleRotation);
      obj.removeEventListener("twofingermove", obj.handleScale);
      obj.removeEventListener("btnevt", obj.handleModel);
    },
  
    handleRotation: function (event) {
      if (obj.isVisible) {
        obj.object3D.rotation.y +=
          event.detail.positionChange.x * obj.data.rotationFactor;
        obj.object3D.rotation.x +=
          event.detail.positionChange.y * obj.data.rotationFactor;
      }
    },

    handleScale: function (event) {
      if (obj.isVisible) {
        obj.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        obj.scaleFactor = Math.min(
          Math.max(obj.scaleFactor, obj.data.minScale),
          obj.data.maxScale
        );
  
        obj.object3D.scale.x = obj.scaleFactor * obj.initialScale.x;
        obj.object3D.scale.y = obj.scaleFactor * obj.initialScale.y;
        obj.object3D.scale.z = obj.scaleFactor * obj.initialScale.z;
      }
    },

    handleModel: function (event) {
      if (obj.isVisible) {
        obj.removeAttribute("gltf-model");
        obj.setAttribute("gltf-model","#orb" + event.detail.type);
        obj.object3D.rotation.x = 0;
        obj.object3D.rotation.y = 0;
        obj.object3D.scale.x = 0.1;
        obj.object3D.scale.y = 0.1;
        obj.object3D.scale.z = 0.1;
      }
    },
  });
  

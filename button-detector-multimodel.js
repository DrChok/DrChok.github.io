AFRAME.registerComponent("button-detector-multimodel", {
    init: function () {
        
        this.dispatchButtonEvent = this.dispatchButtonEvent.bind(this);

        var header = document.getElementById("allButtons");
        var btns = header.getElementsByClassName("btn"); 
        for (var i = 0; i < btns.length; i++) {
            btns[i].addEventListener("click", this.dispatchButtonEvent)
        };  //btn[i] where i=0 refers to button1
    },    

    remove: function() {
        for (var i = 0; i < btns.length; i++) {
            btns[i].removeEventListener("click", this.dispatchButtonEvent)
        };
    },

    dispatchButtonEvent() {
        this.el.dispatchEvent(new CustomEvent("btnevt", {
            detail: { type: header.querySelector('.active').id } //why null? how to properly select?
        }))
    },
});

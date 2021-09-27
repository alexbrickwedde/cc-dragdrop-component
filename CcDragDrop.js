class CcDragDrop extends HTMLElement {
  constructor(bDraggable) {
    super();
    
    if (bDraggable) {
      this.setAttribute("draggable", "true");
    }
    this.style.display = "block";
    this.entercount = 0;
    
    this.addEventListener ("dragover", (e) => { this.dragOver(e); });
    this.addEventListener ("dragenter", (e) => { this.dragEnter(e); });
    this.addEventListener ("dragleave", (e) => { this.dragLeave(e); });
    this.addEventListener ("drop", (e) => { this.dropped(e); });
    this.addEventListener ("dragstart", (e) => { this.dragStart(e); });
    this.addEventListener ("dragend", (e) => { this.dragEnd(e); });
  }

  init() {
  }
  
  dragOver(e) {
    e.preventDefault();
    e.stopPropagation();

    var left = e.offsetX;
    var top = e.offsetY;
    var related = e.srcElement;
    while(related && related.parentNode && related != this && related.parentNode != this) {
      left += related.offsetLeft;
      top += related.offsetTop;
      related = related.parentNode;
    }

    this.dispatchEvent(new CustomEvent("dragdrop", { detail : {dragdrop : this, event : e, type : "over", pos : {left, top}, over : (this.entercount > 0)}}));
  }

  dragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    this.entercount++;

    var left = e.offsetX;
    var top = e.offsetY;
    var related = e.srcElement;
    while(related && related.parentNode && related != this && related.parentNode != this) {
      left += related.offsetLeft;
      top += related.offsetTop;
      related = related.parentNode;
    }

    this.dispatchEvent(new CustomEvent("dragdrop", { detail : {dragdrop : this, event : e, type : "enter", pos : {left, top}, over : (this.entercount > 0)}}));
  }
  
  dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    this.entercount--;
    this.dispatchEvent(new CustomEvent("dragdrop", { detail : {dragdrop : this, event : e, type : "leave", over : (this.entercount > 0)}}));
  }

  dropped(e) {
    e.preventDefault();
    e.stopPropagation();

    var left = e.offsetX;
    var top = e.offsetY;
    var related = e.srcElement;
    while(related && related.parentNode && related != this && related.parentNode != this) {
      left += related.offsetLeft;
      top += related.offsetTop;
      related = related.parentNode;
    }

    this.entercount = 0;
    this.dispatchEvent(new CustomEvent("dragdrop", { detail : {dragdrop : this, event : e, pos : {left, top}, type : "drop"}}));
  }

  dragStart(e) {
    var left = e.offsetX;
    var top = e.offsetY;
    var related = e.srcElement;
    while(related && related.parentNode && related != this && related.parentNode != this) {
      left += related.offsetLeft;
      top += related.offsetTop;
      related = related.parentNode;
    }

    this.dispatchEvent(new CustomEvent("dragdrop", { detail : {dragdrop : this, event : e, pos : {left, top}, type : "dragstart"}}));
  }

  dragEnd(e) {
    this.dispatchEvent(new CustomEvent("dragdrop", { detail : {dragdrop : this, event : e, type : "dragend"}}));
  }
}

window.customElements.define("cc-drag-drop", CcDragDrop);

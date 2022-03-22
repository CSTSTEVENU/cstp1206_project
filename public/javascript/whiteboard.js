/*Created from http://fabricjs.com/freedrawing */
(function() {
    var $ = function(id){return document.getElementById(id)};
    var canvas = this.__canvas = new fabric.Canvas('c', {
      isDrawingMode: true
    });
    canvas.setBackgroundColor('white');
    fabric.Object.prototype.transparentCorners = false;
  
    var drawingModeEl = $('drawing-mode'),
        drawingOptionsEl = $('drawing-mode-options'),
        drawingColorEl = $('drawing-color'),
        drawingShadowColorEl = $('drawing-shadow-color'),
        drawingLineWidthEl = $('drawing-line-width'),
        drawingShadowWidth = $('drawing-shadow-width'),
        drawingShadowOffset = $('drawing-shadow-offset'),
        clearEl = $('clear-canvas');
  
    clearEl.onclick = function() { canvas.clear() };
  
    drawingModeEl.onclick = function() {
      canvas.isDrawingMode = !canvas.isDrawingMode;
      if (canvas.isDrawingMode) {
        drawingModeEl.innerHTML = 'Cancel drawing mode';
        drawingOptionsEl.style.display = '';
      }
      else {
        drawingModeEl.innerHTML = 'Enter drawing mode';
        drawingOptionsEl.style.display = 'none';
      }
    };
  
    if (fabric.PatternBrush) {
      var vLinePatternBrush = new fabric.PatternBrush(canvas);
      vLinePatternBrush.getPatternSrc = function() {
  
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');
  
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(0, 5);
        ctx.lineTo(10, 5);
        ctx.closePath();
        ctx.stroke();
  
        return patternCanvas;
      };
  
      var hLinePatternBrush = new fabric.PatternBrush(canvas);
      hLinePatternBrush.getPatternSrc = function() {
  
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = 10;
        var ctx = patternCanvas.getContext('2d');
  
        ctx.strokeStyle = this.color;
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(5, 0);
        ctx.lineTo(5, 10);
        ctx.closePath();
        ctx.stroke();
  
        return patternCanvas;
      };
  
      var squarePatternBrush = new fabric.PatternBrush(canvas);
      squarePatternBrush.getPatternSrc = function() {
  
        var squareWidth = 10, squareDistance = 2;
  
        var patternCanvas = fabric.document.createElement('canvas');
        patternCanvas.width = patternCanvas.height = squareWidth + squareDistance;
        var ctx = patternCanvas.getContext('2d');
  
        ctx.fillStyle = this.color;
        ctx.fillRect(0, 0, squareWidth, squareWidth);
  
        return patternCanvas;
      };
  
      var diamondPatternBrush = new fabric.PatternBrush(canvas);
      diamondPatternBrush.getPatternSrc = function() {
  
        var squareWidth = 10, squareDistance = 5;
        var patternCanvas = fabric.document.createElement('canvas');
        var rect = new fabric.Rect({
          width: squareWidth,
          height: squareWidth,
          angle: 45,
          fill: this.color
        });
  
        var canvasWidth = rect.getBoundingRect().width;
  
        patternCanvas.width = patternCanvas.height = canvasWidth + squareDistance;
        rect.set({ left: canvasWidth / 2, top: canvasWidth / 2 });
  
        var ctx = patternCanvas.getContext('2d');
        rect.render(ctx);
  
        return patternCanvas;
      };

    }
  
    $('drawing-mode-selector').onchange = function() {
  
      if (this.value === 'hline') {
        canvas.freeDrawingBrush = vLinePatternBrush;
      }
      else if (this.value === 'vline') {
        canvas.freeDrawingBrush = hLinePatternBrush;
      }
      else if (this.value === 'square') {
        canvas.freeDrawingBrush = squarePatternBrush;
      }
      else if (this.value === 'diamond') {
        canvas.freeDrawingBrush = diamondPatternBrush;
      }
      else if (this.value === 'texture') {
        canvas.freeDrawingBrush = texturePatternBrush;
      }
      else {
        canvas.freeDrawingBrush = new fabric[this.value + 'Brush'](canvas);
      }
      //color
      if (canvas.freeDrawingBrush) {
        var brush = canvas.freeDrawingBrush;
        brush.color = drawingColorEl.value;
        if (brush.getPatternSrc) {
          brush.source = brush.getPatternSrc.call(brush);
        }
        brush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
        brush.shadow = new fabric.Shadow({
          blur: parseInt(drawingShadowWidth.value, 10) || 0,
          offsetX: 0,
          offsetY: 0,
          affectStroke: true,
          color: drawingShadowColorEl.value,
        });
      }
    };
    
    drawingColorEl.onchange = function() {
      var brush = canvas.freeDrawingBrush;
      brush.color = this.value;
      if (brush.getPatternSrc) {
        brush.source = brush.getPatternSrc.call(brush);
      }
    };
    drawingShadowColorEl.onchange = function() {
      canvas.freeDrawingBrush.shadow.color = this.value;
    };
    drawingLineWidthEl.onchange = function() {
      canvas.freeDrawingBrush.width = parseInt(this.value, 10) || 1;
      this.previousSibling.innerHTML = this.value;
    };
    drawingShadowWidth.onchange = function() {
      canvas.freeDrawingBrush.shadow.blur = parseInt(this.value, 10) || 0;
      this.previousSibling.innerHTML = this.value;
    };
    drawingShadowOffset.onchange = function() {
      canvas.freeDrawingBrush.shadow.offsetX = parseInt(this.value, 10) || 0;
      canvas.freeDrawingBrush.shadow.offsetY = parseInt(this.value, 10) || 0;
      this.previousSibling.innerHTML = this.value;
    };
  
    if (canvas.freeDrawingBrush) {
      canvas.freeDrawingBrush.color = drawingColorEl.value;
      canvas.freeDrawingBrush.width = parseInt(drawingLineWidthEl.value, 10) || 1;
      canvas.freeDrawingBrush.shadow = new fabric.Shadow({
        blur: parseInt(drawingShadowWidth.value, 10) || 0,
        offsetX: 0,
        offsetY: 0,
        affectStroke: true,
        color: drawingShadowColorEl.value,
      });
    }
    // copy and paste
    var copy = () => {
      // clone what are you copying since you
      // may want copy and paste on different moment.
      // and you do not want the changes happened
      // later to reflect on the copy.
      canvas.getActiveObject().clone(function(cloned) {
        _clipboard = cloned;
      });
    };

    var paste = () =>{
      // clone again, so you can do multiple copies.
      _clipboard.clone(function(clonedObj) {
        canvas.discardActiveObject();
        clonedObj.set({
          left: clonedObj.left + 10,
          top: clonedObj.top + 10,
          evented: true,
        });
        if (clonedObj.type === 'activeSelection') {
          // active selection needs a reference to the canvas.
          clonedObj.canvas = canvas;
          clonedObj.forEachObject(function(obj) {
            canvas.add(obj);
          });
          // this should solve the unselectability
          clonedObj.setCoords();
        } else {
          canvas.add(clonedObj);
        }
        _clipboard.top += 10;
        _clipboard.left += 10;
        canvas.setActiveObject(clonedObj);
        canvas.requestRenderAll();
      });
    };
    document.getElementById("copy").onclick = copy;
    document.getElementById("paste").onclick = paste;

    document.getElementById("undo").onclick = ()=>{
      canvas.undo();
      
    } 
    
    
    // Add Text
    document.getElementById("showText").onclick = () =>{
      document.getElementById("textToAddDiv").style.display='block';
    }
    document.getElementById("addText").onclick = () =>{
      var text = new fabric.Text(document.getElementById("textToAdd").value, { left: 100, top: 100 });
      canvas.add(text);
      document.getElementById("textToAddDiv").style.display='none';
    }


    // document.getElementById("copy").onclick = copy;
    // document.getElementById("paste").onclick = paste;

    // support change font
    document.getElementById('font-family').onchange = function() {

        canvas.getActiveObject().set("fontFamily", this.value);
        canvas.requestRenderAll();
    };

    // Photos-choose the images from local
    document.getElementById("myImage").addEventListener('change', (e) =>{
      canvas.requestRenderAll();
      let reader = new FileReader();
      
      reader.onload = (e1) =>{
        let imgObj = new Image();
        imgObj.src = e1.target.result;
        imgObj.onload = () =>{
          let cImg = new fabric.Image(imgObj);
          cImg.set({
            left: 100,
            top: 100,
            scaleX: 0.2,
            scaleY: 0.2
          });
          canvas.add(cImg); 
        };
      }
      reader.readAsDataURL(e.target.files[0]);
    });

    // Save-- When click save button , the images will saved in database
    var save = () =>{
      let imageData = canvas.toDataURL({
        format: 'jpeg',
        quality: 0.8
      });

      let httpRequest = new XMLHttpRequest();
      httpRequest.open("POST", "/whiteboard");
      httpRequest.onreadystatechange = function(){
        if (this.readyState == 4 && this.status == 200){
          console.info("success");
        }
      };
      httpRequest.setRequestHeader("Content-type", "application/json;charset=UTF-8");
      httpRequest.send(JSON.stringify({imageName: "noname", data: imageData}));
    };

  // Shape   
    document.getElementById("shape_button").onclick = () =>{
      var shape = document.getElementById('shape_list')
      shape.style.display= document.getElementById("shape_list").style.display === 'none' ? 'block' : 'none';
    }
    var addShape = (e) =>{
      const index = e.currentTarget.getAttribute("id").split('_');
      fabric.loadSVGFromURL('http://fabricjs.com/assets/' + index[2] + ".svg", function(objects, options){
        let loadedObject = fabric.util.groupSVGElements(objects, options);
        loadedObject.set({
            left: 100,
            top: 100
        }).setCoords();
        canvas.add(loadedObject);
      });
    };
    document.getElementById("save").onclick = save;
    for (let ele of document.getElementsByClassName("svg_shape")){
          ele.addEventListener('click', addShape);
    }
    

  })();



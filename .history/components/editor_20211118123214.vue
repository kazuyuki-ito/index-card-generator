<template>
<div class="writing-modal">
    <div class="content" :class="{'confirm': confirm}">
        <canvas id="canvas" :class="[size]" ref="cartImage" />
        <div class="foot-menu">
            <button class="btn green" @click="download">画像ダウンロード</button>
            <button class="btn white" @click="test">閉じる</button>
        </div>
        <!--
        <div class="modal-menu" v-if="!confirm">
            <div class="mode">
                <p>モード</p>
                <ul>
                    <li><button class="btn white" :class="{'on': isDrawingMode == false}" @click="modeChange(false)">レイヤー</button></li>
                    <li><button class="btn white" :class="{'on': isDrawingMode == true}" @click="modeChange(true)">手書き</button></li>
                </ul>
            </div>
            <div class="hand" v-if="isDrawingMode == true">
                <p>色</p>
                <ul>
                    <li><button class="btn white" :class="{'on': drawingColor == 'black'}" @click="handColor('black')">黒</button></li>
                    <li><button class="btn white" :class="{'on': drawingColor == 'red'}" @click="handColor('red')">赤</button></li>
                    <li><button class="btn white" :class="{'on': drawingColor == 'blue'}" @click="handColor('blue')">青</button></li>
                </ul>
                <button class="btn white" @click="undo">戻す</button>
            </div>
            <div class="layer" v-if="isDrawingMode == false">
                <p>テキストボックスの文字色</p>
                <ul>
                    <li><button class="btn white" :class="{'on': fillColor == 'black'}" @click="fillColor = 'black'">黒</button></li>
                    <li><button class="btn white" :class="{'on': fillColor == 'red'}" @click="fillColor = 'red'">赤</button></li>
                    <li><button class="btn white" :class="{'on': fillColor == 'blue'}" @click="fillColor = 'blue'">青</button></li>
                </ul>
                <button class="btn white" @click="addTextBox()">テキストボックス追加</button>
                <button v-if="guideMode == false" class="btn white" @click="getTemplate()">テンプレート画像の拡大・縮小</button>
                <button class="btn white" @click="deleteLayer()">レイヤー削除</button>
            </div>
            <div class="hand">
              <p>背景</p>
              <ul>
                  <li><button class="btn white" :class="{'on': canvasBgColor == null}" @click="bgColor(null)">なし</button></li>
                  <li><button class="btn white" :class="{'on': canvasBgColor == 'rgb(250,250,250)'}" @click="bgColor('rgb(250,250,250)')">白</button></li>
                  <li><button class="btn white" :class="{'on': canvasBgColor == 'rgb(0,0,0)'}" @click="bgColor('rgb(0,0,0)')">黒</button></li>
              </ul>
            </div>
            <button class="btn green" @click="save">保存</button>
            <button class="btn white" @click="close">閉じる</button>
        </div>
        -->
    </div>
</div>
</template>

<script>

import { fabric } from "fabric";

export default {
    props: ['image', 'editCanvas', 'vertical', 'confirm', 'canvasId', 'proof', 'size', 'design', 'font'],
    data() {
        return {
            baseCanvas: null,
            canvasData: null,
            context: null,
            isDrag: false,
            photo: null,
            guideMode: false,
            isRedoing: true,
            canvasHistory: null,
            isDrawingMode: false,
            canvasBgColor: null,
            rewrite: false,
            canvasWidth: 0,
            canvasHeight: 0,
            fontFamily: null
        }
    },
    mounted(){
        if(this.design == 'a') {
            this.fontFamily = '"Noto Sans JP", sans-serif';
        } else if(this.design == 'b') {
            this.fontFamily = '"Noto Serif JP", serif';
        } else if(this.design == 'c') {
            this.fontFamily = '"Hachi Maru Pop", cursive';
        }
        if(this.size == "square") {
            this.canvasData = new fabric.Canvas('canvas', {
              preserveObjectStacking: true,
              width: 525.5,
              height: 525.5,
            });
            this.canvasData.add(
	            new fabric.Rect({
	            	width: 1051,
	            	height: 1051,
	            	left: 0,
	            	top: 0,
	            	fill: 'white',
                    hasControls: false,
                    selectable: false
	            })
            );
            let textSample1 = new fabric.Textbox('テキスト', {
                width: 1051,
                top: 100,
                left: 0,
                fontSize: 50,
                hasControls: false,
                fontWeight: 'bold',
                textAlign: 'center',
                fontFamily: this.fontFamily,
            })
            this.canvasData.add(textSample1)
            let textSample2 = new fabric.Textbox('テキスト', {
                width: 1051,
                top: 550,
                left: 0,
                fontSize: 90,
                hasControls: false,
                fontWeight: '700',
                textAlign: 'center',
                fontFamily: this.fontFamily,

            })
            this.canvasData.add(textSample2)
            this.canvasData.renderAll();
            this.canvasData.setZoom(0.5);
        } else if(this.size == "horizontal") {
            this.canvasData = new fabric.Canvas('canvas', {
              preserveObjectStacking: true,
              width: 750,
              height: 525.5,
            });
            this.canvasData.add(
	            new fabric.Rect({
	            	width: 1500,
	            	height: 1051,
	            	left: 0,
	            	top: 0,
	            	fill: 'white',
                    hasControls: false,
                    selectable: false
	            })
            );
            let textSample1 = new fabric.Textbox('テキスト', {
                width: 1500,
                top: 100,
                left: 0,
                fontSize: 50,
                hasControls: false,
                fontWeight: '700',
                textAlign: 'center',
                fontFamily: this.fontFamily,
            })
            this.canvasData.add(textSample1)
            let textSample2 = new fabric.Textbox('テキスト', {
                width: 1500,
                top: 550,
                left: 0,
                fontSize: 90,
                hasControls: false,
                fontWeight: '700',
                textAlign: 'center',
                fontFamily: this.fontFamily,
            })
            this.canvasData.add(textSample2)
            this.canvasData.renderAll();
            this.canvasData.setZoom(0.5);
        } else if(this.size == "vertical") {
            this.canvasData = new fabric.Canvas('canvas', {
              preserveObjectStacking: true,
              width: 420.4,
              height: 600,
            });
            this.canvasData.add(
	            new fabric.Rect({
	            	width: 1051,
	            	height: 1500,
	            	left: 0,
	            	top: 0,
	            	fill: 'white',
                    hasControls: false,
                    selectable: false
	            })
            );
            let textSample1 = new fabric.Textbox('テキスト', {
                width: 1051,
                top: 200,
                left: 0,
                fontSize: 50,
                hasControls: false,
                fontWeight: '700',
                textAlign: 'center',
                fontFamily: this.fontFamily,
            })
            this.canvasData.add(textSample1)
            let textSample2 = new fabric.Textbox('テキスト', {
                width: 1051,
                top: 700,
                left: 0,
                fontSize: 90,
                hasControls: false,
                fontWeight: '700',
                textAlign: 'center',
                fontFamily: this.fontFamily,
            })
            this.canvasData.add(textSample2)
            this.canvasData.renderAll();
            this.canvasData.setZoom(0.4);
        }
        const cv = this.canvasData
        let history = []
        let vertical = this.vertical
        cv.on('object:added', (e) => {
            if (!this.isRedoing) {
                history = [];
            }
            this.isRedoing = false
            this.canvasHistory = history
        });
    },
    methods: {
        modeChange: function(flag) {
            this.canvasData.isDrawingMode = flag
            this.isDrawingMode = flag
        },
        handColor: function(color) {
            this.canvasData.freeDrawingBrush.color = color
            this.drawingColor = color
        },
        guidePhoto: function(flg) {
          let vertical = this.vertical
          let cv = this.canvasData
          if(flg) {
            if(this.guideMode) return
            let objects = cv.getObjects()
            for (var i = 0;  i < objects.length;  i++) {
              let photoSrc = objects[i]
              if(photoSrc !== void 0 && photoSrc.id == 'temp-image') {
                let tImg = cv.getObjects()[i]
                vertical ? tImg.scaleToHeight(700) : tImg.scaleToWidth(700)
                tImg.set({
                  top:  (cv.height - tImg.height * tImg.scaleY) / 2,
			            left: (cv.width - tImg.width * tImg.scaleX) / 2,
                  selectable: false,
                }).setCoords().moveTo(0);
              }
            }
            cv._activeObject = null
            cv.renderAll()
            this.guideMode = true
          }else {
            if(!this.guideMode) return
            let objects = cv.getObjects()
            for (var i = 0;  i < objects.length;  i++) {
              if(objects[i] !== void 0 && objects[i].id == 'temp-image') {
                objects[i].set({
                  selectable: true,
                }).setCoords()
              }
              let photoSrc = objects[i]._element
              if(photoSrc !== void 0 && (photoSrc.currentSrc.indexOf('photo_guide') > -1 || photoSrc.currentSrc.indexOf('print_guide') > -1)) {
                cv.remove(cv.getObjects()[i])
              }
            }
            cv.renderAll()
            this.guideMode = false
          }
        },
        bgColor: function(color) {
            this.canvasData.backgroundColor = color
            this.canvasBgColor = color
            this.canvasData.renderAll()
        },
        getTemplate: function() {
          let cv = this.canvasData
          cv.getObjects().forEach(function(o) {
            if(o.id == 'temp-image') {
              cv.setActiveObject(o)
              cv.renderAll()
            }
          })
        },
        addTextBox: function(color) {
            let textSample = new fabric.Textbox('テキスト入力', {
                width: 200,
                top: 350,
                left: 300,
                fontSize: 18,
                fill: this.fillColor,
                fontWeight: 'bold',
                borderColor: '#B2CCFF',
                cornerColor: '#B2CCFF',
                transparentCorners: false,
                textAlign: 'left'
            })
            this.canvasData.add(textSample)
            this.canvasData.setActiveObject(textSample)
        },
        deleteLayer: function() {
            this.canvasData.remove(this.canvasData.getActiveObject())
        },
        undo: function() {
            if(this.canvasData._objects.length > 0){
                let h = this.canvasHistory
                h.push(this.canvasData._objects.pop())
                this.canvasData.renderAll()
            }
        },
        //async save() {
        //    if(this.rewrite) {
        //      const canvasRewite = await API.graphql({
        //          query: mutations.updateKoseiCanvas,
        //          variables: {
        //              input: {
        //                  id: this.canvasId,
        //                  layer: JSON.stringify(this.canvasData)
        //              },
        //          },
        //      }).catch((err) => console.log(err));
        //      this.$emit('save', this.canvasId)
        //    } else {
        //      const canvasSave = await API.graphql({
        //          query: mutations.createKoseiCanvas,
        //          variables: {
        //              input: {
        //                  layer: JSON.stringify(this.canvasData),
        //              },
        //          },
        //      }).catch((err) => console.log(err));
        //      let canvasId = canvasSave.data.createKoseiCanvas.id
        //      this.$emit('save', canvasId)
        //    }
        //},
        // 画像ダウンロード
        download: function() {
            this.resetZoom()
            //console.log(this.$refs.canvasTemp.toDataURL("image/png"))
            this.concatCanvas()
            let link = document.createElement("a");
            link.href = this.canvasData.toDataURL("image/png");
            link.download = 'canvas-' + new Date().getTime() + '.png';
            link.click();
        },
        async concatCanvas(){
            let card = this.$refs.cartImage
            let tempContext = card.getContext('2d')
            let ref = await this.getImagefromCanvas();
            console.log(ref)
            tempContext.drawImage(ref, 0, 0, card.width, card.height);
        },
        getImagefromCanvas(){
            return new Promise((resolve, reject) => {
                const image = new Image();
                const ctx = this.$refs.cartImage.getContext("2d");
                image.onload = () => resolve(image);
                image.onerror = (e) => reject(e);
                image.src = ctx.canvas.toDataURL();
            });
        },
        resetZoom: function(){
            this.canvasData.width = this.canvasData.width*2;
            this.canvasData.height = this.canvasData.height*2;
            this.canvasData.setZoom(1);
            this.canvasData.renderAll()
        },
        back: function(){
            this.$emit('back');
        }
    }
}
</script>

<style scoped>
.writing-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #efefef;
  z-index: 10;
}
.content {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  text-align: center;
  padding: 10px;
  margin: auto;
  height: 100vh;
  overflow: auto;
  background: #efefef;
}
#canvas {
    border: 1px solid #000;
    margin: 0 auto;
}
.myCanvas {
    margin: auto;
    display: block;
    position: relative;
    z-index: 1;
}
.myTemp {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 0;
}
.eraser {
    cursor: url(/img/eraser.png) 15 15,auto;
}
.modal-menu {
  width: 300px;
  height: 100%;
  position: fixed;
  bottom: 0;
  right: 0;
  background: #fff;
  padding: 15px;
  z-index: 10;
}
.type-list {
  margin-bottom: 12px;
  margin-left: 16px;
  margin-right: 16px;
  text-align: left;
  display: inline-block;
}
.type-list p {
  font-size: 1.4rem;
  display: block;
  vertical-align: middle;
  margin-right: 12px;
}
.type-list ul {
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
}
.type-list ul li {
  font-size: 1.4rem;
  display: inline-block;
  vertical-align: middle;
  margin-left: -1px;
}

.modal-menu button {
    display: inline-block;
    margin-left: 10px;
    width: 120px;
}
.type-list button {
  width: 100px;
  font-size: 1.4rem;
  display: inline-block;
  border: 1px solid #d1d1d1;
  padding: 12px;
  outline: none;
  width: 48px;
  height: 48px;
  margin-left: 0;

}
.btn {
  padding: 12px;
}
.type-list button.on {
  background: #eee;
}
.mode {
    margin-bottom: 20px;
}
.mode p {
    text-align: left;
    font-weight: bold;
    margin-bottom: 5px;
}
.mode ul {
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
}
.mode ul li {
  font-size: 1.4rem;
  display: inline-block;
  vertical-align: middle;
  margin-left: -1px;
  width: 50%;
}
.mode ul li button {
  width: 100%;
  margin-left: 0;
  border-radius: 6px 0 0 6px;
}
.mode ul li + li button {
  border-radius: 0 6px 6px 0;
}

button.on {
  background: #eee;
}
.layer {
    margin-bottom: 20px;
}
.layer button {
    width: 100%;
    margin-left: 0;
}
.layer button + button {
  margin-top: 20px;
}

.hand {
    margin-bottom: 20px;
}
.hand p,
.layer p {
    text-align: left;
    font-weight: bold;
    margin-bottom: 5px;
}
.hand ul,
.layer ul {
  font-size: 0;
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  margin-bottom: 20px;
}
.hand button {
  width: 100%;
  margin-left: 0;
}

.hand ul li,
.layer ul li {
  font-size: 1.4rem;
  display: inline-block;
  vertical-align: middle;
  margin-left: -1px;
  width: 33.3333%;
}
.hand ul li button,
.layer ul li button {
  width: 100%;
  margin-left: 0;
  border-radius: 0;
}
.hand ul li:first-child button,
.layer ul li:first-child button {
  border-radius: 6px 0 0 6px;
}
.hand ul li:last-child button,
.layer ul li:last-child button {
  border-radius: 0 6px 6px 0;
}
.hand input {
    width: 100%;
}
.foot-menu {
  width: 100%;
  height: 110px;
  position: fixed;
  bottom: 0;
  left: 0;
  background: #fff;
  padding: 15px 0;
}

.foot-menu .btn {
  width: 180px;
  display: inline-block;
}
</style>
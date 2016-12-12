/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import CPU from "js/Cpu.js";
import Memory from "js/Memory.js";
import Screen from "js/Screen.js";
import memoryLayout from "js/memoryLayout.js";
import log from "./js/log.js";

import font from "design/font0.js";

export default class App {
  start() {

    let memory = new Memory(memoryLayout);
    memory.init();

    let cpu = new CPU(memory);

    // let's put some random dots onscreen
    var fc = 1;
    function update(df) {
      log(df);
      var screenOffset = memoryLayout.graphicsStart, addr, val;
      addr = screenOffset;
      for (var y = 0; y < 200; y++) {
        for (var x = 0; x < 320; x++) {
          addr++; 
          //val = (((y & 0x01) + (x & 0x01)) % 2 )* fc + (x / y) ;
          val = (1)* fc + (x / (y));
          memory.poke(addr, val);
        }
      }
      for (var row = 0; row < 25; row++) {
        for (var col = 0; col < 40; col++) {
          //memory.poke(memoryLayout.tilePage0 + ((row * 40) + col), Math.floor(Math.random()*256));
          screen.setTile(3, row, col, ((fc>>2)+ (row*40) + col) % 256);
        }
      }
      screen.setTilePageOffsets(3, Math.floor(Math.sin(fc/6.28) * 16), Math.floor(Math.cos(fc/6.28) * 16));
      screen.setTilePageOffsets(1, -Math.floor(Math.sin(fc/6.28) * 16), Math.floor(Math.cos(fc/6.28) * 8));
      screen.setTilePageOffsets(0, Math.floor(Math.sin(fc/6.28) * 16), -Math.floor(Math.cos(fc/6.28) * 4));
    }

    // let's load a font
    var tileSet0Offset = memoryLayout.tileSet0;
    font.forEach((v, i) => {
      memory.poke(i+tileSet0Offset, v);
    });

    // and draw it?
    var screen = new Screen("screen", memory);

    screen.setBackgroundColor(0x02);
    screen.setBorderColor(0x0B);
    screen.setBorderSize(4, 4);
    screen.setGraphicsLayer(0);

    // let's play with layers!
    screen.setTilePageLayer(0, 1);
    screen.setTilePageLayer(1, 2);
    screen.setTilePageLayer(3, 3);
    screen.setTilePageScale(3, 1);
    screen.setTilePageCrops(3, 16, 16);
    screen.setTilePageOffsets(3, -4, -4);
    
    for (var col = 0; col < 40; col++) {
      screen.setTile(0, 0, col, 0x23);
      screen.setTile(0, 24, col, 0x23);
      screen.setTile(1, 1, col, 0x07);
      screen.setTile(1, 23, col, 0x07);
    }
    for (var row = 0; row < 25; row++) {
      screen.setTile(0, row, 0, 0x23);
      screen.setTile(0, row, 39, 0x23);
      screen.setTile(1, row, 1, 0x07);
      screen.setTile(1, row, 38, 0x07);
    }


    var oldf = 0;
    function drawLoop(f) {
      let df = f - oldf;
      oldf = f;

      update(df);
      screen.update();
      screen.draw();
      
      cpu.step();
      
      fc++;
      if (fc<242) { window.requestAnimationFrame(drawLoop);}
    }
    window.requestAnimationFrame(drawLoop);

  }
}

window.app = (new App()).start();
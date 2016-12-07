/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import CPU from "js/Cpu.js";
import Memory from "js/Memory.js";
import Screen from "js/Screen.js";
import memoryLayout from "js/memoryLayout.js";

import font from "design/font0.js";

export default class App {
  start() {

    let memory = new Memory(memoryLayout);
    memory.init();

    let cpu = new CPU(memory);

    // let's put some random dots onscreen
    var fc = 1;
    function update() {
      var screenOffset = memoryLayout.graphicsStart, addr, val;
      for (var y = 0; y < 200; y++) {
        for (var x = 0; x < 320; x++) {
          addr = screenOffset + (y * 320) + x;
          //val = (((y & 0x01) + (x & 0x01)) % 2 )* fc + (x / y) ;
          val = (1)* fc + (x / (y));
          memory.poke(addr, val);
        }
      }
      for (var row = 0; row < 25; row++) {
        for (var col = 0; col < 40; col++) {
          //memory.poke(memoryLayout.tilePage0 + ((row * 40) + col), Math.floor(Math.random()*256));
          memory.poke(memoryLayout.tilePage0 + ((row * 40) + col), (fc + (row*40) + col) % 256);
        }
      }
    }

    // let's create a tile
    var tileSet0Offset = memoryLayout.tileSet0;
    /*
    var tileSet0 = {
      "65": [ 0x00, 0x00, 0x00, 0xFF, 0x00, 0x00, 0x00, 0x00,
            0x00, 0x00, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00,
            0x00, 0xFF, 0xFF, 0x00, 0xFF, 0xFF, 0x00, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
            0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
            0xFF, 0xFF, 0x00, 0x00, 0x00, 0xFF, 0xFF, 0x00,
            0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00 ]
    }

    tileSet0["65"].forEach(function(v,i) {
      memory.poke(i+tileSet0Offset+(65*64),v)
      console.log([v,i]);
    });*/

    font.forEach((v, i) => {
      memory.poke(i+tileSet0Offset, v);
    });


    // and draw it?
    var screen = new Screen("screen", memory);
    memory.poke(memoryLayout.graphicsDisplay,1);
    memory.poke(memoryLayout.tileDisplay,1);
    var oldf = 0;
    function drawLoop(f) {
        oldf = f;
        update();
        screen.update();
        screen.draw();
        
        cpu.step();
        
        fc++;
        if (fc<242) { window.requestAnimationFrame(drawLoop);}
    }
    window.requestAnimationFrame(drawLoop);

  /**/
  }
}

window.app = (new App()).start();
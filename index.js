/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import CPU from "js/Cpu.js";
import Memory from "js/Memory.js";
import Screen from "js/Screen.js";
import memoryLayout from "js/memoryLayout.js";

export default class App {
  start() {

    let _log = [];
    function log(s) {
      _log.push(s);
      if (_log.length > 24) {
        _log.shift();
      }
      document.getElementById("log").innerHTML = _log.join("<BR>");
    }
    window.log = log;

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
          val = (((y & 0x01) + (x & 0x01)) % 2 )* fc;
          memory.poke(addr, val);
        }
      }
    }

    // let's create a tile
    var tileSet0Offset = memoryLayout.tileSet0;
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
    });
    for (var row = 0; row < 25; row++) {
      for (var col = 0; col < 40; col++) {
        memory.poke(memoryLayout.tilePage0 + ((row * 40) + col), 65);
      }
    }

    // and draw it?
    var screen = new Screen("screen", memory);
    memory.poke(memoryLayout.graphicsDisplay,1);
    memory.poke(memoryLayout.tileDisplay,1);
    var oldf = 0;
    function drawLoop(f) {
        //log([f-oldf,f]);
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
/*******************************************************************
 *
 * Retroputer
 *
 *******************************************************************/

import memoryLayout from "js/memoryLayout.js";
import Computer from "js/Computer.js";
import log from "./js/log.js";


export default class App {
  start() {

    var fc = 1;
    function beforeFrameUpdate(computer, df) {
      // this is so we know things are working for now
      let mfc = fc % 256;
      var screenOffset = memoryLayout.graphicsStart, addr, val;
      addr = screenOffset;
      for (var y = 0; y < 200; y++) {
        for (var x = 0; x < 320; x++) {
          addr++; 
          //val = (((y & 0x01) + (x & 0x01)) % 2 )* fc + (x / y) ;
          val = (1)* mfc + (x / (y));
          computer.memory.poke(addr, val);
        }
      }
      for (var row = 0; row < 25; row++) {
        for (var col = 0; col < 40; col++) {
          //memory.poke(memoryLayout.tilePage0 + ((row * 40) + col), Math.floor(Math.random()*256));
          computer.screen.setTile(3, row, col, ((mfc>>2)+ (row*40) + col) % 256);
        }
      }
      computer.screen.setTilePageOffsets(3, Math.floor(Math.sin(mfc/6.28) * 16), Math.floor(Math.cos(mfc/6.28) * 16));
      computer.screen.setTilePageOffsets(1, -Math.floor(Math.sin(mfc/6.28) * 16), Math.floor(Math.cos(mfc/6.28) * 8));
      computer.screen.setTilePageOffsets(0, Math.floor(Math.sin(mfc/6.28) * 16), -Math.floor(Math.cos(mfc/6.28) * 4));

      fc++;
    }

    let computer = new Computer({
      screenId: "screen",
      beforeFrameUpdate,
      debug: true
    });

    computer.screen.setBackgroundColor(0x02);
    computer.screen.setBorderColor(0x0B);
    computer.screen.setBorderSize(4, 4);
    computer.screen.setGraphicsLayer(0);

    // let's play with layers!
    computer.screen.setTilePageLayer(0, 1);
    computer.screen.setTilePageLayer(1, 2);
    computer.screen.setTilePageLayer(3, 3);
    computer.screen.setTilePageScale(3, 1);
    computer.screen.setTilePageCrops(3, 16, 16);
    computer.screen.setTilePageOffsets(3, -4, -4);
    
    for (var col = 0; col < 40; col++) {
      computer.screen.setTile(0, 0, col, 0x23);
      computer.screen.setTile(0, 24, col, 0x23);
      computer.screen.setTile(1, 1, col, 0x07);
      computer.screen.setTile(1, 23, col, 0x07);
    }
    for (var row = 0; row < 25; row++) {
      computer.screen.setTile(0, row, 0, 0x23);
      computer.screen.setTile(0, row, 39, 0x23);
      computer.screen.setTile(1, row, 1, 0x07);
      computer.screen.setTile(1, row, 38, 0x07);
    }

    computer.start();

    // stop computer after 10s
    setInterval(() => {
      computer.stop();
    }, 10000);
  }
}

window.app = (new App()).start();
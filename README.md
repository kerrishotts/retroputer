# Retroputer

Retroputer is an emulator for a computer system that resembles machines in the 80's and 90's. However, the machine as presented did not exist in this form -- rather, the emulator seeks only to emulate the look and feel of these machines, not replicate an actual machine from the era. There are plenty of emulators that do so excellently. Instead, Retroputer has these goals:

- Be simple to learn
- Encourage programming
- Work in a web browser
- Resemble 8 and 16-bit machines
- Have a completely understandable architecture from low-level "hardware" to high-level software

Retroputer V2 is intended to be a lower-level faux emulator than Retroputer v1 that incorporates low level technologies such as buses and clocks. This isn't intended to be a perfect representation of physical hardware, but makes interconnects between simulated devices much easier, and also simplifies the modeling of the overall structure of the computer.

> **Important**: Retroputer V2 is *far* from complete, as is the documentation in [the wiki](https://www.notion.so/Retroputer-V2-b025c3b6c86c46c7b21f1e89ec7052d2). Take *everything* with huge grains of salt!

## Status

See [status in the wiki](https://www.notion.so/Retroputer-V2-b025c3b6c86c46c7b21f1e89ec7052d2).

## Launching

You can try the [online version](https://blissful-bose-ff8542.netlify.com). (Probably a few commits behind.)

You can launch the browser interface executing:

```
$ npm install
$ npm run watch
```

Then navigate to http://localhost:1234

## Tests

You can run tests by executing `npm test`.

## Docs

(Out-of-date) Documentation is available in the [docs](./docs) directory. The more up-to-date stuff [is here](https://www.notion.so/Retroputer-V2-b025c3b6c86c46c7b21f1e89ec7052d2).

## License

MIT License. Use as much or as little as you want.

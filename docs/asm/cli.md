# Command Line Interface

The command line interface is called `asm`. The CLI itself is fairly simple.

## Usage

Call the CLI assembler using `asm`, or `npm run asm`. Examples:

```
$ asm < infile.asm > outfile.out
$ npm run asm < infile.asm > outfile.out
```

Additional options can be specified. When using `npm run asm`, specify the options after a `--`, like sho:

```
$ npm run asm -- --format bin < infile.asm > outfile.out
```

### Options


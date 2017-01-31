# Command Line Interface

The command line interface is called `asm`. The CLI itself is fairly simple.

## Usage

Call the CLI assembler using `asm`, or `npm run asm`. Examples:

```
$ asm < infile.asm > outfile.out
$ npm run -s asm < infile.asm > outfile.out
```

Additional options can be specified. When using `npm run -s asm`, specify the options after a `--`, like so:

```
$ npm run -s asm -- --format bin < infile.asm > outfile.out
```

### Options

There are a few useful options that you may wish to use.

### Debug mode

The `--debug` switch will show debugging information.

### Output format

The `--format` switch specifies the output format. Accepts `js` and `bin`; `js` is the default. 

### Base Path

Because the CLI works on STDIN, it needs to know where any `.imports` should come from. This defaults to the current working directory, but if that's not the case, you can specify this with `--basepath`.


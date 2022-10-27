### Motivation

After experimenting with several C++ features I wanted to test them out.
Particualarlly interesting to me was using variadic expressions to generate a lot of code.
With this in mind, I wanted to create a parser which would create elements and insert them in thier final
position, all while reducing object construction to a single (templated) method.

### Challenges

I have never made a text processor before but I had the desire to learn.
This parser is a shift reduce parser with one lookahead symbol.
While I wanted to make the lookahead symbol entirely automated, that proved too difficult for the inital project
and the lookahead symbols were/are manually specified.

### Grammar

Here is the grammar for the language I created. It shares a C like curly brace syntax.
Most of the Symbols used here are fairly self explanatory however the regex used can be found on [github](https://github.com/Drew-j-Smith/smithscript/blob/wasm/src/script/tokens.h).

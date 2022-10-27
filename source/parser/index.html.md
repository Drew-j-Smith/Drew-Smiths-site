---
title: Parser
---

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

<pre>
             &lt;FunctionCall> ::= &lt;FunctionParameters>&lt;CloseParenToken>
                              | &lt;Identifier>&lt;OpenParenToken>&lt;CloseParenToken>

             &lt;IfExpression> ::= &lt;IfCondition>&lt;OpenBraceToken>&lt;Block>&lt;CloseBraceToken>

              &lt;IfCondition> ::= &lt;IfToken>&lt;OpenParenToken>&lt;AddExpression>&lt;CloseParenToken>

          &lt;WhileExpression> ::= &lt;WhileCondition>&lt;OpenBraceToken>&lt;Block>&lt;CloseBraceToken>

           &lt;WhileCondition> ::= &lt;WhileToken>&lt;OpenParenToken>&lt;AddExpression>&lt;CloseParenToken>

                  &lt;Integer> ::= &lt;IntegerToken>

               &lt;Expression> ::= &lt;Identifier>
                              | &lt;Integer>
                              | &lt;OpenParenToken>&lt;AddExpression>&lt;CloseParenToken>
                              | &lt;FunctionCall>
                              | &lt;Identifier>&lt;OpenSquareBraceToken>&lt;AddExpression>&lt;CloseSquareBraceToken>
                              | &lt;StringLiteralToken>

           &lt;MultExpression> ::= &lt;MultExpression>&lt;MultToken>&lt;Expression>
                              | &lt;Expression>

            &lt;AddExpression> ::= &lt;AddExpression>&lt;AddToken>&lt;MultExpression>
                              | &lt;AddExpression>&lt;SubToken>&lt;MultExpression>
                              | &lt;MultExpression>

               &lt;Assignment> ::= &lt;Identifier>&lt;EqlToken>&lt;AddExpression>
                              | &lt;Identifier>&lt;OpenSquareBraceToken>&lt;AddExpression>&lt;CloseSquareBraceToken>&lt;EqlToken>&lt;AddExpression>

                &lt;Statement> ::= &lt;AddExpression>&lt;SemicolonToken>
                              | &lt;Assignment>&lt;SemicolonToken>
                              | &lt;IfExpression>
                              | &lt;WhileExpression>

                    &lt;Block> ::= &lt;Block>&lt;Statement>
                              | &lt;Statement>

       &lt;FunctionParameters> ::= &lt;Identifier>&lt;OpenParenToken>&lt;AddExpression>
                              | &lt;FunctionParameters>&lt;CommaToken>&lt;AddExpression>
</pre>

### Interactive terminal

The only function defined is the `print` function, which prints data to the screen.

<script defer src="/parser.js"></script>
<script defer src="/parser_wasm.js"></script>
<p><textarea id="input" cols="80" rows="10"></textarea></p>
<button id="button">Run</button>
<div id="output"></div>

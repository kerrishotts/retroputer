#
# Helper functions
################################################################################
@{%
    function tNumber(d) {
        return {
            type: "number",
            value: Number(d)
        }
    }

    function compact(v) {
        if (Array.isArray(v)) {
            return v.reduce((a, v) => (v === null || v === undefined || (v && v.length === 0) ) ? a : (a.push(v), a), []);
        } else {
            return v;
        }
    }

    function flatten(v) {
        let r;
        if (Array.isArray(v)) {
            r = v.reduce((a,v) => (a.push(...((v && Array.isArray(v)) ? flatten(v) : [v])), a), []);
        } else {
            r = v;
        }
        r = compact(r);
        return r;
    }
%}

@builtin "whitespace.ne"

#
# MAIN -- START HERE
################################################################################

main                -> _ SourceElements _
                       {% d => flatten(d[1]) %}

SourceElements      -> SourceElement
                       {% d => flatten(d[0]) %}
                     | SourceElements _nl_ SourceElement
                       {% d => flatten([d[0], d[2]]) %}

SourceElement       -> Statement
                       {% d => d[0] %}

#
# Spacing and comments
################################################################################

_nl_                -> [\n\r]
                       {% d => null %}
                     | [\n\r] [\s]:+
                       {% d => null %}
comment             -> ";" [^\n\r]:*

#
# Primitives
################################################################################

HexNumber           ->  "0x" [a-fA-F0-9]:+
                        {% d => { console.log(d); return tNumber("0x" + d[1].join("")) } %}

BinaryNumber        ->  "0b" [0-1]:+            
                        {% d => tNumber("0b" + d[1].join("")) %}

UInt                ->  [0-9]:+
                        {% d => tNumber(d[0].join("")) %}

Int                 ->  "-":? UInt              
                        {% d => d[0] ? (d[1].value *= -1, d[1]) : d[1] %}

#
# Literal
################################################################################

Literal             -> Int
                       {% d => d[0] %}
                     | BinaryNumber
                       {% d => d[0] %}
                     | HexNumber
                       {% d => d[0] %}

#
# Keywords
################################################################################

ZeroParamKeywords   -> "NOP"
SingleParamKeywords -> "TRAP"
                     | "DEC"
                     | "INC"
                     | "HALT"
                     | "PUSH"
                     | "POP"

Label               -> [A-Za-z\_\-] [A-Za-z0-9\_\-]:+ ":"
                       {% d => ({type: "label", name: [d[0], ...d[1]].join("")}) %}

KeywordPart         -> ZeroParamKeywords
                       {% d => ({type: d[0], parms: []}) %}
                     | SingleParamKeywords _ Literal
                       {% d => ({type: d[0], parms: [d[2]]}) %}

Statement           -> Label _ KeywordPart _ comment:?
                       {% d => [d[1], d[3]] %}
                     | KeywordPart _ comment:?
                       {% id %}
                     | Label _ comment
                       {% d => d[0] %}
                     | comment
                       {% d => null %}
                     | null
                     
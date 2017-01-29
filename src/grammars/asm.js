// Generated automatically by nearley
// http://github.com/Hardmath123/nearley
(function () {
function id(x) {return x[0]; }

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
var grammar = {
    ParserRules: [
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["wschar", "_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "__$ebnf$1", "symbols": ["wschar"]},
    {"name": "__$ebnf$1", "symbols": ["wschar", "__$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": function(d) {return null;}},
    {"name": "wschar", "symbols": [/[ \t\n\v\f]/], "postprocess": id},
    {"name": "main", "symbols": ["_", "SourceElements", "_"], "postprocess": d => flatten(d[1])},
    {"name": "SourceElements", "symbols": ["SourceElement"], "postprocess": d => flatten(d[0])},
    {"name": "SourceElements", "symbols": ["SourceElements", "_nl_", "SourceElement"], "postprocess": d => flatten([d[0], d[2]])},
    {"name": "SourceElement", "symbols": ["Statement"], "postprocess": d => d[0]},
    {"name": "_nl_", "symbols": [/[\n\r]/], "postprocess": d => null},
    {"name": "_nl_$ebnf$1", "symbols": [/[\s]/]},
    {"name": "_nl_$ebnf$1", "symbols": [/[\s]/, "_nl_$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "_nl_", "symbols": [/[\n\r]/, "_nl_$ebnf$1"], "postprocess": d => null},
    {"name": "comment$ebnf$1", "symbols": []},
    {"name": "comment$ebnf$1", "symbols": [/[^\n\r]/, "comment$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "comment", "symbols": [{"literal":";"}, "comment$ebnf$1"]},
    {"name": "HexNumber$string$1", "symbols": [{"literal":"0"}, {"literal":"x"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "HexNumber$ebnf$1", "symbols": [/[a-fA-F0-9]/]},
    {"name": "HexNumber$ebnf$1", "symbols": [/[a-fA-F0-9]/, "HexNumber$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "HexNumber", "symbols": ["HexNumber$string$1", "HexNumber$ebnf$1"], "postprocess": d => { console.log(d); return tNumber("0x" + d[1].join("")) }},
    {"name": "BinaryNumber$string$1", "symbols": [{"literal":"0"}, {"literal":"b"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "BinaryNumber$ebnf$1", "symbols": [/[0-1]/]},
    {"name": "BinaryNumber$ebnf$1", "symbols": [/[0-1]/, "BinaryNumber$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "BinaryNumber", "symbols": ["BinaryNumber$string$1", "BinaryNumber$ebnf$1"], "postprocess": d => tNumber("0b" + d[1].join(""))},
    {"name": "UInt$ebnf$1", "symbols": [/[0-9]/]},
    {"name": "UInt$ebnf$1", "symbols": [/[0-9]/, "UInt$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "UInt", "symbols": ["UInt$ebnf$1"], "postprocess": d => tNumber(d[0].join(""))},
    {"name": "Int$ebnf$1", "symbols": [{"literal":"-"}], "postprocess": id},
    {"name": "Int$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Int", "symbols": ["Int$ebnf$1", "UInt"], "postprocess": d => d[0] ? (d[1].value *= -1, d[1]) : d[1]},
    {"name": "Literal", "symbols": ["Int"], "postprocess": d => d[0]},
    {"name": "Literal", "symbols": ["BinaryNumber"], "postprocess": d => d[0]},
    {"name": "Literal", "symbols": ["HexNumber"], "postprocess": d => d[0]},
    {"name": "ZeroParamKeywords$string$1", "symbols": [{"literal":"N"}, {"literal":"O"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "ZeroParamKeywords", "symbols": ["ZeroParamKeywords$string$1"]},
    {"name": "SingleParamKeywords$string$1", "symbols": [{"literal":"T"}, {"literal":"R"}, {"literal":"A"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SingleParamKeywords", "symbols": ["SingleParamKeywords$string$1"]},
    {"name": "SingleParamKeywords$string$2", "symbols": [{"literal":"D"}, {"literal":"E"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SingleParamKeywords", "symbols": ["SingleParamKeywords$string$2"]},
    {"name": "SingleParamKeywords$string$3", "symbols": [{"literal":"I"}, {"literal":"N"}, {"literal":"C"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SingleParamKeywords", "symbols": ["SingleParamKeywords$string$3"]},
    {"name": "SingleParamKeywords$string$4", "symbols": [{"literal":"H"}, {"literal":"A"}, {"literal":"L"}, {"literal":"T"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SingleParamKeywords", "symbols": ["SingleParamKeywords$string$4"]},
    {"name": "SingleParamKeywords$string$5", "symbols": [{"literal":"P"}, {"literal":"U"}, {"literal":"S"}, {"literal":"H"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SingleParamKeywords", "symbols": ["SingleParamKeywords$string$5"]},
    {"name": "SingleParamKeywords$string$6", "symbols": [{"literal":"P"}, {"literal":"O"}, {"literal":"P"}], "postprocess": function joiner(d) {return d.join('');}},
    {"name": "SingleParamKeywords", "symbols": ["SingleParamKeywords$string$6"]},
    {"name": "Label$ebnf$1", "symbols": [/[A-Za-z0-9\_\-]/]},
    {"name": "Label$ebnf$1", "symbols": [/[A-Za-z0-9\_\-]/, "Label$ebnf$1"], "postprocess": function arrconcat(d) {return [d[0]].concat(d[1]);}},
    {"name": "Label", "symbols": [/[A-Za-z\_\-]/, "Label$ebnf$1", {"literal":":"}], "postprocess": d => ({type: "label", name: [d[0], ...d[1]].join("")})},
    {"name": "KeywordPart", "symbols": ["ZeroParamKeywords"], "postprocess": d => ({type: d[0], parms: []})},
    {"name": "KeywordPart", "symbols": ["SingleParamKeywords", "_", "Literal"], "postprocess": d => ({type: d[0], parms: [d[2]]})},
    {"name": "Statement$ebnf$1", "symbols": ["comment"], "postprocess": id},
    {"name": "Statement$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Statement", "symbols": ["Label", "_", "KeywordPart", "_", "Statement$ebnf$1"], "postprocess": d => [d[1], d[3]]},
    {"name": "Statement$ebnf$2", "symbols": ["comment"], "postprocess": id},
    {"name": "Statement$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "Statement", "symbols": ["KeywordPart", "_", "Statement$ebnf$2"], "postprocess": id},
    {"name": "Statement", "symbols": ["Label", "_", "comment"], "postprocess": d => d[0]},
    {"name": "Statement", "symbols": ["comment"], "postprocess": d => null},
    {"name": "Statement", "symbols": []}
]
  , ParserStart: "main"
}
if (typeof module !== 'undefined'&& typeof module.exports !== 'undefined') {
   module.exports = grammar;
} else {
   window.grammar = grammar;
}
})();

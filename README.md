# XML (xml2json)
 
```JavaScript
import { XML } from "https://js.sabae.cc/XML.js";

const json = XML.toJSON("<xml att='abc'><tag>text</tag></xml>");
console.log(json); // { xml: { att: "abc", tag: { "#text": "text" } } }

const xml = XML.stringify({ xml: { att: "abc", tag: { "#text": "text" } } });
console.log(xml);
```

## dependency

- [DOMParser](https://github.com/code4fukui/xmldom-es/)

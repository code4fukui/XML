# XML (xml2json)
 
```JavaScript
import { XML } from "https://code4fukui.github.io/XML/XML.js";

const json = XML.toJSON("<xml att='abc'><tag>text</tag></xml>");
console.log(json); // { xml: { att: "abc", tag: { "#text": text } } }
```

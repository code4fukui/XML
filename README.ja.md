# XML (xml2json, json2xml)

XMLとJSONを相互に変換します。

## 機能
- XMLをJSONに変換
- JSONをXMLに変換

## 要件
- [DOMParser](https://github.com/code4fukui/xmldom-es/)

## 使い方
```JavaScript
import { XML } from "https://js.sabae.cc/XML.js";

const json = XML.toJSON("<xml att='abc'><tag>text</tag></xml>");
console.log(json); // { xml: { att: "abc", tag: { "#text": "text" } } }

const xml = XML.stringify({ xml: { att: "abc", tag: { "#text": "text" } } });
console.log(xml);
```

## ライセンス
MIT License — 詳細は [LICENSE](LICENSE) を参照してください。

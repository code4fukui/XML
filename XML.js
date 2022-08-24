import { DOMParser } from "https://js.sabae.cc/DOMParser.js";

const parseNode = (xmlNode, result) => {
  if (xmlNode.nodeName == "#text") {
    const v = xmlNode.nodeValue;
    if (v.trim()) {
       result['#text'] = v;
    }
    return;
  }
  const json = {};
  const existing = result[xmlNode.nodeName];
  if (existing) {
    if (!Array.isArray(existing)) {
      result[xmlNode.nodeName] = [existing, json];
    } else {
      result[xmlNode.nodeName].push(json);
    }
  } else {
    result[xmlNode.nodeName] = json;
  }
  if (xmlNode.attributes) {
    const len = xmlNode.attributes.length;
    for (let i = 0; i < len; i++) {
      const a = xmlNode.attributes[i];
      json[a.nodeName] = a.nodeValue;
    }
  }
  const len = xmlNode.childNodes.length;
  for (let i = 0; i < len; i++) {
    parseNode(xmlNode.childNodes[i], json);
  }
};

const parseXML = (xml) => {
  const result = {};
  const dom = new DOMParser().parseFromString(xml, "text/xml");
  const len = dom.childNodes.length;
  for (let i = 0; i < len; i++) {
    parseNode(dom.childNodes[i], result);
  }
  return result;
};

export class XML {
  static toJSON(sxml) {
    return parseXML(sxml);
  }
};

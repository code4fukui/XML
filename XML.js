import { DOMParser } from "https://code4fukui.github.io/xmldom-es/xmldom.js";

const parseNode = (xmlNode, result) => {
  if (xmlNode.nodeName == null) {
    return;
  } else if (xmlNode.nodeName == "#text") {
    const v = xmlNode.nodeValue.trim();
    if (v) {
      result["#text"] = v;
    }
    return;
  } else if (xmlNode.childNodes == undefined) {
    result["#text"] = xmlNode.data;
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


const stringifyXML = (json) => {
  const res = [];
  const stringifyNode = (tag, json, indent) => {
    if (Array.isArray(json)) {
      for (const o of json) {
        stringifyNode(tag, o, indent);
      }
      return;
    }
    // attributes
    const atts = [];
    let bodyflg = false;
    for (const name in json) {
      const o = json[name];
      if (name != "#text" && typeof o != "object") {
        atts.push(name + '="' + o + '"');
      } else {
        bodyflg = true;
      }
    }
    if (!bodyflg) {
      if (atts.length == 0) {
        res.push(`${indent}<${tag}/>`);
      } else {
        res.push(`${indent}<${tag} ${atts.join(" ")}/>`);
      }
      return;
    }
    if (atts.length == 0) {
      res.push(`${indent}<${tag}>`);
    } else {
      res.push(`${indent}<${tag} ${atts.join(" ")}>`);
    }
    for (const name in json) {
      const o = json[name];
      if (typeof o == "object") {
        stringifyNode(name, o, indent + "  ");
      }
    }
    const txt = json["#text"];
    if (txt) {
      res.push(`${indent}  ${txt}`);
    }
    res.push(`${indent}</${tag}>`);
  };
  for (const tag in json) {
    stringifyNode(tag, json[tag], "");
  }
  return res.join("\n");
};

export class XML {
  static toJSON(sxml) {
    return parseXML(sxml);
  }
  static stringify(json) {
    return stringifyXML(json);
  }
};

import * as t from "https://deno.land/std/testing/asserts.ts";
import { XML } from "./XML.js";

Deno.test("toJSON", () => {
  const chk = [
    [ "<xml>a</xml>",            { xml: { "#text": "a" } }],
    [ "<xml><ch>a</ch></xml>",   { xml: { ch: { "#text": "a" } } }],
    [ "<xml></xml>",             { xml: {} }],
    [ "<xml a='b'></xml>",       { xml: { a: "b" } }],
    [ "<xml a='b' b='c'></xml>", { xml: { a: "b", b: "c" } }],
    [ "<xml a='b'>s</xml>",      { xml: { a: "b", "#text": "s" } }],
    [ "<x><c>a</c><c>b</c></x>", { x: { c: [ { "#text": "a" }, { "#text": "b" }] } }],
    [ "<a/><b/>",                { a: {}, b: {} }],
    [ "<a/><a/>",                { a: [ {}, {} ] }],
  ];
  for (const c of chk) {
    t.assertEquals(XML.toJSON(c[0]), c[1]);
  }
});

Deno.test("stringify", () => {
  const chk = [
    [ "<xml>\n  a\n</xml>",                                    { xml: { "#text": "a" } }],
    [ "<xml>\n  <ch>\n    a\n  </ch>\n</xml>",                 { xml: { ch: { "#text": "a" } } }],
    [ "<xml/>",                                                { xml: {} }],
    [ '<xml a="b"/>',                                          { xml: { a: "b" } }],
    [ '<xml a="b" b="c"/>',                                    { xml: { a: "b", b: "c" } }],
    [ '<xml a="b">\n  s\n</xml>',                              { xml: { a: "b", "#text": "s" } }],
    [ "<x>\n  <c>\n    a\n  </c>\n  <c>\n    b\n  </c>\n</x>", { x: { c: [ { "#text": "a" }, { "#text": "b" }] } }],
    [ "<a/>\n<b/>",                                            { a: {}, b: {} }],
  ];
  for (const c of chk) {
    t.assertEquals(XML.stringify(c[1]), c[0]);
    t.assertEquals(XML.toJSON(c[0]), c[1]);
  }
});

Deno.test("xml", () => {
  t.assertEquals(XML.toJSON('<?xml version="1.0" encoding="UTF-8"?>'), {});
});

Deno.test("error", () => {
  t.assertThrows(() => XML.toJSON(""));
  t.assertThrows(() => XML.toJSON(null));
  t.assertThrows(() => XML.toJSON(1));
});

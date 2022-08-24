import * as t from "https://deno.land/std/testing/asserts.ts";
import { XML } from "./XML.js";

Deno.test("simple", () => {
  const chk = [
    [ "<xml>a</xml>",            { xml: { "#text": "a" } }],
    [ "<xml><ch>a</ch></xml>",   { xml: { ch: { "#text": "a" } } }],
    [ "<xml></xml>",             { xml: {} }],
    [ "<xml a='b'></xml>",       { xml: { a: "b" } }],
    [ "<xml a='b' b='c'></xml>", { xml: { a: "b", b: "c" } }],
    [ "<xml a='b'>s</xml>",      { xml: { a: "b", "#text": "s" } }],
    [ "<x><c>a</c><c>b</c></x>", { x: { c: [ { "#text": "a" }, { "#text": "b" }] } }],
  ];
  for (const c of chk) {
    t.assertEquals(XML.toJSON(c[0]), c[1]);
  }
});

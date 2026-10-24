const uint8ArrayPrototype = Uint8Array.prototype as Uint8Array & {
  toHex?: () => string;
};

if (typeof uint8ArrayPrototype.toHex !== "function") {
  Object.defineProperty(uint8ArrayPrototype, "toHex", {
    configurable: true,
    value(this: Uint8Array) {
      return Array.from(this, (byte) =>
        byte.toString(16).padStart(2, "0")
      ).join("");
    },
    writable: true,
  });
}

void import("pdfjs-dist/build/pdf.worker.mjs");

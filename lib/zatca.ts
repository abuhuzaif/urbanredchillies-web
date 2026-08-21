// ZATCA (Saudi VAT) simplified tax invoice QR — TLV (Tag-Length-Value) encoding,
// base64-encoded, exactly like the RedChilies Flutter customer app's receipt.
//
// Tags required by ZATCA:
//   1 = Seller name
//   2 = VAT registration number
//   3 = Invoice timestamp (ISO 8601)
//   4 = Invoice total (with VAT), as string
//   5 = VAT amount, as string

// ⚠️ Replace with the restaurant's real VAT registration number before going live.
export const SELLER_VAT_NUMBER = "300000000000003";
export const SELLER_NAME = "Urban Red Chillies";

function tlvField(tag: number, value: string): Uint8Array {
  const valueBytes = new TextEncoder().encode(value);
  const out = new Uint8Array(2 + valueBytes.length);
  out[0] = tag;
  out[1] = valueBytes.length;
  out.set(valueBytes, 2);
  return out;
}

function concatBytes(chunks: Uint8Array[]): Uint8Array {
  const total = chunks.reduce((sum, c) => sum + c.length, 0);
  const out = new Uint8Array(total);
  let offset = 0;
  for (const c of chunks) {
    out.set(c, offset);
    offset += c.length;
  }
  return out;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary);
}

export function buildZatcaTlvBase64(params: {
  timestamp: string; // ISO 8601
  totalWithVat: number;
  vatAmount: number;
}): string {
  const fields = [
    tlvField(1, SELLER_NAME),
    tlvField(2, SELLER_VAT_NUMBER),
    tlvField(3, params.timestamp),
    tlvField(4, params.totalWithVat.toFixed(2)),
    tlvField(5, params.vatAmount.toFixed(2)),
  ];
  return bytesToBase64(concatBytes(fields));
}

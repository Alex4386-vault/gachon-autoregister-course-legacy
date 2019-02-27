import iconv from 'iconv-lite';

/**
 * URIEncodes string
 * @param a string to encode 
 */
export function encodeMe(a:string):string { return encodeURIComponent(a); }

/**
 * convert eucKR string to UTF8 compliant string
 * @param euckr buffer to convert
 */
export function convertUTF8 (euckr: Buffer):string { return iconv.decode(euckr, "euckr") }
export function generateRandomBuffer(totalBytes: number): BlobPart {
    const buffer = new Uint8Array(totalBytes);

    const chunkSize = 64 * 1024;
    for (let offset = 0; offset < totalBytes; offset += chunkSize) {
        const size = Math.min(chunkSize, totalBytes - offset);
        const view = buffer.subarray(offset, offset + size);
        crypto.getRandomValues(view);
    }
    
    return buffer
}
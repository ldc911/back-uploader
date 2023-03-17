interface Message {
    fileId?: String;
    wsRoom?: String;
    imagePath?: String;
    path?: String;
}
declare const publisher: (message: Message) => Promise<void>;
export { publisher };

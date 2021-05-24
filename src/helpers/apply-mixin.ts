
export default function applyMixins(recipient: any, mixins: any[]) {
    mixins.forEach(mixin => {
        Object.getOwnPropertyNames(mixin.prototype).forEach(mixinPropertyName => {
            console.log(mixinPropertyName, Object.getOwnPropertyDescriptor(mixin.prototype, mixinPropertyName));
            Object.defineProperty(
                recipient.prototype,
                mixinPropertyName,
                Object.getOwnPropertyDescriptor(mixin.prototype, mixinPropertyName) ?? {}
            );
        });
    });
};
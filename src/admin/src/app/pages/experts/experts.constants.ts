export namespace ExpertsConstants {
    export const expertImageWidth: number = 200;
    export const expertImageHeight: number = 200;
    export const isExpertImageRounded: boolean = true;
    export const expertImageAlt: string = 'expert photo';
    export const expertImageDefault: string = 'data:image/png;base64,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';
}
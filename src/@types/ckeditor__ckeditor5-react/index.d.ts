declare module '@ckeditor/ckeditor5-react' {
    export class CKEditor extends React.Component<CKEditorProps> {}
}

declare type EventFunction = (event: Record<string, unknown>, editor: Record<string, unknown> & { getData: () => string }) => void
declare type CKEditorProps = {
    editor: ClassicEditor
    data: string
    onReady: (editor: Record<string, unknown>) => void
    onChange: EventFunction
    onBlur: EventFunction
    onFocus: EventFunction
}

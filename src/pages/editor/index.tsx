import { default as ClassicEditor } from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { default as React } from 'react'

export default function EditorPage() {
    return (
        <div className='App'>
            <h2>Using CKEditor 5 build in React</h2>
            <CKEditor
                editor={ClassicEditor}
                data='<p>Hello from CKEditor 5!</p>'
                onReady={(editor) => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor)
                }}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    console.log({ event, data })
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor)
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor)
                }}
            />
        </div>
    )
}

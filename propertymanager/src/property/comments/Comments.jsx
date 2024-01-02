import { Editor } from '@tinymce/tinymce-react';
import styles from "./comments.module.css"

export default function Comments() {
    return (
        <div className={styles.main}>
            <Editor
                apiKey="eu3uwisdpmdfwl46qrpm2fwmy2yfihe18kknnwwz18zudi1d"
                onInit={(evt, editor) => {}}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                height: "100%",
                menubar: false,
                resize: false,
                language: "fi",
                plugins: [
                    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                    'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                ],
                toolbar: 'undo redo | blocks | ' +
                    'bold italic forecolor | alignleft aligncenter ' +
                    'alignright alignjustify | bullist numlist outdent indent | ' +
                    'removeformat | help',
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                }}
            />
        </div>    
    );
}
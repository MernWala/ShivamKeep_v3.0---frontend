import "@mdxeditor/editor/style.css";

import React, { useMemo } from 'react';
import {
    MDXEditor,
    headingsPlugin,
    listsPlugin,
    quotePlugin,
    tablePlugin,
    codeBlockPlugin,
    codeMirrorPlugin,
    diffSourcePlugin,
    toolbarPlugin,
    UndoRedo,
    BoldItalicUnderlineToggles,
    BlockTypeSelect,
    CreateLink,
    InsertTable,
    InsertCodeBlock,
    ListsToggle,
    type MDXEditorMethods,
} from '@mdxeditor/editor';

import { java } from '@codemirror/lang-java';
import { javascript } from '@codemirror/lang-javascript';
import { css } from '@codemirror/lang-css';

interface BlogEditorProps {
    initialMarkdown?: string;
    onChange?: (markdown: string) => void;
    editorRef?: React.Ref<MDXEditorMethods>;
    className?: string;
}

export const Editor: React.FC<BlogEditorProps> = ({
    initialMarkdown = '',
    onChange,
    editorRef,
    className,
}) => {

    const editorPlugin = useMemo(() => [
        // Core formatting plugins
        headingsPlugin(),
        listsPlugin(),
        quotePlugin(),
        tablePlugin(),

        // Code block support with CodeMirror
        codeBlockPlugin({ defaultCodeBlockLanguage: 'java' }),
        codeMirrorPlugin({
            codeBlockLanguages: {
                java: 'Java',
                js: 'JavaScript',
                tsx: 'TypeScript (React)',
                css: 'CSS',
            },
            // Map language keys to CodeMirror language functions
            codeMirrorExtensions: [
                java(),
                javascript({ jsx: true, typescript: true }),
                css(),
            ],
        }),

        // Raw Markdown source view toggle
        diffSourcePlugin({ viewMode: 'rich-text' }),

        // Customizing the top toolbar
        toolbarPlugin({
            toolbarContents: () => (
                <div className="flex flex-wrap items-center gap-1 p-1 bg-gray-50 border-b border-gray-200">
                    <UndoRedo />
                    <span className="w-px h-5 bg-gray-300 mx-1" />
                    <BlockTypeSelect />
                    <span className="w-px h-5 bg-gray-300 mx-1" />
                    <BoldItalicUnderlineToggles />
                    <span className="w-px h-5 bg-gray-300 mx-1" />
                    <ListsToggle />
                    <span className="w-px h-5 bg-gray-300 mx-1" />
                    <CreateLink />
                    <InsertTable />
                    <InsertCodeBlock />
                    <span className="w-px h-5 bg-gray-300 mx-1" />
                </div>
            ),
        }),
    ], [])

    return (
        <div className={className ?? ""}>
            <MDXEditor
                ref={editorRef}
                markdown={initialMarkdown}
                onChange={onChange}
                className={"prose max-w-none min-h-[350px]"}
                plugins={editorPlugin}
            />
        </div>
    );
};
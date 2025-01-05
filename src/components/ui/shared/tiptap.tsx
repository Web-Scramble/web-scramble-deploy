// import { useEditor, EditorContent, FloatingMenu, BubbleMenu } from '@tiptap/react'
// import StarterKit from '@tiptap/starter-kit'
// import { Button } from '@/components/ui/button';
// import {
//     X,
//     PenLine,
//     Paperclip,
//     Clock,
//     AlignLeft,
//     AlignCenter,
//     AlignRight,
//     Globe,
//     Trophy,
//     Lock,
//     List,
//     Code,
//   } from "lucide-react";



// // define your extension array
// const extensions = [StarterKit]

// const content = '<p>Hello World!</p>'

// const Tiptap = () => {
//   const editor = useEditor({
//     editorProps: {
//         attributes: {
//           class: 'prose prose-sm sm:prose lg:prose-lg xl:prose-2xl mx-auto focus:outline-none border rounded-md h-40',
//         },
//       },
//     extensions,
//     content,
//   })

//   return (
//     <>
//       <FloatingMenu editor={editor}>
//         <Button variant={"ghost"}>
//             <Code className=" h-4 w-4 text-gray-400"/>
//         </Button>
//         </FloatingMenu>
//       <EditorContent editor={editor} />
//       <BubbleMenu editor={editor}>This is the bubble menu</BubbleMenu>
//     </>
//   )
// }

// export default Tiptap

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Document from '@tiptap/extension-document';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline'
import { useState } from 'react';
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  Code,
  Paperclip
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TiptapEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const TiptapEditor: React.FC<TiptapEditorProps> = ({ content, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      Underline,
      TextAlign.configure({
        types: ['paragraph'],
        alignments: ['left', 'center', 'right'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  if (!editor) {
    return null;
  }

  const toggleFormat = (format: string) => {
    switch (format) {
      case 'bold':
        editor.chain().focus().toggleBold().run();
        break;
      case 'italic':
        editor.chain().focus().toggleItalic().run();
        break;
      case 'underline':
        editor.chain().focus().toggleUnderline().run();
        break;
      case 'strike':
        editor.chain().focus().toggleStrike().run();
        break;
      default:
        break;
    }
  };

  const setAlignment = (align: 'left' | 'center' | 'right') => {
    editor.chain().focus().setTextAlign(align).run();
  };

  return (
    <div className="mb-4 rounded-lg border">
      <div className="relative">
        <EditorContent 
          editor={editor} 
          className="w-full min-h-[120px] p-3 text-base resize-none border-none focus:outline-none rounded-t-lg prose prose-sm max-w-none"
        />
      </div>

      {/* Editor Toolbar */}
      <div className="flex items-center justify-between border-t p-2">
        <div className="flex items-center space-x-1">
          {/* Text Formatting Group */}
          <div className="flex items-center border-r pr-1">
            <Button
              variant={editor.isActive('bold') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('bold')}
            >
              <span className="font-bold">B</span>
            </Button>
            <Button
              variant={editor.isActive('italic') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('italic')}
            >
              <span className="italic">I</span>
            </Button>
            <Button
              variant={editor.isActive('underline') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('underline')}
            >
              <span className="underline">U</span>
            </Button>
            <Button
              variant={editor.isActive('strike') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('strike')}
            >
              <span className="line-through">S</span>
            </Button>
          </div>

          {/* Alignment Group */}
          <div className="flex items-center border-r pr-1">
            <Button
              variant={editor.isActive({ textAlign: 'left' }) ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setAlignment('left')}
            >
              <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'center' }) ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setAlignment('center')}
            >
              <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
              variant={editor.isActive({ textAlign: 'right' }) ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => setAlignment('right')}
            >
              <AlignRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Lists and Code */}
          <div className="flex items-center">
            <Button 
              variant={editor.isActive('bulletList') ? "secondary" : "ghost"}
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="h-4 w-4" />
            </Button>
            <Button 
              variant={editor.isActive('codeBlock') ? "secondary" : "ghost"}
              size="sm" 
              className="h-8 w-8 p-0"
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right-aligned upload button */}
        <div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <Paperclip className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bubble Menu */}
      {editor && (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="flex items-center bg-white border rounded-lg shadow-lg p-1">
            <Button
              variant={editor.isActive('bold') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('bold')}
            >
              <span className="font-bold">B</span>
            </Button>
            <Button
              variant={editor.isActive('italic') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('italic')}
            >
              <span className="italic">I</span>
            </Button>
            <Button
              variant={editor.isActive('underline') ? "secondary" : "ghost"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => toggleFormat('underline')}
            >
              <span className="underline">U</span>
            </Button>
          </div>
        </BubbleMenu>
      )}
    </div>
  );
};

export default TiptapEditor;

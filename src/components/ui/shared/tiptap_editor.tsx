import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Underline from "@tiptap/extension-underline";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
// import FileHandler from '@tiptap-pro/extension-file-handler'
import Text from "@tiptap/extension-text";
import Code from "@tiptap/extension-code";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Heading1,
  Paperclip,
  Code as LinkCode,
} from "lucide-react";

export type EditorProps = {
  editorContent?: string;
  setEditorContent: (data: string) => void;
  disabled:boolean
};
const MenuBar = ({ editor }) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="flex items-center justify-between border-t p-2">
      <div className="flex items-center flex-wrap space-x-1 gap-1">
        {/* Headings Group */}
        {/* <div className="flex items-center border-r pr-1 gap-1"> */}
        {/* <Button
            variant={editor.isActive('heading', { level: 1 }) ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleHeading({ level: 1}).run()}
          >
            <Heading1 className="h-4 w-4" />
          </Button> */}
        {/* <Button
            variant={editor.isActive('heading', { level: 2 }) ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          >
            <Heading2 className="h-4 w-4" />
          </Button> */}
        {/* <Button
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
          }
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </Button> */}
        {/* <Button
            variant={editor.isActive('paragraph') ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().setParagraph().run()}
          >
            <TextQuote className="h-4 w-4" />
          </Button> */}
        {/* </div>  */}

        <Button
          variant={
            editor.isActive("heading", { level: 3 }) ? "default" : "ghost"
          }
          size="sm"
          className="h-8 w-8 p-0"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading1 className="h-4 w-4" />
        </Button>
          <Button
            variant={editor.isActive("bold") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("italic") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("underline") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("strike") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("highlight") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter className="h-4 w-4" />
          </Button>
          <Button
            variant={editor.isActive("code") ? "default" : "ghost"}
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().toggleCode().run()}
          >
            <LinkCode className="h-4 w-4" />
          </Button>

        {/* Alignment Group */}
          <Button
            variant={
              editor.isActive({ textAlign: "left" }) ? "default" : "ghost"
            }
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant={
              editor.isActive({ textAlign: "center" }) ? "default" : "ghost"
            }
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant={
              editor.isActive({ textAlign: "right" }) ? "default" : "ghost"
            }
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
          <Button
            variant={
              editor.isActive({ textAlign: "justify" }) ? "default" : "ghost"
            }
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify className="h-4 w-4" />
          </Button>
      </div>

      {/* Right-aligned upload button */}
      {/* <div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={addImage}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Embbed Image</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div> */}
    </div>
  );
};

const TiptapEditor = ({ editorContent, setEditorContent,disabled }: EditorProps) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose  mx-auto focus:outline-none border rounded-md p-4",
      },
      // editable:,
    },
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Text,
      Image,
      Dropcursor,
      Document,
      Paragraph,
      Highlight,
      Underline,
      Code.configure({
        HTMLAttributes: {
          class: "bg-amber-50",
        },
      }),
      // ,FileHandler.configure({
      //   allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
      //   onDrop: (currentEditor, files, pos) => {
      //     files.forEach(file => {
      //       const fileReader = new FileReader()

      //       fileReader.readAsDataURL(file)
      //       fileReader.onload = () => {
      //         currentEditor.chain().insertContentAt(pos, {
      //           type: 'image',
      //           attrs: {
      //             src: fileReader.result,
      //           },
      //         }).focus().run()
      //       }
      //     })
      //   },
      //   onPaste: (currentEditor, files, htmlContent) => {
      //     files.forEach(file => {
      //       if (htmlContent) {
      //         // if there is htmlContent, stop manual insertion & let other extensions handle insertion via inputRule
      //         // you could extract the pasted file from this url string and upload it to a server for example
      //         console.log(htmlContent) // eslint-disable-line no-console
      //         return false
      //       }

      //       const fileReader = new FileReader()

      //       fileReader.readAsDataURL(file)
      //       fileReader.onload = () => {
      //         currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
      //           type: 'image',
      //           attrs: {
      //             src: fileReader.result,
      //           },
      //         }).focus().run()
      //       }
      //     })
      //   },
      // }),
    ],
    content: editorContent
      ? editorContent
      // : `<h3 style="text-align:left">
      //   Enter your challenge here
      // </h3>
      : `
      <p style="text-align:left">
        Enter your challenge details here<br></p>`,
    onUpdate({ editor }) {
      setEditorContent(editor.getHTML());
    },
  });

  return (
    <div className="mb-4 rounded-lg border ">
      <div className="relative">
        <EditorContent
          editor={editor}
          className="w-full min-h-[120px] p-3 text-base resize-none border-none focus:outline-none rounded-t-lg prose prose-sm max-w-none"
        />
      </div>
      <MenuBar editor={editor} />
    </div>
  );
};

export default TiptapEditor;

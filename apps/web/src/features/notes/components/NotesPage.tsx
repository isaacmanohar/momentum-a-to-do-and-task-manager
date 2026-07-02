import { useState, useEffect, useCallback } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import Placeholder from '@tiptap/extension-placeholder';
import { Underline } from '@tiptap/extension-underline';
import { Subscript } from '@tiptap/extension-subscript';
import { Superscript } from '@tiptap/extension-superscript';
import { Highlight } from '@tiptap/extension-highlight';
import { TextStyle } from '@tiptap/extension-text-style';
import { Color } from '@tiptap/extension-color';
import { FontFamily } from '@tiptap/extension-font-family';
import { Search, Plus, File, Edit3, MoreHorizontal, Trash2, Bold, Italic, Underline as UnderlineIcon, Strikethrough, Eraser, Subscript as SubscriptIcon, Superscript as SuperscriptIcon, Highlighter, Palette, List, ListOrdered, ListTodo } from 'lucide-react';
import { cn } from '../../../lib/utils';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/api-client';
import toast from 'react-hot-toast';

export function NotesPage() {
  const queryClient = useQueryClient();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const { data: notesData, isLoading } = useQuery({
    queryKey: ['notes', search],
    queryFn: async () => {
      const res = await api.get(`/notes?limit=50${search ? `&search=${search}` : ''}`);
      return res.data;
    }
  });

  const notes = notesData?.data || [];
  const selectedNote = notes.find((n: any) => n.id === selectedNoteId) || (notes.length > 0 ? notes[0] : null);

  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await api.post('/notes', { title: 'Untitled Note', content: '<p>Start typing...</p>', plainText: 'Start typing...' });
      return res.data;
    },
    onSuccess: (newNote) => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setSelectedNoteId(newNote.id);
    }
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/notes/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setSelectedNoteId(null);
      toast.success('Note deleted');
    }
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string, data: any }) => {
      await api.patch(`/notes/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    }
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TaskList,
      TaskItem.configure({ nested: true }),
      Placeholder.configure({ placeholder: 'Start typing your note here...' }),
      Underline,
      Subscript,
      Superscript,
      Highlight.configure({ multicolor: true }),
      TextStyle,
      Color,
      FontFamily,
    ],
    content: selectedNote?.content || '',
    editorProps: {
      attributes: {
        class: 'tiptap max-w-none focus:outline-none min-h-[500px] text-base',
      },
    },
    onUpdate: ({ editor }) => {
      if (selectedNote) {
        const text = editor.getText();
        
        let newTitle = selectedNote.title;
        if (!newTitle || newTitle === 'Untitled Note' || newTitle === '') {
          const words = text.split(/\s+/).filter(Boolean);
          newTitle = words.slice(0, 3).join(' ') || 'Untitled Note';
        }

        updateMutation.mutate({
          id: selectedNote.id,
          data: {
            title: newTitle,
            content: editor.getHTML(),
            plainText: text,
          }
        });
      }
    }
  });

  useEffect(() => {
    if (editor && selectedNote && editor.getHTML() !== selectedNote.content) {
      if (selectedNote.id !== editor.storage?.currentNoteId) {
        editor.commands.setContent(selectedNote.content || '');
        editor.storage.currentNoteId = selectedNote.id;
      }
    }
  }, [selectedNote, editor]);

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (selectedNote) {
      updateMutation.mutate({
        id: selectedNote.id,
        data: { title: e.target.value }
      });
    }
  };

  const MenuBar = ({ editor }: { editor: any }) => {
    if (!editor) return null;
    return (
      <div className="flex flex-wrap items-center gap-1 border-b bg-muted/30 p-2 text-sm sticky top-0 z-10 backdrop-blur">
        {/* Font Family */}
        <select 
          onChange={(e) => editor.chain().focus().setFontFamily(e.target.value).run()}
          className="rounded border bg-background px-2 py-1 outline-none text-xs w-32"
          value={editor.getAttributes('textStyle').fontFamily || ''}
        >
          <option value="">Default Font</option>
          <option value="Inter">Inter</option>
          <option value="Comic Sans MS, Comic Sans">Comic Sans</option>
          <option value="serif">Serif</option>
          <option value="monospace">Monospace</option>
        </select>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Clear Formatting */}
        <button onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()} className="p-1.5 rounded hover:bg-accent text-muted-foreground" title="Clear Formatting">
          <Eraser size={16} />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Basic Formatting */}
        <button onClick={() => editor.chain().focus().toggleBold().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('bold') && "bg-accent text-accent-foreground")} title="Bold">
          <Bold size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('italic') && "bg-accent text-accent-foreground")} title="Italic">
          <Italic size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('underline') && "bg-accent text-accent-foreground")} title="Underline">
          <UnderlineIcon size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleStrike().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('strike') && "bg-accent text-accent-foreground")} title="Strikethrough">
          <Strikethrough size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleSubscript().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('subscript') && "bg-accent text-accent-foreground")} title="Subscript">
          <SubscriptIcon size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleSuperscript().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('superscript') && "bg-accent text-accent-foreground")} title="Superscript">
          <SuperscriptIcon size={16} />
        </button>

        <div className="w-px h-6 bg-border mx-1" />

        {/* Colors */}
        <button onClick={() => editor.chain().focus().toggleHighlight({ color: '#ffcc00' }).run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('highlight', { color: '#ffcc00' }) && "bg-accent")} title="Highlight">
          <Highlighter size={16} />
        </button>
        <input 
          type="color" 
          onInput={event => editor.chain().focus().setColor((event.target as HTMLInputElement).value).run()}
          value={editor.getAttributes('textStyle').color || '#000000'}
          className="w-6 h-6 p-0 border-0 rounded cursor-pointer"
          title="Text Color"
        />

        <div className="w-px h-6 bg-border mx-1" />

        {/* Lists & Headings */}
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={cn("p-1.5 rounded hover:bg-accent font-bold", editor.isActive('heading', { level: 1 }) && "bg-accent text-accent-foreground")}>H1</button>
        <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={cn("p-1.5 rounded hover:bg-accent font-bold", editor.isActive('heading', { level: 2 }) && "bg-accent text-accent-foreground")}>H2</button>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('bulletList') && "bg-accent text-accent-foreground")} title="Bullet List">
          <List size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('orderedList') && "bg-accent text-accent-foreground")} title="Numbered List">
          <ListOrdered size={16} />
        </button>
        <button onClick={() => editor.chain().focus().toggleTaskList().run()} className={cn("p-1.5 rounded hover:bg-accent", editor.isActive('taskList') && "bg-accent text-accent-foreground")} title="Task List">
          <ListTodo size={16} />
        </button>
      </div>
    );
  };


  return (
    <div className="flex h-full animate-fade-in">
      {/* Sidebar for Notes */}
      <div className="w-80 border-r bg-muted/20 flex flex-col">
        <div className="p-4 border-b space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight">Notes</h2>
            <button 
              onClick={() => createMutation.mutate()}
              className="rounded p-1 hover:bg-accent hover:text-accent-foreground text-muted-foreground"
            >
              <Plus size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-md border bg-background pl-9 pr-4 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground text-sm">Loading notes...</div>
          ) : notes.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground text-sm">No notes found.</div>
          ) : (
            notes.map((note: any) => {
              const isSelected = selectedNote?.id === note.id;
              return (
                <div 
                  key={note.id} 
                  onClick={() => setSelectedNoteId(note.id)}
                  className={cn(
                    "group cursor-pointer rounded-lg p-3 transition-colors",
                    isSelected ? "bg-accent/50 border border-border" : "hover:bg-accent/30 border border-transparent"
                  )}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <File size={16} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                      <h3 className="font-medium text-sm line-clamp-1">{note.title}</h3>
                    </div>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground line-clamp-2">{note.plainText || 'Empty note...'}</p>
                  <p className="mt-2 text-[10px] text-muted-foreground font-medium uppercase tracking-wider">{new Date(note.updatedAt).toLocaleDateString()}</p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-background relative">
        {selectedNote ? (
          <>
            <div className="sticky top-0 z-10 flex h-14 items-center justify-between border-b px-6 bg-background/95 backdrop-blur">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Edit3 size={16} />
                <span>Last edited {new Date(selectedNote.updatedAt).toLocaleString()}</span>
              </div>
              <button 
                onClick={() => {
                  if (confirm('Are you sure you want to delete this note?')) {
                    deleteMutation.mutate(selectedNote.id);
                  }
                }}
                className="rounded p-2 text-muted-foreground hover:bg-accent hover:text-destructive"
                title="Delete Note"
              >
                <Trash2 size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto flex flex-col">
              <MenuBar editor={editor} />
              <div className="mx-auto w-full max-w-4xl p-8 md:p-12">
                <input
                  type="text"
                  value={selectedNote.title === 'Untitled Note' ? '' : selectedNote.title}
                  onChange={handleTitleChange}
                  placeholder="Note Title"
                  className="w-full text-4xl font-bold bg-transparent border-none outline-none mb-6 placeholder:text-muted-foreground/50"
                />
                <EditorContent editor={editor} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground flex-col gap-4">
            <File size={48} className="opacity-20" />
            <p>Select a note or create a new one</p>
            <button 
              onClick={() => createMutation.mutate()}
              className="flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
            >
              <Plus size={16} />
              <span>Create Note</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

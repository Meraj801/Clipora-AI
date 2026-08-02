"use client";

import { useState } from "react";
import {
  Play,
  Pause,
  Upload,
  Scissors,
  Type,
  Music,
  Sparkles,
  Image as ImageIcon,
  Video,
  Mic,
  Download,
  Undo2,
  Redo2,
  Plus,
  Settings,
} from "lucide-react";

export default function Home() {
  const [playing, setPlaying] = useState(false);

  return (
    <main className="min-h-screen bg-[#0b0b0f] text-white flex flex-col">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
            C
          </div>
          <span className="text-xl font-bold">Clipora AI</span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-white/10 rounded-lg">
            <Undo2 size={18} />
          </button>
          <button className="p-2 hover:bg-white/10 rounded-lg">
            <Redo2 size={18} />
          </button>

          <button className="ml-3 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center gap-2">
            <Download size={17} />
            Export
          </button>
        </div>
      </header>

      {/* Main Editor */}
      <div className="flex flex-1 min-h-0">
        {/* Left Toolbar */}
        <aside className="w-20 border-r border-white/10 flex flex-col items-center py-4 gap-3">
          <Tool icon={<Upload />} label="Media" />
          <Tool icon={<Scissors />} label="Edit" />
          <Tool icon={<Type />} label="Text" />
          <Tool icon={<Music />} label="Audio" />
          <Tool icon={<Sparkles />} label="Effects" />
          <Tool icon={<ImageIcon />} label="Images" />
          <Tool icon={<Video />} label="Video AI" />
          <Tool icon={<Mic />} label="Voice" />
        </aside>

        {/* Center */}
        <section className="flex-1 flex flex-col min-w-0">
          {/* Preview */}
          <div className="flex-1 flex items-center justify-center p-8 bg-[#111116]">
            <div className="w-full max-w-4xl aspect-video bg-black rounded-xl border border-white/10 shadow-2xl flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Video size={28} />
                </div>
                <p className="text-sm">Your video preview will appear here</p>
                <p className="text-xs mt-1 text-gray-600">
                  Upload media or generate a video with AI
                </p>
              </div>
            </div>
          </div>

          {/* Playback */}
          <div className="h-14 border-t border-white/10 flex items-center justify-center gap-5">
            <button
              onClick={() => setPlaying(!playing)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center"
            >
              {playing ? <Pause size={17} /> : <Play size={17} />}
            </button>

            <span className="text-xs text-gray-400">00:00 / 00:00</span>
          </div>

          {/* Timeline */}
          <div className="h-64 border-t border-white/10 bg-[#0d0d12]">
            <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between">
              <span className="text-xs text-gray-400">Timeline</span>

              <button className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10">
                <Plus size={14} />
                Add track
              </button>
            </div>

            <div className="p-5">
              <div className="h-16 border border-dashed border-white/10 rounded-lg flex items-center justify-center text-xs text-gray-600">
                Drop your clips here
              </div>

              <div className="mt-3 h-12 bg-white/[0.02] rounded-lg flex items-center px-4 text-xs text-gray-600">
                Audio track
              </div>
            </div>
          </div>
        </section>

        {/* Right AI Panel */}
        <aside className="w-80 border-l border-white/10 bg-[#0e0e13] p-5">
          <h2 className="font-semibold text-lg">AI Studio</h2>
          <p className="text-xs text-gray-500 mt-1">
            Create content with AI
          </p>

          <div className="mt-6 space-y-3">
            <AIButton
              icon={<Sparkles size={18} />}
              title="Generate Video"
              description="Create a video from a prompt"
            />

            <AIButton
              icon={<ImageIcon size={18} />}
              title="Generate Image"
              description="Create visuals with AI"
            />

            <AIButton
              icon={<Mic size={18} />}
              title="AI Voiceover"
              description="Generate natural narration"
            />
          </div>

          <div className="mt-8">
            <label className="text-xs text-gray-400">AI Prompt</label>

            <textarea
              placeholder="Describe what you want to create..."
              className="mt-2 w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none"
            />

            <button className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center justify-center gap-2">
              <Sparkles size={17} />
              Generate
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}

function Tool({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <button className="w-16 py-2 rounded-xl hover:bg-white/10 flex flex-col items-center gap-1 text-gray-400 hover:text-white">
      {icon}
      <span className="text-[10px]">{label}</span>
    </button>
  );
}

function AIButton({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <button className="w-full text-left p-3 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.07] transition">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
          {icon}
        </div>

        <div>
          <div className="text-sm font-medium">{title}</div>
          <div className="text-[11px] text-gray-500 mt-0.5">
            {description}
          </div>
        </div>
      </div>
    </button>
  );
}

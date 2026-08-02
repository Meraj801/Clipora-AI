"use client";

import { useRef, useState } from "react";
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
  X,
  Volume2,
  Wand2,
  ArrowLeftRight,
} from "lucide-react";

type MediaFile = {
  id: string;
  name: string;
  type: string;
  url: string;
};

type AudioFile = {
  id: string;
  name: string;
  url: string;
};

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const audioInputRef = useRef<HTMLInputElement>(null);

  const [playing, setPlaying] = useState(false);
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [audioFiles, setAudioFiles] = useState<AudioFile[]>([]);
  const [selectedMedia, setSelectedMedia] =
    useState<MediaFile | null>(null);
  const [activePanel, setActivePanel] = useState("ai");

  const handleUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    const newFiles: MediaFile[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
    }));

    setMedia((previous) => [...previous, ...newFiles]);

    if (!selectedMedia && newFiles.length > 0) {
      setSelectedMedia(newFiles[0]);
    }

    event.target.value = "";
  };

  const handleAudioUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;

    if (!files) return;

    const newAudio: AudioFile[] = Array.from(files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      url: URL.createObjectURL(file),
    }));

    setAudioFiles((previous) => [...previous, ...newAudio]);

    event.target.value = "";
  };

  const removeMedia = (id: string) => {
    const item = media.find((file) => file.id === id);

    if (item) {
      URL.revokeObjectURL(item.url);
    }

    const remaining = media.filter((file) => file.id !== id);

    setMedia(remaining);

    if (selectedMedia?.id === id) {
      setSelectedMedia(remaining[0] || null);
    }
  };

  return (
    <main className="min-h-screen bg-[#09090d] text-white flex flex-col">
      <header className="h-16 shrink-0 border-b border-white/10 flex items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
            C
          </div>

          <span className="text-xl font-bold">
            Clipora AI
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-white/10">
            <Undo2 size={18} />
          </button>

          <button className="p-2 rounded-lg hover:bg-white/10">
            <Redo2 size={18} />
          </button>

          <button className="ml-3 px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center gap-2">
            <Download size={17} />
            Export
          </button>
        </div>
      </header>

      <div className="flex flex-1 min-h-0">
        <aside className="w-20 shrink-0 border-r border-white/10 flex flex-col items-center py-4 gap-2">
          <Tool
            icon={<Upload />}
            label="Media"
            active={activePanel === "media"}
            onClick={() => {
              setActivePanel("media");
              fileInputRef.current?.click();
            }}
          />

          <Tool
            icon={<Scissors />}
            label="Edit"
            active={activePanel === "edit"}
            onClick={() => setActivePanel("edit")}
          />

          <Tool
            icon={<Type />}
            label="Text"
            active={activePanel === "text"}
            onClick={() => setActivePanel("text")}
          />

          <Tool
            icon={<Music />}
            label="Audio"
            active={activePanel === "audio"}
            onClick={() => setActivePanel("audio")}
          />

          <Tool
            icon={<Sparkles />}
            label="Effects"
            active={activePanel === "effects"}
            onClick={() => setActivePanel("effects")}
          />

          <Tool
            icon={<ImageIcon />}
            label="Images"
            active={activePanel === "images"}
            onClick={() => setActivePanel("images")}
          />

          <Tool
            icon={<Video />}
            label="Video AI"
            active={activePanel === "video"}
            onClick={() => setActivePanel("video")}
          />

          <Tool
            icon={<Mic />}
            label="Voice"
            active={activePanel === "voice"}
            onClick={() => setActivePanel("voice")}
          />

          <input
            ref={fileInputRef}
            type="file"
            accept="video/*,image/*"
            multiple
            onChange={handleUpload}
            className="hidden"
          />

          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            multiple
            onChange={handleAudioUpload}
            className="hidden"
          />
        </aside>

        <section className="flex-1 flex flex-col min-w-0">
          <div className="flex-1 flex items-center justify-center p-8 bg-[#111116] min-h-0">
            <div className="w-full max-w-4xl aspect-video bg-black rounded-xl border border-white/10 overflow-hidden flex items-center justify-center">
              {!selectedMedia ? (
                <div className="text-center text-gray-500">
                  <div className="w-16 h-16 mx-auto rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <Video size={28} />
                  </div>

                  <p className="text-sm">
                    Upload media to start editing
                  </p>

                  <button
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 text-sm"
                  >
                    Choose Media
                  </button>
                </div>
              ) : selectedMedia.type.startsWith("video/") ? (
                <video
                  src={selectedMedia.url}
                  controls
                  className="w-full h-full object-contain"
                />
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.name}
                  className="w-full h-full object-contain"
                />
              )}
            </div>
          </div>

          <div className="h-14 shrink-0 border-t border-white/10 flex items-center justify-center gap-5">
            <button
              onClick={() => setPlaying(!playing)}
              className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center"
            >
              {playing ? (
                <Pause size={17} />
              ) : (
                <Play size={17} />
              )}
            </button>

            <span className="text-xs text-gray-400">
              00:00 / 00:00
            </span>
          </div>

          <div className="h-64 shrink-0 border-t border-white/10 bg-[#0d0d12]">
            <div className="h-10 border-b border-white/10 flex items-center px-4 justify-between">
              <span className="text-xs text-gray-400">
                Timeline
              </span>

              <button
                onClick={() =>
                  fileInputRef.current?.click()
                }
                className="text-xs flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/5 hover:bg-white/10"
              >
                <Plus size={14} />
                Add Media
              </button>
            </div>

            <div className="p-5 overflow-x-auto">
              {media.length === 0 ? (
                <div className="h-16 border border-dashed border-white/10 rounded-lg flex items-center justify-center text-xs text-gray-600">
                  Upload media to create your timeline
                </div>
              ) : (
                <div className="flex gap-2 min-w-max">
                  {media.map((file) => (
                    <div
                      key={file.id}
                      onClick={() =>
                        setSelectedMedia(file)
                      }
                      className={`relative w-40 h-16 rounded-lg border cursor-pointer overflow-hidden ${
                        selectedMedia?.id === file.id
                          ? "border-purple-500"
                          : "border-white/10"
                      }`}
                    >
                      {file.type.startsWith("image/") ? (
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={file.url}
                          className="w-full h-full object-cover"
                        />
                      )}

                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          removeMedia(file.id);
                        }}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center"
                      >
                        <X size={12} />
                      </button>

                      <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1 text-[9px] truncate">
                        {file.name}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-3 min-h-12 bg-white/[0.02] rounded-lg flex items-center px-4 gap-3">
                <Volume2
                  size={15}
                  className="text-purple-400"
                />

                <span className="text-xs text-gray-500">
                  Audio Track
                </span>

                {audioFiles.length > 0 && (
                  <span className="text-[10px] text-gray-600">
                    {audioFiles.length} audio file(s)
                  </span>
                )}
              </div>
            </div>
          </div>
        </section>

        <aside className="w-80 shrink-0 border-l border-white/10 bg-[#0e0e13] p-5 overflow-y-auto">
          {activePanel === "audio" ? (
            <AudioPanel
              audioFiles={audioFiles}
              onUpload={() =>
                audioInputRef.current?.click()
              }
            />
          ) : activePanel === "text" ? (
            <TextPanel />
          ) : activePanel === "effects" ? (
            <EffectsPanel />
          ) : activePanel === "edit" ? (
            <EditPanel />
          ) : activePanel === "video" ? (
            <VideoPanel />
          ) : activePanel === "voice" ? (
            <VoicePanel />
          ) : (
            <AIStudio />
          )}
        </aside>
      </div>
    </main>
  );
}

function Tool({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-16 py-2 rounded-xl flex flex-col items-center gap-1 ${
        active
          ? "bg-purple-500/15 text-purple-300"
          : "text-gray-400 hover:bg-white/10 hover:text-white"
      }`}
    >
      {icon}
      <span className="text-[10px]">
        {label}
      </span>
    </button>
  );
}

function AIStudio() {
  return (
    <>
      <h2 className="font-semibold text-lg">
        AI Studio
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Create content with AI
      </p>

      <div className="mt-6 space-y-3">
        <AIButton
          icon={<Sparkles size={18} />}
          title="Generate Video"
          description="Create video from prompt"
        />

        <AIButton
          icon={<ImageIcon size={18} />}
          title="Generate Image"
          description="Create visuals with AI"
        />

        <AIButton
          icon={<Mic size={18} />}
          title="AI Voiceover"
          description="Generate narration"
        />
      </div>

      <div className="mt-8">
        <label className="text-xs text-gray-400">
          AI Prompt
        </label>

        <textarea
          placeholder="Describe what you want to create..."
          className="mt-2 w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none"
        />

        <button className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center justify-center gap-2">
          <Sparkles size={17} />
          Generate
        </button>
      </div>
    </>
  );
}

function AudioPanel({
  audioFiles,
  onUpload,
}: {
  audioFiles: AudioFile[];
  onUpload: () => void;
}) {
  return (
    <>
      <h2 className="font-semibold text-lg">
        Audio
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Music, sound effects & voice
      </p>

      <button
        onClick={onUpload}
        className="mt-6 w-full py-3 rounded-xl border border-dashed border-purple-500/40 bg-purple-500/10 text-purple-300 flex items-center justify-center gap-2"
      >
        <Upload size={17} />
        Upload Music / Audio
      </button>

      <div className="mt-6">
        <h3 className="text-xs text-gray-400 mb-3">
          Sound Effects
        </h3>

        <div className="grid grid-cols-2 gap-2">
          {[
            "Whoosh",
            "Pop",
            "Click",
            "Impact",
            "Rise",
            "Drop",
            "Boom",
            "Swipe",
          ].map((effect) => (
            <button
              key={effect}
              className="p-3 rounded-lg bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-xs"
            >
              🔊 {effect}
            </button>
          ))}
        </div>
      </div>

      {audioFiles.length > 0 && (
        <div className="mt-7 space-y-3">
          <h3 className="text-xs text-gray-400">
            Your Audio
          </h3>

          {audioFiles.map((audio) => (
            <div
              key={audio.id}
              className="p-3 rounded-xl bg-white/[0.04] border border-white/10"
            >
              <p className="text-xs truncate">
                {audio.name}
              </p>

              <audio
                src={audio.url}
                controls
                className="w-full mt-3"
              />
            </div>
          ))}
        </div>
      )}

      <div className="mt-7">
        <h3 className="text-xs text-gray-400 mb-3">
          Voiceover
        </h3>

        <button className="w-full p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-purple-500/10 text-purple-400 flex items-center justify-center">
            <Mic size={19} />
          </div>

          <div className="text-left">
            <p className="text-sm">
              Record Voiceover
            </p>

            <p className="text-[10px] text-gray-500">
              Add your narration
            </p>
          </div>
        </button>
      </div>
    </>
  );
}

function TextPanel() {
  return (
    <>
      <h2 className="font-semibold text-lg">
        Text
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Add titles and captions
      </p>

      <button className="mt-6 w-full py-3 rounded-xl bg-white/5 border border-white/10">
        <Type size={18} className="mx-auto mb-1" />
        Add Text
      </button>

      <button className="mt-3 w-full py-3 rounded-xl bg-white/5 border border-white/10">
        Auto Captions
      </button>
    </>
  );
}

function EffectsPanel() {
  return (
    <>
      <h2 className="font-semibold text-lg">
        Effects
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Effects and transitions
      </p>

      <div className="mt-6 grid grid-cols-2 gap-2">
        {[
          "Blur",
          "Glow",
          "Shake",
          "Zoom",
          "Flash",
          "Fade",
        ].map((effect) => (
          <button
            key={effect}
            className="p-4 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] text-xs"
          >
            <Wand2
              size={17}
              className="mx-auto mb-2 text-purple-400"
            />
            {effect}
          </button>
        ))}
      </div>

      <h3 className="mt-7 text-xs text-gray-400">
        Transitions
      </h3>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          "Fade",
          "Dissolve",
          "Slide",
          "Zoom",
        ].map((transition) => (
          <button
            key={transition}
            className="p-3 rounded-lg bg-white/[0.04] border border-white/10 text-xs"
          >
            <ArrowLeftRight
              size={15}
              className="inline mr-1"
            />
            {transition}
          </button>
        ))}
      </div>
    </>
  );
}

function EditPanel() {
  return (
    <>
      <h2 className="font-semibold text-lg">
        Edit
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Basic video controls
      </p>

      <div className="mt-6 space-y-2">
        {[
          "Split",
          "Trim",
          "Crop",
          "Rotate",
          "Speed",
          "Volume",
        ].map((item) => (
          <button
            key={item}
            className="w-full p-3 rounded-lg bg-white/[0.04] border border-white/10 text-left text-sm hover:bg-white/[0.08]"
          >
            {item}
          </button>
        ))}
      </div>
    </>
  );
}

function VideoPanel() {
  return (
    <>
      <h2 className="font-semibold text-lg">
        AI Video
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Generate videos from prompts
      </p>

      <textarea
        placeholder="Example: A cinematic drone shot over a beautiful mountain..."
        className="mt-6 w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none"
      />

      <button className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold flex items-center justify-center gap-2">
        <Sparkles size={17} />
        Generate Video
      </button>
    </>
  );
}

function VoicePanel() {
  return (
    <>
      <h2 className="font-semibold text-lg">
        AI Voice
      </h2>

      <p className="text-xs text-gray-500 mt-1">
        Create voiceovers
      </p>

      <textarea
        placeholder="Type your narration here..."
        className="mt-6 w-full h-32 bg-black/30 border border-white/10 rounded-xl p-3 text-sm outline-none focus:border-purple-500 resize-none"
      />

      <button className="mt-3 w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 font-semibold">
        Generate Voice
      </button>
    </>
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
      <div className="flex

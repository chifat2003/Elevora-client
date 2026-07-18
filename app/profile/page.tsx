"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { authClient } from "@/app/lib/auth-client";

const MAX_AVATAR_DIMENSION = 256;
const MAX_IMAGE_BYTES = 2 * 1024 * 1024; // 2MB upload limit before resize

function resizeImageToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement("img");
    const objectUrl = URL.createObjectURL(file);

    img.onload = () => {
      const scale = Math.min(
        1,
        MAX_AVATAR_DIMENSION / Math.max(img.width, img.height)
      );
      const width = Math.round(img.width * scale);
      const height = Math.round(img.height * scale);

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Could not process image"));
        return;
      }
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(objectUrl);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Could not load image"));
    };
    img.src = objectUrl;
  });
}

export default function ProfilePage() {
  const { data: session, isPending, refetch } = authClient.useSession();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  if (isPending) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
        <div className="h-6 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6 text-neutral-700 dark:text-neutral-300">
        You need to be logged in to view this page.
      </div>
    );
  }

  const role = (session.user as { role?: string }).role ?? "seeker";
  const currentImage = imagePreview ?? session.user.image ?? null;

  const startEditing = () => {
    setName(session.user.name ?? "");
    setImagePreview(null);
    setError("");
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setImagePreview(null);
    setError("");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_IMAGE_BYTES) {
      setError("Image must be smaller than 2MB.");
      return;
    }

    try {
      const dataUrl = await resizeImageToDataUrl(file);
      setImagePreview(dataUrl);
      setError("");
    } catch {
      setError("Could not process that image. Try a different file.");
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      setError("Name can't be empty.");
      return;
    }

    setIsSaving(true);
    setError("");
    try {
      await authClient.updateUser({
        name: name.trim(),
        ...(imagePreview ? { image: imagePreview } : {}),
      });
      await refetch?.();
      setIsEditing(false);
      setImagePreview(null);
    } catch {
      setError("Something went wrong updating your profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100">
          My Profile
        </h1>
        {!isEditing && (
          <button
            onClick={startEditing}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="mt-8 rounded-xl border border-neutral-200 p-6 dark:border-neutral-700">
        <div className="flex items-center gap-5">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full bg-primary/10">
            {currentImage ? (
              <Image
                src={currentImage}
                alt={session.user.name}
                fill
                sizes="80px"
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-2xl font-semibold text-primary">
                {session.user.name?.charAt(0).toUpperCase() ?? "?"}
              </div>
            )}
          </div>

          {isEditing && (
            <div>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="rounded-lg border border-neutral-300 px-3 py-1.5 text-sm font-medium text-neutral-700 hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                Change picture
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <p className="mt-1 text-xs text-neutral-500">JPG or PNG, up to 2MB.</p>
            </div>
          )}
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
        )}

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Name
            </dt>
            <dd className="mt-1 text-neutral-900 dark:text-neutral-100">
              {isEditing ? (
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm dark:border-neutral-700 dark:bg-neutral-900"
                />
              ) : (
                session.user.name
              )}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Email
            </dt>
            <dd className="mt-1 text-neutral-900 dark:text-neutral-100">
              {session.user.email}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-neutral-500">
              Role
            </dt>
            <dd className="mt-1">
              <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary capitalize">
                {role === "recruiter" ? "Recruiter" : "Job Seeker"}
              </span>
            </dd>
          </div>
        </dl>

        {isEditing && (
          <div className="mt-6 flex gap-3">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary-dark disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save changes"}
            </button>
            <button
              onClick={cancelEditing}
              disabled={isSaving}
              className="rounded-lg bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

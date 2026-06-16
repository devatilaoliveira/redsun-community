import type { CSSProperties, ImgHTMLAttributes } from "react";

export type RsImgSrc =
  | `/${string}`
  | `./${string}`
  | `../${string}`
  | `data:image/${string}`
  | `blob:${string}`
  | `https://${string}`;

export type RsImgProps = Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  | "alt"
  | "aria-hidden"
  | "children"
  | "className"
  | "decoding"
  | "dangerouslySetInnerHTML"
  | "height"
  | "loading"
  | "role"
  | "sizes"
  | "src"
  | "srcSet"
  | "style"
  | "width"
> & {
  alt: string;
  ariaHidden?: boolean | "true" | "false" | null;
  className?: string;
  decoding?: "sync" | "async" | "auto" | null;
  fill?: boolean;
  height?: number | string | null;
  id?: string;
  imgLoaded?: boolean;
  loading?: "eager" | "lazy" | null;
  ngSrc?: RsImgSrc | null;
  ngSrcset?: string | null;
  priority?: boolean;
  role?: "img" | "presentation" | "none";
  sizes?: string | null;
  src?: RsImgSrc | null;
  style?: CSSProperties;
  testId?: string;
  title?: string;
  width?: number | string | null;
};

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function getAllowedSupabaseOrigin() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();

  if (!supabaseUrl) {
    return null;
  }

  try {
    return new URL(supabaseUrl).origin;
  } catch {
    return null;
  }
}

function getSafeImageSrc(value: RsImgSrc | null | undefined) {
  const rawValue = value?.trim();

  if (!rawValue) {
    return null;
  }

  if (rawValue.startsWith("data:image/") || rawValue.startsWith("blob:")) {
    return rawValue;
  }

  if (
    rawValue.startsWith("/") ||
    rawValue.startsWith("./") ||
    rawValue.startsWith("../")
  ) {
    return rawValue.startsWith("//") ? null : rawValue;
  }

  try {
    const url = new URL(rawValue);
    const supabaseOrigin = getAllowedSupabaseOrigin();

    if (
      url.protocol === "https:" &&
      supabaseOrigin &&
      url.origin === supabaseOrigin &&
      url.pathname.startsWith("/storage/v1/object/public/")
    ) {
      return rawValue;
    }
  } catch {
    return null;
  }

  return null;
}

function getDimension(value: number | string | null | undefined) {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? value : undefined;
  }

  const trimmedValue = value?.trim();

  if (!trimmedValue) {
    return undefined;
  }

  return /^\d+$/.test(trimmedValue) ? trimmedValue : undefined;
}

function getSafeImageSrcset(value: string | null | undefined) {
  const rawValue = value?.trim();

  if (!rawValue) {
    return undefined;
  }

  const candidates = rawValue.split(",").map((candidate) => candidate.trim());

  if (!candidates.length) {
    return undefined;
  }

  const safeCandidates = candidates.map((candidate) => {
    const [candidateSrc, descriptor] = candidate.split(/\s+/, 2);
    const safeCandidateSrc = getSafeImageSrc(candidateSrc as RsImgSrc);

    if (!safeCandidateSrc) {
      return null;
    }

    if (!descriptor) {
      return safeCandidateSrc;
    }

    if (/^(?:\d+w|\d+(?:\.\d+)?x)$/.test(descriptor)) {
      return `${safeCandidateSrc} ${descriptor}`;
    }

    return null;
  });

  return safeCandidates.every(Boolean) ? safeCandidates.join(", ") : undefined;
}

function getAriaHidden(value: RsImgProps["ariaHidden"]) {
  if (value === null || value === undefined) {
    return undefined;
  }

  return value === true || value === "true" ? true : undefined;
}

export function RsImg({
  alt,
  ariaHidden = null,
  className,
  decoding = null,
  fill = false,
  height = null,
  id,
  imgLoaded = false,
  loading = null,
  ngSrc = null,
  ngSrcset = null,
  priority = false,
  role,
  sizes = null,
  src = null,
  style,
  testId,
  title,
  width = null,
  ...props
}: RsImgProps) {
  const safeSrc = getSafeImageSrc(ngSrc ?? src);
  const safeSrcset = getSafeImageSrcset(ngSrcset);

  if (!safeSrc) {
    return null;
  }

  const safeWidth = getDimension(width);
  const safeHeight = getDimension(height);
  const aspectRatio =
    safeWidth && safeHeight ? `${safeWidth} / ${safeHeight}` : undefined;
  const wrapperStyle = {
    ...style,
    aspectRatio: style?.aspectRatio ?? aspectRatio,
  };
  const hiddenFromAccessibility =
    getAriaHidden(ariaHidden) || role === "presentation" || role === "none";

  return (
    <span
      className={joinClasses(
        "relative block",
        fill ? "size-full" : "max-w-full",
        imgLoaded && "loaded",
        className,
      )}
      style={wrapperStyle}
    >
      <img
        {...props}
        alt={hiddenFromAccessibility ? "" : alt}
        aria-hidden={hiddenFromAccessibility ? true : undefined}
        className="block size-full object-[inherit]"
        decoding={decoding ?? undefined}
        data-testid={testId}
        fetchPriority={priority ? "high" : undefined}
        height={safeHeight}
        id={id}
        loading={loading ?? undefined}
        role={role}
        sizes={sizes ?? undefined}
        src={safeSrc}
        srcSet={safeSrcset}
        title={title}
        width={safeWidth}
      />
    </span>
  );
}

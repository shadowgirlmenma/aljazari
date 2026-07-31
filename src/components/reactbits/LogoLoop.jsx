'use client';
import { useCallback, useEffect, useMemo, useRef, useState, memo } from 'react';
import './LogoLoop.css';

const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25, MIN_COPIES: 2, COPY_HEADROOM: 2 };
const toCssLength = v => (typeof v === 'number' ? `${v}px` : (v ?? undefined));

const useResizeObserver = (callback, elements, deps) => {
  useEffect(() => {
    if (!window.ResizeObserver) { const h = () => callback(); window.addEventListener('resize', h); callback(); return () => window.removeEventListener('resize', h); }
    const observers = elements.map(ref => { if (!ref.current) return null; const o = new ResizeObserver(callback); o.observe(ref.current); return o; });
    callback();
    return () => observers.forEach(o => o?.disconnect());
  }, [callback, elements, deps]);
};
const useImageLoader = (seqRef, onLoad, deps) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll('img') ?? [];
    if (images.length === 0) { onLoad(); return; }
    let remaining = images.length;
    const handle = () => { remaining -= 1; if (remaining === 0) onLoad(); };
    images.forEach(img => { if (img.complete) handle(); else { img.addEventListener('load', handle, { once: true }); img.addEventListener('error', handle, { once: true }); } });
    return () => images.forEach(img => { img.removeEventListener('load', handle); img.removeEventListener('error', handle); });
  }, [onLoad, seqRef, deps]);
};
const useAnimationLoop = (trackRef, targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical) => {
  const rafRef = useRef(null); const lastTs = useRef(null); const offset = useRef(0); const velocity = useRef(0);
  useEffect(() => {
    const track = trackRef.current; if (!track) return;
    const seqSize = isVertical ? seqHeight : seqWidth;
    if (seqSize > 0) { offset.current = ((offset.current % seqSize) + seqSize) % seqSize; track.style.transform = isVertical ? `translate3d(0, ${-offset.current}px, 0)` : `translate3d(${-offset.current}px, 0, 0)`; }
    const animate = ts => {
      if (lastTs.current === null) lastTs.current = ts;
      const dt = Math.max(0, ts - lastTs.current) / 1000; lastTs.current = ts;
      const target = isHovered && hoverSpeed !== undefined ? hoverSpeed : targetVelocity;
      const ef = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
      velocity.current += (target - velocity.current) * ef;
      if (seqSize > 0) { let next = offset.current + velocity.current * dt; next = ((next % seqSize) + seqSize) % seqSize; offset.current = next; track.style.transform = isVertical ? `translate3d(0, ${-next}px, 0)` : `translate3d(${-next}px, 0, 0)`; }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } lastTs.current = null; };
  }, [targetVelocity, seqWidth, seqHeight, isHovered, hoverSpeed, isVertical, trackRef]);
};

export const LogoLoop = memo(({
  logos, speed = 120, direction = 'left', width = '100%', logoHeight = 28, gap = 32,
  pauseOnHover, hoverSpeed, fadeOut = false, fadeOutColor, scaleOnHover = false,
  renderItem, ariaLabel = 'Partner logos', className, style
}) => {
  const containerRef = useRef(null); const trackRef = useRef(null); const seqRef = useRef(null);
  const [seqWidth, setSeqWidth] = useState(0); const [seqHeight, setSeqHeight] = useState(0);
  const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES); const [isHovered, setIsHovered] = useState(false);
  const effectiveHoverSpeed = useMemo(() => { if (hoverSpeed !== undefined) return hoverSpeed; if (pauseOnHover === true) return 0; if (pauseOnHover === false) return undefined; return 0; }, [hoverSpeed, pauseOnHover]);
  const isVertical = direction === 'up' || direction === 'down';
  const targetVelocity = useMemo(() => { const m = Math.abs(speed); let dm = isVertical ? (direction === 'up' ? 1 : -1) : (direction === 'left' ? 1 : -1); const sm = speed < 0 ? -1 : 1; return m * dm * sm; }, [speed, direction, isVertical]);
  const updateDimensions = useCallback(() => {
    const cw = containerRef.current?.clientWidth ?? 0; const rect = seqRef.current?.getBoundingClientRect?.();
    const sw = rect?.width ?? 0; const sh = rect?.height ?? 0;
    if (isVertical) {
      const ph = containerRef.current?.parentElement?.clientHeight ?? 0;
      if (containerRef.current && ph > 0) { const th = Math.ceil(ph); if (containerRef.current.style.height !== `${th}px`) containerRef.current.style.height = `${th}px`; }
      if (sh > 0) { setSeqHeight(Math.ceil(sh)); const vp = containerRef.current?.clientHeight ?? ph ?? sh; setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(vp / sh) + ANIMATION_CONFIG.COPY_HEADROOM)); }
    } else if (sw > 0) { setSeqWidth(Math.ceil(sw)); setCopyCount(Math.max(ANIMATION_CONFIG.MIN_COPIES, Math.ceil(cw / sw) + ANIMATION_CONFIG.COPY_HEADROOM)); }
  }, [isVertical]);
  useResizeObserver(updateDimensions, [containerRef, seqRef], [logos, gap, logoHeight, isVertical]);
  useImageLoader(seqRef, updateDimensions, [logos, gap, logoHeight, isVertical]);
  useAnimationLoop(trackRef, targetVelocity, seqWidth, seqHeight, isHovered, effectiveHoverSpeed, isVertical);
  const cssVars = useMemo(() => ({ '--logoloop-gap': `${gap}px`, '--logoloop-logoHeight': `${logoHeight}px`, ...(fadeOutColor && { '--logoloop-fadeColor': fadeOutColor }) }), [gap, logoHeight, fadeOutColor]);
  const rootCls = useMemo(() => ['logoloop', isVertical ? 'logoloop--vertical' : 'logoloop--horizontal', fadeOut && 'logoloop--fade', scaleOnHover && 'logoloop--scale-hover', className].filter(Boolean).join(' '), [isVertical, fadeOut, scaleOnHover, className]);
  const onEnter = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(true); }, [effectiveHoverSpeed]);
  const onLeave = useCallback(() => { if (effectiveHoverSpeed !== undefined) setIsHovered(false); }, [effectiveHoverSpeed]);
  const renderLogo = useCallback((item, key) => {
    if (renderItem) return <li className="logoloop__item" key={key} role="listitem">{renderItem(item, key)}</li>;
    const isNode = 'node' in item;
    const content = isNode ? <span className="logoloop__node" aria-hidden={!!item.href && !item.ariaLabel}>{item.node}</span>
      : <img src={item.src} srcSet={item.srcSet} sizes={item.sizes} width={item.width} height={item.height} alt={item.alt ?? ''} title={item.title} loading="lazy" decoding="async" draggable={false} />;
    const label = isNode ? (item.ariaLabel ?? item.title) : (item.alt ?? item.title);
    const inner = item.href ? <a className="logoloop__link" href={item.href} aria-label={label || 'logo link'} target="_blank" rel="noreferrer noopener">{content}</a> : content;
    return <li className="logoloop__item" key={key} role="listitem">{inner}</li>;
  }, [renderItem]);
  const lists = useMemo(() => Array.from({ length: copyCount }, (_, ci) => (
    <ul className="logoloop__list" key={`copy-${ci}`} role="list" aria-hidden={ci > 0} ref={ci === 0 ? seqRef : undefined}>
      {logos.map((item, ii) => renderLogo(item, `${ci}-${ii}`))}
    </ul>
  )), [copyCount, logos, renderLogo]);
  const cStyle = useMemo(() => ({ width: isVertical ? (toCssLength(width) === '100%' ? undefined : toCssLength(width)) : (toCssLength(width) ?? '100%'), ...cssVars, ...style }), [width, cssVars, style, isVertical]);
  return <div ref={containerRef} className={rootCls} style={cStyle} role="region" aria-label={ariaLabel}>
    <div className="logoloop__track" ref={trackRef} onMouseEnter={onEnter} onMouseLeave={onLeave}>{lists}</div>
  </div>;
});
LogoLoop.displayName = 'LogoLoop';
export default LogoLoop;

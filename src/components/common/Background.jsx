import { useState, useRef, useCallback } from 'react';
import { useSettings } from '../../context/SettingsContext';

// --- Shape definitions ---
// Each element ID maps to an array of individual shapes.
// Each shape has a unique sub-key and SVG props.

const SHAPE_DEFINITIONS = {
  waves: [
    { key: 'waves-0', tag: 'path', props: { className: 'background-wave background-wave--1', d: 'M0 700 C360 650, 720 750, 1080 680 S1440 720, 1440 700 L1440 900 L0 900 Z', style: { fill: 'var(--color-primary)', opacity: 0.06 } } },
    { key: 'waves-1', tag: 'path', props: { className: 'background-wave background-wave--2', d: 'M0 750 C300 710, 600 790, 900 730 S1200 770, 1440 740 L1440 900 L0 900 Z', style: { fill: 'var(--color-secondary)', opacity: 0.05 } } },
    { key: 'waves-2', tag: 'path', props: { className: 'background-wave background-wave--3', d: 'M0 780 C240 760, 480 810, 720 770 S960 800, 1440 780 L1440 900 L0 900 Z', style: { fill: 'var(--color-accent)', opacity: 0.04 } } },
  ],
  bokeh: [
    { key: 'bokeh-0', tag: 'circle', props: { cx: '120', cy: '200', r: '80', className: 'background-float background-float--1', style: { fill: 'var(--color-primary)', opacity: 0.04 } } },
    { key: 'bokeh-1', tag: 'circle', props: { cx: '1300', cy: '150', r: '100', className: 'background-float background-float--2', style: { fill: 'var(--color-secondary)', opacity: 0.03 } } },
    { key: 'bokeh-2', tag: 'circle', props: { cx: '200', cy: '600', r: '60', className: 'background-float background-float--3', style: { fill: 'var(--color-accent)', opacity: 0.05 } } },
    { key: 'bokeh-3', tag: 'circle', props: { cx: '1100', cy: '500', r: '90', className: 'background-float background-float--4', style: { fill: 'var(--color-primary)', opacity: 0.03 } } },
    { key: 'bokeh-4', tag: 'circle', props: { cx: '700', cy: '100', r: '50', className: 'background-float background-float--5', style: { fill: 'var(--color-secondary)', opacity: 0.04 } } },
    { key: 'bokeh-5', tag: 'circle', props: { cx: '900', cy: '700', r: '70', className: 'background-float background-float--6', style: { fill: 'var(--color-accent)', opacity: 0.03 } } },
  ],
  'flowing-lines': [
    { key: 'flowing-lines-0', tag: 'path', props: { className: 'background-drift background-drift--1', d: 'M-50 300 Q400 200, 700 350 T1500 250', style: { stroke: 'var(--color-secondary)', opacity: 0.06 }, fill: 'none', strokeWidth: '1.5', strokeLinecap: 'round' } },
    { key: 'flowing-lines-1', tag: 'path', props: { className: 'background-drift background-drift--2', d: 'M-50 500 Q350 400, 750 500 T1500 450', style: { stroke: 'var(--color-accent)', opacity: 0.05 }, fill: 'none', strokeWidth: '1', strokeLinecap: 'round' } },
  ],
  diamonds: [
    { key: 'diamonds-0', tag: 'rect', props: { x: '100', y: '120', width: '60', height: '60', rx: '4', className: 'background-spin background-spin--1', style: { fill: 'var(--color-primary)', opacity: 0.04 }, transform: 'rotate(45 130 150)' } },
    { key: 'diamonds-1', tag: 'rect', props: { x: '1200', y: '200', width: '80', height: '80', rx: '4', className: 'background-spin background-spin--2', style: { fill: 'var(--color-secondary)', opacity: 0.03 }, transform: 'rotate(45 1240 240)' } },
    { key: 'diamonds-2', tag: 'rect', props: { x: '800', y: '80', width: '40', height: '40', rx: '2', className: 'background-spin background-spin--3', style: { fill: 'var(--color-accent)', opacity: 0.05 }, transform: 'rotate(45 820 100)' } },
    { key: 'diamonds-3', tag: 'rect', props: { x: '300', y: '650', width: '70', height: '70', rx: '4', className: 'background-spin background-spin--4', style: { fill: 'var(--color-secondary)', opacity: 0.04 }, transform: 'rotate(45 335 685)' } },
  ],
  hexagons: [
    { key: 'hexagons-0', tag: 'polygon', props: { points: '600,300 640,280 680,300 680,340 640,360 600,340', className: 'background-float background-float--1', style: { fill: 'var(--color-primary)', opacity: 0.03 } } },
    { key: 'hexagons-1', tag: 'polygon', props: { points: '1050,600 1090,580 1130,600 1130,640 1090,660 1050,640', className: 'background-float background-float--3', style: { fill: 'var(--color-accent)', opacity: 0.04 } } },
    { key: 'hexagons-2', tag: 'polygon', props: { points: '150,420 180,405 210,420 210,450 180,465 150,450', className: 'background-float background-float--5', style: { fill: 'var(--color-secondary)', opacity: 0.035 } } },
  ],
  grid: [
    { key: 'grid-0', tag: 'line', props: { x1: '0', y1: '200', x2: '1440', y2: '200', className: 'background-drift background-drift--1', style: { stroke: 'var(--color-primary)', opacity: 0.025 }, strokeWidth: '0.5' } },
    { key: 'grid-1', tag: 'line', props: { x1: '0', y1: '500', x2: '1440', y2: '500', className: 'background-drift background-drift--2', style: { stroke: 'var(--color-secondary)', opacity: 0.02 }, strokeWidth: '0.5' } },
    { key: 'grid-2', tag: 'line', props: { x1: '400', y1: '0', x2: '400', y2: '900', style: { stroke: 'var(--color-accent)', opacity: 0.02 }, strokeWidth: '0.5' } },
    { key: 'grid-3', tag: 'line', props: { x1: '1000', y1: '0', x2: '1000', y2: '900', style: { stroke: 'var(--color-primary)', opacity: 0.02 }, strokeWidth: '0.5' } },
  ],
  triangles: [
    { key: 'triangles-0', tag: 'polygon', props: { points: '0,0 120,0 0,120', className: 'background-wave background-wave--1', style: { fill: 'var(--color-primary)', opacity: 0.03 } } },
    { key: 'triangles-1', tag: 'polygon', props: { points: '1440,900 1320,900 1440,780', className: 'background-wave background-wave--2', style: { fill: 'var(--color-secondary)', opacity: 0.03 } } },
  ],
  ripples: [
    { key: 'ripples-0', tag: 'circle', props: { cx: '350', cy: '350', r: '60', fill: 'none', className: 'background-ripple background-ripple--1', style: { stroke: 'var(--color-primary)', opacity: 0.05 }, strokeWidth: '0.8' } },
    { key: 'ripples-1', tag: 'circle', props: { cx: '350', cy: '350', r: '100', fill: 'none', className: 'background-ripple background-ripple--2', style: { stroke: 'var(--color-primary)', opacity: 0.04 }, strokeWidth: '0.6' } },
    { key: 'ripples-2', tag: 'circle', props: { cx: '350', cy: '350', r: '150', fill: 'none', className: 'background-ripple background-ripple--3', style: { stroke: 'var(--color-primary)', opacity: 0.03 }, strokeWidth: '0.5' } },
    { key: 'ripples-3', tag: 'circle', props: { cx: '1100', cy: '550', r: '50', fill: 'none', className: 'background-ripple background-ripple--4', style: { stroke: 'var(--color-secondary)', opacity: 0.045 }, strokeWidth: '0.8' } },
    { key: 'ripples-4', tag: 'circle', props: { cx: '1100', cy: '550', r: '90', fill: 'none', className: 'background-ripple background-ripple--5', style: { stroke: 'var(--color-secondary)', opacity: 0.035 }, strokeWidth: '0.6' } },
    { key: 'ripples-5', tag: 'circle', props: { cx: '1100', cy: '550', r: '140', fill: 'none', className: 'background-ripple background-ripple--6', style: { stroke: 'var(--color-secondary)', opacity: 0.025 }, strokeWidth: '0.5' } },
  ],
  pebbles: [
    { key: 'pebbles-0', tag: 'ellipse', props: { cx: '720', cy: '750', rx: '120', ry: '30', className: 'background-wave background-wave--1', style: { fill: 'var(--color-accent)', opacity: 0.035 } } },
    { key: 'pebbles-1', tag: 'ellipse', props: { cx: '500', cy: '800', rx: '80', ry: '20', className: 'background-wave background-wave--2', style: { fill: 'var(--color-primary)', opacity: 0.03 } } },
    { key: 'pebbles-2', tag: 'ellipse', props: { cx: '950', cy: '820', rx: '100', ry: '25', className: 'background-wave background-wave--3', style: { fill: 'var(--color-secondary)', opacity: 0.025 } } },
  ],
  'sand-lines': [
    { key: 'sand-lines-0', tag: 'path', props: { className: 'background-drift background-drift--1', d: 'M200 850 Q500 830, 800 850 T1400 840', style: { stroke: 'var(--color-text-muted)', opacity: 0.04 }, fill: 'none', strokeWidth: '0.5', strokeLinecap: 'round' } },
    { key: 'sand-lines-1', tag: 'path', props: { className: 'background-drift background-drift--2', d: 'M100 870 Q450 855, 850 870 T1440 860', style: { stroke: 'var(--color-text-muted)', opacity: 0.03 }, fill: 'none', strokeWidth: '0.5', strokeLinecap: 'round' } },
  ],
  leaves: [
    { key: 'leaves-0', tag: 'path', props: { className: 'background-float background-float--1', d: 'M900 150 Q930 120, 960 150 Q930 180, 900 150 Z', style: { fill: 'var(--color-accent)', opacity: 0.04 } } },
    { key: 'leaves-1', tag: 'path', props: { className: 'background-float background-float--4', d: 'M200 250 Q220 225, 240 250 Q220 275, 200 250 Z', style: { fill: 'var(--color-primary)', opacity: 0.035 } } },
  ],
  'aurora-bands': [
    { key: 'aurora-bands-0', tag: 'path', props: { className: 'background-aurora background-aurora--1', d: 'M-100 200 C200 100, 500 300, 800 150 S1200 250, 1540 180 L1540 350 C1200 400, 800 300, 500 420 S200 280, -100 370 Z', style: { fill: 'var(--color-primary)', opacity: 0.04 } } },
    { key: 'aurora-bands-1', tag: 'path', props: { className: 'background-aurora background-aurora--2', d: 'M-100 350 C300 280, 600 450, 900 320 S1300 400, 1540 340 L1540 480 C1300 530, 900 440, 600 560 S300 420, -100 490 Z', style: { fill: 'var(--color-secondary)', opacity: 0.035 } } },
    { key: 'aurora-bands-2', tag: 'path', props: { className: 'background-aurora background-aurora--3', d: 'M-100 500 C250 440, 550 560, 850 480 S1250 540, 1540 500 L1540 600 C1250 650, 850 580, 550 660 S250 560, -100 620 Z', style: { fill: 'var(--color-accent)', opacity: 0.03 } } },
  ],
  'glow-spots': [
    { key: 'glow-spots-0', tag: 'circle', props: { cx: '300', cy: '250', r: '150', className: 'background-float background-float--1', style: { fill: 'var(--color-primary)', opacity: 0.025 } } },
    { key: 'glow-spots-1', tag: 'circle', props: { cx: '900', cy: '350', r: '180', className: 'background-float background-float--3', style: { fill: 'var(--color-secondary)', opacity: 0.02 } } },
    { key: 'glow-spots-2', tag: 'circle', props: { cx: '1200', cy: '200', r: '120', className: 'background-float background-float--5', style: { fill: 'var(--color-accent)', opacity: 0.025 } } },
  ],
  shimmer: [
    { key: 'shimmer-0', tag: 'path', props: { className: 'background-drift background-drift--1', d: 'M0 250 Q360 180, 720 270 T1440 220', style: { stroke: 'var(--color-primary)', opacity: 0.05 }, fill: 'none', strokeWidth: '1', strokeLinecap: 'round' } },
    { key: 'shimmer-1', tag: 'path', props: { className: 'background-drift background-drift--2', d: 'M0 420 Q400 360, 800 440 T1440 400', style: { stroke: 'var(--color-secondary)', opacity: 0.04 }, fill: 'none', strokeWidth: '0.8', strokeLinecap: 'round' } },
  ],
};

// --- Registries and presets ---

const ALL_ELEMENT_KEYS = Object.keys(SHAPE_DEFINITIONS);

export const BACKGROUND_ELEMENT_GROUPS = [
  {
    group: 'Waves',
    elements: [
      { id: 'waves', label: 'Waves' },
      { id: 'bokeh', label: 'Bokeh' },
      { id: 'flowing-lines', label: 'Flowing Lines' },
    ],
  },
  {
    group: 'Geometric',
    elements: [
      { id: 'diamonds', label: 'Diamonds' },
      { id: 'hexagons', label: 'Hexagons' },
      { id: 'grid', label: 'Grid' },
      { id: 'triangles', label: 'Triangles' },
    ],
  },
  {
    group: 'Zen Garden',
    elements: [
      { id: 'ripples', label: 'Ripples' },
      { id: 'pebbles', label: 'Pebbles' },
      { id: 'sand-lines', label: 'Sand Lines' },
      { id: 'leaves', label: 'Leaves' },
    ],
  },
  {
    group: 'Aurora',
    elements: [
      { id: 'aurora-bands', label: 'Aurora Bands' },
      { id: 'glow-spots', label: 'Glow Spots' },
      { id: 'shimmer', label: 'Shimmer' },
    ],
  },
];

export const PRESET_MAPPINGS = {
  waves: ['waves', 'bokeh', 'flowing-lines'],
  geometric: ['diamonds', 'hexagons', 'grid', 'triangles'],
  zen: ['ripples', 'pebbles', 'sand-lines', 'leaves'],
  aurora: ['aurora-bands', 'glow-spots', 'shimmer'],
};

export const ALL_ELEMENT_IDS = ALL_ELEMENT_KEYS;

// --- SVG tag rendering ---

const SVG_TAGS = { path: 'path', circle: 'circle', rect: 'rect', polygon: 'polygon', line: 'line', ellipse: 'ellipse' };

function SvgShape({ tag, props }) {
  const Tag = SVG_TAGS[tag] || tag;
  return <Tag {...props} />;
}

// --- Draggable wrapper ---

function DraggableGroup({ shapeKey, svgRef, position, onDragEnd, children }) {
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const startRef = useRef(null);

  const toSvgCoords = useCallback((clientX, clientY) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const ctm = svg.getScreenCTM();
    if (!ctm) return { x: 0, y: 0 };
    const inv = ctm.inverse();
    return {
      x: clientX * inv.a + clientY * inv.c + inv.e,
      y: clientX * inv.b + clientY * inv.d + inv.f,
    };
  }, [svgRef]);

  const handlePointerDown = useCallback((e) => {
    e.stopPropagation();
    e.target.setPointerCapture(e.pointerId);
    const pt = toSvgCoords(e.clientX, e.clientY);
    startRef.current = {
      x: pt.x - (position.x || 0),
      y: pt.y - (position.y || 0),
    };
    setDragging(true);
  }, [toSvgCoords, position]);

  const handlePointerMove = useCallback((e) => {
    if (!dragging || !startRef.current) return;
    const pt = toSvgCoords(e.clientX, e.clientY);
    setOffset({
      x: pt.x - startRef.current.x - (position.x || 0),
      y: pt.y - startRef.current.y - (position.y || 0),
    });
  }, [dragging, toSvgCoords, position]);

  const handlePointerUp = useCallback(() => {
    if (!dragging) return;
    setDragging(false);
    startRef.current = null;
    const finalX = (position.x || 0) + offset.x;
    const finalY = (position.y || 0) + offset.y;
    setOffset({ x: 0, y: 0 });
    onDragEnd(shapeKey, finalX, finalY);
  }, [dragging, offset, position, shapeKey, onDragEnd]);

  const tx = (position.x || 0) + offset.x;
  const ty = (position.y || 0) + offset.y;

  return (
    <g
      transform={`translate(${tx}, ${ty})`}
      className={`background-draggable ${dragging ? 'background-draggable--dragging' : ''}`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {children}
    </g>
  );
}

// --- Main Background component ---

export function Background() {
  const { settings, setBackgroundPosition } = useSettings();
  const svgRef = useRef(null);

  // Migration: support old backgroundId format
  let elements = settings.backgroundElements;
  if (!elements && settings.backgroundId) {
    elements = PRESET_MAPPINGS[settings.backgroundId] || PRESET_MAPPINGS.waves;
  }
  if (!elements || elements.length === 0) return null;

  const positions = settings.backgroundPositions || {};

  // Collect all individual shapes from enabled element groups
  const shapes = [];
  for (const elementId of elements) {
    const defs = SHAPE_DEFINITIONS[elementId];
    if (defs) {
      for (const shape of defs) {
        shapes.push(shape);
      }
    }
  }

  return (
    <div className="background-container" aria-hidden="true">
      <svg
        ref={svgRef}
        className="background-svg"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {shapes.map(shape => (
          <DraggableGroup
            key={shape.key}
            shapeKey={shape.key}
            svgRef={svgRef}
            position={positions[shape.key] || { x: 0, y: 0 }}
            onDragEnd={setBackgroundPosition}
          >
            <SvgShape tag={shape.tag} props={shape.props} />
          </DraggableGroup>
        ))}
      </svg>
    </div>
  );
}

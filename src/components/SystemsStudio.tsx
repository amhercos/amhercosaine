import { useEffect, useId, useState } from 'react';
import {
  DFD_HEIGHTS,
  studioSystems,
  type DfdEdge,
  type DfdNode,
  type DfdPos,
  type StudioSystem,
} from '../data/systems';

type Props = {
  initialSlug?: string;
  singleSystem?: boolean;
};

function computeFlowPath(
  fromNode: DfdNode,
  toNode: DfdNode,
  edge: DfdEdge,
  mode: 'desktop' | 'mobile',
): { d: string; labelX: number; labelY: number } {
  const fromPos: DfdPos = mode === 'desktop' ? fromNode.desktop : fromNode.mobile;
  const toPos: DfdPos = mode === 'desktop' ? toNode.desktop : toNode.mobile;
  const fromH = DFD_HEIGHTS[fromNode.kind];
  const toH = DFD_HEIGHTS[toNode.kind];

  if (mode === 'desktop') {
    if (edge.arc) {
      // Curved under-row data flow (e.g., P2 -> D1)
      const sx = fromPos.x;
      const sy = fromPos.y + fromH / 2;
      const tx = toPos.x - 16;
      const ty = toPos.y + toH / 2;
      const dropY = Math.max(sy, ty) + 54;
      const d = `M ${sx} ${sy} C ${sx} ${dropY}, ${tx} ${dropY}, ${tx} ${ty + 4}`;
      return {
        d,
        labelX: (sx + tx) / 2,
        labelY: dropY - 10,
      };
    }

    // Same column vertical flow (e.g., POS -> SQLite)
    if (Math.abs(fromPos.x - toPos.x) < 24) {
      const sx = fromPos.x;
      const sy = fromPos.y + fromH / 2;
      const tx = toPos.x;
      const ty = toPos.y - toH / 2 - 4;
      return {
        d: `M ${sx} ${sy} L ${tx} ${ty}`,
        labelX: sx + 38,
        labelY: (sy + ty) / 2 + 3,
      };
    }

    const sx = fromPos.x + fromPos.w / 2;
    const sy = fromPos.y;
    const tx = toPos.x - toPos.w / 2 - 4;
    const dy = fromPos.y < toPos.y - 20 ? -12 : fromPos.y > toPos.y + 20 ? 12 : 0;
    const ty = toPos.y + dy;
    const midX = (sx + tx) / 2;
    const d = `M ${sx} ${sy} C ${midX} ${sy}, ${midX} ${ty}, ${tx} ${ty}`;
    return {
      d,
      labelX: midX,
      labelY: (sy + ty) / 2 - 10,
    };
  }

  // Mobile vertical layout
  if (edge.arc) {
    const sx = fromPos.x + fromPos.w / 2;
    const sy = fromPos.y;
    const tx = toPos.x + toPos.w / 2;
    const ty = toPos.y;
    const railX = 338;
    const d = `M ${sx} ${sy} C ${railX} ${sy}, ${railX} ${ty}, ${tx + 4} ${ty}`;
    return {
      d,
      labelX: railX - 24,
      labelY: (sy + ty) / 2,
    };
  }

  // Horizontal pair on mobile (if on same row)
  if (Math.abs(fromPos.y - toPos.y) < 20) {
    const sx = fromPos.x + fromPos.w / 2;
    const sy = fromPos.y;
    const tx = toPos.x - toPos.w / 2 - 4;
    const ty = toPos.y;
    return {
      d: `M ${sx} ${sy} L ${tx} ${ty}`,
      labelX: (sx + tx) / 2,
      labelY: sy - 10,
    };
  }

  const sx = fromPos.x;
  const sy = fromPos.y + fromH / 2;
  const tx = toPos.x;
  const ty = toPos.y - toH / 2 - 4;
  const midY = (sy + ty) / 2;
  const d = `M ${sx} ${sy} C ${sx} ${midY}, ${tx} ${midY}, ${tx} ${ty}`;
  return {
    d,
    labelX: (sx + tx) / 2 + (Math.abs(sx - tx) < 12 ? 38 : 0),
    labelY: midY + 3,
  };
}

type FlowSpeed = 0.5 | 1 | 2;

const SPEED_CONFIG: Record<
  FlowSpeed,
  { intervalMs: number; packetDur: string; trailBegin: string }
> = {
  0.5: { intervalMs: 2600, packetDur: '2.1s', trailBegin: '1.05s' },
  1: { intervalMs: 1650, packetDur: '1.35s', trailBegin: '0.67s' },
  2: { intervalMs: 850, packetDur: '0.72s', trailBegin: '0.36s' },
};

function GaneSarsonCanvas({
  system,
  mode,
  selectedKey,
  speed,
  onSelectNode,
  reactId,
}: {
  system: StudioSystem;
  mode: 'desktop' | 'mobile';
  selectedKey: string;
  speed: FlowSpeed;
  onSelectNode: (node: DfdNode) => void;
  reactId: string;
}) {
  const vb = mode === 'desktop' ? system.desktopViewBox : system.mobileViewBox;
  const markerIdleId = `${reactId}-${mode}-arrow-idle`;
  const markerHotId = `${reactId}-${mode}-arrow-hot`;
  const glowGradId = `${reactId}-${mode}-active-glow`;
  const timing = SPEED_CONFIG[speed];

  const selectedNode = system.nodes.find((n) => n.key === selectedKey);
  const selectedPos = selectedNode
    ? mode === 'desktop'
      ? selectedNode.desktop
      : selectedNode.mobile
    : null;

  return (
    <svg
      className={`dfd-svg dfd-svg--${mode}`}
      viewBox={`0 0 ${vb.w} ${vb.h}`}
      role="group"
      aria-label={`${system.title} Gane-Sarson Data Flow Diagram (${mode})`}
    >
      <defs>
        {/* Soft Atmospheric Radial Spotlight Following the Active Node */}
        <radialGradient id={glowGradId} cx="50%" cy="50%" r="50%">
          <stop offset="0%" className="dfd-glow-stop-core" />
          <stop offset="55%" className="dfd-glow-stop-mid" />
          <stop offset="100%" className="dfd-glow-stop-outer" />
        </radialGradient>

        <marker
          id={markerIdleId}
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 7 4 L 0 7 z" className="dfd-arrow-idle" />
        </marker>
        <marker
          id={markerHotId}
          viewBox="0 0 8 8"
          refX="6"
          refY="4"
          markerWidth="5.5"
          markerHeight="5.5"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 7 4 L 0 7 z" className="dfd-arrow-hot" />
        </marker>
      </defs>

      {/* Pure Atmospheric Spotlight Pool Gliding Smoothly Behind Active Node */}
      {selectedPos && (
        <g
          className="dfd-spotlight-mover"
          style={{
            transform: `translate(${selectedPos.x}px, ${selectedPos.y}px)`,
          }}
        >
          <ellipse
            cx={0}
            cy={0}
            rx={selectedPos.w * 1.15}
            ry={96}
            fill={`url(#${glowGradId})`}
            className="dfd-spotlight"
          />
        </g>
      )}

      {/* Data Flow Connectors & Dual Animated Packets */}
      {system.edges.map((edge) => {
        const fromNode = system.nodes.find((n) => n.key === edge.from);
        const toNode = system.nodes.find((n) => n.key === edge.to);
        if (!fromNode || !toNode) return null;

        const { d, labelX, labelY } = computeFlowPath(fromNode, toNode, edge, mode);
        const isHot = selectedKey === fromNode.key || selectedKey === toNode.key;
        const displayLabel =
          mode === 'mobile' && edge.mobileLabel !== undefined ? edge.mobileLabel : edge.label;
        const labelW = displayLabel.length * 6.2 + 12;

        return (
          <g key={`${mode}-${edge.from}-${edge.to}`}>
            <path
              d={d}
              className={isHot ? 'dfd-edge is-hot' : 'dfd-edge'}
              markerEnd={`url(#${isHot ? markerHotId : markerIdleId})`}
            />
            {isHot && (
              <>
                <path
                  d={d}
                  className="dfd-edge-flow"
                  style={{ animationDuration: timing.packetDur }}
                />
                <circle r="3.6" className="dfd-packet">
                  <animateMotion
                    dur={timing.packetDur}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
                <circle r="2.5" className="dfd-packet dfd-packet--trail">
                  <animateMotion
                    dur={timing.packetDur}
                    begin={timing.trailBegin}
                    repeatCount="indefinite"
                    path={d}
                  />
                </circle>
              </>
            )}
            {displayLabel && (
              <g
                className="dfd-flow-pill-group"
                onClick={() => onSelectNode(selectedKey === fromNode.key ? toNode : fromNode)}
              >
                <rect
                  x={labelX - labelW / 2}
                  y={labelY - 9}
                  width={labelW}
                  height="16"
                  rx="2"
                  className={isHot ? 'dfd-flow-label-bg is-hot' : 'dfd-flow-label-bg'}
                />
                <text
                  x={labelX}
                  y={labelY + 2.5}
                  textAnchor="middle"
                  className={isHot ? 'dfd-flow-label is-hot' : 'dfd-flow-label'}
                >
                  {displayLabel}
                </text>
              </g>
            )}
          </g>
        );
      })}

      {/* Authentic Gane-Sarson Nodes */}
      {system.nodes.map((node) => {
        const pos = mode === 'desktop' ? node.desktop : node.mobile;
        const h = DFD_HEIGHTS[node.kind];
        const x = pos.x - pos.w / 2;
        const y = pos.y - h / 2;
        const isSelected = selectedKey === node.key;

        return (
          <g
            key={`${mode}-${node.key}`}
            className={isSelected ? 'dfd-node-group is-selected' : 'dfd-node-group'}
            role="button"
            tabIndex={0}
            aria-pressed={isSelected}
            aria-label={`${node.ref ? `${node.ref} ` : ''}${node.title.join(' ')}`}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelectNode(node)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectNode(node);
              }
            }}
          >
            {/* 1. External Entity: Sharp-cornered rectangle (rx="0") with double left/top shadow border */}
            {node.kind === 'entity' && (
              <>
                <polyline
                  points={`${x - 4},${y + h - 4} ${x - 4},${y - 4} ${x + pos.w - 4},${y - 4}`}
                  className="dfd-entity-shadow"
                />
                <rect x={x} y={y} width={pos.w} height={h} rx="0" className="dfd-shape" />
                {node.title.map((line, i) => {
                  const totalLines = node.title.length + (node.caption ? 1 : 0);
                  const startY = pos.y - ((totalLines - 1) * 14) / 2 + 4;
                  return (
                    <text
                      key={line}
                      x={pos.x}
                      y={startY + i * 14}
                      textAnchor="middle"
                      className="dfd-node-title"
                    >
                      {line}
                    </text>
                  );
                })}
                {node.caption && (
                  <text
                    x={pos.x}
                    y={pos.y + 13}
                    textAnchor="middle"
                    className="dfd-node-caption"
                  >
                    {node.caption}
                  </text>
                )}
              </>
            )}

            {/* 2. Process: Rounded rectangle (rx="10") divided by horizontal header rule (P1, P2, P3) */}
            {node.kind === 'process' && (
              <>
                <rect x={x} y={y} width={pos.w} height={h} rx="10" className="dfd-shape" />
                <line
                  x1={x}
                  y1={y + 24}
                  x2={x + pos.w}
                  y2={y + 24}
                  className="dfd-divider"
                />
                <text
                  x={pos.x}
                  y={y + 16}
                  textAnchor="middle"
                  className="dfd-process-ref"
                >
                  {node.ref}
                </text>
                {node.title.map((line, i) => {
                  const bodyCenterY = y + 24 + (h - 24) / 2;
                  const startY =
                    bodyCenterY - ((node.title.length - 1) * 14) / 2 + 4;
                  return (
                    <text
                      key={line}
                      x={pos.x}
                      y={startY + i * 14}
                      textAnchor="middle"
                      className="dfd-node-title"
                    >
                      {line}
                    </text>
                  );
                })}
              </>
            )}

            {/* 3. Data Store: Open-ended rectangle (open right side) + left vertical ID divider (D1, D2) */}
            {node.kind === 'store' && (
              <>
                <rect
                  x={x}
                  y={y}
                  width={pos.w}
                  height={h}
                  className="dfd-store-fill"
                />
                <path
                  d={`M ${x + pos.w} ${y} H ${x} V ${y + h} H ${x + pos.w}`}
                  className="dfd-store-border"
                />
                <line
                  x1={x + 34}
                  y1={y}
                  x2={x + 34}
                  y2={y + h}
                  className="dfd-divider"
                />
                <text
                  x={x + 17}
                  y={pos.y + 4}
                  textAnchor="middle"
                  className="dfd-store-ref"
                >
                  {node.ref}
                </text>
                {node.title.map((line, i) => {
                  const textCenterX = x + 34 + (pos.w - 38) / 2;
                  const totalLines = node.title.length + (node.caption ? 1 : 0);
                  const startY = pos.y - ((totalLines - 1) * 13) / 2 + 4;
                  return (
                    <text
                      key={line}
                      x={textCenterX}
                      y={startY + i * 13}
                      textAnchor="middle"
                      className="dfd-node-title"
                    >
                      {line}
                    </text>
                  );
                })}
                {node.caption && (
                  <text
                    x={x + 34 + (pos.w - 38) / 2}
                    y={pos.y + 12}
                    textAnchor="middle"
                    className="dfd-node-caption"
                  >
                    {node.caption}
                  </text>
                )}
              </>
            )}
          </g>
        );
      })}
    </svg>
  );
}

export default function SystemsStudio({ initialSlug, singleSystem = false }: Props) {
  const reactId = useId();
  const initialIndex = initialSlug
    ? Math.max(0, studioSystems.findIndex((s) => s.slug === initialSlug))
    : 0;

  const [systemIndex, setSystemIndex] = useState(initialIndex);
  const activeSystem: StudioSystem = studioSystems[systemIndex] ?? studioSystems[0];

  const [selectedKey, setSelectedKey] = useState<string>(
    activeSystem.traceOrder[0] ?? activeSystem.nodes[0]?.key ?? '',
  );
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [speed, setSpeed] = useState<FlowSpeed>(1);

  const selectedNode: DfdNode =
    activeSystem.nodes.find((n) => n.key === selectedKey) ?? activeSystem.nodes[0];

  useEffect(() => {
    if (!isPlaying) return;
    const order = activeSystem.traceOrder;
    const intervalMs = SPEED_CONFIG[speed].intervalMs;
    const timer = window.setInterval(() => {
      setSelectedKey((prev) => {
        const idx = order.indexOf(prev);
        const nextIdx = idx < 0 || idx >= order.length - 1 ? 0 : idx + 1;
        return order[nextIdx] ?? order[0];
      });
    }, intervalMs);

    return () => window.clearInterval(timer);
  }, [isPlaying, activeSystem, speed]);

  const handleSystemSwitch = (idx: number) => {
    setSystemIndex(idx);
    const nextSys = studioSystems[idx] ?? studioSystems[0];
    setSelectedKey(nextSys.traceOrder[0] ?? nextSys.nodes[0]?.key ?? '');
    setIsPlaying(true);
  };

  const handleSelectNode = (node: DfdNode) => {
    setIsPlaying(false);
    setSelectedKey(node.key);
  };

  const handleStep = () => {
    setIsPlaying(false);
    const order = activeSystem.traceOrder;
    const idx = order.indexOf(selectedKey);
    const nextIdx = idx < 0 || idx >= order.length - 1 ? 0 : idx + 1;
    setSelectedKey(order[nextIdx] ?? order[0]);
  };

  const handleStepPrev = () => {
    setIsPlaying(false);
    const order = activeSystem.traceOrder;
    const idx = order.indexOf(selectedKey);
    const prevIdx = idx <= 0 ? order.length - 1 : idx - 1;
    setSelectedKey(order[prevIdx] ?? order[0]);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setSelectedKey(activeSystem.traceOrder[0] ?? activeSystem.nodes[0]?.key ?? '');
  };

  const handleTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIdx =
      event.key === 'ArrowRight'
        ? (idx + 1) % studioSystems.length
        : (idx - 1 + studioSystems.length) % studioSystems.length;
    handleSystemSwitch(nextIdx);
    document.getElementById(`${reactId}-sys-${nextIdx}`)?.focus();
  };

  const kindLabel =
    selectedNode?.kind === 'entity'
      ? 'External Entity'
      : selectedNode?.kind === 'process'
        ? `Process ${selectedNode.ref ?? ''}`
        : `Data Store ${selectedNode?.ref ?? ''}`;

  const currentStepIdx = Math.max(0, activeSystem.traceOrder.indexOf(selectedKey));
  const progressPct = ((currentStepIdx + 1) / activeSystem.traceOrder.length) * 100;

  return (
    <div className="studio-container" data-project-theme={activeSystem.theme}>
      {!singleSystem && (
        <div className="studio-switcher-wrap">
          <div className="studio-switcher-head">
            <span className="studio-switcher-label">
              SELECT ARCHITECTURE ({`0${systemIndex + 1}`} / {`0${studioSystems.length}`})
            </span>
            <span className="studio-switcher-hint">
              Click any system card below to switch the live Gane-Sarson DFD
            </span>
          </div>
          <div className="studio-tabs" role="tablist" aria-label="Core engineering systems">
            {studioSystems.map((sys, idx) => {
              const isActive = idx === systemIndex;
              const indexCode = `0${idx + 1}`;
              return (
                <button
                  key={sys.slug}
                  id={`${reactId}-sys-${idx}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`${reactId}-stage`}
                  tabIndex={isActive ? 0 : -1}
                  data-tab-theme={sys.theme}
                  className={isActive ? 'studio-tab is-active' : 'studio-tab'}
                  onClick={() => handleSystemSwitch(idx)}
                  onKeyDown={(e) => handleTabKeyDown(e, idx)}
                >
                  <span className="studio-tab-top">
                    <span className="studio-tab-index">
                      <span className="studio-tab-dot" aria-hidden="true" />
                      {indexCode}
                    </span>
                    <span className="studio-tab-cta" aria-hidden="true">
                      {isActive ? 'Active DFD' : 'Inspect DFD →'}
                    </span>
                  </span>
                  <span className="studio-tab-title">{sys.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div
        key={activeSystem.slug}
        id={`${reactId}-stage`}
        role={singleSystem ? undefined : 'tabpanel'}
        aria-labelledby={singleSystem ? undefined : `${reactId}-sys-${systemIndex}`}
        className="studio-panel"
      >
        <div className="studio-summary-head">
          <div className="studio-summary-meta">
            <span>{activeSystem.context}</span>
            <span>{activeSystem.period}</span>
          </div>
          <div className="studio-title-row">
            <h3>{activeSystem.title}</h3>
            {!singleSystem && (
              <a
                className="studio-case-link"
                href={`/work/${activeSystem.slug}`}
                aria-label={`Read the ${activeSystem.title} case study`}
              >
                Read case study →
              </a>
            )}
          </div>
          <p className="studio-subtitle">{activeSystem.subtitle}</p>
          <p className="studio-stack">{activeSystem.stackLine}</p>

          <ul className="studio-highlights">
            {activeSystem.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* Gane-Sarson Controls, Speed Switcher & Notation Legend */}
        <div className="trace-toolbar">
          <div className="trace-controls">
            <button
              type="button"
              aria-pressed={isPlaying}
              className={isPlaying ? 'trace-btn is-primary' : 'trace-btn'}
              onClick={() => setIsPlaying((p) => !p)}
            >
              <span
                className={isPlaying ? 'trace-live-dot is-on' : 'trace-live-dot'}
                aria-hidden="true"
              />
              {isPlaying ? 'Auto-Simulate: ON' : 'Auto-Simulate: OFF'}
            </button>

            <div className="trace-speed-group" role="group" aria-label="Simulation speed">
              {([0.5, 1, 2] as FlowSpeed[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  className={speed === s ? 'trace-speed-btn is-active' : 'trace-speed-btn'}
                  onClick={() => {
                    setSpeed(s);
                    setIsPlaying(true);
                  }}
                >
                  {s}x
                </button>
              ))}
            </div>

            <button
              type="button"
              className="trace-btn"
              onClick={handleStepPrev}
              aria-label="Previous flow step"
            >
              ← Prev
            </button>
            <button type="button" className="trace-btn" onClick={handleStep}>
              Step →
            </button>
            <button type="button" className="trace-btn" onClick={handleReset}>
              Reset
            </button>
          </div>

          <div className="dfd-legend" aria-label="Gane-Sarson DFD notation">
            <span>Entity</span>
            <span>Process (P1..Pn)</span>
            <span>Data Store (D1..Dn, open right)</span>
          </div>

          {/* Sleek 2px Flow Progress Line */}
          <div className="trace-progress-track" aria-hidden="true">
            <div
              className="trace-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        {/* Ultra-Clean High-Impact Gane-Sarson DFD Stage */}
        <div className="dfd-stage">
          <div className="dfd-stage-dots" aria-hidden="true" />
          <GaneSarsonCanvas
            system={activeSystem}
            mode="desktop"
            selectedKey={selectedKey}
            speed={speed}
            onSelectNode={handleSelectNode}
            reactId={reactId}
          />
          <GaneSarsonCanvas
            system={activeSystem}
            mode="mobile"
            selectedKey={selectedKey}
            speed={speed}
            onSelectNode={handleSelectNode}
            reactId={reactId}
          />
        </div>

        {/* Node Detail Card with Subtle Transition on Node Step */}
        {selectedNode && (
          <div className="studio-inspector" aria-live="polite">
            <div key={selectedNode.key} className="studio-inspector-inner">
              <div className="studio-inspector-head">
                <div className="studio-inspector-title-group">
                  <span className="studio-inspector-step">{kindLabel}</span>
                  <h4>{selectedNode.title.join(' ')}</h4>
                  {selectedNode.caption && (
                    <span className="studio-inspector-sub">{selectedNode.caption}</span>
                  )}
                </div>
                <span className="studio-inspector-counter">
                  0{currentStepIdx + 1} / 0{activeSystem.traceOrder.length}
                </span>
              </div>

              <dl className="studio-inspector-grid">
                <div className="studio-inspector-col">
                  <dt>Role</dt>
                  <dd>{selectedNode.role}</dd>
                </div>
                <div className="studio-inspector-col">
                  <dt>Stack</dt>
                  <dd className="studio-inspector-mono">{selectedNode.stack}</dd>
                </div>
                <div className="studio-inspector-col">
                  <dt>Key Outcome</dt>
                  <dd>{selectedNode.outcome}</dd>
                </div>
              </dl>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

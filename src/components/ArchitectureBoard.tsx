import { Fragment, useId, useMemo, useRef, useState } from 'react';
import { getSystem, type ArchLane, type ArchNode, type ArchStudio } from '../data/systems';
import '../styles/architecture.css';

type Props = {
  slug: string;
};

export default function ArchitectureBoard({ slug }: Props) {
  const studio = getSystem(slug);
  const reactId = useId();

  if (!studio) return null;

  return <Board studio={studio} reactId={reactId} />;
}

function Board({ studio, reactId }: { studio: ArchStudio; reactId: string }) {
  const allNodes = useMemo(
    () => studio.lanes.flatMap((lane) => lane.nodes.map((node) => ({ node, lane }))),
    [studio],
  );
  const [pinnedId, setPinnedId] = useState(allNodes[0]?.node.id ?? '');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const inspectorNodeId = hoveredId ?? pinnedId;
  const active = allNodes.find((entry) => entry.node.id === inspectorNodeId) ?? allNodes[0];
  const inspectorId = `${reactId}-inspector`;

  return (
    <figure className="arch" data-kind={studio.kind} aria-label={studio.title}>
      <figcaption className="arch-caption">
        <span>{studio.title}</span>
        <span>Architecture map · select a node for details</span>
      </figcaption>

      <div className="arch-body">
        <div className="arch-stage">
          {studio.kind === 'strangler' ? (
            <Strangler lanes={studio.lanes} flows={studio.flows} onSelect={setPinnedId} onHover={setHoveredId} inspectorId={inspectorId} />
          ) : studio.kind === 'pipeline' ? (
            <Pipeline lanes={studio.lanes} flows={studio.flows} onSelect={setPinnedId} onHover={setHoveredId} inspectorId={inspectorId} />
          ) : studio.kind === 'gate' ? (
            <Gate lanes={studio.lanes} flows={studio.flows} onSelect={setPinnedId} onHover={setHoveredId} inspectorId={inspectorId} />
          ) : (
            <Layers lanes={studio.lanes} flows={studio.flows} onSelect={setPinnedId} onHover={setHoveredId} inspectorId={inspectorId} />
          )}
        </div>

        <aside className="arch-inspector" id={inspectorId} aria-live="polite">
          {active && (
            <>
              <p className="arch-kicker">
                {active.lane.index} · {active.lane.label}
              </p>
              <h3>{active.node.name}</h3>
              <div className="arch-tags">
                {active.node.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <p>{active.node.detail}</p>
              {active.node.snippet && <pre><code>{active.node.snippet}</code></pre>}
            </>
          )}

          <ol className="arch-path">
            {studio.path.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </aside>
      </div>

      <p className="arch-note">{studio.caption}</p>
    </figure>
  );
}

function Layers({
  lanes,
  flows,
  onSelect,
  onHover,
  inspectorId,
}: {
  lanes: ArchLane[];
  flows: ArchStudio['flows'];
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  inspectorId: string;
}) {
  return (
    <div className="arch-layers">
      {lanes.map((lane, index) => (
        <div className="arch-layer-block" key={lane.id}>
          <Lane lane={lane} onSelect={onSelect} onHover={onHover} inspectorId={inspectorId} />
          {index < flows.length && (
            <p className="arch-flow" aria-hidden="true">
              <span>{flows[index].label}</span>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Pipeline({
  lanes,
  flows,
  onSelect,
  onHover,
  inspectorId,
}: {
  lanes: ArchLane[];
  flows: ArchStudio['flows'];
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  inspectorId: string;
}) {
  return (
    <div className="arch-pipeline">
      {lanes.map((lane, index) => (
        <Fragment key={lane.id}>
          <Lane lane={lane} onSelect={onSelect} onHover={onHover} inspectorId={inspectorId} />
          {index < lanes.length - 1 && (
            <p className="arch-chevron">
              <span>{flows[index]?.label ?? 'forward'}</span>
            </p>
          )}
        </Fragment>
      ))}
    </div>
  );
}

function Strangler({
  lanes,
  flows,
  onSelect,
  onHover,
  inspectorId,
}: {
  lanes: ArchLane[];
  flows: ArchStudio['flows'];
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  inspectorId: string;
}) {
  const [legacy, modern] = lanes;
  return (
    <div className="arch-strangler">
      {legacy && <Lane lane={legacy} onSelect={onSelect} onHover={onHover} inspectorId={inspectorId} muted />}
      <p className="arch-cutover" aria-hidden="true">
        <span>{flows[0]?.label ?? 'feature slice'}</span>
        <span className="arch-direction">feature migrates</span>
      </p>
      {modern && <Lane lane={modern} onSelect={onSelect} onHover={onHover} inspectorId={inspectorId} />}
    </div>
  );
}

function Gate({
  lanes,
  flows,
  onSelect,
  onHover,
  inspectorId,
}: {
  lanes: ArchLane[];
  flows: ArchStudio['flows'];
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  inspectorId: string;
}) {
  return (
    <div className="arch-gate">
      <div className="arch-gate-row">
        {lanes.map((lane, index) => (
          <Fragment key={lane.id}>
            <Lane lane={lane} onSelect={onSelect} onHover={onHover} inspectorId={inspectorId} />
            {index < lanes.length - 1 && (
              <p className="arch-mobile-flow" aria-hidden="true">
                <span>{flows[index]?.label ?? 'continue'}</span>
              </p>
            )}
          </Fragment>
        ))}
      </div>
      <p className="arch-return" aria-hidden="true">
        skip denied · content stays closed
      </p>
    </div>
  );
}

function Lane({
  lane,
  onSelect,
  onHover,
  inspectorId,
  muted = false,
}: {
  lane: ArchLane;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  inspectorId: string;
  muted?: boolean;
}) {
  return (
    <section className={`arch-lane${muted ? ' is-muted' : ''}`} aria-label={lane.label}>
      <header className="arch-lane-head">
        <span>
          {lane.index} {lane.label}
        </span>
        <span>{lane.hint}</span>
      </header>
      <div className="arch-nodes">
        {lane.nodes.map((node) => (
          <NodeButton
            key={node.id}
            node={node}
            onSelect={onSelect}
            onHover={onHover}
            inspectorId={inspectorId}
          />
        ))}
      </div>
    </section>
  );
}

function NodeButton({
  node,
  onSelect,
  onHover,
  inspectorId,
}: {
  node: ArchNode;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  inspectorId: string;
}) {
  const label = `${node.name} · ${node.tags.join(' · ')}`;
  const [hot, setHot] = useState(false);
  const fromPointer = useRef(false);
  const hasFineHover = () => (
    typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches
  );
  const updateHover = (id: string | null) => {
    if (!hasFineHover()) return;
    setHot(id !== null);
    onHover(id);
  };

  return (
    <button
      type="button"
      className={hot ? 'arch-node is-hot' : 'arch-node'}
      data-tone={node.tone}
      title={label}
      aria-controls={inspectorId}
      onPointerDown={() => {
        fromPointer.current = true;
        if (!hasFineHover()) {
          setHot(false);
          onHover(null);
        }
      }}
      onClick={() => onSelect(node.id)}
      onFocus={() => {
        onSelect(node.id);
        if (!fromPointer.current) setHot(true);
        fromPointer.current = false;
      }}
      onBlur={() => setHot(false)}
      onMouseEnter={() => {
        updateHover(node.id);
      }}
      onMouseLeave={() => {
        updateHover(null);
      }}
    >
      <strong>{node.name}</strong>
      <span className="arch-node-tags">{node.tags.join(' · ')}</span>
    </button>
  );
}

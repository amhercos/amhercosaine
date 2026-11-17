import { useId, useState } from 'react';
import { skillMatrix, type SkillGroupKey } from '../data/profile';

type FilterTab = {
  key: 'all' | SkillGroupKey;
  label: string;
};

const FILTER_TABS: FilterTab[] = [
  { key: 'all', label: 'All Layers' },
  { key: 'backend', label: 'Backend' },
  { key: 'identity-cloud', label: 'Identity & Cloud' },
  { key: 'databases', label: 'Databases' },
  { key: 'frontend', label: 'Frontend' },
];

export default function TechStackMatrix() {
  const reactId = useId();
  const [activeFilter, setActiveFilter] = useState<'all' | SkillGroupKey>('all');

  const visibleRows =
    activeFilter === 'all'
      ? skillMatrix
      : skillMatrix.filter((row) => row.filterKey === activeFilter);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIdx =
      event.key === 'ArrowRight'
        ? (index + 1) % FILTER_TABS.length
        : (index - 1 + FILTER_TABS.length) % FILTER_TABS.length;
    const nextTab = FILTER_TABS[nextIdx];
    if (nextTab) {
      setActiveFilter(nextTab.key);
      document.getElementById(`${reactId}-filter-${nextTab.key}`)?.focus();
    }
  };

  return (
    <div className="stack-interactive">
      <div className="stack-filter-bar" role="tablist" aria-label="Filter technical stack">
        {FILTER_TABS.map((tab, idx) => {
          const isActive = activeFilter === tab.key;
          return (
            <button
              key={tab.key}
              id={`${reactId}-filter-${tab.key}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={isActive ? 'stack-filter-tab is-active' : 'stack-filter-tab'}
              onClick={() => setActiveFilter(tab.key)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <dl className="spec-matrix" role="tabpanel">
        {visibleRows.map((row) => (
          <div key={row.category} className="spec-matrix-row">
            <dt>{row.category}</dt>
            <dd>{row.items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

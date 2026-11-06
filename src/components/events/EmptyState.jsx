import { RotateCcw } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Rangoli from '../decor/Rangoli.jsx';

/** Shown when a search/filter matches nothing, or the dataset is empty. */
export default function EmptyState({ query, category, onReset, variant = 'no-results' }) {
  const noData = variant === 'no-data';
  return (
    <div className="empty-state" role="status">
      <Rangoli className="empty-state__art" size={160} />
      <h2 className="empty-state__title">{noData ? 'The stage is being set.' : 'No events match that.'}</h2>
      <p className="empty-state__text">
        {noData ? (
          'There are no events to show yet. Check back once the line-up is announced.'
        ) : (
          <>
            We couldn’t find {query ? <>anything for “<strong>{query}</strong>”</> : 'any events'}
            {category && category !== 'All' ? (
              <>
                {' '}
                in <strong>{category}</strong>
              </>
            ) : null}
            . Try a broader word, another category, or start over.
          </>
        )}
      </p>
      {!noData && (
        <Button onClick={onReset} icon={RotateCcw} iconPosition="start">
          Reset search &amp; filters
        </Button>
      )}
    </div>
  );
}

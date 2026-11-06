import { Info } from 'lucide-react';

export default function SampleNotice({ children }) {
  return (
    <p className="sample-notice">
      <Info aria-hidden="true" />
      <span>
        {children ??
          'Sample listings. These events are illustrative, inspired by MILAN’s cultural domains — names, schedules and venues are not official. Official events are announced by the Directorate of Student Affairs.'}
      </span>
    </p>
  );
}

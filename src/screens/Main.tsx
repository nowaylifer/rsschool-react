import { useAppSelector } from '@/redux/hooks';
import { selectSubmittedForms } from '@/redux/formSlice';
import Box from '@/components/Box';
import Grid from '@/components/Grid';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { LocationState } from '@/constants';
import { cn } from '@/utils';

const Main = () => {
  const forms = useAppSelector(selectSubmittedForms);
  const [showHighlight, setShowHighlight] = useState(false);
  const { state } = useLocation();

  useEffect(() => {
    if (state === LocationState.FORM_ADDED) {
      setShowHighlight(true);
    }
  });

  return (
    <Grid>
      {forms.map((form, index) => (
        <Box
          key={index}
          className={cn('relative flex flex-col gap-y-1', showHighlight && index === 0 && 'border border-red-300')}
        >
          {showHighlight && index == 0 && (
            <div className="absolute left-1/2 top-4 -translate-x-1/2 font-bold">NEW!</div>
          )}
          <div>{!!form.image && <img src={form.image as string} />}</div>
          {Object.entries(form).map(([key, value]) => {
            if (key === 'image') return;

            return (
              <div className="flex gap-x-3">
                <span className="font-semibold">{key}:</span>
                {String(value)}
              </div>
            );
          })}
        </Box>
      ))}
    </Grid>
  );
};
export default Main;

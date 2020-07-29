import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../../../store/store.types';
import { PlanningState, PlanningYear } from '../../../../store/planning/planning.types';
import * as PlanningActions from '../../../../store/planning/actions';

type Hook = {
  plans: Array<PlanningYear>;
  handleCreatePlanningYear: (year: number) => void;
}

export const useStore = (): Hook => {
  const dispatch = useDispatch();
  const planning = useSelector<RootState, PlanningState>(state => state.planning);

  const handleCreatePlanningYear = React.useCallback((year: number) => {
    dispatch(PlanningActions.createPlanningYear(year));
  }, [dispatch]);

  return {
    plans: planning.plans,
    handleCreatePlanningYear,
  }
}
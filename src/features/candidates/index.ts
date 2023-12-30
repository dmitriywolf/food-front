// slice
export { default as candidatesSlice } from './candidatesSlice';

// components
export { Candidates } from './components/Candidates';
export { CandidateDetails } from './components/CandidateDetails';
export { CandidateCard } from './components/CandidateCard';

// service
export { getCandidates, getCandidateById } from './services';

// selectors
export {
  selectCandidates,
  selectCurrentCandidate,
  selectIsLoading,
} from './candidatesSlice';

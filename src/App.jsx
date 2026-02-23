import useFetch from "./hooks/useFetch";
import { getCandidateByEmail, getJobs, applyToJob } from "./services/api";
import JobList from "./components/JobList";

function App() {
  const EMAIL = "joaquinalfredogreco@gmail.com";

  const {
    data: candidate,
    loading: candidateLoading,
    error: candidateError
  } = useFetch(() => getCandidateByEmail(EMAIL));

  const {
    data: jobs,
    loading: jobsLoading,
    error: jobsError
  } = useFetch(getJobs);

  const {
    execute: apply,
    loading: applying
  } = useFetch(applyToJob, false); // false = no ejecutar automáticamente

  const handleApply = async (jobId, repoUrl) => {
    if (!candidate) return;

    try {
      await apply({
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        repoUrl,
      });

      alert("¡Postulación enviada con éxito!");

    } catch (err) {
      console.error(err);
    }
  };

  if (candidateLoading || jobsLoading) return <p>Loading...</p>;
  if (candidateError || jobsError) return <p>Error...</p>;

  return (
    <div>
      <h1>Nimble Gravity Challenge</h1>
      {jobs && (
        <JobList
          jobs={jobs}
          onApply={handleApply}
          applying={applying}
        />
      )}
    </div>
  );
}

export default App;
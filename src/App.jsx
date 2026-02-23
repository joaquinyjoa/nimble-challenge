import useFetch from "./hooks/useFetch";
import { getCandidateByEmail, getJobs, applyToJob } from "./services/api";
import JobList from "./components/JobList";
import "./App.css";
import { useState } from "react";

function App() {
  const EMAIL = "joaquinalfredogreco@gmail.com";
  const [applyError, setApplyError] = useState("");

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
      setApplyError("");

      await apply({
        uuid: candidate.uuid,
        jobId,
        candidateId: candidate.candidateId,
        applicationId: candidate.applicationId,
        repoUrl,
      });

      alert("¡Postulación enviada con éxito!");

    } catch (err) {
      console.error(err);
      setApplyError(err.message || "No se pudo enviar la postulación.");
    }
  };

  if (candidateLoading || jobsLoading) {
    return (
      <div className="app-state">
        <div className="status-card">Cargando oportunidades...</div>
      </div>
    );
  }

  if (candidateError || jobsError) {
    return (
      <div className="app-state">
        <div className="status-card status-card--error">
          Ocurrió un error al cargar la información.
        </div>
      </div>
    );
  }

  return (
    <main className="app-shell">
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            <header className="app-header text-center mb-4">
              <p className="app-kicker mb-2">Nimble Gravity</p>
              <h1 className="main-title mb-2">Challenge de Postulaciones</h1>
              <p className="app-subtitle mb-0">
                Compartí tu repositorio y aplicá a las posiciones disponibles.
              </p>
            </header>

            {applyError && (
              <div className="alert alert-danger app-alert" role="alert">
                {applyError}
              </div>
            )}

            {jobs && (
              <JobList
                jobs={jobs}
                onApply={handleApply}
                applying={applying}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
import useFetch from "./hooks/useFetch";
import { getCandidateByEmail, getJobs, applyToJob } from "./services/api";
import JobList from "./components/JobList";

function App() {
  const CORREO = "joaquinalfredogreco@gmail.com";

  const {
    data: candidato,
    loading: cargandoCandidato,
    error: errorCandidato
  } = useFetch(() => getCandidateByEmail(CORREO));

  const {
    data: trabajos,
    loading: cargandoTrabajos,
    error: errorTrabajos
  } = useFetch(getJobs);

  const {
    execute: postular,
    loading: enviandoPostulacion
  } = useFetch(applyToJob, false);

  const manejarPostulacion = async (jobId, repoUrl) => {
    if (!candidato) return;

    try {
      await postular({
        uuid: candidato.uuid,
        jobId,
        candidateId: candidato.candidateId,
        repoUrl,
      });

      alert("¡Postulación enviada con éxito!");

    } catch (error) {
      console.error(error);
    }
  };

  if (cargandoCandidato || cargandoTrabajos) {
    return <p>Cargando...</p>;
  }

  if (errorCandidato || errorTrabajos) {
    return <p>Ocurrió un error al cargar los datos.</p>;
  }

  return (
    <div>
      <h1>Challenge Nimble Gravity</h1>
      {trabajos && (
        <JobList
          jobs={trabajos}
          onApply={manejarPostulacion}
          applying={enviandoPostulacion}
        />
      )}
    </div>
  );
}

export default App;
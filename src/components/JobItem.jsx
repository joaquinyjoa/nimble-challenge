import { useState } from "react";

function JobItem({ job, onApply, applying }) {
  const [repoUrl, setRepoUrl] = useState("");

  return (
        <article className="card mb-3 shadow-sm job-card">
            <div className="card-body p-4">
                <p className="job-label mb-2">Posición disponible</p>
                <h5 className="card-title mb-3">{job.title}</h5>

                <div className="mb-3">
                    <label className="form-label mb-2" htmlFor={`repo-${job.id}`}>
                        URL del repositorio
                    </label>
                    <input
                        id={`repo-${job.id}`}
                        type="url"
                        className="form-control"
                        placeholder="https://github.com/usuario/proyecto"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                    />
        </div>

        <button
                    className="btn btn-primary btn-custom w-100"
                    onClick={() => onApply(job.id, repoUrl.trim())}
                    disabled={applying || !repoUrl.trim()}
        >
                    {applying ? "Enviando..." : "Postularme"}
        </button>

                <p className="job-help mb-0 mt-2">
                    Asegurate de que el repositorio sea público y accesible.
                </p>
            </div>
        </article>
    );
}

export default JobItem;
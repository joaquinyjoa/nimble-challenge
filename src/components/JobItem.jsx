import { useState } from "react";

function JobItem({ job, onApply }) {
    const [repoUrl, setRepoUrl] = useState("");

    return(
        <div style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
            <h3>{job.title}</h3>

            <input type="text" 
                placeholder="URL de tu repositorio"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
             /> 

            <button onClick={() => onApply(job.id, repoUrl)}>
                Aplicar
            </button>
        </div>
    )
}

export default JobItem;
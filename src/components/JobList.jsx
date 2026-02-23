import JobItem from "./JobItem";

function JobList({ jobs, onApply, applying }) {
    return(
        <div className="job-list">
            {jobs.map(job => (
                <JobItem key={job.id} job={job} onApply={onApply} applying={applying} />
            ))}
        </div>
    )
}

export default JobList;
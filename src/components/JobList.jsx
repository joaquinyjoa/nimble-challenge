import JobItem from "./JobItem";

function JobList({ jobs, onApply }) {
    return(
        <div>
            {jobs.map(job => (
                <JobItem key={job.id} job={job} onApply={onApply} />
            ))}
        </div>
    )
}

export default JobList;
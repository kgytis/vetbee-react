const LogCard = ({ ...props }) => {
  const { data: logs } = props;

  return (
    <>
      {logs.map((log) => {
        return (
          <div className="card" key={log.id}>
            <h5>{log.status}</h5>
            <p>Log description - {log.description}</p>
          </div>
        );
      })}
    </>
  );
};

export default LogCard;

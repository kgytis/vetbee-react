const Button = ({ ...props }) => {
  const { title, action, classname, id } = props;
  return (
    <>
      <button
        className={classname}
        onClick={() => {
          action(id);
        }}
      >
        {title}
      </button>
    </>
  );
};

export default Button;

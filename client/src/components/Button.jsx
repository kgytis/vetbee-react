const Button = ({ ...props }) => {
  const { title, action, classname, id, pet } = props;
  return (
    <>
      <button
        className={classname}
        onClick={() => {
          action(id, pet);
        }}
      >
        {title}
      </button>
    </>
  );
};

export default Button;

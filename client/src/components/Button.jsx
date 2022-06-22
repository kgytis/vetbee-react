const Button = ({ ...props }) => {
  const { title, action, classname, id, pet, type } = props;
  return (
    <>
      <button
        type={type}
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

const Button = ({ ...props }) => {
  const { title, action, classname } = props;
  return (
    <>
      <button className={classname} onClick={() => {}}>
        {title}
      </button>
    </>
  );
};

export default Button;

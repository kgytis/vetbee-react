const FormButton = ({ ...props }) => {
  const { title, classname, type } = props;
  return (
    <>
      <button type={type} className={classname}>
        {title}
      </button>
    </>
  );
};

export default FormButton;

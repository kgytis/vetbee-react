const FormButton = ({ ...props }) => {
  const { title, action, classname, id, pet, type } = props;
  return (
    <>
      <button type={type} className={classname}>
        {title}
      </button>
    </>
  );
};

export default FormButton;

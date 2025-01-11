function InputBox({ name, type, id, value, placeholder, icon, handleChange }) {
  return (
    <div>
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        className="input-box"
      />
      {/* TODO: add icon and handle password visibility */}
    </div>
  );
}

export default InputBox;
